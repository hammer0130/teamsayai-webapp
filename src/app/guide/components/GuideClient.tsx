"use client";

import { Button } from "@/components/button";
import { InputField } from "@/components/InputField";

export const GuideClient = () => {
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ width: "300px" }}>
          <InputField size="sm" intent="error">
            <InputField.Label>Label</InputField.Label>
            <InputField.Container>
              <InputField.Control placeholder="입력해주세요" />
            </InputField.Container>
            <InputField.ErrorMessage>Error Message</InputField.ErrorMessage>
          </InputField>
        </div>
        <div style={{ width: "300px" }}>
          <InputField size="md">
            <InputField.Label>비밀번호</InputField.Label>
            <InputField.Container>
              <InputField.Control type="password" placeholder="입력해주세요" />
            </InputField.Container>
            <InputField.Help>비밀번호는 5자리로 입력해주세요.</InputField.Help>
          </InputField>
        </div>
        <div style={{ width: "300px" }}>
          <InputField size="lg">
            <InputField.Label>Label</InputField.Label>
            <InputField.Container>
              <InputField.Control placeholder="입력해주세요" />
              <InputField.Action>
                <Button size="small">버튼</Button>
              </InputField.Action>
            </InputField.Container>
          </InputField>
        </div>
        <div style={{ width: "300px" }}>
          <InputField size="lg" placeholder="입력해주세요" />
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Button size="small" variant="weak">
            버튼
          </Button>
          <Button size="medium" color="secondary">
            버튼
          </Button>
          <Button size="large">버튼</Button>
          <Button size="xlarge">버튼</Button>
        </div>
      </div>
    </div>
  );
};
