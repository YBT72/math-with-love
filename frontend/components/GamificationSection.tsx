import ru from "@/locales/ru.json";

// XP star icon (for the cyan gamification card)
function StarIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="text-cyan-700 dark:text-cyan-400"
    >
      <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
    </svg>
  );
}

const ICON_BG: Record<string, string> = {
  amber: "bg-amber-400/10",
  cyan: "bg-cyan-100 dark:bg-cyan-900",
  green: "bg-green-400/10",
};

export default function GamificationSection() {
  return (
    <div className="max-w-275 mx-auto px-8 pt-10">
      <div className="text-[9px] font-medium uppercase tracking-widest text-slate-400 dark:text-slate-600 mb-1.5">
        {ru.gamification.sectionLabel}
      </div>
      <div className="text-xl font-medium text-slate-900 dark:text-slate-100 mb-1.25">
        {ru.gamification.title}
      </div>
      <div className="text-[13px] text-slate-500 dark:text-slate-400 mb-5">
        {ru.gamification.subtitle}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {ru.gamification.items.map((item) => (
          <div
            key={item.title}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 flex items-center gap-3.5"
          >
            {/* Icon */}
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${ICON_BG[item.type]}`}
            >
              {item.emoji ? (
                <span className="text-xl">{item.emoji}</span>
              ) : (
                <StarIcon />
              )}
            </div>

            {/* Text */}
            <div>
              <div className="text-xs font-medium text-slate-900 dark:text-slate-100">
                {item.title}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.75">
                {item.subtitle}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
