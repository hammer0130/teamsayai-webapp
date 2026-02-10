import { createContext, useContext } from "react";

import type { State } from "@/types/component-api";

export type RadioGroupContextValue = {
  state?: State;
  invalid: boolean;
  name?: string;
};

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export function useRadioGroupContext(componentName?: string) {
  const ctx = useContext(RadioGroupContext);
  if (!ctx)
    throw new Error(`${componentName} must be used within <RadioGroup>.`);
  return ctx;
}

export { RadioGroupContext };
