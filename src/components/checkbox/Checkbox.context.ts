import { createContext, useContext } from "react";

import type { State } from "@/types/component-api";

export type CheckboxContextValue = {
  state?: State;
  invalid: boolean;
};

const CheckboxContext = createContext<CheckboxContextValue | null>(null);

export function useCheckboxContext(componentName?: string) {
  const ctx = useContext(CheckboxContext);
  if (!ctx) throw new Error(`${componentName} must be used within <Checkbox>.`);
  return ctx;
}

export { CheckboxContext };
