"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "../../contexts/LocaleContext";

interface BottomNavProps {
  onYosiClick?: () => void;
}

// ── Icons (Tabler paths) — 20x20 viewport 24, stroke only, strokeWidth 1.5 ──
// Paths copied from StudentSidebar.tsx where applicable.

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.5}
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l-2 0l9-9l9 9l-2 0" />
      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
      <path d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6" />
    </svg>
  );
}

function CoursesIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.5}
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 9l-10-4l-10 4l10 4l10-4v6" />
      <path d="M6 10.6v5.4a6 6 0 0 0 12 0v-5.4" />
    </svg>
  );
}

function StatusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.5}
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 11m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
      <path d="M12 2a7 7 0 0 1 7 7c0 4-7 13-7 13S5 13 5 9a7 7 0 0 1 7-7" />
    </svg>
  );
}

function LabIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.5}
      strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1" />
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.5}
      strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 17l0 .01" />
      <path d="M12 13.5a1.5 1.5 0 0 1 1-1.415a2.5 2.5 0 1 0-3-2.4" />
    </svg>
  );
}

function FormulasIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.5}
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19V5h16" />
      <path d="M4 15l4-4l3 3l4-5l4 3" />
    </svg>
  );
}

function YosiIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.5}
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 9h8" />
      <path d="M8 13h6" />
      <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-5l-5 3v-3H4a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3z" />
    </svg>
  );
}

export default function BottomNav({ onYosiClick }: BottomNavProps) {
  const { t } = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [helpOpen, setHelpOpen] = useState(false);

  const isActive = (href: string): boolean => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const handleHelpPopupItem = (action: "formulas" | "yosi") => {
    setHelpOpen(false);
    if (action === "formulas") {
      router.push("/formulas");
    } else {
      onYosiClick?.();
    }
  };

  return (
    <nav className="bnav">
      {/* Home */}
      <button
        className={`bnav-tab${isActive("/dashboard") ? " active" : ""}`}
        onClick={() => router.push("/dashboard")}
        aria-label={t("navHome")}
      >
        <span className="bnav-icon"><HomeIcon /></span>
        <span className="bnav-label">{t("navHome")}</span>
      </button>

      {/* Courses */}
      <button
        className={`bnav-tab${isActive("/courses") ? " active" : ""}`}
        onClick={() => router.push("/courses")}
        aria-label={t("navCourses")}
      >
        <span className="bnav-icon"><CoursesIcon /></span>
        <span className="bnav-label">{t("navCourses")}</span>
      </button>

      {/* Status */}
      <button
        className={`bnav-tab${isActive("/status") ? " active" : ""}`}
        onClick={() => router.push("/status")}
        aria-label={t("navStatus")}
      >
        <span className="bnav-icon"><StatusIcon /></span>
        <span className="bnav-label">{t("navStatus")}</span>
      </button>

      {/* Lab */}
      <button
        className={`bnav-tab${isActive("/lab") ? " active" : ""}`}
        onClick={() => router.push("/lab")}
        aria-label={t("navLab")}
      >
        <span className="bnav-icon"><LabIcon /></span>
        <span className="bnav-label">{t("navLab")}</span>
      </button>

      {/* Help — popup trigger */}
      <button
        className="bnav-tab"
        onClick={() => setHelpOpen((v) => !v)}
        aria-label={t("navHelp")}
        style={{ position: "relative" }}
      >
        <span className="bnav-icon"><HelpIcon /></span>
        <span className="bnav-label">{t("navHelp")}</span>

        {helpOpen && (
          <div className="bnav-popup" onClick={(e) => e.stopPropagation()}>
            <button
              className="bnav-popup-item"
              onClick={() => handleHelpPopupItem("formulas")}
            >
              <FormulasIcon />
              {t("helpFormulas")}
            </button>
            <button
              className="bnav-popup-item"
              onClick={() => handleHelpPopupItem("yosi")}
            >
              <YosiIcon />
              {t("helpYosi")}
            </button>
          </div>
        )}
      </button>

      {/* Overlay to close popup on outside click */}
      {helpOpen && (
        <div className="bnav-overlay" onClick={() => setHelpOpen(false)} />
      )}
    </nav>
  );
}
