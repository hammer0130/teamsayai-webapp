import { createContext, useContext } from "react";

import type { State } from "@/types/component-api";

export type SelectContextValue = {
  state?: State;
  invalid: boolean;
};

const SelectContext = createContext<SelectContextValue | null>(null);

export function useSelectContext(componentName?: string) {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error(`${componentName} must be used within <Select>.`);
  return ctx;
}

export { SelectContext };
