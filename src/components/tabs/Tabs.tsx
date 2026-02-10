/* eslint-disable react-refresh/only-export-components */
import * as React from "react";

import * as RadixTabs from "@radix-ui/react-tabs";
import clsx from "clsx";

import { TabsContext, type TabsContextValue } from "./Tabs.context";
import type {
  TabsRootProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
} from "./Tabs.types";

// ============ Default Props ============

const DEFAULT_PROPS = {
  size: "medium",
  variant: "line",
} as const;

// ============ Components ============

/** Tabs.Root - Tabs 컨테이너 */
function Root({
  size = DEFAULT_PROPS.size,
  variant = DEFAULT_PROPS.variant,
  className,
  children,
  ...props
}: TabsRootProps) {
  const contextValue = React.useMemo<TabsContextValue>(
    () => ({ size, variant }),
    [size, variant],
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <RadixTabs.Root
        className={clsx(
          "ui-tabs",
          `ui-tabs--${size}`,
          `ui-tabs--${variant}`,
          className,
        )}
        {...props}
      >
        {children}
      </RadixTabs.Root>
    </TabsContext.Provider>
  );
}
Root.displayName = "Tabs.Root";

/** Tabs.List - 탭 트리거 목록 */
const List = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, ...props }, ref) => {
    const ctx = React.useContext(TabsContext);

    return (
      <RadixTabs.List
        ref={ref}
        className={clsx(
          "ui-tabs__list",
          ctx?.variant && `ui-tabs__list--${ctx.variant}`,
          className,
        )}
        {...props}
      >
        {children}
      </RadixTabs.List>
    );
  },
);
List.displayName = "Tabs.List";

/** Tabs.Trigger - 개별 탭 트리거 버튼 */
const Trigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const ctx = React.useContext(TabsContext);

    return (
      <RadixTabs.Trigger
        ref={ref}
        className={clsx(
          "ui-tabs__trigger",
          ctx?.size && `ui-tabs__trigger--${ctx.size}`,
          ctx?.variant && `ui-tabs__trigger--${ctx.variant}`,
          className,
        )}
        {...props}
      >
        {children}
      </RadixTabs.Trigger>
    );
  },
);
Trigger.displayName = "Tabs.Trigger";

/** Tabs.Content - 탭 컨텐츠 패널 */
const Content = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, children, forceMount, ...props }, ref) => (
    <RadixTabs.Content
      ref={ref}
      className={clsx("ui-tabs__content", className)}
      forceMount={forceMount}
      {...props}
    >
      {children}
    </RadixTabs.Content>
  ),
);
Content.displayName = "Tabs.Content";

// ============ Export ============

/** Tabs 컴포넌트 (Compound 패턴) */
export const Tabs = {
  Root,
  List,
  Trigger,
  Content,
};
