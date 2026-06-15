import ru from "@/locales/ru.json";

interface CTASectionProps {
  onRegisterClick: () => void;
}

export default function CTASection({ onRegisterClick }: CTASectionProps) {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-10 px-8 py-12 text-center">
      <h2 className="text-[26px] font-medium text-slate-900 dark:text-slate-100 mb-2.5">
        {ru.cta.title}
      </h2>
      <p className="text-[13px] text-slate-500 dark:text-slate-400 mb-7">
        {ru.cta.subtitle}
      </p>
      <button
        onClick={onRegisterClick}
        className="bg-cyan-400 text-slate-950 border-none rounded-[9px] px-8 py-3.5 text-[15px] font-medium cursor-pointer"
      >
        {ru.cta.button}
      </button>
    </div>
  );
}
