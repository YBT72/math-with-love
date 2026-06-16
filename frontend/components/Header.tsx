"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useLocale } from "@/lib/LanguageContext";

interface HeaderProps {
  mode?: "landing" | "dashboard";
  // landing mode props
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
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

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[1.75]">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[1.75]">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
      <circle cx="12" cy="17" r="0.5" fill="currentColor" />
    </svg>
  );
}

export default function Header({ mode = "landing", onLoginClick, onRegisterClick }: HeaderProps) {
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

      {/* Login / Register  —OR—  Dashboard account controls */}
      {mode === "landing" ? (
        <>
          <button
            onClick={onLoginClick}
            className="border border-slate-300 dark:border-slate-800 rounded-[7px] px-4 py-1.5 text-[13px] text-slate-500 dark:text-slate-400 cursor-pointer bg-transparent"
          >
            {t.header.login}
          </button>
          <button
            onClick={onRegisterClick}
            className="bg-cyan-400 border border-cyan-400 rounded-[7px] px-4 py-1.5 text-[13px] text-slate-950 font-medium cursor-pointer"
          >
            {t.header.register}
          </button>
        </>
      ) : (
        <>
          {/* Help */}
          <button
            className="w-8 h-8 flex items-center justify-center rounded-[7px] border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 bg-transparent cursor-pointer hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            aria-label="Help"
            onClick={() => console.log("[TODO] Open help")}
          >
            <HelpIcon />
          </button>
          {/* Bell */}
          <button
            className="w-8 h-8 flex items-center justify-center rounded-[7px] border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 bg-transparent cursor-pointer hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            aria-label="Notifications"
            onClick={() => console.log("[TODO] Open notifications")}
          >
            <BellIcon />
          </button>
          {/* Account avatar */}
          <button
            className="w-8 h-8 rounded-full bg-cyan-400 flex items-center justify-center text-[11px] font-semibold text-slate-950 cursor-pointer hover:bg-cyan-300 transition-colors"
            aria-label="Account"
            onClick={() => console.log("[TODO] Open account menu")}
          >
            ИГ
          </button>
        </>
      )}
    </header>
  );
}
