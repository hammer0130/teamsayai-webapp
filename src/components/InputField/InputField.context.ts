"use client";
import { createContext, useContext } from "react";

export type InputFieldSize = "sm" | "md" | "lg";
export type InputFieldIntent = "default" | "error" | "success";

export type InputFieldContextValue = {
  inputId: string;
  helpId: string;
  errorId: string;

  size: InputFieldSize;
  intent: InputFieldIntent;
  disabled?: boolean;
};

const InputFieldContext = createContext<InputFieldContextValue | null>(null);

export function useInputFieldContext(componentName?: string) {
  const ctx = useContext(InputFieldContext);
  if (!ctx)
    throw new Error(`${componentName} must be used within <InputField.Root>.`);
  return ctx;
}

export { InputFieldContext };
