"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "@/lib/LanguageContext";

type TopicStatus = "done" | "current" | "locked" | "available";
type NodeType = "lesson" | "test" | "exam";

type Topic = {
  name: string;
  status: TopicStatus;
  xp: number;
};

const PER_ROW = 4;
const R = 20;

const NODE_COLOR: Record<NodeType, string> = {
  lesson: "#22D3EE",
  test:   "#FBBF24",
  exam:   "#a78bfa",
};

const NODE_ICON: Record<NodeType, string> = {
  lesson: "📖",
  test:   "📝",
  exam:   "🎓",
};

const NODE_BASE_XP: Record<NodeType, number> = {
  lesson: 10,
  test:   30,
  exam:   100,
};

const HEX_RGB: Record<string, string> = {
  "#22D3EE": "34,211,238",
  "#FBBF24": "251,191,36",
  "#a78bfa": "167,139,250",
};

function getNodeType(name: string, index: number, total: number): NodeType {
  if (index === total - 1) return "exam";
  const n = name.toLowerCase();
  if (n.startsWith("тест") || n.startsWith("מבדק") || n.startsWith("test")) return "test";
  return "lesson";
}

function nodePos(i: number, n: number, W: number): { x: number; y: number } {
  const cols = Math.min(PER_ROW, n);
  const px = 34, py = 38;
  const cw = cols > 1 ? (W - px * 2) / (cols - 1) : 0;
  const ch = 76;
  const row = Math.floor(i / cols);
  let col = i % cols;
  if (row % 2 === 1) col = cols - 1 - col;
  return { x: px + col * cw, y: py + row * ch };
}

function svgHeight(n: number): number {
  return Math.max(Math.ceil(n / PER_ROW) * 76 + 38, 90);
}

