"use client";

import * as React from "react";

import clsx from "clsx";

import {
  type Size,
  type Color,
  type Variant,
  type Shape,
  ButtonContext,
} from "./Button.context";

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
      size = "medium",
      color = "primary",
      variant = "fill",
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
          <span className="ui-button-bg"></span>
          <span className="ui-button__content">{children}</span>
          <span className="ui-button-press"></span>
        </button>
      </ButtonContext.Provider>
    );
  },
);

Button.displayName = "Button";

export { Button };
