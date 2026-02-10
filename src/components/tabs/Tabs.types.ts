import type { Size } from "@/types/component-api";

export type TabsVariant = "line" | "enclosed" | "soft";

/** Tabs.Root Props */
export interface TabsRootProps {
  /** 사이즈 */
  size?: Size;
  /** 스타일 변형 */
  variant?: TabsVariant;
  /** 기본 선택 값 (비제어) */
  defaultValue?: string;
  /** 선택된 값 (제어) */
  value?: string;
  /** 값 변경 핸들러 */
  onValueChange?: (value: string) => void;
  /** 탭 방향 */
  orientation?: "horizontal" | "vertical";
  /** 탭 방향 (RTL 지원) */
  dir?: "ltr" | "rtl";
  /** 활성화 모드 */
  activationMode?: "automatic" | "manual";
  className?: string;
  children?: React.ReactNode;
}

/** Tabs.List Props */
export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 키보드 네비게이션 루프 여부 */
  loop?: boolean;
}

/** Tabs.Trigger Props */
export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 탭 값 (필수) */
  value: string;
}

/** Tabs.Content Props */
export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 탭 값 (필수) */
  value: string;
  /** 강제 마운트 */
  forceMount?: true;
}
