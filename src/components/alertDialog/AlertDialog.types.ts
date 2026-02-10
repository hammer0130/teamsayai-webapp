import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";

/** AlertDialog.Root Props */
export type AlertDialogRootProps = React.ComponentPropsWithoutRef<
  typeof RadixAlertDialog.Root
> & {
  className?: string;
};

/** AlertDialog.Trigger Props */
export type AlertDialogTriggerProps = React.ComponentPropsWithoutRef<
  typeof RadixAlertDialog.Trigger
>;

/** AlertDialog.Portal Props */
export type AlertDialogPortalProps = React.ComponentPropsWithoutRef<
  typeof RadixAlertDialog.Portal
>;

/** AlertDialog.Overlay Props */
export type AlertDialogOverlayProps = React.ComponentPropsWithoutRef<
  typeof RadixAlertDialog.Overlay
>;

/** AlertDialog.Content Props */
export type AlertDialogContentProps = React.ComponentPropsWithoutRef<
  typeof RadixAlertDialog.Content
>;

/** AlertDialog.Cancel Props */
export type AlertDialogCancelProps = React.ComponentPropsWithoutRef<
  typeof RadixAlertDialog.Cancel
>;

/** AlertDialog.Action Props */
export type AlertDialogActionProps = React.ComponentPropsWithoutRef<
  typeof RadixAlertDialog.Action
>;

/** AlertDialog.Title Props */
export type AlertDialogTitleProps = React.ComponentPropsWithoutRef<
  typeof RadixAlertDialog.Title
>;

/** AlertDialog.Description Props */
export type AlertDialogDescriptionProps = React.ComponentPropsWithoutRef<
  typeof RadixAlertDialog.Description
>;
