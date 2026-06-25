"use client";

import { useState, useRef, useEffect } from "react";
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

export default function DashboardHeader() {
  const { lang, setLang } = useLocale();
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  // Close on outside click
  useEffect(() => {
    if (!searchOpen) return;
    function onDown(e: MouseEvent) {
      const target = e.target as Node;
      if (!inputRef.current?.closest(".search-wrap")?.contains(target)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [searchOpen]);

  return (
    <header className="h-12 grid grid-cols-[1fr_auto_1fr] items-center px-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0 gap-3">
      <div className="flex items-center gap-2 justify-self-start min-w-0">
        <div className="w-7 h-7 rounded-full bg-cyan-400 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-slate-950">
            <path d="M12 2L8 8H4l4 4-2 6 6-3 6 3-2-6 4-4h-4z" />
          </svg>
        </div>
        <span className="text-[13px] font-medium text-slate-900 dark:text-slate-100 whitespace-nowrap">
          Math <span className="text-cyan-400">With Love</span>
        </span>
      </div>

      {/* Search: full-width input on md+; icon-only toggle on mobile */}
      <div className="search-wrap relative justify-self-center">
        {/* Desktop/tablet: always visible input */}
        <div className="hidden md:block w-70 max-w-[42vw] relative">
          <input
            type="text"
            placeholder="Поиск тем, формул..."
            className="w-full h-7 ps-3 pe-8 text-[12px] rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-cyan-400 transition-colors"
          />
          <span className="absolute inset-e-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none">
            <SearchIcon />
          </span>
        </div>

        {/* Mobile: icon button → expanding input */}
        <div className="md:hidden flex items-center">
          {searchOpen ? (
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                placeholder="Поиск..."
                className="h-7 w-44 ps-3 pe-8 text-[12px] rounded-lg border border-cyan-400 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-colors"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute inset-e-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                aria-label="Close search"
              >
                <SearchIcon />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
              aria-label="Search"
            >
              <SearchIcon />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 justify-self-end">
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

        <button className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
          <BellIcon />
        </button>

        <button className="w-7 h-7 rounded-full bg-cyan-400 flex items-center justify-center text-[11px] font-semibold text-slate-950">
          ИГ
        </button>
      </div>
    </header>
  );
}
