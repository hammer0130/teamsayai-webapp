import { createContext, useContext } from "react";

import type { AccordionOptions } from "@/types/component-api";

export type AccordionContextValue = AccordionOptions;

const AccordionContext = createContext<AccordionContextValue | null>(null);

export function useAccordionContext(componentName?: string) {
  const ctx = useContext(AccordionContext);
  if (!ctx)
    throw new Error(`${componentName} must be used within <Accordion>.`);
  return ctx;
}

export { AccordionContext };
