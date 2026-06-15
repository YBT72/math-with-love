"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useLocale } from "@/lib/LanguageContext";

interface HeaderProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Header({ onLoginClick, onRegisterClick }: HeaderProps) {
  const { lang, setLang, t } = useLocale();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 h-14 flex items-center gap-3 px-8 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      {/* Logo */}
      <div className="w-8.5 h-8.5 rounded-full bg-cyan-400 flex items-center justify-center shrink-0">
        <svg className="w-4.5 h-4.5 fill-slate-950" viewBox="0 0 24 24">
          <path d="M12 2L8 8H4l4 4-2 6 6-3 6 3-2-6 4-4h-4z" />
        </svg>
      </div>

      {/* Site name */}
      <div className="flex-1 text-[15px] font-medium text-slate-900 dark:text-slate-100">
        Math <span className="text-cyan-400">With Love</span>
      </div>

      {/* Language switcher */}
      <div className="flex rounded-[7px] overflow-hidden border border-slate-200 dark:border-slate-800">
        {(["RU", "HE"] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={
              lang === l
                ? "px-2.75 py-1.25 text-xs leading-none bg-cyan-400 text-slate-950 font-medium cursor-pointer"
                : "px-2.75 py-1.25 text-xs leading-none bg-transparent text-slate-500 dark:text-slate-400 cursor-pointer"
            }
          >
            {l}
          </button>
        ))}
      </div>

      {/* Theme toggle */}
      {mounted && (
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-8 h-8 flex items-center justify-center rounded-[7px] border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 bg-transparent cursor-pointer"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
      )}

      {/* Login */}
      <button
        onClick={onLoginClick}
        className="border border-slate-300 dark:border-slate-800 rounded-[7px] px-4 py-1.5 text-[13px] text-slate-500 dark:text-slate-400 cursor-pointer bg-transparent"
      >
        {t.header.login}
      </button>

      {/* Register */}
      <button
        onClick={onRegisterClick}
        className="bg-cyan-400 border border-cyan-400 rounded-[7px] px-4 py-1.5 text-[13px] text-slate-950 font-medium cursor-pointer"
      >
        {t.header.register}
      </button>
    </header>
  );
}
