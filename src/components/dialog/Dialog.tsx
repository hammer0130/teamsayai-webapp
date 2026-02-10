/* eslint-disable react-refresh/only-export-components */
import * as React from "react";

import * as RadixDialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import clsx from "clsx";

import { DialogContext, type DialogContextValue } from "./Dialog.context";
import type {
  DialogRootProps,
  DialogTriggerProps,
  DialogPortalProps,
  DialogOverlayProps,
  DialogContentProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogCloseProps,
} from "./Dialog.types";

// ============ Components ============

/** Dialog.Root - 다이얼로그 컨테이너 (modal / non-modal 지원) */
function Root({ className, children, ...props }: DialogRootProps) {
  const contextValue = React.useMemo<DialogContextValue>(() => ({}), []);

  return (
    <DialogContext.Provider value={contextValue}>
      <div className={clsx("ui-dialog", className)}>
        <RadixDialog.Root {...props}>{children}</RadixDialog.Root>
      </div>
    </DialogContext.Provider>
  );
}
Root.displayName = "Dialog.Root";

/** Dialog.Trigger - 다이얼로그를 여는 버튼 */
const Trigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ className, ...props }, ref) => (
    <RadixDialog.Trigger
      ref={ref}
      className={clsx("ui-dialog__trigger", className)}
      {...props}
    />
  ),
);
Trigger.displayName = "Dialog.Trigger";

/** Dialog.Portal - Overlay/Content를 body 등으로 포탈 */
function Portal({ children, ...props }: DialogPortalProps) {
  return <RadixDialog.Portal {...props}>{children}</RadixDialog.Portal>;
}
Portal.displayName = "Dialog.Portal";

/** Dialog.Overlay - 배경 레이어 */
const Overlay = React.forwardRef<HTMLDivElement, DialogOverlayProps>(
  ({ className, ...props }, ref) => (
    <RadixDialog.Overlay
      ref={ref}
      className={clsx("ui-dialog__overlay", className)}
      {...props}
    />
  ),
);
Overlay.displayName = "Dialog.Overlay";

/** Dialog.Content - 다이얼로그 내용 컨테이너 */
const Content = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, ...props }, ref) => (
    <RadixDialog.Content
      ref={ref}
      className={clsx("ui-dialog__content", className)}
      {...props}
    />
  ),
);
Content.displayName = "Dialog.Content";

/** Dialog.Title - 제목 (스크린리더 알림용) */
const Title = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <RadixDialog.Title
      ref={ref}
      className={clsx("ui-dialog__title", className)}
      {...props}
    />
  ),
);
Title.displayName = "Dialog.Title";

/** Dialog.Description - 설명 (스크린리더 알림용) */
const Description = React.forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(({ className, ...props }, ref) => (
  <RadixDialog.Description
    ref={ref}
    className={clsx("ui-dialog__description", className)}
    {...props}
  />
));
Description.displayName = "Dialog.Description";

/** Dialog.Close - 다이얼로그를 닫는 버튼 */
const Close = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ className, ...props }, ref) => (
    <RadixDialog.Close
      ref={ref}
      className={clsx("ui-dialog__close", className)}
      {...props}
    />
  ),
);
Close.displayName = "Dialog.Close";

/** Dialog.CloseButton - 헤더 등에 둘 X 아이콘 닫기 버튼 (Dialog.Close + 아이콘) */
const CloseButton = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ className, children, ...props }, ref) => (
    <RadixDialog.Close
      ref={ref}
      className={clsx("ui-dialog__close-button", className)}
      aria-label="닫기"
      {...props}
    >
      {children ?? <Cross2Icon />}
    </RadixDialog.Close>
  ),
);
CloseButton.displayName = "Dialog.CloseButton";

// ============ Export ============

/** Dialog 컴포넌트 (Compound 패턴) - Radix Dialog 기반 */
export const Dialog = {
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Title,
  Description,
  Close,
  CloseButton,
};
