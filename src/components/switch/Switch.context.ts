import { createContext, useContext } from "react";

import type { State } from "@/types/component-api";

export type SwitchContextValue = {
  state?: State;
  invalid?: boolean;
  asChild?: boolean;
};

const SwitchContext = createContext<SwitchContextValue | null>(null);

export function useSwitchContext(componentName?: string) {
  const ctx = useContext(SwitchContext);
  if (!ctx) throw new Error(`${componentName} must be used within <Switch>.`);
  return ctx;
}

export { SwitchContext };
