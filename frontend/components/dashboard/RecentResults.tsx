"use client";

import { useLocale } from "@/lib/LanguageContext";

// TODO: connect Supabase — replace mock results with real activity log
const MOCK_RESULTS = [
  { name: "Длина вектора", dateKey: "today" as const, score: 100, passed: true },
  { name: "Определение вектора", dateKey: "yesterday" as const, score: 90, passed: true },
  { name: "Координаты вектора", dateKey: "daysAgo" as const, daysAgo: 3, score: 70, passed: false },
];

export default function RecentResults() {
  const { t } = useLocale();
  const d = t.dashboard;

  const dateLabel = (item: typeof MOCK_RESULTS[number]) => {
    if (item.dateKey === "today") return d.resultToday;
    if (item.dateKey === "yesterday") return d.resultYesterday;
    return `${item.daysAgo} ${d.resultDaysAgo}`;
  };

  return (
    <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl p-4 flex flex-col gap-3">
      <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest">
        {d.resultsTitle}
      </div>

      <div className="flex flex-col gap-2">
        {MOCK_RESULTS.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-3 border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-lg px-3 py-2"
          >
            <div
              className={[
                "w-5 h-5 rounded-md flex items-center justify-center shrink-0 text-[11px]",
                item.passed
                  ? "bg-green-400/10 text-green-400"
                  : "bg-red-400/10 text-red-400",
              ].join(" ")}
            >
              {item.passed ? "✓" : "✗"}
            </div>
            <span className="flex-1 text-[12px] text-slate-700 dark:text-slate-300 truncate">
              {item.name}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-600 shrink-0">
              {dateLabel(item)}
            </span>
            <span
              className={[
                "text-[12px] font-semibold shrink-0 w-8 text-right",
                item.passed ? "text-green-400" : "text-red-400",
              ].join(" ")}
            >
              {item.score}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
