'use client'

import { createClient } from '@/lib/supabase'

export default function LoginPage() {
  async function handleGoogleLogin() {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  const searchParams = typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search)
    : null
  const hasError = searchParams?.get('error') === 'auth_failed'

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="bg-slate-900 rounded-2xl p-10 flex flex-col items-center gap-6 shadow-2xl w-full max-w-sm border border-slate-800">

        {/* Logo */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-4xl font-bold text-slate-100 tracking-tight">
            Math <span className="text-cyan-400">With Love</span>
          </span>
          <span className="text-slate-400 text-sm">Векторная математика</span>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-slate-800" />

        {/* Error message */}
        {hasError && (
          <div className="w-full bg-red-400/10 border border-red-400/40 rounded-lg px-4 py-3 text-red-400 text-sm text-center">
            Ошибка входа. Попробуй ещё раз.
          </div>
        )}

        {/* Google button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-slate-700 hover:bg-slate-600 border border-slate-600 text-slate-100 font-medium py-3 px-6 rounded-xl transition-colors duration-200"
        >
          <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
            <path d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.332 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" fill="#FFC107"/>
            <path d="M6.306 14.691l6.571 4.819C14.655 15.108 19.001 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" fill="#FF3D00"/>
            <path d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.311 0-9.818-3.555-11.31-8.42l-6.525 5.025C9.505 39.556 16.227 44 24 44z" fill="#4CAF50"/>
            <path d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l6.19 5.238C42.021 35.394 44 30 44 24c0-1.341-.138-2.65-.389-3.917z" fill="#1976D2"/>
          </svg>
          Войти через Google
        </button>

        <p className="text-slate-500 text-xs text-center">
          Только для учеников Math With Love
        </p>
      </div>
    </div>
  )
}
