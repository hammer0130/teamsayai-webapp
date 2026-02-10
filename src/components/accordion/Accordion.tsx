/* eslint-disable react-refresh/only-export-components */
import * as React from "react";

import * as RadixAccordion from "@radix-ui/react-accordion";
import clsx from "clsx";

import {
  AccordionContext,
  type AccordionContextValue,
} from "./Accordion.context";
import type {
  AccordionRootProps,
  AccordionItemProps,
  AccordionHeaderProps,
  AccordionTriggerProps,
  AccordionContentProps,
} from "./Accordion.types";

// ============ Default Props ============

const DEFAULT_PROPS = {
  size: "medium",
  variant: "line",
} as const;

// ============ Components ============

/** Accordion.Root - 아코디언 컨테이너 */
function Root({
  size = DEFAULT_PROPS.size,
  variant = DEFAULT_PROPS.variant,
  className,
  children,
  ...props
}: AccordionRootProps) {
  const contextValue = React.useMemo<AccordionContextValue>(
    () => ({ size, variant }),
    [size, variant],
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      <RadixAccordion.Root
        className={clsx(
          "ui-accordion",
          `ui-accordion--${size}`,
          `ui-accordion--${variant}`,
          className,
        )}
        {...props}
      >
        {children}
      </RadixAccordion.Root>
    </AccordionContext.Provider>
  );
}
Root.displayName = "Accordion.Root";

/** Accordion.Item - 아코디언 아이템 (헤더 + 컨텐츠 묶음) */
const Item = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, ...props }, ref) => (
    <RadixAccordion.Item
      ref={ref}
      className={clsx("ui-accordion__item", className)}
      {...props}
    />
  ),
);
Item.displayName = "Accordion.Item";

/** Accordion.Header - Trigger를 감싸는 헤더 (접근성용) */
const Header = React.forwardRef<HTMLHeadingElement, AccordionHeaderProps>(
  ({ className, ...props }, ref) => (
    <RadixAccordion.Header
      ref={ref}
      className={clsx("ui-accordion__header", className)}
      {...props}
    />
  ),
);
Header.displayName = "Accordion.Header";

/** Accordion.Trigger - 열기/닫기 트리거 버튼 */
const Trigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const ctx = React.useContext(AccordionContext);

    return (
      <RadixAccordion.Trigger
        ref={ref}
        className={clsx(
          "ui-accordion__trigger",
          ctx?.size && `ui-accordion__trigger--${ctx.size}`,
          ctx?.variant && `ui-accordion__trigger--${ctx.variant}`,
          className,
        )}
        {...props}
      >
        {children}
      </RadixAccordion.Trigger>
    );
  },
);
Trigger.displayName = "Accordion.Trigger";

/** Accordion.Content - 접히는 컨텐츠 영역 */
const Content = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, forceMount, ...props }, ref) => (
    <RadixAccordion.Content
      ref={ref}
      className={clsx("ui-accordion__content", className)}
      forceMount={forceMount}
      {...props}
    >
      {children}
    </RadixAccordion.Content>
  ),
);
Content.displayName = "Accordion.Content";

// ============ Export ============

/** Accordion 컴포넌트 (Compound 패턴) - Radix Accordion 기반 */
export const Accordion = {
  Root,
  Item,
  Header,
  Trigger,
  Content,
};
