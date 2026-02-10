/* eslint-disable react-refresh/only-export-components */
import * as React from "react";

import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import clsx from "clsx";

import {
  AlertDialogContext,
  type AlertDialogContextValue,
} from "./AlertDialog.context";
import type {
  AlertDialogRootProps,
  AlertDialogTriggerProps,
  AlertDialogPortalProps,
  AlertDialogOverlayProps,
  AlertDialogContentProps,
  AlertDialogTitleProps,
  AlertDialogDescriptionProps,
  AlertDialogCancelProps,
  AlertDialogActionProps,
} from "./AlertDialog.types";

// ============ Components ============

/** AlertDialog.Root - 알림 다이얼로그 컨테이너 */
function Root({ className, children, ...props }: AlertDialogRootProps) {
  const contextValue = React.useMemo<AlertDialogContextValue>(() => ({}), []);

  return (
    <AlertDialogContext.Provider value={contextValue}>
      <div className={clsx("ui-alert-dialog", className)}>
        <RadixAlertDialog.Root {...props}>{children}</RadixAlertDialog.Root>
      </div>
    </AlertDialogContext.Provider>
  );
}
Root.displayName = "AlertDialog.Root";

/** AlertDialog.Trigger - 다이얼로그를 여는 버튼 */
const Trigger = React.forwardRef<HTMLButtonElement, AlertDialogTriggerProps>(
  ({ className, ...props }, ref) => (
    <RadixAlertDialog.Trigger
      ref={ref}
      className={clsx("ui-alert-dialog__trigger", className)}
      {...props}
    />
  ),
);
Trigger.displayName = "AlertDialog.Trigger";

/** AlertDialog.Portal - Overlay/Content를 body 등으로 포탈 */
function Portal({ children, ...props }: AlertDialogPortalProps) {
  return (
    <RadixAlertDialog.Portal {...props}>{children}</RadixAlertDialog.Portal>
  );
}
Portal.displayName = "AlertDialog.Portal";

/** AlertDialog.Overlay - 배경 레이어 */
const Overlay = React.forwardRef<HTMLDivElement, AlertDialogOverlayProps>(
  ({ className, ...props }, ref) => (
    <RadixAlertDialog.Overlay
      ref={ref}
      className={clsx("ui-alert-dialog__overlay", className)}
      {...props}
    />
  ),
);
Overlay.displayName = "AlertDialog.Overlay";

/** AlertDialog.Content - 다이얼로그 내용 컨테이너 */
const Content = React.forwardRef<HTMLDivElement, AlertDialogContentProps>(
  ({ className, ...props }, ref) => (
    <RadixAlertDialog.Content
      ref={ref}
      className={clsx("ui-alert-dialog__content", className)}
      {...props}
    />
  ),
);
Content.displayName = "AlertDialog.Content";

/** AlertDialog.Title - 제목 (스크린리더 알림용) */
const Title = React.forwardRef<HTMLHeadingElement, AlertDialogTitleProps>(
  ({ className, ...props }, ref) => (
    <RadixAlertDialog.Title
      ref={ref}
      className={clsx("ui-alert-dialog__title", className)}
      {...props}
    />
  ),
);
Title.displayName = "AlertDialog.Title";

/** AlertDialog.Description - 설명 (스크린리더 알림용) */
const Description = React.forwardRef<
  HTMLParagraphElement,
  AlertDialogDescriptionProps
>(({ className, ...props }, ref) => (
  <RadixAlertDialog.Description
    ref={ref}
    className={clsx("ui-alert-dialog__description", className)}
    {...props}
  />
));
Description.displayName = "AlertDialog.Description";

/** AlertDialog.Cancel - 취소 버튼 */
const Cancel = React.forwardRef<HTMLButtonElement, AlertDialogCancelProps>(
  ({ className, ...props }, ref) => (
    <RadixAlertDialog.Cancel
      ref={ref}
      className={clsx("ui-alert-dialog__cancel", className)}
      {...props}
    />
  ),
);
Cancel.displayName = "AlertDialog.Cancel";

/** AlertDialog.Action - 확인/실행 버튼 */
const Action = React.forwardRef<HTMLButtonElement, AlertDialogActionProps>(
  ({ className, ...props }, ref) => (
    <RadixAlertDialog.Action
      ref={ref}
      className={clsx("ui-alert-dialog__action", className)}
      {...props}
    />
  ),
);
Action.displayName = "AlertDialog.Action";

// ============ Export ============

/** AlertDialog 컴포넌트 (Compound 패턴) - Radix Alert Dialog 기반 */
export const AlertDialog = {
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Title,
  Description,
  Cancel,
  Action,
};
