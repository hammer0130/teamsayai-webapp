"use client";

import { useState } from "react";

type CreateUserPayload = {
  password: string;
  name: string;
  role: "admin" | "member";
  team_role: "감독" | "코치" | "총무" | "선수";
  member_id: string; 
  back_no: number | null;
  player_id: number | null;
  position: string;
  active: boolean;
  since: number | null;
  note: string;
  email: string;
};

export default function AdminUsersPage() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [backNo, setBackNo] = useState<number | null>(null);
  const [memberId, setMemberId] = useState<string>("");


  const [form, setForm] = useState<CreateUserPayload>({
    member_id: "",
    password: `teamsayai${backNo}`,
    name: "",
    role: "member",
    team_role: "선수",
    back_no: null,
    player_id: null,
    position: "",
    active: true,
    since: null,
    note: "",
    email: `${memberId}@teamsayai.com`,
  });

  const onChange = (key: keyof CreateUserPayload, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const submit = async () => {
    setLoading(true);
    setMsg(null);

    try {
      if (!form.password.trim()) throw new Error("기본 비밀번호는 필수입니다.");
      if (!form.name.trim()) throw new Error("이름은 필수입니다.");
      if (!form.member_id.trim()) throw new Error("회원 아이디는 필수입니다.");
      if (!form.team_role.trim()) throw new Error("팀 역할은 필수입니다.");
      if (!form.position.trim()) throw new Error("포지션은 필수입니다.");
      if (!form.since) throw new Error("입단연도는 필수입니다.");

      const payload = {
        ...form,
        member_id: form.member_id.trim()
      };

      console.log(payload);
      
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message ?? "등록 실패");
      }

      setMsg(`등록 완료! userId=${data.id}`);
      // 입력값 초기화
      setForm(prev => ({
        ...prev,
        name: "",
        member_id: "",
        back_no: null,
        player_id: null,
        position: "",
        active: true,
        role: "member",
        password: "",
        since: null,
        note: "",
      }));
    } catch (e: any) {
      setMsg(e?.message ?? "에러가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 640 }}>
      <h1 style={{ fontSize: 22, fontWeight: 700 }}>회원 등록</h1>

      <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
        <label>
          게임원 아이디 (member_id)
          <input
            value={form.member_id}
            onChange={e => {
              const value = e.target.value;
              setMemberId(value);
              setForm(prev => ({
                ...prev,
                member_id: value,
                email: `${value}@teamsayai.com`,
              }));
            }}
            style={{ width: "100%", padding: 10, marginTop: 6 }}
          />
        </label>

        <label>
          이름 (name)
          <input
            value={form.name}
            onChange={e => onChange("name", e.target.value)}
            style={{ width: "100%", padding: 10, marginTop: 6 }}
          />
        </label>

        <label>
          권한 (role)
          <select
            value={form.role}
            onChange={e => onChange("role", e.target.value)}
            style={{ width: "100%", padding: 10, marginTop: 6 }}
          >
            <option value="member">member</option>
            <option value="admin">admin</option>
          </select>
        </label>

        <label>
          팀 역할 (team_role)
          <select
            value={form.team_role}
            onChange={e => onChange("team_role", e.target.value)}
            style={{ width: "100%", padding: 10, marginTop: 6 }}
          >
            <option value="선수">선수</option>
            <option value="감독">감독</option>
            <option value="코치">코치</option>
            <option value="총무">총무</option>
          </select>
        </label>

        <label>
          등번호 (back_no)
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*" 
            value={form.back_no ?? ""}
            onChange={e => {
              const value = e.target.value;
              const newBackNo = value ? Number(value) : null;
              setBackNo(newBackNo);
              setForm(prev => ({
                ...prev,
                back_no: newBackNo,
                password: newBackNo !== null ? `teamsayai${newBackNo}` : "",
              }));
            }}
            style={{ width: "100%", padding: 10, marginTop: 6 }}
          />
        </label>

        <label>
          선수 아이디 (player_id)
          <input
            value={form.player_id ?? ""}
            onChange={e => onChange("player_id", e.target.value ? Number(e.target.value) : null)}
            style={{ width: "100%", padding: 10, marginTop: 6 }}
          />
        </label>

        <label>
          포지션 (position)
          <input
            value={form.position}
            onChange={e => onChange("position", e.target.value)}
            placeholder="예: 투수, 포수"
            style={{ width: "100%", padding: 10, marginTop: 6 }}
          />
        </label>

        <label>
          입단연도 (since)
          <input
            value={form.since ?? ""}
            onChange={e => onChange("since", e.target.value)}
            placeholder="2012"
            style={{ width: "100%", padding: 10, marginTop: 6 }}
          />
        </label>

        <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            type="checkbox"
            checked={form.active}
            onChange={e => onChange("active", e.target.checked)}
          />
          활동 여부 (active)
        </label>

        <label>
          비고 (note)
          <input
            value={form.note}
            onChange={e => onChange("note", e.target.value)}
            style={{ width: "100%", padding: 10, marginTop: 6 }}
          />
        </label>

        <button
          onClick={submit}
          disabled={loading}
          style={{ padding: 12, fontWeight: 700, cursor: "pointer" }}
        >
          {loading ? "등록 중..." : "회원 등록"}
        </button>

        {msg && <p style={{ marginTop: 8 }}>{msg}</p>}
      </div>
    </div>
  );
}
