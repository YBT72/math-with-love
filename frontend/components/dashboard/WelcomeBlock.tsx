"use client";

import Image from "next/image";
import { useLocale } from "@/lib/LanguageContext";

// TODO: connect Supabase — replace mock user data with real user profile
const MOCK_USER = {
  initials: "ИГ",
  firstName: "Игаль",
};

export default function WelcomeBlock() {
  const { t } = useLocale();
  const d = t.dashboard;
  return (
    <div className="flex gap-3">
      {/* Left: greeting + buttons */}
      <div className="flex-1 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl p-4 flex flex-col gap-3">
        {/* Greeting */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-cyan-400 flex items-center justify-center text-[13px] font-semibold text-slate-950 shrink-0">
            {MOCK_USER.initials}
          </div>
          <div>
            <div className="text-[17px] font-medium text-slate-900 dark:text-slate-100">
              {d.greeting},{" "}
              <span className="text-cyan-400">{MOCK_USER.firstName}</span> 👋
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              {d.greetingSub}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 flex-wrap">
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-400 text-slate-950 text-[12px] font-medium hover:bg-cyan-300 transition-colors"
            onClick={() => console.log("[TODO] Continue lesson")}
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current rtl:scale-x-[-1]">
              <polygon points="5,3 19,12 5,21" />
            </svg>
            {d.btnContinue}
          </button>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-[12px] font-medium hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            onClick={() => console.log("[TODO] Repeat topic")}
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-2 rtl:scale-x-[-1]">
              <path d="M23 4v6h-6M1 20v-6h6" />
              <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
            </svg>
            {d.btnRepeat}
          </button>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-[12px] font-medium hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            onClick={() => console.log("[TODO] New topic")}
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-2 rtl:scale-x-[-1]">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            {d.btnNewTopic}
          </button>
        </div>
      </div>

      {/* Right: Professor Yosi card */}
      <div className="w-44 shrink-0 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl overflow-hidden flex flex-col">
        <div className="h-18 flex items-center justify-center bg-cyan-400/5 border-b border-slate-200 dark:border-slate-800">
          <Image
            src="/professor/yosi-present.png"
            alt="Professor Yosi"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
        <div className="p-2.5 flex flex-col gap-0.5">
          <div className="text-[11px] font-medium text-cyan-400">
            {d.professorName}
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">
            {d.professorMessage}
          </p>
        </div>
      </div>
    </div>
  );
}
