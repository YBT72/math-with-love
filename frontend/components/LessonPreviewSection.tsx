"use client";

import { useLocale } from "@/lib/LanguageContext";

export default function LessonPreviewSection() {
  const { t } = useLocale();
  return (
    <div className="max-w-275 mx-auto px-8 pt-10">
      <div className="text-[9px] font-medium uppercase tracking-widest text-slate-400 dark:text-slate-600 mb-1.5">
        {t.lessonPreview.sectionLabel}
      </div>
      <div className="text-xl font-medium text-slate-900 dark:text-slate-100 mb-1.25">
        {t.lessonPreview.title}
      </div>
      <div className="text-[13px] text-slate-500 dark:text-slate-400 mb-5">
        {t.lessonPreview.subtitle}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Formula box */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
          <div className="text-[9px] uppercase tracking-[0.08em] text-slate-400 dark:text-slate-600 mb-3.5">
            {t.lessonPreview.formulaLabel}
          </div>
          <div className="bg-cyan-100 dark:bg-slate-950 border border-cyan-200 dark:border-cyan-900 rounded-lg px-4.5 py-4 mb-3.5">
            <div className="font-mono text-[18px] text-cyan-700 dark:text-cyan-400 mb-2 leading-[1.6] whitespace-nowrap">
              {t.lessonPreview.formulaMain}
            </div>
            <div className="font-mono text-sm text-cyan-600 dark:text-cyan-300 leading-[1.6]">
              {t.lessonPreview.formulaAlt}
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-[1.65]">
            {t.lessonPreview.formulaDesc}
          </p>
        </div>

        {/* 3D visualization placeholder */}
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center gap-2.5 text-slate-400 dark:text-slate-600 min-h-45">
          <svg
            viewBox="0 0 24 24"
            className="w-9 h-9 stroke-current fill-none stroke-[1.5] opacity-30"
          >
            <path d="M3 17L9 11L13 15L21 7" />
            <path d="M17 7h4v4" />
          </svg>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {t.lessonPreview.vizLabel}
          </span>
          <span className="text-[10px] text-slate-400 dark:text-slate-600 opacity-50">
            {t.lessonPreview.vizSub}
          </span>
        </div>
      </div>
    </div>
  );
}
