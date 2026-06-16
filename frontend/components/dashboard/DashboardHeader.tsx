"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useLocale } from "@/lib/LanguageContext";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-none stroke-current stroke-[1.75]">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-none stroke-current stroke-[1.75]">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-none stroke-current stroke-[1.75]">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

export default function DashboardHeader() {
  const { theme, setTheme } = useTheme();
  const { lang, setLang } = useLocale();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="h-12 flex items-center gap-3 px-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="w-7 h-7 rounded-full bg-cyan-400 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-slate-950">
            <path d="M12 2L8 8H4l4 4-2 6 6-3 6 3-2-6 4-4h-4z" />
          </svg>
        </div>
        <span className="text-[13px] font-medium text-slate-900 dark:text-slate-100">
          Math <span className="text-cyan-400">With Love</span>
        </span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-xs relative">
        <input
          type="text"
          placeholder="Поиск тем, формул..."
          className="w-full h-7 pl-3 pr-8 text-[12px] rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-cyan-400 transition-colors"
        />
        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
          <SearchIcon />
        </span>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2 ml-auto">
        {/* RU / HE */}
        <div className="flex items-center gap-0.5 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
          {(["RU", "HE"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={[
                "px-2 py-0.5 text-[11px] font-medium transition-colors",
                lang === l
                  ? "bg-cyan-400 text-slate-950"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100",
              ].join(" ")}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Theme toggle */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        )}

        {/* Bell */}
        <button className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
          <BellIcon />
        </button>

        {/* Avatar */}
        <button className="w-7 h-7 rounded-full bg-cyan-400 flex items-center justify-center text-[11px] font-semibold text-slate-950">
          ИГ
        </button>
      </div>
    </header>
  );
}
