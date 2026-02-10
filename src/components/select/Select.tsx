/* eslint-disable react-refresh/only-export-components */
import * as React from "react";

import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import * as RadixSelect from "@radix-ui/react-select";
import clsx from "clsx";

import { SelectContext, type SelectContextValue } from "./Select.context";
import type {
  SelectRootProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectIconProps,
  SelectPortalProps,
  SelectContentProps,
  SelectViewportProps,
  SelectItemProps,
  SelectItemTextProps,
  SelectItemIndicatorProps,
  SelectGroupProps,
  SelectLabelProps,
  SelectSeparatorProps,
  SelectScrollUpButtonProps,
  SelectScrollDownButtonProps,
} from "./Select.types";

// ============ Default Props ============

const DEFAULT_PROPS = {
  invalid: false,
} as const;

// ============ Components ============

/** Select.Root - Select 컨테이너 */
function Root({
  state,
  invalid: invalidProp = DEFAULT_PROPS.invalid,
  children,
  ...props
}: SelectRootProps) {
  const isDisabled = state === "disabled";

  const contextValue = React.useMemo<SelectContextValue>(
    () => ({ state, invalid: invalidProp }),
    [state, invalidProp],
  );

  return (
    <SelectContext.Provider value={contextValue}>
      <RadixSelect.Root disabled={isDisabled} {...props}>
        {children}
      </RadixSelect.Root>
    </SelectContext.Provider>
  );
}
Root.displayName = "Select.Root";

/** Select.Trigger - Select 트리거 버튼 */
const Trigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const ctx = React.useContext(SelectContext);
    const isDisabled = ctx?.state === "disabled";
    const invalid = ctx?.invalid ?? false;

    return (
      <RadixSelect.Trigger
        ref={ref}
        className={clsx("ui-select__trigger", className)}
        data-disabled={isDisabled || undefined}
        data-invalid={invalid || undefined}
        {...props}
      >
        {children}
      </RadixSelect.Trigger>
    );
  },
);
Trigger.displayName = "Select.Trigger";

/** Select.Value - 선택된 값 표시 */
const Value = React.forwardRef<HTMLSpanElement, SelectValueProps>(
  ({ className, ...props }, ref) => (
    <RadixSelect.Value
      ref={ref}
      className={clsx("ui-select__value", className)}
      {...props}
    />
  ),
);
Value.displayName = "Select.Value";

/** Select.Icon - 트리거 아이콘 */
const Icon = React.forwardRef<HTMLSpanElement, SelectIconProps>(
  ({ className, children, ...props }, ref) => (
    <RadixSelect.Icon
      ref={ref}
      className={clsx("ui-select__icon", className)}
      {...props}
    >
      {children ?? <ChevronDownIcon />}
    </RadixSelect.Icon>
  ),
);
Icon.displayName = "Select.Icon";

/** Select.Portal - 포털 컨테이너 */
function Portal(props: SelectPortalProps) {
  return <RadixSelect.Portal {...props} />;
}
Portal.displayName = "Select.Portal";

/** Select.Content - 드롭다운 컨텐츠 */
const Content = React.forwardRef<HTMLDivElement, SelectContentProps>(
  (
    { className, children, position = "popper", sideOffset = 4, ...props },
    ref,
  ) => (
    <RadixSelect.Content
      ref={ref}
      className={clsx("ui-select__content", className)}
      position={position}
      sideOffset={sideOffset}
      {...props}
    >
      {children}
    </RadixSelect.Content>
  ),
);
Content.displayName = "Select.Content";

/** Select.Viewport - 스크롤 영역 */
const Viewport = React.forwardRef<HTMLDivElement, SelectViewportProps>(
  ({ className, ...props }, ref) => (
    <RadixSelect.Viewport
      ref={ref}
      className={clsx("ui-select__viewport", className)}
      {...props}
    />
  ),
);
Viewport.displayName = "Select.Viewport";

/** Select.Item - 개별 아이템 */
const Item = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, children, ...props }, ref) => (
    <RadixSelect.Item
      ref={ref}
      className={clsx("ui-select__item", className)}
      {...props}
    >
      {children}
    </RadixSelect.Item>
  ),
);
Item.displayName = "Select.Item";

/** Select.ItemText - 아이템 텍스트 */
const ItemText = React.forwardRef<HTMLSpanElement, SelectItemTextProps>(
  ({ className, ...props }, ref) => (
    <RadixSelect.ItemText
      ref={ref}
      className={clsx("ui-select__item-text", className)}
      {...props}
    />
  ),
);
ItemText.displayName = "Select.ItemText";

/** Select.ItemIndicator - 선택된 아이템 표시 */
const ItemIndicator = React.forwardRef<
  HTMLSpanElement,
  SelectItemIndicatorProps
>(({ className, children, ...props }, ref) => (
  <RadixSelect.ItemIndicator
    ref={ref}
    className={clsx("ui-select__item-indicator", className)}
    {...props}
  >
    {children ?? <CheckIcon />}
  </RadixSelect.ItemIndicator>
));
ItemIndicator.displayName = "Select.ItemIndicator";

/** Select.Group - 아이템 그룹 */
const Group = React.forwardRef<HTMLDivElement, SelectGroupProps>(
  ({ className, ...props }, ref) => (
    <RadixSelect.Group
      ref={ref}
      className={clsx("ui-select__group", className)}
      {...props}
    />
  ),
);
Group.displayName = "Select.Group";

/** Select.Label - 그룹 라벨 */
const Label = React.forwardRef<HTMLDivElement, SelectLabelProps>(
  ({ className, ...props }, ref) => (
    <RadixSelect.Label
      ref={ref}
      className={clsx("ui-select__label", className)}
      {...props}
    />
  ),
);
Label.displayName = "Select.Label";

/** Select.Separator - 구분선 */
const Separator = React.forwardRef<HTMLDivElement, SelectSeparatorProps>(
  ({ className, ...props }, ref) => (
    <RadixSelect.Separator
      ref={ref}
      className={clsx("ui-select__separator", className)}
      {...props}
    />
  ),
);
Separator.displayName = "Select.Separator";

/** Select.ScrollUpButton - 위로 스크롤 버튼 */
const ScrollUpButton = React.forwardRef<
  HTMLDivElement,
  SelectScrollUpButtonProps
>(({ className, children, ...props }, ref) => (
  <RadixSelect.ScrollUpButton
    ref={ref}
    className={clsx("ui-select__scroll-button", className)}
    {...props}
  >
    {children ?? <ChevronUpIcon />}
  </RadixSelect.ScrollUpButton>
));
ScrollUpButton.displayName = "Select.ScrollUpButton";

/** Select.ScrollDownButton - 아래로 스크롤 버튼 */
const ScrollDownButton = React.forwardRef<
  HTMLDivElement,
  SelectScrollDownButtonProps
>(({ className, children, ...props }, ref) => (
  <RadixSelect.ScrollDownButton
    ref={ref}
    className={clsx("ui-select__scroll-button", className)}
    {...props}
  >
    {children ?? <ChevronDownIcon />}
  </RadixSelect.ScrollDownButton>
));
ScrollDownButton.displayName = "Select.ScrollDownButton";

// ============ Export ============

/** Select 컴포넌트 (Compound 패턴) */
export const Select = {
  Root,
  Trigger,
  Value,
  Icon,
  Portal,
  Content,
  Viewport,
  Item,
  ItemText,
  ItemIndicator,
  Group,
  Label,
  Separator,
  ScrollUpButton,
  ScrollDownButton,
};
