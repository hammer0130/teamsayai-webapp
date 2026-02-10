import * as React from "react";

import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import clsx from "clsx";

import type { CheckableOptions } from "@/types/component-api";

import { CheckboxContext, type CheckboxContextValue } from "./Checkbox.context";

/** Checkbox.Root Props */
export type CheckboxRootProps = Omit<
  React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root>,
  "asChild"
> &
  CheckableOptions;

/** Checkbox.Indicator Props */
export type CheckboxIndicatorProps = React.ComponentPropsWithoutRef<
  typeof RadixCheckbox.Indicator
>;

const DEFAULT_PROPS = {
  invalid: false,
} as const;

/** Checkbox.Root - 체크박스 컨테이너 */
const Root = React.forwardRef<HTMLButtonElement, CheckboxRootProps>(
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

    const contextValue = React.useMemo<CheckboxContextValue>(
      () => ({ state, invalid: invalidProp }),
      [state, invalidProp],
    );

    return (
      <CheckboxContext.Provider value={contextValue}>
        <RadixCheckbox.Root
          ref={ref}
          disabled={isDisabled}
          aria-disabled={isDisabled || undefined}
          aria-invalid={invalidProp || undefined}
          data-disabled={isDisabled || undefined}
          data-invalid={invalidProp || undefined}
          className={clsx("ui-checkbox", className)}
          {...props}
        >
          {children}
        </RadixCheckbox.Root>
      </CheckboxContext.Provider>
    );
  },
);
Root.displayName = "Checkbox.Root";

/** Checkbox.Indicator - 체크 표시 영역 */
const Indicator = React.forwardRef<HTMLSpanElement, CheckboxIndicatorProps>(
  ({ className, children, ...props }, ref) => (
    <RadixCheckbox.Indicator
      ref={ref}
      className={clsx("ui-checkbox__indicator", className)}
      {...props}
    >
      {children ?? <CheckIcon />}
    </RadixCheckbox.Indicator>
  ),
);
Indicator.displayName = "Checkbox.Indicator";

/** Checkbox 컴포넌트 (Compound 패턴) */
export const Checkbox = {
  Root,
  Indicator,
  CheckIcon,
};
