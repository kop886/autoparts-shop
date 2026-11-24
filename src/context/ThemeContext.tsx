"use client";

import { createContext, useEffect, useState, ReactNode } from "react";
import { ThemeContextType } from "@/app/types/ThemeContextType";

export const ThemeContext = createContext<ThemeContextType | null>(null);

const STORAGE_KEY = "theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  // при запуску беремо збережену тему або тему системи
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const dark =
      saved === "dark" ||
      (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDark(dark);
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
