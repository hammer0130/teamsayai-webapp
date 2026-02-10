import * as React from "react";

import clsx from "clsx";

import { TextareaContext, type TextareaContextValue } from "./Textarea.context";

/** Textarea 컴포넌트 Props (단일 or compound 모두 지원) */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: "small" | "medium" | "large" | "xlarge";
  state?: "disabled" | "loading";
  invalid?: boolean;
  block?: boolean;
  children?: React.ReactNode;
}

/** Control Props: compound 모드에서 실제 <textarea> */
export interface TextareaControlProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  state?: "disabled" | "loading";
  invalid?: boolean;
}

/** Slot(Prefix/Suffix) Props */
export type TextareaSlotProps = React.HTMLAttributes<HTMLSpanElement>;

/** 기본 props 값 */
const DEFAULT_PROPS = {
  size: "medium",
  block: false,
} as const;

const hasChildren = (children: React.ReactNode) =>
  React.Children.toArray(children).length > 0;

const TextareaRoot = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      size = DEFAULT_PROPS.size,
      state,
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

    const contextValue = React.useMemo<TextareaContextValue>(
      () => ({ size, state, invalid, block }),
      [size, state, invalid, block],
    );

    // 1) 단일 모드
    if (!compoundMode) {
      return (
        <TextareaContext.Provider value={contextValue}>
          <textarea
            ref={ref}
            disabled={isDisabled}
            aria-disabled={isDisabled || undefined}
            data-disabled={isDisabled || undefined}
            aria-invalid={invalid || undefined}
            data-invalid={invalid || undefined}
            className={clsx(
              "ui-textarea",
              `ui-textarea--${size}`,
              block && "ui-textarea--block",
              invalid && "ui-textarea--invalid",
              className,
            )}
            data-state={state}
            {...restProps}
          />
        </TextareaContext.Provider>
      );
    }

    // 2) Compound 모드
    return (
      <TextareaContext.Provider value={contextValue}>
        <div
          className={clsx(
            "ui-textarea__group",
            `ui-textarea__group--${size}`,
            block && "ui-textarea__group--block",
            invalid && "ui-textarea__group--invalid",
            className,
          )}
          data-state={state}
          aria-disabled={isDisabled || undefined}
          aria-invalid={invalid || undefined}
        >
          {children}
        </div>
      </TextareaContext.Provider>
    );
  },
);

TextareaRoot.displayName = "Textarea";

/** Compound: 실제 textarea */
const Control = React.forwardRef<HTMLTextAreaElement, TextareaControlProps>(
  (
    { state: stateProp, invalid: invalidProp, className, disabled, ...rest },
    ref,
  ) => {
    const ctx = React.useContext(TextareaContext);

    const state = stateProp ?? ctx?.state;
    const invalid = invalidProp ?? ctx?.invalid ?? false;
    const isDisabled = state === "disabled" || Boolean(disabled);

    return (
      <textarea
        ref={ref}
        className={clsx("ui-textarea__control", className)}
        disabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        aria-invalid={invalid || undefined}
        data-state={state}
        {...rest}
      />
    );
  },
);

Control.displayName = "Textarea.Control";

/** Compound: 왼쪽 슬롯 */
const Prefix = ({ className, ...props }: TextareaSlotProps) => (
  <span className={clsx("ui-textarea__prefix", className)} {...props} />
);
Prefix.displayName = "Textarea.Prefix";

/** Compound: 오른쪽 슬롯 */
const Suffix = ({ className, ...props }: TextareaSlotProps) => (
  <span className={clsx("ui-textarea__suffix", className)} {...props} />
);
Suffix.displayName = "Textarea.Suffix";

/** Textarea 컴포넌트 (단일 + compound 모드 지원) */
export const Textarea = Object.assign(TextareaRoot, {
  Control,
  Prefix,
  Suffix,
});
