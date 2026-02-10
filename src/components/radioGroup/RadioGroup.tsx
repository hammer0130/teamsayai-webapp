import * as React from "react";

import * as RadixRadioGroup from "@radix-ui/react-radio-group";
import clsx from "clsx";

import type { CheckableOptions } from "@/types/component-api";

import {
  RadioGroupContext,
  type RadioGroupContextValue,
} from "./RadioGroup.context";

/** RadioGroup.Root Props */
export type RadioGroupRootProps = Omit<
  React.ComponentPropsWithoutRef<typeof RadixRadioGroup.Root>,
  "asChild"
> &
  CheckableOptions;

const DEFAULT_PROPS = {
  invalid: false,
} as const;

export type RadioGroupItemProps = React.ComponentPropsWithoutRef<
  typeof RadixRadioGroup.Item
>;

export type RadioGroupIndicatorProps = React.ComponentPropsWithoutRef<
  typeof RadixRadioGroup.Indicator
>;

const Root = React.forwardRef<HTMLDivElement, RadioGroupRootProps>(
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

    const contextValue = React.useMemo<RadioGroupContextValue>(
      () => ({ state, invalid: invalidProp }),
      [state, invalidProp],
    );

    return (
      <RadioGroupContext.Provider value={contextValue}>
        <RadixRadioGroup.Root
          ref={ref}
          disabled={isDisabled}
          className={clsx("ui-radio-group", className)}
          data-disabled={isDisabled || undefined}
          data-invalid={invalidProp || undefined}
          aria-disabled={isDisabled || undefined}
          aria-invalid={invalidProp || undefined}
          {...props}
        >
          {children}
        </RadixRadioGroup.Root>
      </RadioGroupContext.Provider>
    );
  },
);

Root.displayName = "RadioGroup";

const Item = React.forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ className, children, ...props }, ref) => {
    const ctx = React.useContext(RadioGroupContext);
    const invalid = ctx?.invalid ?? false;

    return (
      <RadixRadioGroup.Item
        ref={ref}
        className={clsx("ui-radio-group__item", className)}
        data-invalid={invalid || undefined}
        {...props}
      >
        {children}
      </RadixRadioGroup.Item>
    );
  },
);

Item.displayName = "RadioGroup.Item";

const Indicator = React.forwardRef<HTMLDivElement, RadioGroupIndicatorProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <RadixRadioGroup.Indicator
        ref={ref}
        className={clsx("ui-radio-group__indicator", className)}
        {...props}
      >
        {children}
      </RadixRadioGroup.Indicator>
    );
  },
);

Indicator.displayName = "RadioGroup.Indicator";

export const RadioGroup = {
  Root,
  Item,
  Indicator,
};
