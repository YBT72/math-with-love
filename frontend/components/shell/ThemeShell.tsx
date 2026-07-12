"use client";

import { useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";

export default function ThemeShell({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  // Apply theme class to shell wrapper
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className={`shell ${theme}`}>
      {children}
    </div>
  );
}
