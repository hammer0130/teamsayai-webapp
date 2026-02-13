"use client";

import { useState } from "react";

import { Button } from "@/components/button";
import { Checkbox } from "@/components/checkbox";
import { CheckIcon } from "@/components/icon";
import { Input } from "@/components/input";
import { InputField } from "@/components/InputField";
import { Select } from "@/components/select";

import { UserPageRoot, UserPageTitle, UserForm } from "./UsersPage.styles";

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

function PageTitle({ title }: { title: string }) {
  return <UserPageTitle>{title}</UserPageTitle>;
}

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
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async () => {
    setLoading(true);
    setMsg(null);

    try {
      if (!form.password.trim()) throw new Error("기본 비밀번호는 필수입니다.");
      if (!form.name.trim()) throw new Error("이름은 필수입니다.");
      if (!form.member_id.trim()) throw new Error("회원 아이디는 필수입니다.");
      if (!form.team_role.trim()) throw new Error("팀 역할은 필수입니다.");
      if (typeof form.position !== "string" || !form.position.trim())
        throw new Error("포지션은 필수입니다.");
      if (!form.since) throw new Error("입단연도는 필수입니다.");

      const payload = {
        ...form,
        member_id: form.member_id.trim(),
      };

      console.log(payload);

      // const res = await fetch("/api/admin/users", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(payload),
      // });

      // const data = await res.json();

      // if (!res.ok) {
      //   throw new Error(data?.message ?? "등록 실패");
      // }

      // setMsg(`등록 완료! userId=${data.id}`);
      // // 입력값 초기화
      // setForm((prev) => ({
      //   ...prev,
      //   name: "",
      //   member_id: "",
      //   back_no: null,
      //   player_id: null,
      //   position: "",
      //   active: true,
      //   role: "member",
      //   password: "",
      //   since: null,
      //   note: "",
      // }));
    } catch (e: any) {
      setMsg(e?.message ?? "에러가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserPageRoot>
      <PageTitle title="회원 등록" />

      <UserForm>
        <InputField>
          <InputField.Container>
            <InputField.Label>게임원 아이디 (member_id)</InputField.Label>
            <Input
              defaultValue={form.member_id}
              onValueChange={(value) => {
                setMemberId(value);
                setForm((prev) => ({
                  ...prev,
                  member_id: value,
                  email: `${value}@teamsayai.com`,
                }));
              }}
              size="large"
            />
          </InputField.Container>
        </InputField>
        <InputField>
          <InputField.Container>
            <InputField.Label>이름 (name)</InputField.Label>
            <Input
              defaultValue={form.name}
              onValueChange={(value) => onChange("name", value)}
              size="large"
            />
          </InputField.Container>
        </InputField>
        <InputField>
          <InputField.Container>
            <InputField.Label>권한 (role)</InputField.Label>
            <Select.Root
              key={form.role}
              defaultValue={form.role}
              onValueChange={(value) => onChange("role", value)}
            >
              <Select.Trigger
                style={{
                  width: "100%",
                }}
              >
                <Select.Value placeholder="옵션을 선택하세요" />
                <Select.Icon />
              </Select.Trigger>
              <Select.Portal>
                <Select.Content>
                  <Select.Viewport>
                    <Select.Item value="member">
                      <Select.ItemText>member</Select.ItemText>
                    </Select.Item>
                    <Select.Item value="admin">
                      <Select.ItemText>admin</Select.ItemText>
                    </Select.Item>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </InputField.Container>
        </InputField>
        <InputField>
          <InputField.Container>
            <InputField.Label>팀 역할 (team_role)</InputField.Label>
            <Select.Root
              key={form.team_role}
              defaultValue={form.team_role}
              onValueChange={(value) => onChange("team_role", value)}
            >
              <Select.Trigger
                style={{
                  width: "100%",
                }}
              >
                <Select.Value placeholder="옵션을 선택하세요" />
                <Select.Icon />
              </Select.Trigger>
              <Select.Portal>
                <Select.Content>
                  <Select.Viewport>
                    <Select.Item value="선수">
                      <Select.ItemText>선수</Select.ItemText>
                    </Select.Item>
                    <Select.Item value="감독">
                      <Select.ItemText>감독</Select.ItemText>
                    </Select.Item>
                    <Select.Item value="코치">
                      <Select.ItemText>코치</Select.ItemText>
                    </Select.Item>
                    <Select.Item value="총무">
                      <Select.ItemText>총무</Select.ItemText>
                    </Select.Item>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </InputField.Container>
        </InputField>
        <InputField>
          <InputField.Container>
            <InputField.Label>등번호 (back_no)</InputField.Label>
            <Input
              defaultValue={form.back_no ?? ""}
              onValueChange={(value) => {
                const newBackNo = value ? Number(value) : null;
                setBackNo(newBackNo);
                setForm((prev) => ({
                  ...prev,
                  back_no: newBackNo,
                  password: newBackNo !== null ? `teamsayai${newBackNo}` : "",
                }));
              }}
              inputMode="numeric"
              pattern="[0-9]*"
              size="large"
            />
          </InputField.Container>
        </InputField>
        <InputField>
          <InputField.Container>
            <InputField.Label>선수 아이디 (player_id)</InputField.Label>
            <Input
              defaultValue={form.player_id ?? ""}
              onValueChange={(value) =>
                onChange("player_id", value ? Number(value) : null)
              }
            />
          </InputField.Container>
        </InputField>

        <InputField>
          <InputField.Container>
            <InputField.Label>포지션 (position)</InputField.Label>
            <Input
              defaultValue={form.position}
              placeholder="예: 투수, 포수"
              onValueChange={(value) => onChange("position", value)}
            />
          </InputField.Container>
        </InputField>

        <InputField>
          <InputField.Container>
            <InputField.Label>입단연도 (since)</InputField.Label>
            <Input
              defaultValue={form.since ?? ""}
              placeholder="2012"
              onValueChange={(value) =>
                onChange("since", value ? Number(value) : null)
              }
            />
          </InputField.Container>
        </InputField>

        <InputField>
          <InputField.Container>
            <InputField.Label>활동 여부 (active)</InputField.Label>
            <Checkbox.Root
              key={form.active ? "true" : "false"}
              checked={form.active}
              onCheckedChange={(checked) => onChange("active", checked)}
            >
              <Checkbox.Indicator>
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox.Root>
          </InputField.Container>
        </InputField>

        <InputField>
          <InputField.Container>
            <InputField.Label>비고 (note)</InputField.Label>
            <Input
              defaultValue={form.note}
              placeholder="비고를 입력해주세요."
              onValueChange={(value) => onChange("note", value)}
            />
          </InputField.Container>
        </InputField>

        <Button onClick={submit} disabled={loading} size="large">
          {loading ? "등록 중..." : "회원 등록"}
        </Button>

        {msg && <p style={{ marginTop: 8 }}>{msg}</p>}
      </UserForm>
    </UserPageRoot>
  );
}
