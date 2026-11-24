"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { FavoritesContextType } from "@/app/types/FavoritesContextType";

export const FavoritesContext = createContext<FavoritesContextType | null>(null);

const STORAGE_KEY = "favorites";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setFavoriteIds(JSON.parse(saved));
  }, []);

  const toggleFavorite = (productId: number) => {
    const next = favoriteIds.includes(productId)
      ? favoriteIds.filter((id) => id !== productId)
      : [...favoriteIds, productId];

    setFavoriteIds(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const isFavorite = (productId: number) => favoriteIds.includes(productId);

  return (
    <FavoritesContext.Provider value={{ favoriteIds, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
