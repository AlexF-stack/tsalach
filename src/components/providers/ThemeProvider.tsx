"use client";

import { useEffect, type ReactNode } from "react";

export type ThemeMode = "light" | "dark";

/** Light-only brand surface — dark mode removed. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = "light";
    root.classList.add("light");
    root.classList.remove("dark");
    try {
      localStorage.setItem("tsalach-theme", "light");
    } catch {
      /* ignore */
    }
  }, []);

  return <>{children}</>;
}

/** Compat stub for legacy modules still reading theme. */
export function useTheme() {
  return {
    theme: "light" as ThemeMode,
    setTheme: () => {},
    toggleTheme: () => {},
  };
}
