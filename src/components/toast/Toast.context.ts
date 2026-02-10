import { createContext, useContext } from "react";

import type { ToastOptions } from "@/types/component-api";

export type ToastContextValue = ToastOptions;

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToastContext(componentName?: string) {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error(`${componentName} must be used within <Toast>.`);
  return ctx;
}

export { ToastContext };
