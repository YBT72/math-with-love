import ru from "@/locales/ru.json";

export default function Footer() {
  return (
    <footer className="px-8 py-[18px] text-center text-[11px] text-slate-400 dark:text-slate-600 border-t border-slate-200 dark:border-slate-800">
      {ru.footer.text}
    </footer>
  );
}
