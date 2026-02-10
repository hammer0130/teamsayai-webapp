import type * as RadixSelect from "@radix-ui/react-select";

import type { SelectOptions } from "@/types/component-api";

/** Select.Root Props */
export type SelectRootProps = React.ComponentPropsWithoutRef<
  typeof RadixSelect.Root
> &
  SelectOptions;

/** Select.Trigger Props */
export type SelectTriggerProps = React.ComponentPropsWithoutRef<
  typeof RadixSelect.Trigger
>;

/** Select.Value Props */
export type SelectValueProps = React.ComponentPropsWithoutRef<
  typeof RadixSelect.Value
>;

/** Select.Icon Props */
export type SelectIconProps = React.ComponentPropsWithoutRef<
  typeof RadixSelect.Icon
>;

/** Select.Portal Props */
export type SelectPortalProps = React.ComponentPropsWithoutRef<
  typeof RadixSelect.Portal
>;

/** Select.Content Props */
export type SelectContentProps = React.ComponentPropsWithoutRef<
  typeof RadixSelect.Content
>;

/** Select.Viewport Props */
export type SelectViewportProps = React.ComponentPropsWithoutRef<
  typeof RadixSelect.Viewport
>;

/** Select.Item Props */
export type SelectItemProps = React.ComponentPropsWithoutRef<
  typeof RadixSelect.Item
>;

/** Select.ItemText Props */
export type SelectItemTextProps = React.ComponentPropsWithoutRef<
  typeof RadixSelect.ItemText
>;

/** Select.ItemIndicator Props */
export type SelectItemIndicatorProps = React.ComponentPropsWithoutRef<
  typeof RadixSelect.ItemIndicator
>;

/** Select.Group Props */
export type SelectGroupProps = React.ComponentPropsWithoutRef<
  typeof RadixSelect.Group
>;

/** Select.Label Props */
export type SelectLabelProps = React.ComponentPropsWithoutRef<
  typeof RadixSelect.Label
>;

/** Select.Separator Props */
export type SelectSeparatorProps = React.ComponentPropsWithoutRef<
  typeof RadixSelect.Separator
>;

/** Select.ScrollUpButton Props */
export type SelectScrollUpButtonProps = React.ComponentPropsWithoutRef<
  typeof RadixSelect.ScrollUpButton
>;

/** Select.ScrollDownButton Props */
export type SelectScrollDownButtonProps = React.ComponentPropsWithoutRef<
  typeof RadixSelect.ScrollDownButton
>;
