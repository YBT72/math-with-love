import ru from "@/locales/ru.json";

// SVG icons per module (from mockup)
const MODULE_ICONS = [
  // Module 1 — arrow right
  <svg key="1" viewBox="0 0 24 24" className="w-4.5 h-4.5 stroke-cyan-700 dark:stroke-cyan-400 fill-none stroke-2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>,
  // Module 2 — dot + rays
  <svg key="2" viewBox="0 0 24 24" className="w-4.5 h-4.5 stroke-cyan-700 dark:stroke-cyan-400 fill-none stroke-2">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
  </svg>,
  // Module 3 — grid
  <svg key="3" viewBox="0 0 24 24" className="w-4.5 h-4.5 stroke-cyan-700 dark:stroke-cyan-400 fill-none stroke-2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>,
];

type CourseItem = {
  tag: string;
  title: string;
  description: string;
  progress: number;
  active: boolean;
  locked: boolean;
};

function CourseCard({
  item,
  icon,
  index,
}: {
  item: CourseItem;
  icon: React.ReactNode;
  index: number;
}) {
  const base =
    "bg-white dark:bg-slate-900 rounded-[12px] p-4 relative";
  const border = item.active
    ? "border-2 border-cyan-400"
    : "border border-slate-200 dark:border-slate-800";
  const opacity = item.locked ? "opacity-45" : "";

  return (
    <div className={`${base} ${border} ${opacity}`}>
      {/* Badge */}
      {item.active && (
        <span className="absolute top-3 right-3 bg-cyan-400 text-slate-950 text-[9px] font-medium px-2 py-0.5 rounded-full">
          {ru.courses.activeBadge}
        </span>
      )}
      {item.locked && (
        <span className="absolute top-3 right-3 text-sm text-slate-600 dark:text-slate-600">
          🔒
        </span>
      )}

      {/* Icon */}
      <div className="w-9 h-9 bg-cyan-100 dark:bg-cyan-900 rounded-lg flex items-center justify-center mb-3">
        {icon}
      </div>

      {/* Tag */}
      <span className="inline-block bg-cyan-100 dark:bg-slate-950 border border-cyan-200 dark:border-cyan-400 rounded-full px-3 py-1 text-[11px] text-cyan-700 dark:text-cyan-400 font-medium mb-1.75">
        {item.tag}
      </span>

      {/* Title */}
      <div className="text-[13px] font-medium text-slate-900 dark:text-slate-100 mb-1">
        {item.title}
      </div>

      {/* Description */}
      <p className="text-xs text-slate-500 dark:text-slate-400 leading-[1.55] mb-3.5">
        {item.description}
      </p>

      {/* Progress bar */}
      <div className="h-0.75 bg-slate-100 dark:bg-slate-950 rounded-full mb-1.5">
        <div
          className="h-0.75 bg-cyan-400 rounded-full"
          style={{ width: `${item.progress}%` }}
        />
      </div>

      {/* Progress label */}
      <div className="text-[10px] text-slate-400 dark:text-slate-600">
        {item.locked
          ? ru.courses.lockedLabel
          : `${item.progress}% ${ru.courses.completedSuffix}`}
      </div>
    </div>
  );
}

export default function CoursesSection() {
  return (
    <div className="max-w-275 mx-auto px-8 pt-10">
      <div className="text-[9px] font-medium uppercase tracking-widest text-slate-400 dark:text-slate-600 mb-1.5">
        {ru.courses.sectionLabel}
      </div>
      <div className="text-xl font-medium text-slate-900 dark:text-slate-100 mb-1.25">
        {ru.courses.title}
      </div>
      <div className="text-[13px] text-slate-500 dark:text-slate-400 mb-5">
        {ru.courses.subtitle}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {ru.courses.items.map((item, index) => (
          <CourseCard
            key={item.tag}
            item={item}
            icon={MODULE_ICONS[index]}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
