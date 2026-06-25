"use client";

import { useState } from "react";
import { useLocale } from "@/lib/LanguageContext";

type TabKey = "dashboard" | "modules" | "formulas" | "lab" | "settings";

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke={active ? "#22D3EE" : "currentColor"} strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l-2 0l9-9l9 9l-2 0" />
      <path d="M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      <path d="M9 21v-6a2 2 0 012-2h2a2 2 0 012 2v6" />
    </svg>
  );
}

function ModulesIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke={active ? "#22D3EE" : "currentColor"} strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l10 5-10 5L2 8z" />
      <path d="M7 11.5v4.5a5 5 0 0010 0v-4.5" />
      <line x1="22" y1="8" x2="22" y2="14" />
    </svg>
  );
}

function FormulasIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke={active ? "#22D3EE" : "currentColor"} strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12l18 0" />
      <path d="M12 3l0 18" />
      <path d="M16.5 4.5l3 3" />
      <path d="M19.5 4.5l-3 3" />
      <path d="M6 4l0 4" />
      <path d="M4 6l4 0" />
      <path d="M18 16l.01 0" />
      <path d="M18 20l.01 0" />
      <path d="M4 18l4 0" />
    </svg>
  );
}

function LabIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke={active ? "#22D3EE" : "currentColor"} strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2" />
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
    </svg>
  );
}

function SettingsIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke={active ? "#22D3EE" : "currentColor"} strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );
}

export default function BottomNav() {
  const [active, setActive] = useState<TabKey>("dashboard");
  const { t } = useLocale();
  const d = t.dashboard;

  const tabs: { key: TabKey; icon: (a: boolean) => React.ReactNode; label: string }[] = [
    { key: "dashboard", icon: (a) => <HomeIcon active={a} />,     label: d.navDashboard },
    { key: "modules",   icon: (a) => <ModulesIcon active={a} />,  label: d.navModules },
    { key: "formulas",  icon: (a) => <FormulasIcon active={a} />, label: d.navFormulas },
    { key: "lab",       icon: (a) => <LabIcon active={a} />,      label: d.navLab },
    { key: "settings",  icon: (a) => <SettingsIcon active={a} />, label: d.navSettings },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 flex border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 pb-[env(safe-area-inset-bottom)]">
      {tabs.map(({ key, icon, label }) => {
        const isActive = active === key;
        return (
          <button
            key={key}
            onClick={() => setActive(key)}
            className="flex-1 flex flex-col items-center justify-center gap-0.75 py-2 min-h-13 cursor-pointer"
          >
            {icon(isActive)}
            <span
              className="text-[9.5px] font-medium"
              style={{ color: isActive ? "#22D3EE" : undefined }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
