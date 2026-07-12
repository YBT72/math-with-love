"use client";

import { createContext, useContext, useEffect, useState } from "react";
import heMessages from "../locales/he.json";
import ruMessages from "../locales/ru.json";

// Supported languages
export type Lang = "he" | "ru";
export type Dir = "rtl" | "ltr";

interface LocaleContextValue {
  lang: Lang;
  dir: Dir;
  t: (key: string) => string;
  setLang: (lang: Lang) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

const locales: Record<Lang, Record<string, string>> = {
  he: heMessages,
  ru: ruMessages,
};

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("he");

  // Apply lang and dir to <html> element
  useEffect(() => {
    const dir: Dir = lang === "he" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang]);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    // Persist for unauthenticated users
    localStorage.setItem("mwl_lang", newLang);
  };

  const t = (key: string): string => {
    return locales[lang][key] ?? key;
  };

  const dir: Dir = lang === "he" ? "rtl" : "ltr";

  return (
    <LocaleContext.Provider value={{ lang, dir, t, setLang }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside LocaleProvider");
  return ctx;
}
