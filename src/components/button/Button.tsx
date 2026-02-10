import * as React from "react";

import clsx from "clsx";

import type { Intent, Variant, Size, State } from "@/types/component-api";

import { ButtonContext, type ButtonContextValue } from "./Button.context";

/** Button 컴포넌트 Props */
export interface ButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "color"
> {
  intent?: Intent;
  variant?: Variant;
  size?: Size;
  state?: State;
  /** 전체 너비로 확장 */
  block?: boolean;
  /** 아이콘 전용 버튼 (정사각형) */
  iconOnly?: boolean;
}

/** Slot Props (Icon, Label) */
export type ButtonSlotProps = React.HTMLAttributes<HTMLSpanElement>;

/** 기본 props 값 */
const DEFAULT_PROPS = {
  size: "medium",
  intent: "primary",
  variant: "fill",
  type: "button",
  block: false,
  iconOnly: false,
} as const;

/** children이 compound 컴포넌트인지 확인 */
const isCompoundMode = (children: React.ReactNode): boolean => {
  const childArray = React.Children.toArray(children);
  return childArray.some(
    (child) =>
      React.isValidElement(child) &&
      (child.type === Icon ||
        child.type === Label ||
        child.type === Prefix ||
        child.type === Suffix),
  );
};

const ButtonRoot = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = DEFAULT_PROPS.size,
      intent = DEFAULT_PROPS.intent,
      variant = DEFAULT_PROPS.variant,
      state,
      type = DEFAULT_PROPS.type,
      block = DEFAULT_PROPS.block,
      iconOnly = DEFAULT_PROPS.iconOnly,
      className,
      children,
      ...restProps
    },
    ref,
  ) => {
    const isDisabled = state === "disabled" || state === "loading";
    const compoundMode = isCompoundMode(children);

    const contextValue = React.useMemo<ButtonContextValue>(
      () =>
        state === undefined
          ? { size, intent, variant }
          : { size, intent, variant, state },
      [size, intent, variant, state],
    );

    return (
      <ButtonContext.Provider value={contextValue}>
        <button
          ref={ref}
          type={type}
          disabled={isDisabled}
          aria-disabled={isDisabled}
          data-disabled={isDisabled || undefined}
          data-loading={isDisabled || undefined}
          aria-busy={state === "loading"}
          className={clsx(
            "ui-button",
            `ui-button--${size}`,
            `ui-button--${intent}`,
            `ui-button--${variant}`,
            block && "ui-button--block",
            iconOnly && "ui-button--icon-only",
            className,
          )}
          data-state={state}
          {...restProps}
        >
          <span className="ui-button__bg" />
          <span className="ui-button__content">
            {compoundMode ? children : children}
          </span>
          <span className="ui-button__press" />
        </button>
      </ButtonContext.Provider>
    );
  },
);

ButtonRoot.displayName = "Button";

/** Button.Icon - 아이콘 슬롯 */
const Icon = ({ className, ...props }: ButtonSlotProps) => (
  <span className={clsx("ui-button__icon", className)} {...props} />
);
Icon.displayName = "Button.Icon";

/** Button.Label - 텍스트 레이블 */
const Label = ({ className, ...props }: ButtonSlotProps) => (
  <span className={clsx("ui-button__label", className)} {...props} />
);
Label.displayName = "Button.Label";

/** Button.Prefix - 왼쪽 슬롯 (아이콘) */
const Prefix = ({ className, ...props }: ButtonSlotProps) => (
  <span className={clsx("ui-button__prefix", className)} {...props} />
);
Prefix.displayName = "Button.Prefix";

/** Button.Suffix - 오른쪽 슬롯 (아이콘) */
const Suffix = ({ className, ...props }: ButtonSlotProps) => (
  <span className={clsx("ui-button__suffix", className)} {...props} />
);
Suffix.displayName = "Button.Suffix";

/** Button.Spinner - 로딩 스피너 */
const Spinner = ({ className, ...props }: ButtonSlotProps) => (
  <span className={clsx("ui-button__spinner", className)} {...props}>
    <svg
      className="ui-button__spinner-icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="ui-button__spinner-track"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.25"
      />
      <path
        className="ui-button__spinner-indicator"
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  </span>
);
Spinner.displayName = "Button.Spinner";

/** Button 컴포넌트 (단일 + compound 모드 지원) */
export const Button = Object.assign(ButtonRoot, {
  Icon,
  Label,
  Prefix,
  Suffix,
  Spinner,
});
