"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { CompareContextType } from "@/app/types/CompareContextType";
import { useToast } from "@/hooks/useToast";

export const CompareContext = createContext<CompareContextType | null>(null);

const STORAGE_KEY = "compare";
const MAX_ITEMS = 4;

export function CompareProvider({ children }: { children: ReactNode }) {
  const { showToast } = useToast();
  const [compareIds, setCompareIds] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setCompareIds(JSON.parse(saved));
  }, []);

  const persist = (ids: number[]) => {
    setCompareIds(ids);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  };

  const toggleCompare = (productId: number) => {
    if (compareIds.includes(productId)) {
      persist(compareIds.filter((id) => id !== productId));
      return;
    }
    if (compareIds.length >= MAX_ITEMS) {
      showToast(`Можна порівнювати до ${MAX_ITEMS} товарів`, "error");
      return;
    }
    persist([...compareIds, productId]);
    showToast("Додано до порівняння", "info");
  };

  const clearCompare = () => persist([]);
  const isInCompare = (productId: number) => compareIds.includes(productId);

  return (
    <CompareContext.Provider
      value={{ compareIds, isInCompare, toggleCompare, clearCompare, maxItems: MAX_ITEMS }}
    >
      {children}
    </CompareContext.Provider>
  );
}
