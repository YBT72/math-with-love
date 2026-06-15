"use client";

import { useLocale } from "@/lib/LanguageContext";

export default function StatsBar() {
  const { t } = useLocale();
  const STATS = [
    { value: t.stats.modulesValue, label: t.stats.modulesLabel },
    { value: t.stats.tasksValue, label: t.stats.tasksLabel },
    { value: t.stats.vizValue, label: t.stats.vizLabel },
  ];
  return (
    <div className="bg-slate-50 dark:bg-slate-900 border-t border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-275 mx-auto grid grid-cols-3">
        {STATS.map((stat, index) => (
          <div
            key={stat.label}
            className={`text-center py-4.5 px-2 ${
              index < STATS.length - 1
                ? "border-r border-slate-200 dark:border-slate-800"
                : ""
            }`}
          >
            <div className="text-[28px] font-medium text-cyan-400">
              {stat.value}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
