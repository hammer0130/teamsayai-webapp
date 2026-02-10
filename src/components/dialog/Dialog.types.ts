import * as RadixDialog from "@radix-ui/react-dialog";

/** Dialog.Root Props */
export type DialogRootProps = React.ComponentPropsWithoutRef<
  typeof RadixDialog.Root
> & {
  className?: string;
};

/** Dialog.Trigger Props */
export type DialogTriggerProps = React.ComponentPropsWithoutRef<
  typeof RadixDialog.Trigger
>;

/** Dialog.Portal Props */
export type DialogPortalProps = React.ComponentPropsWithoutRef<
  typeof RadixDialog.Portal
>;

/** Dialog.Overlay Props */
export type DialogOverlayProps = React.ComponentPropsWithoutRef<
  typeof RadixDialog.Overlay
>;

/** Dialog.Content Props */
export type DialogContentProps = React.ComponentPropsWithoutRef<
  typeof RadixDialog.Content
>;

/** Dialog.Title Props */
export type DialogTitleProps = React.ComponentPropsWithoutRef<
  typeof RadixDialog.Title
>;

/** Dialog.Description Props */
export type DialogDescriptionProps = React.ComponentPropsWithoutRef<
  typeof RadixDialog.Description
>;

/** Dialog.Close Props */
export type DialogCloseProps = React.ComponentPropsWithoutRef<
  typeof RadixDialog.Close
>;
