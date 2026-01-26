"use client";

import * as React from "react";

import clsx from "clsx";

import { ButtonContext } from "./Button.context";

type Size = "sm" | "md" | "lg";
type Color = "default" | "primary" | "secondary" | "tertiary" | "danger";
type Variant = "solid" | "outline" | "ghost" | "link";
type Shape = "square" | "rounded";

type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "color"
> & {
  size?: Size;
  color?: Color;
  variant?: Variant;
  shape?: Shape;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = "md",
      color = "default",
      variant = "solid",
      shape = "rounded",
      disabled = false,
      className,
      style,
      children,
      ...buttonProps
    },
    ref,
  ) => {
    const contextValue = React.useMemo(
      () => ({ size, color, variant, shape, disabled }),
      [size, color, variant, shape, disabled],
    );

    return (
      <ButtonContext.Provider value={contextValue}>
        <button
          ref={ref}
          disabled={disabled}
          className={clsx("ui-button", className)}
          style={style}
          data-size={size}
          data-color={color}
          data-variant={variant}
          data-shape={shape}
          {...buttonProps}
        >
          <span className="ui-button__content">{children}</span>
        </button>
      </ButtonContext.Provider>
    );
  },
);

Button.displayName = "Button";

export { Button };
