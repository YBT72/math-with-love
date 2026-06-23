"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/lib/LanguageContext";

// TODO: connect to router for real navigation

function SidebarToggleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-[1.75]">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-[1.75]">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  );
}

function BooksIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-[1.75]">
      <path d="M4 19V5a2 2 0 012-2h13v16H6a2 2 0 000 4h13v-2" />
      <path d="M8 7h6M8 11h6" />
    </svg>
  );
}

function ProgressIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-[1.75]">
      <rect x="3" y="12" width="4" height="9" rx="1" />
      <rect x="10" y="7" width="4" height="14" rx="1" />
      <rect x="17" y="3" width="4" height="18" rx="1" />
    </svg>
  );
}

function EditorIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-[1.75]">
      <path d="M14 3v4a1 1 0 001 1h4" />
      <path d="M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z" />
      <path d="M10 13l-1 4 4-1 5-5-3-3z" />
      <path d="M13.5 10.5l3 3" />
    </svg>
  );
}

function MathIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-[1.75]">
      {/* sqrt symbol: √ with overline */}
      <polyline points="2,14 6,14 9,20 14,4 17,4" />
      <line x1="14" y1="4" x2="22" y2="4" />
    </svg>
  );
}

function LabIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-[1.75]">
      {/* 3D coordinate axes X/Y/Z */}
      <path d="M12 20V4" />
      <path d="M4 12h16" />
      <path d="M12 4L9 7M12 4L15 7" />
      <path d="M20 12l-3-3M20 12l-3 3" />
      <path d="M12 20l-2-3M12 20l2-3" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-[1.75]">
      <path d="M8 21h8M12 17v4" />
      <path d="M7 3H5a2 2 0 00-2 2v1a4 4 0 004 4h1" />
      <path d="M17 3h2a2 2 0 012 2v1a4 4 0 01-4 4h-1" />
      <path d="M7 3h10v8a5 5 0 01-10 0V3z" />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-[1.75]">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
      <circle cx="12" cy="17" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function GraphIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-[1.75]">
      <circle cx="5" cy="6" r="2" />
      <circle cx="19" cy="6" r="2" />
      <circle cx="12" cy="18" r="2" />
      <path d="M7 6h10" />
      <path d="M14 18H7a2 2 0 01-2-2v-6" />
    </svg>
  );
}

function AtomEditorIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-[1.75]">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 9h8" />
      <path d="M8 13h6" />
    </svg>
  );
}

function GroupsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-[1.75]">
      <rect x="3" y="4" width="7" height="7" rx="1.5" />
      <rect x="14" y="4" width="7" height="7" rx="1.5" />
      <rect x="3" y="13" width="7" height="7" rx="1.5" />
      <rect x="14" y="13" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function ExamIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-[1.75]">
      <path d="M4 20h4l10.5-10.5a2.8 2.8 0 10-4-4L4 16v4" />
      <path d="M13.5 6.5l4 4" />
      <path d="M15 19l2 2 4-4" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-[1.75]">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );
}

type TopNavKey = "dashboard" | "modules" | "progress" | "content";
type SubNavKey = "graph" | "atom" | "groups" | "exam";

