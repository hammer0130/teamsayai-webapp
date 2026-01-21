'use client';

import { createContext, useContext } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputIntent = 'default' | 'error' | 'success';

export type InputFieldContextValue = {
  size: InputSize;
  intent: InputIntent;
};

export const InputFieldContext = createContext<InputFieldContextValue | null>(null);

export function useInputFieldContext(componentName = 'InputField') {
  const ctx = useContext(InputFieldContext);
  if (!ctx) {
    throw new Error(`${componentName} must be used within <InputField.Root>.`);
  }
  return ctx;
}
