"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Змінити тему"
      title={isDark ? "Світла тема" : "Темна тема"}
      className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-slate-300 transition hover:bg-white/10 hover:text-white"
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
      <span className="hidden sm:inline">{isDark ? "Світла" : "Темна"}</span>
    </button>
  );
}