type NavItem = { key: TopNavKey; icon: React.ReactNode; label: string };
type SubNavItem = { key: SubNavKey; icon: React.ReactNode; label: string };

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [activeTop, setActiveTop] = useState<TopNavKey>("dashboard");
  const [activeSub, setActiveSub] = useState<SubNavKey>("graph");
  const { t } = useLocale();
  const d = t.dashboard;

  useEffect(() => {
    const saved = window.localStorage.getItem("mwl.sidebar.open");
    if (saved === "1") {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("mwl.sidebar.open", open ? "1" : "0");
  }, [open]);

  const NAV_TOP = [
    { key: "dashboard", icon: <HomeIcon />, label: d.navDashboard },
    { key: "modules", icon: <BooksIcon />, label: d.navModules },
    { key: "progress", icon: <ProgressIcon />, label: d.navProgress },
    { key: "content", icon: <EditorIcon />, label: d.navContent },
  ] satisfies NavItem[];

  const NAV_CONTENT = [
    { key: "graph", icon: <GraphIcon />, label: d.subGraph },
    { key: "atom", icon: <AtomEditorIcon />, label: d.subAtomEditor },
    { key: "groups", icon: <GroupsIcon />, label: d.subGroups },
    { key: "exam", icon: <ExamIcon />, label: d.subExam },
  ] satisfies SubNavItem[];

  const NAV_MID = [
    { icon: <MathIcon />, label: d.navFormulas },
    { icon: <LabIcon />, label: d.navLab },
    { icon: <TrophyIcon />, label: d.navAchievements },
  ] as const;

  const NAV_BOT = [
    { icon: <HelpIcon />, label: d.navHelp },
    { icon: <SettingsIcon />, label: d.navSettings },
  ] as const;

  const handleTopClick = (key: TopNavKey) => {
    if (key === "content") {
      setActiveTop("content");
      if (!open) {
        setOpen(true);
      }
      return;
    }

    setActiveTop(key);
  };

  const handleSubClick = (key: SubNavKey) => {
    setActiveTop("content");
    setActiveSub(key);
  };

  const itemClass = (active: boolean) =>
    [
      "flex items-center h-[38px] rounded-lg cursor-pointer whitespace-nowrap overflow-hidden transition-colors",
      active
        ? "text-cyan-400"
        : "text-slate-500 dark:text-slate-500 hover:text-slate-400 dark:hover:text-slate-400",
    ].join(" ");

  const subItemClass = (active: boolean) =>
    [
      "flex items-center gap-2 px-2 py-1.5 rounded-md text-[11.5px] whitespace-nowrap transition-colors",
      active
        ? "text-cyan-400 font-semibold"
        : "text-slate-500 dark:text-slate-500 hover:text-slate-400 dark:hover:text-slate-400",
    ].join(" ");

  const labelClass = open
    ? "text-[12px] font-medium opacity-100 transition-opacity duration-150"
    : "text-[12px] font-medium opacity-0 w-0 transition-opacity duration-150";

  return (
    <aside
      className={[
        "flex flex-col shrink-0 border-r transition-[width] duration-200 overflow-hidden",
        "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800",
        open ? "w-41" : "w-11.5",
      ].join(" ")}
    >
      {/* Toggle */}
      <div
        className="w-11.5 h-9.5 flex items-center justify-center mt-1 mb-2 rounded-lg cursor-pointer text-slate-500 dark:text-slate-500 hover:text-slate-400 dark:hover:text-slate-400"
        onClick={() => setOpen((v) => !v)}
      >
        <SidebarToggleIcon />
      </div>

      {/* Top nav: Дашборд / Модули / Прогресс */}
      <div className="flex flex-col gap-0.5 px-0">
        {NAV_TOP.map((item) => (
          <button key={item.key} className={itemClass(activeTop === item.key)} onClick={() => handleTopClick(item.key)}>
            <span className="w-11.5 h-9.5 flex items-center justify-center shrink-0">{item.icon}</span>
            <span className={labelClass}>{item.label}</span>
          </button>
        ))}

        {open && activeTop === "content" && (
          <div className="flex flex-col gap-1 ps-3.5 mt-1 mb-2">
            {NAV_CONTENT.map((item) => (
              <button key={item.key} className={subItemClass(activeSub === item.key)} onClick={() => handleSubClick(item.key)}>
                <span className="w-3.5 h-3.5 shrink-0">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Mid nav: Формулы / Лаборатория / Достижения — centered vertically */}
      <div className="flex flex-col gap-0.5 px-0 flex-1 justify-center">
        {NAV_MID.map((item) => (
          <div key={item.label} className={itemClass(false)}>
            <span className="w-11.5 h-9.5 flex items-center justify-center shrink-0">{item.icon}</span>
            <span className={labelClass}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Bottom nav: Помощь / Настройки */}
      <div className="flex flex-col gap-0.5 px-0 mb-2">
        {NAV_BOT.map((item) => (
          <div key={item.label} className={itemClass(false)}>
            <span className="w-11.5 h-9.5 flex items-center justify-center shrink-0">{item.icon}</span>
            <span className={labelClass}>{item.label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
