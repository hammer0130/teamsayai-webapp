import * as RadixToast from "@radix-ui/react-toast";

import type { ToastSwipeDirection } from "@/types/component-api";

/** Toast.Provider Props (swipeDirection은 6가지 위치 값, Radix에는 left/right로 매핑) */
export type ToastProviderProps = Omit<
  React.ComponentPropsWithoutRef<typeof RadixToast.Provider>,
  "swipeDirection"
> & {
  className?: string;
  /** 뷰포트 위치 + 스와이프 방향: top-left, top-center, top-right, bottom-left, bottom-center, bottom-right. 기본 top-right */
  swipeDirection?: ToastSwipeDirection;
};

/** Toast.Viewport Props. 위치는 Provider의 swipeDirection( context )으로 결정 */
export type ToastViewportProps = React.ComponentPropsWithoutRef<
  typeof RadixToast.Viewport
>;

/** Toast.Root Props */
export type ToastRootProps = React.ComponentPropsWithoutRef<
  typeof RadixToast.Root
>;

/** Toast.Title Props */
export type ToastTitleProps = React.ComponentPropsWithoutRef<
  typeof RadixToast.Title
>;

/** Toast.Description Props */
export type ToastDescriptionProps = React.ComponentPropsWithoutRef<
  typeof RadixToast.Description
>;

/** Toast.Action Props */
export type ToastActionProps = React.ComponentPropsWithoutRef<
  typeof RadixToast.Action
>;

/** Toast.Close Props */
export type ToastCloseProps = React.ComponentPropsWithoutRef<
  typeof RadixToast.Close
>;
