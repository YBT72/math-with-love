"use client";

import { useLocale } from "@/lib/LanguageContext";

// TODO: connect Supabase — replace mock module data with real progress
const MOCK_MODULE = {
  tag: "Модуль 1",
  title: "Основы векторов",
  avgScore: 93,
  progress: 60,
  total: 7,
  done: 4,
  topics: [
    { name: "Определение вектора", status: "done" as const },
    { name: "Длина вектора", status: "done" as const },
    { name: "Сложение векторов", status: "current" as const },
    { name: "Умножение на число", status: "locked" as const },
  ],
};

export default function CurrentModule() {
  const { t } = useLocale();
  const d = t.dashboard;
  return (
    <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl p-4 flex flex-col gap-3">
      <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest">
        {d.moduleTitle}
      </div>

      {/* Module header */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[10px] border border-cyan-400 text-cyan-400 rounded-full px-2.5 py-0.5">
          {MOCK_MODULE.tag}
        </span>
        <span className="text-[14px] font-medium text-slate-900 dark:text-slate-100">
          {MOCK_MODULE.title}
        </span>
        <span className="ml-auto inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-green-400/10 border border-green-400/30 text-[10px] font-medium text-green-400">
          {d.moduleAvgScore} {MOCK_MODULE.avgScore}
        </span>
      </div>

      {/* Progress bar */}
      <div>
        <div className="h-1 bg-slate-100 dark:bg-slate-800 rounded-full mb-1">
          <div
            className="h-1 bg-cyan-400 rounded-full"
            style={{ width: `${MOCK_MODULE.progress}%` }}
          />
        </div>
        <div className="text-[10px] text-slate-500 dark:text-slate-500">
          {MOCK_MODULE.progress}% {d.moduleProgress} · {MOCK_MODULE.done} {d.moduleOf} {MOCK_MODULE.total} {d.moduleTopics}
        </div>
      </div>

      {/* Topics list */}
      <div className="flex flex-col gap-1.5">
        {MOCK_MODULE.topics.map((topic) => (
          <div
            key={topic.name}
            className="flex items-center justify-between gap-2 text-[12px]"
          >
            <div className="flex items-center gap-2">
              <span
                className={[
                  "w-2 h-2 rounded-full shrink-0",
                  topic.status === "done"
                    ? "bg-green-400"
                    : topic.status === "current"
                    ? "bg-cyan-400"
                    : "bg-slate-600 dark:bg-slate-700",
                ].join(" ")}
              />
              <span
                className={
                  topic.status === "locked"
                    ? "text-slate-500 dark:text-slate-600"
                    : "text-slate-700 dark:text-slate-300"
                }
              >
                {topic.name}
              </span>
            </div>
            <span>
              {topic.status === "done" && (
                <span className="text-green-400 text-[11px]">✓</span>
              )}
              {topic.status === "current" && (
                <span className="text-[10px] bg-cyan-400/10 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-400/30">
                  {d.topicNow}
                </span>
              )}
              {topic.status === "locked" && (
                <span className="text-slate-500 text-[12px]">🔒</span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
