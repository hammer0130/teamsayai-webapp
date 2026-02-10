import * as React from "react";

import clsx from "clsx";

import { InputContext, type InputContextValue } from "./Input.context";

/** Input 컴포넌트 Props (단일 or compound 모두 지원) */
export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  size?: "small" | "medium" | "large" | "xlarge";
  state?: "disabled" | "loading";
  invalid?: boolean;
  block?: boolean;
  children?: React.ReactNode;
}

/** Control Props: compound 모드에서 실제 <input> */
export interface InputControlProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  state?: "disabled" | "loading";
  invalid?: boolean;
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
      ...restProps
    },
    ref,
  ) => {
    const compoundMode = hasChildren(children);
    const isDisabled = state === "disabled";

    const contextValue = React.useMemo<InputContextValue>(
      () => ({ size, state, invalid, block }),
      [size, state, invalid, block],
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
    { state: stateProp, invalid: invalidProp, className, disabled, ...rest },
    ref,
  ) => {
    const ctx = React.useContext(InputContext);

    const state = stateProp ?? ctx?.state;
    const invalid = invalidProp ?? ctx?.invalid ?? false;
    const isDisabled = state === "disabled" || Boolean(disabled);

    return (
      <input
        ref={ref}
        className={clsx("ui-input__control", className)}
        disabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        aria-invalid={invalid || undefined}
        data-state={state}
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
