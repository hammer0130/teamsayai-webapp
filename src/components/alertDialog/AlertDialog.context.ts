import { createContext, useContext } from "react";

import type { AlertDialogOptions } from "@/types/component-api";

export type AlertDialogContextValue = AlertDialogOptions;

const AlertDialogContext = createContext<AlertDialogContextValue | null>(null);

export function useAlertDialogContext(componentName?: string) {
  const ctx = useContext(AlertDialogContext);
  if (!ctx)
    throw new Error(`${componentName} must be used within <AlertDialog>.`);
  return ctx;
}

export { AlertDialogContext };
