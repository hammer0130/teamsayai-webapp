"use client";

import * as React from "react";

import clsx from "clsx";

import { InputFieldContext, useInputFieldContext } from "./InputField.context";

type Size = "sm" | "md" | "lg";
type Intent = "default" | "error" | "success";

type InputFieldControlProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
>;

type InputFieldRootProps = {
  size?: Size;
  intent?: Intent;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
} & InputFieldControlProps; // Root가 input props도 받게 함

type InputFieldContainerProps = React.HTMLAttributes<HTMLDivElement>;

const Container = ({
  children,
  className,
  ...props
}: InputFieldContainerProps) => {
  const { size } = useInputFieldContext("InputField.Container");

  return (
    <div
      {...props}
      data-size={size}
      className={clsx("ui-inputField__container", className)}
    >
      {children}
    </div>
  );
};
Container.displayName = "InputField.Container";

const Control = React.forwardRef<HTMLInputElement, InputFieldControlProps>(
  (
    {
      className,
      id,
      disabled: disabledProp,
      "aria-describedby": ariaDesc,
      ...props
    },
    ref,
  ) => {
    const { inputId, helpId, errorId, disabled, intent } =
      useInputFieldContext("InputField.Control");

    const describedBy =
      [helpId, errorId, ariaDesc].filter(Boolean).join(" ") || undefined;

    const isDisabled = disabledProp ?? disabled;

    return (
      <input
        {...props}
        type="text"
        ref={ref}
        id={id ?? inputId}
        disabled={isDisabled}
        className={clsx("ui-inputField__control", className)}
        aria-invalid={intent === "error" ? true : undefined}
        aria-describedby={describedBy}
      />
    );
  },
);
Control.displayName = "InputField.Control";

const Root = ({
  size = "md",
  intent = "default",
  disabled = false,
  className,
  style,
  children,
  ...controlProps // ✅ 여기가 이제 진짜 input props
}: InputFieldRootProps) => {
  const rid = React.useId();

  const contextValue = React.useMemo(
    () => ({
      size,
      intent,
      disabled,
      inputId: `ui-inputField-${rid}`,
      helpId: `ui-inputField-help-${rid}`,
      errorId: `ui-inputField-error-${rid}`,
    }),
    [size, intent, disabled, rid],
  );

  const childArray = React.Children.toArray(children);
  const hasContainer = childArray.some((child: any) => {
    const t = child?.type;
    return t?.displayName === "InputField.Container";
  });

  // 1) children 없으면: 기본 렌더
  const content =
    children == null ? (
      <Container>
        <Control {...controlProps} />
      </Container>
    ) : hasContainer ? (
      // 2) Container를 사용자가 제공했으면 그대로
      children
    ) : (
      // 3) children은 있는데 Container가 없으면 감싸기(선택)
      <Container>{children}</Container>
    );

  return (
    <InputFieldContext.Provider value={contextValue}>
      <div className={clsx("ui-inputField", className)} style={style}>
        {content}
      </div>
    </InputFieldContext.Provider>
  );
};

export const InputField = Object.assign(Root, {
  Container,
  Control,
});
