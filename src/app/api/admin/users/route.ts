import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function findUserIdByEmail(email: string) {
  // 페이지네이션이 있지만 팀 규모라면 200~1000 정도면 충분
  const { data, error } = await supabaseAdmin.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });

  if (error) throw new Error(error.message);

  const user = data.users.find(u => (u.email ?? "").toLowerCase() === email.toLowerCase());
  return user?.id ?? null;
}

export async function POST(req: Request) {
  try {
    // TODO(중요): 관리자만 호출 가능하게 막아야 함 (아래에 설명)
    const body = await req.json();

    const email = String(body.email ?? `${body.member_id}@teamsayai.com`).trim();
    const password = String(body.password ?? "").trim();
    const name = String(body.name ?? "").trim();
    const role = body.role === "admin" ? "admin" : "member";
    const team_role = body.team_role === "감독" ? "감독" : body.team_role === "코치" ? "코치" : body.team_role === "총무" ? "총무" : "선수";
    const member_id = String(body.member_id ?? "").trim();
    const back_no = body.back_no === null || body.back_no === undefined ? null : Number(body.back_no);
    const player_id = body.player_id === null || body.player_id === undefined ? null : Number(body.player_id);
    const position = String(body.position ?? "").trim();
    const since = body.since === null || body.since === undefined ? null : Number(body.since);
    const active = Boolean(body.active);
    const note = String(body.note ?? "").trim();

    if (!password || !name || !member_id) {
      return NextResponse.json(
        { message: "member_id, password, name은 필수입니다." },
        { status: 400 }
      );
    }

    // 1) Auth 계정 생성 (uuid는 여기서 자동 생성됨)
    const { data: created, error: createErr } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    let userId: string | null = created?.user?.id ?? null;

    // 2) 이미 등록된 이메일이면 기존 userId 찾아서 profiles만 만들기
    if (createErr) {
      const msg = createErr.message ?? "";
      if (msg.includes("already been registered")) {
        
        userId = await findUserIdByEmail(email);

        if (!userId) {
          return NextResponse.json(
            { message: "이미 등록된 이메일인데 userId를 찾지 못했습니다. (admin.listUsers 확인 필요)" },
            { status: 400 }
          );
        }
      } else {
        return NextResponse.json({ message: msg }, { status: 400 });
      }
    }

    // 3) profiles upsert (없으면 생성, 있으면 갱신)
    const { error: profileErr } = await supabaseAdmin.from("profiles").upsert(
      {
      id: userId,
      name,
      role,
      team_role,
      pw_updated: false,
      member_id,
      back_no,
      player_id,
      position,
      since,
      active,
      note,
    },
    { onConflict: "id" }
  );

    if (profileErr) {
      // 신규 생성 케이스인데 profiles만 실패하면 auth user가 고아가 될 수 있어서 롤백 고려
      // if (!existed && userId) await supabaseAdmin.auth.admin.deleteUser(userId);
      return NextResponse.json({ message: profileErr.message }, { status: 400 });
    }

    return NextResponse.json({ id: userId }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ message: e?.message ?? "Server error" }, { status: 500 });
  }
}
