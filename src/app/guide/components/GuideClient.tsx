"use client";

import { InputField } from "@/components/InputField";

export const GuideClient = () => {
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ width: "300px" }}>
          <InputField>
            <InputField.Container data-size="sm">
              <InputField.Control placeholder="입력해주세요" />
            </InputField.Container>
          </InputField>
        </div>
        <div style={{ width: "300px" }}>
          <InputField size="md">
            <InputField.Container>
              <InputField.Control placeholder="입력해주세요" />
            </InputField.Container>
          </InputField>
        </div>
        <div style={{ width: "300px" }}>
          <InputField size="lg">
            <InputField.Container>
              <InputField.Control placeholder="입력해주세요" />
            </InputField.Container>
          </InputField>
        </div>
        <div style={{ width: "300px" }}>
          <InputField size="lg" placeholder="입력해주세요" />
        </div>
      </div>
    </div>
  );
};
