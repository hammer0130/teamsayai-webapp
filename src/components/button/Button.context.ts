"use client";
import { createContext, useContext } from "react";
export type Size = "small" | "medium" | "large" | "xlarge";
export type Color = "primary" | "secondary" | "tertiary" | "danger";
export type Variant = "fill" | "weak" | "solid" | "outline" | "ghost" | "link";
export type Shape = "square" | "rounded";
export type ButtonContextValue = {
  size?: Size;
  color?: Color;
  variant?: Variant;
  shape?: Shape;
  disabled?: boolean;
};

const ButtonContext = createContext<ButtonContextValue | null>(null);

export function useButtonContext(componentName?: string) {
  const ctx = useContext(ButtonContext);
  if (!ctx)
    throw new Error(`${componentName} must be used within <Button.Root>.`);
  return ctx;
}

export { ButtonContext };
