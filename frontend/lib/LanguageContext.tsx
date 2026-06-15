"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import ru from "@/locales/ru.json";
import he from "@/locales/he.json";

export type Lang = "RU" | "HE";

type Locale = typeof ru;

const locales: Record<Lang, Locale> = { RU: ru, HE: he as Locale };

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Locale;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "RU",
  setLang: () => {},
  t: ru,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("RU");

  useEffect(() => {
    document.documentElement.dir = lang === "HE" ? "rtl" : "ltr";
    document.documentElement.lang = lang === "HE" ? "he" : "ru";
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: locales[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLocale() {
  return useContext(LanguageContext);
}
