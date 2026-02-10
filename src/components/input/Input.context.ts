import { createContext, useContext } from "react";

import type { InputOptions } from "@/types/component-api";

export type InputContextValue = InputOptions;

const InputContext = createContext<InputContextValue | null>(null);

export function useInputContext(componentName?: string) {
  const ctx = useContext(InputContext);
  if (!ctx) throw new Error(`${componentName} must be used within <Input>.`);
  return ctx;
}

export { InputContext };
