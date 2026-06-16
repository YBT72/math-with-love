"use client";

import { useLocale } from "@/lib/LanguageContext";

// TODO: connect Supabase — replace mock stats with real user progress data
const MOCK_STATS = {
  streak: 7,
  xp: 340,
  topicsDone: 6,
};

function FlameIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-[#FBBF24] stroke-2">
      <path d="M12 2c0 0-5 5-5 11a5 5 0 0010 0C17 7 12 2 12 2z" />
      <path d="M12 12c0 0-2 2-2 4a2 2 0 004 0c0-2-2-4-2-4z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-cyan-400 stroke-2">
      <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-[#4ade80] stroke-2">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

type StatCardProps = {
  icon: React.ReactNode;
  iconBg: string;
  value: number;
  label: string;
};

function StatCard({ icon, iconBg, value, label }: StatCardProps) {
  return (
    <div className="flex items-center gap-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl px-4 py-3">
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}>
        {icon}
      </div>
      <div>
        <div className="text-[17px] font-semibold text-slate-900 dark:text-slate-100 leading-none">
          {value}
        </div>
        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{label}</div>
      </div>
    </div>
  );
}

export default function StatsRow() {
  const { t } = useLocale();
  const d = t.dashboard;
  return (
    <div className="grid grid-cols-3 gap-3">
      <StatCard icon={<FlameIcon />} iconBg="bg-amber-400/10" value={MOCK_STATS.streak} label={d.statStreak} />
      <StatCard icon={<StarIcon />} iconBg="bg-cyan-400/10" value={MOCK_STATS.xp} label={d.statXp} />
      <StatCard icon={<CheckIcon />} iconBg="bg-green-400/10" value={MOCK_STATS.topicsDone} label={d.statDone} />
    </div>
  );
}
