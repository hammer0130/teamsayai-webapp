import { createContext, useContext } from "react";

import type { DialogOptions } from "@/types/component-api";

export type DialogContextValue = DialogOptions;

const DialogContext = createContext<DialogContextValue | null>(null);

export function useDialogContext(componentName?: string) {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error(`${componentName} must be used within <Dialog>.`);
  return ctx;
}

export { DialogContext };
