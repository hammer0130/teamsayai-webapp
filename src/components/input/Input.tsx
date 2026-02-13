import * as React from "react";

import clsx from "clsx";

import { InputContext, type InputContextValue } from "./Input.context";

/**
 * Input 컴포넌트 Props (단일 or compound 모두 지원)
 * Radix와 동일: 제어는 value + onValueChange, 비제어는 defaultValue + onValueChange
 */
export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  size?: "small" | "medium" | "large" | "xlarge";
  state?: "disabled" | "loading";
  invalid?: boolean;
  block?: boolean;
  children?: React.ReactNode;
  /** Radix 스타일: 값 변경 시 (value: string) 전달. value(defaultValue)와 함께 사용 */
  onValueChange?: (value: string) => void;
}

/** Control Props: compound 모드에서 실제 <input> */
export interface InputControlProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  state?: "disabled" | "loading";
  invalid?: boolean;
  onValueChange?: (value: string) => void;
}

/** Slot(Prefix/Suffix) Props */
export type InputSlotProps = React.HTMLAttributes<HTMLSpanElement>;

/** 기본 props 값 */
const DEFAULT_PROPS = {
  size: "medium",
  type: "text",
  block: false,
} as const;

const hasChildren = (children: React.ReactNode) =>
  React.Children.toArray(children).length > 0;

const InputRoot = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = DEFAULT_PROPS.size,
      state,
      type = DEFAULT_PROPS.type,
      block = DEFAULT_PROPS.block,
      invalid = false,
      className,
      children,
      onChange,
      onValueChange,
      ...restProps
    },
    ref,
  ) => {
    const compoundMode = hasChildren(children);
    const isDisabled = state === "disabled";

    const contextValue = React.useMemo<InputContextValue>(
      () => ({
        size,
        invalid,
        block,
        ...(state !== undefined && { state }),
      }),
      [size, state, invalid, block],
    );

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
        onValueChange?.(e.target.value);
      },
      [onChange, onValueChange],
    );

    // 1) 단일 모드
    if (!compoundMode) {
      return (
        <InputContext.Provider value={contextValue}>
          <input
            ref={ref}
            type={type}
            disabled={isDisabled}
            aria-disabled={isDisabled || undefined}
            data-disabled={isDisabled || undefined}
            aria-invalid={invalid || undefined}
            data-invalid={invalid || undefined}
            className={clsx(
              "ui-input",
              `ui-input--${size}`,
              block && "ui-input--block",
              invalid && "ui-input--invalid",
              className,
            )}
            data-state={state}
            onChange={handleChange}
            {...restProps}
          />
        </InputContext.Provider>
      );
    }

    // 2) Compound 모드
    return (
      <InputContext.Provider value={contextValue}>
        <div
          className={clsx(
            "ui-input__group",
            `ui-input__group--${size}`,
            block && "ui-input__group--block",
            invalid && "ui-input__group--invalid",
            className,
          )}
          data-state={state}
          aria-disabled={isDisabled || undefined}
          aria-invalid={invalid || undefined}
        >
          {children}
        </div>
      </InputContext.Provider>
    );
  },
);

InputRoot.displayName = "Input";

/** Compound: 실제 input */
const Control = React.forwardRef<HTMLInputElement, InputControlProps>(
  (
    {
      state: stateProp,
      invalid: invalidProp,
      className,
      disabled,
      onChange,
      onValueChange,
      ...rest
    },
    ref,
  ) => {
    const ctx = React.useContext(InputContext);

    const state = stateProp ?? ctx?.state;
    const invalid = invalidProp ?? ctx?.invalid ?? false;
    const isDisabled = state === "disabled" || Boolean(disabled);

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
        onValueChange?.(e.target.value);
      },
      [onChange, onValueChange],
    );

    return (
      <input
        ref={ref}
        className={clsx("ui-input__control", className)}
        disabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        aria-invalid={invalid || undefined}
        data-state={state}
        onChange={handleChange}
        {...rest}
      />
    );
  },
);

Control.displayName = "Input.Control";

/** Compound: 왼쪽 슬롯 */
const Prefix = ({ className, ...props }: InputSlotProps) => (
  <span className={clsx("ui-input__prefix", className)} {...props} />
);
Prefix.displayName = "Input.Prefix";

/** Compound: 오른쪽 슬롯 */
const Suffix = ({ className, ...props }: InputSlotProps) => (
  <span className={clsx("ui-input__suffix", className)} {...props} />
);
Suffix.displayName = "Input.Suffix";

/** Input 컴포넌트 (단일 + compound 모드 지원) */
export const Input = Object.assign(InputRoot, {
  Control,
  Prefix,
  Suffix,
});
