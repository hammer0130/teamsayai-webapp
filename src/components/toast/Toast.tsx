/* eslint-disable react-refresh/only-export-components */
import * as React from "react";

import { Cross2Icon } from "@radix-ui/react-icons";
import * as RadixToast from "@radix-ui/react-toast";
import clsx from "clsx";

import {
  ToastContext,
  useToastContext,
  type ToastContextValue,
} from "./Toast.context";
import type {
  ToastProviderProps,
  ToastViewportProps,
  ToastRootProps,
  ToastTitleProps,
  ToastDescriptionProps,
  ToastActionProps,
  ToastCloseProps,
} from "./Toast.types";

/** Radix는 left | right | up | down 만 허용. 6가지 위치 → left/right 로 매핑 */
function mapSwipeDirectionToRadix(
  dir: ToastProviderProps["swipeDirection"],
): "left" | "right" | "up" | "down" {
  if (
    !dir ||
    dir === "top-right" ||
    dir === "top-center" ||
    dir === "bottom-right" ||
    dir === "bottom-center"
  )
    return "right";
  return "left"; // top-left, bottom-left
}

// ============ Components ============

/** Toast.Provider - 토스트 컨테이너 (앱 최상단 등에서 한 번만 감싸기) */
function Provider({
  className,
  duration,
  label,
  swipeDirection,
  swipeThreshold,
  children,
  ...props
}: ToastProviderProps) {
  const contextValue = React.useMemo<ToastContextValue>(
    () => ({
      duration,
      label,
      swipeDirection,
      swipeThreshold,
    }),
    [duration, label, swipeDirection, swipeThreshold],
  );

  const radixSwipeDirection = mapSwipeDirectionToRadix(swipeDirection);

  return (
    <ToastContext.Provider value={contextValue}>
      <div className={clsx("ui-toast", className)}>
        <RadixToast.Provider
          duration={duration}
          label={label}
          swipeDirection={radixSwipeDirection}
          swipeThreshold={swipeThreshold}
          {...props}
        >
          {children}
        </RadixToast.Provider>
      </div>
    </ToastContext.Provider>
  );
}
Provider.displayName = "Toast.Provider";

const VIEWPORT_POSITION_DEFAULT = "top-right" as const;

/** Toast.Viewport - 토스트가 렌더되는 고정 영역. 위치는 Provider의 swipeDirection(context) 사용 */
const Viewport = React.forwardRef<HTMLOListElement, ToastViewportProps>(
  ({ className, ...props }, ref) => {
    const ctx = useToastContext("Toast.Viewport");
    const position = ctx.swipeDirection ?? VIEWPORT_POSITION_DEFAULT;
    return (
      <RadixToast.Viewport
        ref={ref}
        className={clsx(
          "ui-toast__viewport",
          `ui-toast__viewport--${position}`,
          className,
        )}
        {...props}
      />
    );
  },
);
Viewport.displayName = "Toast.Viewport";

/** Toast.Root - 개별 토스트 (자동으로 duration 후 닫힘) */
const Root = React.forwardRef<HTMLLIElement, ToastRootProps>(
  ({ className, ...props }, ref) => (
    <RadixToast.Root
      ref={ref}
      className={clsx("ui-toast__root", className)}
      {...props}
    />
  ),
);
Root.displayName = "Toast.Root";

/** Toast.Title - 토스트 제목 (선택) */
const Title = React.forwardRef<HTMLDivElement, ToastTitleProps>(
  ({ className, ...props }, ref) => (
    <RadixToast.Title
      ref={ref}
      className={clsx("ui-toast__title", className)}
      {...props}
    />
  ),
);
Title.displayName = "Toast.Title";

/** Toast.Description - 토스트 메시지 */
const Description = React.forwardRef<HTMLDivElement, ToastDescriptionProps>(
  ({ className, ...props }, ref) => (
    <RadixToast.Description
      ref={ref}
      className={clsx("ui-toast__description", className)}
      {...props}
    />
  ),
);
Description.displayName = "Toast.Description";

/** Toast.Action - 액션 버튼 (altText 필수, 스크린리더 대안 안내) */
const Action = React.forwardRef<HTMLButtonElement, ToastActionProps>(
  ({ className, ...props }, ref) => (
    <RadixToast.Action
      ref={ref}
      className={clsx("ui-toast__action", className)}
      {...props}
    />
  ),
);
Action.displayName = "Toast.Action";

/** Toast.Close - 닫기 버튼 */
const Close = React.forwardRef<HTMLButtonElement, ToastCloseProps>(
  ({ className, children, ...props }, ref) => (
    <RadixToast.Close
      ref={ref}
      className={clsx("ui-toast__close", className)}
      {...props}
    >
      {children ?? <Cross2Icon />}
    </RadixToast.Close>
  ),
);
Close.displayName = "Toast.Close";

// ============ Export ============

/** Toast 컴포넌트 (Compound 패턴) - Radix Toast 기반 */
export const Toast = {
  Provider,
  Viewport,
  Root,
  Title,
  Description,
  Action,
  Close,
};
