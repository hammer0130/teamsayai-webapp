import * as React from "react";

import clsx from "clsx";

import { TextareaContext, type TextareaContextValue } from "./Textarea.context";

/**
 * Textarea 컴포넌트 Props (단일 or compound 모두 지원)
 * Radix와 동일: 제어는 value + onValueChange, 비제어는 defaultValue + onValueChange
 */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: "small" | "medium" | "large" | "xlarge";
  state?: "disabled" | "loading";
  invalid?: boolean;
  block?: boolean;
  /** 글자 수 카운트 표시 여부 */
  showCount?: boolean;
  children?: React.ReactNode;
  /** Radix 스타일: 값 변경 시 (value: string) 전달. value(defaultValue)와 함께 사용 */
  onValueChange?: (value: string) => void;
}

/** Control Props: compound 모드에서 실제 <textarea> */
export interface TextareaControlProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  state?: "disabled" | "loading";
  invalid?: boolean;
  onValueChange?: (value: string) => void;
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
      showCount = false,
      maxLength,
      className,
      children,
      value,
      defaultValue,
      onChange,
      onValueChange,
      ...restProps
    },
    ref,
  ) => {
    const compoundMode = hasChildren(children);
    const isDisabled = state === "disabled";

    // 글자 수 트래킹 (단일 모드에서만 사용)
    const [charCount, setCharCount] = React.useState(() => {
      if (value != null) return String(value).length;
      if (defaultValue != null) return String(defaultValue).length;
      return 0;
    });

    // controlled value 변경 추적
    React.useEffect(() => {
      if (value != null) {
        setCharCount(String(value).length);
      }
    }, [value]);

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCharCount(e.target.value.length);
        onChange?.(e);
        onValueChange?.(e.target.value);
      },
      [onChange, onValueChange],
    );

    const isOverLimit = maxLength != null && charCount > maxLength;
    const isInvalid = invalid || isOverLimit;

    const contextValue = React.useMemo<TextareaContextValue>(
      () => ({
        size,
        invalid: isInvalid,
        block,
        ...(state !== undefined && { state }),
      }),
      [size, state, isInvalid, block],
    );

    const countElement = showCount ? (
      <span
        className={clsx(
          "ui-textarea__count",
          isOverLimit && "ui-textarea__count--over",
        )}
      >
        {charCount}
        {maxLength != null && `/${maxLength}`}
      </span>
    ) : null;

    // 1) 단일 모드
    if (!compoundMode) {
      const textarea = (
        <textarea
          ref={ref}
          disabled={isDisabled}
          aria-disabled={isDisabled || undefined}
          data-disabled={isDisabled || undefined}
          aria-invalid={isInvalid || undefined}
          data-invalid={isInvalid || undefined}
          className={clsx(
            "ui-textarea",
            `ui-textarea--${size}`,
            block && "ui-textarea--block",
            isInvalid && "ui-textarea--invalid",
            className,
          )}
          data-state={state}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          maxLength={showCount ? undefined : maxLength}
          {...restProps}
        />
      );

      if (showCount) {
        return (
          <TextareaContext.Provider value={contextValue}>
            <div
              className={clsx(
                "ui-textarea__wrapper",
                block && "ui-textarea__wrapper--block",
              )}
            >
              {textarea}
              {countElement}
            </div>
          </TextareaContext.Provider>
        );
      }

      return (
        <TextareaContext.Provider value={contextValue}>
          {textarea}
        </TextareaContext.Provider>
      );
    }

    // 2) Compound 모드
    return (
      <TextareaContext.Provider value={contextValue}>
        <div
          className={clsx(
            "ui-textarea__wrapper",
            block && "ui-textarea__wrapper--block",
          )}
        >
          <div
            className={clsx(
              "ui-textarea__group",
              `ui-textarea__group--${size}`,
              block && "ui-textarea__group--block",
              isInvalid && "ui-textarea__group--invalid",
              className,
            )}
            data-state={state}
            aria-disabled={isDisabled || undefined}
            aria-invalid={isInvalid || undefined}
          >
            {children}
          </div>
          {countElement}
        </div>
      </TextareaContext.Provider>
    );
  },
);

TextareaRoot.displayName = "Textarea";

/** Compound: 실제 textarea */
const Control = React.forwardRef<HTMLTextAreaElement, TextareaControlProps>(
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
    const ctx = React.useContext(TextareaContext);

    const state = stateProp ?? ctx?.state;
    const invalid = invalidProp ?? ctx?.invalid ?? false;
    const isDisabled = state === "disabled" || Boolean(disabled);

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e);
        onValueChange?.(e.target.value);
      },
      [onChange, onValueChange],
    );

    return (
      <textarea
        ref={ref}
        className={clsx("ui-textarea__control", className)}
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
