import { createContext, useContext } from "react";

import type { TextareaOptions } from "@/types/component-api";

export type TextareaContextValue = TextareaOptions;

const TextareaContext = createContext<TextareaContextValue | null>(null);

export function useTextareaContext(componentName?: string) {
  const ctx = useContext(TextareaContext);
  if (!ctx) throw new Error(`${componentName} must be used within <Textarea>.`);
  return ctx;
}

export { TextareaContext };
