import { createContext, useContext } from "react";

import type { Size, State } from "@/types/component-api";

export type SelectContextValue = {
  size: Size;
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
