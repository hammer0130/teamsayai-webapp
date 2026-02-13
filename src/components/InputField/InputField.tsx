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
  error?: boolean;
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

const Label = ({
  children,
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label {...props} className={clsx("ui-inputField__label", className)}>
      {children}
    </label>
  );
};
Label.displayName = "InputField.Label";

const Root = ({
  size = "md",
  intent = "default",
  disabled = false,
  className,
  style,
  children,
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

  return (
    <InputFieldContext.Provider value={contextValue}>
      <div
        className={clsx("ui-inputField", className)}
        data-intent={intent}
        style={style}
      >
        {children}
      </div>
    </InputFieldContext.Provider>
  );
};
Root.displayName = "InputField.Root";

export const InputField = Object.assign(Root, {
  Container,
  Label,
});
