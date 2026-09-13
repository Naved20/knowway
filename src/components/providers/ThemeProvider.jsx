"use client";

import { createContext, useContext, useEffect } from "react";

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
  isMounted: true,
});

export function ThemeProvider({ children }) {
  useEffect(() => {
    // Pure Light Theme enforcement
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
    try {
      localStorage.setItem("knowvy-theme", "light");
    } catch {
      // ignore
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: "light", toggleTheme: () => {}, isMounted: true }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