function CourseMaze({ topics, isDark }: { topics: Topic[]; isDark: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(300);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      setWidth(Math.max(entries[0].contentRect.width - 24, 80));
    });
    ro.observe(el);
    setWidth(Math.max(el.clientWidth - 24, 80));
    return () => ro.disconnect();
  }, []);

  const n = topics.length;
  if (n === 0) return null;

  const W = width;
  const H = svgHeight(n);
  const bg = isDark ? "#0f172a" : "#f8fafc";
  const types = topics.map((tp, i) => getNodeType(tp.name, i, n));
  const positions = Array.from({ length: n }, (_, i) => nodePos(i, n, W));

  // Shortcuts: test -> next test/exam
  const shortcuts: Record<number, number> = {};
  for (let i = 0; i < n; i++) {
    if (types[i] === "test") {
      for (let j = i + 1; j < n; j++) {
        if ((types[j] === "test" || types[j] === "exam") && j > i + 1) {
          shortcuts[i] = j;
          break;
        }
      }
    }
  }

  return (
    <div ref={containerRef} className="w-full">
      <svg
        width="100%"
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        className="overflow-visible"
      >
        <defs>
          <marker id="arD" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,1 L7,4 L0,7" fill="none" stroke="#22D3EE" strokeWidth="1.5" />
          </marker>
        </defs>

        {/* Shortcut dashed lines */}
        {Object.entries(shortcuts).map(([from, to]) => {
          const a = positions[Number(from)];
          const b = positions[Number(to)];
          const cpx = (a.x + b.x) / 2 + (b.y !== a.y ? 24 : 0);
          const cpy = (a.y + b.y) / 2 + (b.y > a.y ? 20 : -20);
          return (
            <g key={`sc-${from}`}>
              <path
                d={`M${a.x},${a.y} Q${cpx},${cpy} ${b.x},${b.y}`}
                fill="none"
                stroke="rgba(100,116,139,0.28)"
                strokeWidth="1.5"
                strokeDasharray="4,3"
              />
            </g>
          );
        })}

        {/* Main path lines */}
        {Array.from({ length: n - 1 }, (_, i) => {
          const a = positions[i];
          const b = positions[i + 1];
          const dx = b.x - a.x, dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 1) return null;
          const nx = dx / dist, ny = dy / dist;
          const gap = R + 6;
          const x1 = a.x + nx * gap, y1 = a.y + ny * gap;
          const x2 = b.x - nx * gap, y2 = b.y - ny * gap;
          const segDone =
            topics[i].status === "done" &&
            (topics[i + 1].status === "done" || topics[i + 1].status === "current");
          return segDone ? (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#22D3EE" strokeWidth="3" markerEnd="url(#arD)" />
          ) : (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="rgba(100,116,139,0.18)" strokeWidth="1.5" />
          );
        })}

        {/* Nodes */}
        {topics.map((topic, i) => {
          const p = positions[i];
          const type = types[i];
          const tc = NODE_COLOR[type];
          const rgb = HEX_RGB[tc] ?? "100,116,139";
          const st = topic.status;
          const isDone   = st === "done";
          const isCur    = st === "current";
          const isNext   = st === "available";
          const isLocked = st === "locked";

          const ringColor = isCur ? tc : isNext ? `${tc}99` : "rgba(100,116,139,0.2)";
          const ringWidth = isCur ? 2.5 : isNext ? 1.5 : 1;
          const fillOpacity = isCur ? 0.16 : isNext ? 0.08 : 0.02;
          const xpLabel = isDone
            ? (topic.xp > 0 ? `${topic.xp}★` : "")
            : `${NODE_BASE_XP[type]}★`;
          const labelText = topic.name.length > 14
            ? topic.name.substring(0, 13) + "…"
            : topic.name;
          const labelColor = isDone || isCur || isNext ? tc : "rgba(100,116,139,0.3)";

          return (
            <g
              key={topic.name}
              style={{ cursor: isLocked ? "default" : "pointer" }}
              onClick={() => !isLocked && console.log(`[TODO] Navigate to: ${topic.name}`)}
            >
              {/* Background mask to hide lines under node */}
              <circle cx={p.x} cy={p.y} r={R + 5} fill={bg} />

              {isDone ? (
                <>
                  <circle cx={p.x} cy={p.y} r={R + 1} fill={tc} />
                  <text x={p.x} y={p.y - 3} textAnchor="middle" dominantBaseline="middle"
                    fontSize="13" fill="#0f172a" fontWeight="700">✓</text>
                  {topic.xp > 0 && (
                    <text x={p.x} y={p.y + 10} textAnchor="middle" dominantBaseline="middle"
                      fontSize="8" fill="#0f172a" fontWeight="600">{topic.xp}★</text>
                  )}
                </>
              ) : (
                <>
                  <circle cx={p.x} cy={p.y} r={R + 1} fill="none"
                    stroke={ringColor} strokeWidth={ringWidth}
                    strokeDasharray={isLocked ? "3,3" : undefined} />
                  <circle cx={p.x} cy={p.y} r={R}
                    fill={`rgba(${rgb},${fillOpacity})`} />
                  <text x={p.x} y={p.y - 4} textAnchor="middle" dominantBaseline="middle"
                    fontSize="12">{NODE_ICON[type]}</text>
                  <text x={p.x} y={p.y + 10} textAnchor="middle" dominantBaseline="middle"
                    fontSize="8" fontWeight="600"
                    fill={isLocked ? "rgba(100,116,139,0.22)" : tc}>{xpLabel}</text>
                </>
              )}

              {/* Label below node */}
              <text x={p.x} y={p.y + R + 16} textAnchor="middle"
                fontSize="8.5" fill={labelColor}>{labelText}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function statusDot(status: TopicStatus) {
  const colors: Record<TopicStatus, string> = {
    done:      "bg-green-400",
    current:   "bg-cyan-400",
    available: "bg-slate-400",
    locked:    "bg-slate-700 dark:bg-slate-700",
  };
  return `w-2 h-2 rounded-full shrink-0 ${colors[status]}`;
}

function statusBadge(status: TopicStatus, nowLabel: string) {
  if (status === "done")
    return <span className="text-[10px] bg-green-400/10 text-green-400 px-1.5 py-0.5 rounded-full">✓</span>;
  if (status === "current")
    return (
      <span className="text-[10px] bg-cyan-400/10 text-cyan-400 px-1.5 py-0.5 rounded-full border border-cyan-400/30">
        {nowLabel}
      </span>
    );
  if (status === "locked")
    return <span className="text-[11px] text-slate-600">🔒</span>;
  return null;
}

export default function TopicsAndPreview() {
  const { t } = useLocale();
  const d = t.dashboard;
  // TODO: connect Supabase — replace mock with real course data
  const courses = d.mockCourses.map((c, idx) => ({
    ...c,
    id: idx,
    topics: c.topics.map((tp) => ({ ...tp, status: tp.status as TopicStatus })),
  }));
  const [selectedCourse, setSelectedCourse] = useState(0);

  // Detect dark mode for maze background
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const mo = new MutationObserver(check);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  const course = courses[selectedCourse];

  return (
    <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-3">
      {/* Left: topics list */}
      <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl flex flex-col overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest text-start">
          {d.topicsTitle}
        </div>

        {/* Course tabs */}
        <div className="flex flex-col gap-0.5 px-2 py-2 border-b border-slate-100 dark:border-slate-800">
          {courses.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setSelectedCourse(i)}
              className={[
                "text-start w-full px-2 py-1.5 rounded-lg text-[11px] transition-colors",
                selectedCourse === i
                  ? "bg-cyan-400/10 text-cyan-400 font-medium"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800",
              ].join(" ")}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Topic items */}
        <div className="flex flex-col gap-0.5 px-2 py-2 overflow-y-auto">
          {course.topics.map((topic) => (
            <button
              key={topic.name}
              className={[
                "flex items-center gap-2 px-2 py-2 rounded-lg text-[11px] transition-colors text-start w-full",
                topic.status === "locked" ? "cursor-default opacity-50" : "cursor-pointer",
                "hover:bg-slate-100 dark:hover:bg-slate-800",
              ].join(" ")}
              onClick={() => topic.status !== "locked" && console.log(`[TODO] Navigate to: ${topic.name}`)}
            >
              <span className={statusDot(topic.status)} />
              <span
                className={
                  topic.status === "locked"
                    ? "text-slate-500 dark:text-slate-600"
                    : topic.status === "current"
                    ? "text-cyan-400"
                    : "text-slate-700 dark:text-slate-300"
                }
              >
                {topic.name}
              </span>
              <span className="ms-auto">{statusBadge(topic.status, d.topicStatusNow)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right: maze panel */}
      <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-800">
          <div className="text-[13px] font-medium text-slate-900 dark:text-slate-100 text-start">
            {course.name}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 shrink-0">
            {course.topics.filter((tp) => tp.status === "done").length}
            {" / "}
            {course.topics.length}
          </div>
        </div>

        {/* Maze */}
        <div className="flex-1 px-3 py-3 overflow-y-auto">
          <CourseMaze topics={course.topics} isDark={isDark} />
        </div>
      </div>
    </div>
  );
}
