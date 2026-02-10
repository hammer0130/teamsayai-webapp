import { createContext, useContext } from "react";

import type { Size } from "@/types/component-api";

import type { TabsVariant } from "./Tabs.types";

export type TabsContextValue = {
  size?: Size;
  variant?: TabsVariant;
};

const TabsContext = createContext<TabsContextValue | null>(null);

export function useTabsContext(componentName?: string) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error(`${componentName} must be used within <Tabs>.`);
  return ctx;
}

export { TabsContext };
