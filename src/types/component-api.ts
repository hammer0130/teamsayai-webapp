export type Intent =
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "info"
  | "warning"
  | "danger";
export type Variant = "fill" | "weak" | "solid" | "outline" | "ghost" | "link";
export type Size = "xsmall" | "small" | "medium" | "large" | "xlarge";
export type State = "disabled" | "loading";

export type ButtonOptions = {
  intent?: Intent;
  size?: Size;
  variant?: Variant;
  state?: State;
};

export type InputOptions = {
  size?: Size;
  state?: State;
  invalid?: boolean;
  block?: boolean;
};

// Checkbox / Radio / Switch 같이 사용 할 수 있는 공통 옵션
export type CheckableOptions = {
  size?: Size;
  state?: State;
  invalid?: boolean;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
};

// Select 컴포넌트 옵션
export type SelectOptions = {
  size?: Size;
  state?: State;
  invalid?: boolean;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
};

// Textarea 컴포넌트 옵션
export type TextareaOptions = {
  size?: Size;
  state?: State;
  invalid?: boolean;
  block?: boolean;
};

export type TabsOptions = {
  size?: Size;
  variant?: "line" | "enclosed" | "soft";
};

export type AccordionOptions = {
  size?: Size;
  variant?: "line" | "enclosed" | "soft";
};

// Dialog / AlertDialog 등 열림 상태를 제어하는 모달형 컴포넌트 공통 옵션
export type OpenableRootOptions = {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Dialog 전용: false면 모달이 아닌 non-modal로 동작 (AlertDialog는 항상 modal) */
  modal?: boolean;
};

export type AlertDialogOptions = OpenableRootOptions;
export type DialogOptions = OpenableRootOptions;

export type ToastSwipeDirection =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type ToastOptions = {
  duration?: number;
  label?: string;
  /** 뷰포트 위치 + 스와이프 방향. top/bottom-left → left, top/bottom-right → right, *-center → right */
  swipeDirection?: ToastSwipeDirection;
  swipeThreshold?: number;
};
