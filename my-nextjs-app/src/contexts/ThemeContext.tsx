"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type ThemeMode = "light" | "dark";

interface ThemeContextValue {
  theme: ThemeMode;
  setTheme: (newTheme: ThemeMode) => void;
  toggleTheme: () => void;
  isReady: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function applyThemeToDocument(newTheme: ThemeMode) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", newTheme);
}

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>("light");
  const [isReady, setIsReady] = useState(false);

  const setTheme = useCallback((newTheme: ThemeMode) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem("theme", newTheme);
    } catch {}
    applyThemeToDocument(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prevTheme: ThemeMode) => {
      const nextTheme: ThemeMode = prevTheme === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("theme", nextTheme);
      } catch {}
      applyThemeToDocument(nextTheme);
      return nextTheme;
    });
  }, []);

  useEffect(() => {
    // Initialize theme on mount: prefer saved theme, fallback to system
    let initial: ThemeMode = "light";
    try {
      const saved = localStorage.getItem("theme") as ThemeMode | null;
      if (saved === "light" || saved === "dark") {
        initial = saved;
      } else if (typeof window !== "undefined") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        initial = prefersDark ? "dark" : "light";
      }
    } catch {}
    setTheme(initial);
    setIsReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo<ThemeContextValue>(() => ({ theme, setTheme, toggleTheme, isReady }), [theme, setTheme, toggleTheme, isReady]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
