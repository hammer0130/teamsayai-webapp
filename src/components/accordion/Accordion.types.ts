import * as RadixAccordion from "@radix-ui/react-accordion";

import type { Size } from "@/types/component-api";

export type AccordionVariant = "line" | "enclosed" | "soft";

/** Accordion.Root Props - Radix Accordion Root + 디자인시스템 옵션 */
export type AccordionRootProps = React.ComponentPropsWithoutRef<
  typeof RadixAccordion.Root
> & {
  /** 사이즈 */
  size?: Size;
  /** 스타일 변형 */
  variant?: AccordionVariant;
};

/** Accordion.Item Props */
export interface AccordionItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** 아이템 값 (필수) */
  value: string;
  /** 비활성화 */
  disabled?: boolean;
}

/** Accordion.Header Props - Trigger를 감싸는 헤더 */
export interface AccordionHeaderProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  /** asChild 시 자식 요소가 헤더 역할 */
  asChild?: boolean;
}

/** Accordion.Trigger Props */
export interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** asChild 시 자식 요소가 트리거 역할 */
  asChild?: boolean;
}

/** Accordion.Content Props */
export interface AccordionContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** 강제 마운트 (애니메이션 등) */
  forceMount?: true;
  /** asChild 시 자식 요소가 컨텐츠 역할 */
  asChild?: boolean;
}
