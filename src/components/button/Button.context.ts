import { createContext, useContext } from "react";

import type { ButtonOptions } from "@/types/component-api";

export type ButtonContextValue = ButtonOptions;

const ButtonContext = createContext<ButtonContextValue | null>(null);

export function useButtonContext(componentName?: string) {
  const ctx = useContext(ButtonContext);
  if (!ctx)
    throw new Error(`${componentName} must be used within <Button.Root>.`);
  return ctx;
}

export { ButtonContext };
