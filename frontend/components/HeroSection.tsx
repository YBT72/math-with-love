"use client";

import Image from "next/image";
import { useLocale } from "@/lib/LanguageContext";

interface HeroSectionProps {
  onStartClick: () => void;
  onCoursesClick: () => void;
}

export default function HeroSection({
  onStartClick,
  onCoursesClick,
}: HeroSectionProps) {
  const { t } = useLocale();
  return (
    <div className="max-w-275 mx-auto px-8 pt-14 pb-10 flex items-start gap-10">
      {/* Left: text */}
      <div className="flex-1">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 bg-cyan-100 dark:bg-slate-950 border border-cyan-200 dark:border-cyan-400 rounded-full px-3.5 py-1.25 text-xs text-cyan-700 dark:text-cyan-400 mb-5">
          {t.hero.badge}
        </div>

        {/* H1 */}
        <h1 className="text-[40px] font-medium leading-[1.2] mb-3.5 text-slate-900 dark:text-slate-100">
          {t.hero.titleLine1}
          <br />
          {t.hero.titleLine2}
          <br />
          <em className="not-italic text-cyan-400">{t.hero.titleAccent}</em>
        </h1>

        {/* Description */}
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-[1.7] mb-7 max-w-105">
          {t.hero.description}
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onStartClick}
            className="bg-cyan-400 text-slate-950 border-none rounded-[9px] px-6 py-3 text-sm font-medium cursor-pointer"
          >
            {t.hero.ctaPrimary}
          </button>
          <button
            onClick={onCoursesClick}
            className="bg-transparent text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-800 rounded-[9px] px-6 py-3 text-sm cursor-pointer"
          >
            {t.hero.ctaSecondary}
          </button>
        </div>
      </div>

      {/* Right: Professor Yosi card */}
      <div className="w-52.5 shrink-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[14px] overflow-hidden">
        {/* Image area */}
        <div className="h-47.5 bg-cyan-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-center">
          <Image
            src="/professor/yosi-present.png"
            alt={t.hero.professorName}
            width={120}
            height={160}
            className="object-contain object-bottom h-full w-auto"
            priority
          />
        </div>
        {/* Body */}
        <div className="px-4 py-3.5">
          <div className="text-sm font-medium text-cyan-700 dark:text-cyan-400 mb-1.5">
            {t.hero.professorName}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 leading-[1.6]">
            {t.hero.professorDescription}
          </div>
        </div>
      </div>
    </div>
  );
}
