"use client";

import { useEffect } from "react";
import { useLocale } from "@/lib/LanguageContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// TODO: connect Supabase Auth — replace stub with real login form
export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { t } = useLocale();
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[14px] px-8 py-8 w-full max-w-sm text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-10 rounded-full bg-cyan-400 flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-5 h-5 fill-slate-950"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L8 8H4l4 4-2 6 6-3 6 3-2-6 4-4h-4z" />
          </svg>
        </div>

        <h2 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
          {t.loginModal.title}
        </h2>

        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
          {t.loginModal.notice}
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-600 mb-6">
          {/* TODO: connect Supabase */}
          Auth is currently disabled
        </p>

        <button
          onClick={onClose}
          className="w-full bg-cyan-400 text-slate-950 font-medium rounded-[9px] py-2.5 text-sm cursor-pointer"
        >
          {t.loginModal.close}
        </button>
      </div>
    </div>
  );
}
