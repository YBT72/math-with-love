"use client";

import { useState, useEffect, useRef } from "react";
import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "../../contexts/LocaleContext";

// localStorage key for persisted collapsed state
const STORAGE_KEY = "mwl-sidebar-collapsed";

interface StudentSidebarProps {
  onHelpClick?: () => void;
}

// A single navigation entry.
// href → route link. action "help" → button that calls onHelpClick.
interface NavItem {
  key: string;
  icon: ReactNode;
  href?: string;
  action?: "help";
}

// ── Icons (Tabler paths) — 18x18, stroke currentColor, strokeWidth 1.5 ──
const iconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function HomeIcon() {
  return (
    <svg {...iconProps}>
      <path d="M5 12l-2 0l9-9l9 9l-2 0" />
      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
      <path d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6" />
    </svg>
  );
}

function CoursesIcon() {
  return (
    <svg {...iconProps}>
      <path d="M22 9l-10-4l-10 4l10 4l10-4v6" />
      <path d="M6 10.6v5.4a6 6 0 0 0 12 0v-5.4" />
    </svg>
  );
}

function StatusIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 11m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
      <path d="M12 2a7 7 0 0 1 7 7c0 4-7 13-7 13S5 13 5 9a7 7 0 0 1 7-7" />
    </svg>
  );
}

function AchievementsIcon() {
  return (
    <svg {...iconProps}>
      <path d="M8 21l8 0" />
      <path d="M12 17l0 4" />
      <path d="M7 4l10 0" />
      <path d="M17 4v8a5 5 0 0 1-10 0v-8" />
      <path d="M5 9a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2" />
      <path d="M19 9a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2" />
    </svg>
  );
}

// Formulas uses a Sigma glyph instead of an SVG icon.
function FormulasIcon() {
  return <span className="sb-sigma">Σ</span>;
}

function LabIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="1" />
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 17l0 .01" />
      <path d="M12 13.5a1.5 1.5 0 0 1 1-1.415a2.5 2.5 0 1 0-3-2.4" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06 .06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function LayoutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M9 3v18"/>
    </svg>
  );
}

// Three visual groups, separated by spacing (not divider lines).
const GROUP_1: NavItem[] = [
  { key: "navHome", href: "/dashboard", icon: <HomeIcon /> },
  { key: "navCourses", href: "/courses", icon: <CoursesIcon /> },
  { key: "navStatus", href: "/status", icon: <StatusIcon /> },
  { key: "navAchievements", href: "/achievements", icon: <AchievementsIcon /> },
];

const GROUP_2: NavItem[] = [
  { key: "navFormulas", href: "/formulas", icon: <FormulasIcon /> },
  { key: "navLab", href: "/lab", icon: <LabIcon /> },
];

const GROUP_3: NavItem[] = [
  { key: "navHelp", action: "help", icon: <HelpIcon /> },
  { key: "navSettings", href: "/settings", icon: <SettingsIcon /> },
];

export default function StudentSidebar({ onHelpClick }: StudentSidebarProps) {
  const { t } = useLocale();
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLElement>(null);

  // Default collapsed on the server to avoid a hydration mismatch;
  // the persisted value is read from localStorage after mount.
  const [collapsed, setCollapsed] = useState<boolean>(true);

  // Fixed-position tooltip shown on hover while collapsed.
  const [tooltip, setTooltip] = useState<{
    label: string;
    x: number;
    y: number;
    dir: string;
  } | null>(null);

  // Update state and persist to localStorage.
  const persistCollapsed = (value: boolean): void => {
    setCollapsed(value);
    try {
      localStorage.setItem(STORAGE_KEY, String(value));
    } catch {
      // Ignore storage access errors (e.g. private mode).
    }
  };

  // Hydrate collapsed state from localStorage on mount.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        setCollapsed(stored === "true");
      }
    } catch {
      // Ignore storage access errors.
    }
  }, []);

  // Collapse when clicking outside the sidebar while it is expanded.
  useEffect(() => {
    function handleMouseDown(e: MouseEvent): void {
      if (
        !collapsed &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        persistCollapsed(true);
      }
    }
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [collapsed]);

  // Active route detection: /dashboard is exact; others match by prefix.
  const isActive = (href?: string): boolean => {
    if (!href) return false;
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  // Show the fixed tooltip for a nav item while collapsed, anchored to its
  // vertical center via getBoundingClientRect().
  const handleItemEnter = (
    e: ReactMouseEvent<HTMLElement>,
    item: NavItem
  ): void => {
    if (!collapsed) return;
    const r = e.currentTarget.getBoundingClientRect();
    // r.right/r.left are physical edges. Pick the edge facing the content area
    // based on document direction so the tooltip never lands off-screen.
    const dir = document.documentElement.dir;
    const x = dir === "rtl" ? r.left - 8 : r.right + 8;
    setTooltip({ label: t(item.key), x, y: r.top + r.height / 2, dir });
  };

  const handleItemLeave = (): void => setTooltip(null);

  // Render the shared inner content of a nav entry (icon + label).
  const renderInner = (item: NavItem): ReactNode => (
    <>
      <span className="sb-icon-wrap">{item.icon}</span>
      <span className="sb-label">{t(item.key)}</span>
    </>
  );

  // Render one nav entry as a Link or a button depending on its type.
  const renderItem = (item: NavItem): ReactNode => {
    if (item.action === "help") {
      return (
        <button
          key={item.key}
          type="button"
          className="sb-item"
          onClick={() => onHelpClick?.()}
          onMouseEnter={(e) => handleItemEnter(e, item)}
          onMouseLeave={handleItemLeave}
        >
          {renderInner(item)}
        </button>
      );
    }
    const active = isActive(item.href);
    return (
      <Link
        key={item.key}
        href={item.href ?? "#"}
        className={`sb-item${active ? " active" : ""}`}
        onMouseEnter={(e) => handleItemEnter(e, item)}
        onMouseLeave={handleItemLeave}
      >
        {renderInner(item)}
      </Link>
    );
  };

  return (
    <>
    <nav ref={sidebarRef} className={`sb${collapsed ? " collapsed" : ""}`}>
      {/* Collapse / expand toggle */}
      <button
        type="button"
        className="sb-toggle"
        onClick={() => persistCollapsed(!collapsed)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <LayoutIcon />
      </button>

      {/* Group 1 — Main */}
      <div className="sb-group">{GROUP_1.map(renderItem)}</div>

      {/* Group 2 — Tools */}
      <div className="sb-group sb-group-2">{GROUP_2.map(renderItem)}</div>

      {/* Group 3 — System (pushed to the bottom) */}
      <div className="sb-group sb-group-3">{GROUP_3.map(renderItem)}</div>
    </nav>

    {/* Fixed-position tooltip, rendered outside the (overflow-hidden) nav. */}
    {tooltip && collapsed && (
      <div
        className="sb-tooltip-fixed"
        style={{
          top: tooltip.y,
          left: tooltip.x,
          transform:
            tooltip.dir === "rtl"
              ? "translateX(-100%) translateY(-50%)"
              : "translateY(-50%)",
        }}
      >
        {tooltip.label}
      </div>
    )}
    </>
  );
}
