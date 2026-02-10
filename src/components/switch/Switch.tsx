import * as React from "react";

import * as RadixSwitch from "@radix-ui/react-switch";
import clsx from "clsx";

import type { CheckableOptions } from "@/types/component-api";

import { SwitchContext, type SwitchContextValue } from "./Switch.context";

export type SwitchRootProps = React.ComponentPropsWithoutRef<
  typeof RadixSwitch.Root
> &
  CheckableOptions;

export type SwitchThumbProps = React.ComponentPropsWithoutRef<
  typeof RadixSwitch.Thumb
>;

const DEFAULT_PROPS = {
  invalid: false,
} as const;

const Root = React.forwardRef<HTMLButtonElement, SwitchRootProps>(
  (
    {
      state,
      className,
      children,
      invalid: invalidProp = DEFAULT_PROPS.invalid,
      ...props
    },
    ref,
  ) => {
    const isDisabled = state === "disabled";

    const contextValue = React.useMemo<SwitchContextValue>(
      () => ({ state, invalid: invalidProp }),
      [state, invalidProp],
    );

    return (
      <SwitchContext.Provider value={contextValue}>
        <RadixSwitch.Root
          ref={ref}
          disabled={isDisabled}
          aria-disabled={isDisabled || undefined}
          aria-invalid={invalidProp || undefined}
          data-disabled={isDisabled || undefined}
          data-invalid={invalidProp || undefined}
          className={clsx("ui-switch", className)}
          {...props}
        >
          {children}
        </RadixSwitch.Root>
      </SwitchContext.Provider>
    );
  },
);

Root.displayName = "Switch.Root";

const Thumb = React.forwardRef<HTMLSpanElement, SwitchThumbProps>(
  ({ className, children, ...props }, ref) => (
    <RadixSwitch.Thumb
      ref={ref}
      className={clsx("ui-switch__thumb", className)}
      {...props}
    >
      {children}
    </RadixSwitch.Thumb>
  ),
);
Thumb.displayName = "Switch.Thumb";

/** Switch 컴포넌트 (Compound 패턴) */
export const Switch = {
  Root,
  Thumb,
};
