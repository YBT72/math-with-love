# MWL — Math With Love · CLAUDE.md
# Auto-loaded by Claude Code on every session. Keep this file accurate and concise.
# Full specs live in the controlling documents listed below — read them per task.

---

## Project identity
Educational platform for Israeli high school students preparing for the Bagrut math exam
(5 units, exams 571/572, focus on vectors and complex numbers).
Bilingual: Russian (author/admin UI) · Hebrew (student-facing). Full RTL/LTR support.
Solo developer: יגאל (Yigal). Claude acts as implementer; יגאל is art director and QA.

---

## Repository & local paths
- GitHub: YBT72/math-with-love · branch: main
- Local root: /Users/ybt/Desktop/mathwithlove/math-site/
- Frontend: /Users/ybt/Desktop/mathwithlove/math-site/frontend/
- Backend:  /Users/ybt/Desktop/mathwithlove/math-site/backend/
- HTML mockups (design reference): /Users/ybt/Desktop/mathwithlove/math-site/mwl_*.html
- Legacy visualizations (reference only): /Users/ybt/Desktop/mathwithlove/math-site/_old/
- Deployed: math-with-love-sandy.vercel.app

---

## Tech stack
- Frontend: Next.js 14 · TypeScript strict · Tailwind CSS → Vercel
- Backend:  Python 3.12 · FastAPI · Uvicorn → Railway
- Database: Supabase PostgreSQL (Frankfurt region)
- Auth:     Supabase Auth + Google OAuth
- Icons:    Tabler Icons CDN (mockups only) · inline SVG (production)
- Formulas: MathLive web component <math-field> — sole external CDN dependency
- 3D:       React Three Fiber (deferred — lab phase only)

---

## Frontend structure (Next.js App Router)
frontend/
  app/
    auth/callback/     ← Supabase OAuth callback
    dashboard/         ← Student dashboard (Phase 1)
    login/             ← Login page (separate page, not modal)
    test-supabase/     ← Dev test route
  components/
    dashboard/         ← Dashboard components
  lib/                 ← Supabase client, helpers
  locales/             ← ru.json · he.json (all UI strings go here)
  public/
    professor/         ← Yosi assets: yosi-{present,happy,thinking,encourage,icon}_{ltr,rtl}.png
                          Also: standard-small-icons-transparent-{ltr,rtl}/ (sized variants)
                          SVG icons: 03-detailed-outline-svg-icons-no-fill/

---

## Backend structure
backend/
  main.py              ← FastAPI entry point
  venv/                ← Python virtualenv (not in git)

---

## Dev commands
Frontend: cd frontend && npm run dev          → localhost:3000
Backend:  cd backend && source venv/bin/activate && uvicorn main:app --reload  → localhost:8000

---

## Controlling documents — READ BEFORE IMPLEMENTING
Each document covers a specific domain. Load only what you need for the current task.

| File                        | Covers                                              |
|-----------------------------|-----------------------------------------------------|
| ARCHITECTURE.md             | Shell layout, routes, auth, state, phases           |
| DESIGN_SYSTEM.md            | Tokens, components, header/sidebar standards, RTL   |
| NAVIGATION.md               | All routes, page transitions, shells                |
| PLAN.md                     | Phase roadmap, current status, what's next          |
| BACKLOG.md                  | Deferred tasks, known issues                        |
| MWL_CONTENT_ARCHITECTURE.md | Content model: atoms, groups, graph, exam schema    |
| DATABASE.md                 | Supabase schema: all tables, fields, RLS rules      |
| MULTILANG.md                | i18n: UI strings + content auto-translation rules   |

---

## Current phase (July 2026)
Phases 0.5 + 0.6 COMPLETE — all HTML mockups done (~45 files).
Next: Phase 1 — Next.js Dashboard implementation.
Before Phase 1: agree on Supabase schema (atoms, progress, profiles).

HTML mockups are design reference — do NOT modify them.
Do NOT port mockup-only elements into Next.js:
  .ctrl-bar · .tcb · theme/lang toggle buttons · sim-bar

---

## User roles
profiles.role: 'student' | 'author' | 'admin'
Authors can toggle into student-preview mode (persistent banner).

---

## Content model (summary)
Fundamental unit: ATOM (theory + comprehension check + exercises + test).
Atoms connect via prerequisite edges → graph structure.
Groupings (topics, blocks) are tag/filter overlays on a flat graph.
Student-facing "labyrinth" (maze) = dynamic projection of graph filtered by progress state.
Exam structure = separately authored schema (Israeli bagrut format).
See MWL_CONTENT_ARCHITECTURE.md for full detail.

---

## Code rules — MANDATORY
- All code comments in English only
- TypeScript strict mode · no `any`
- All UI strings via useLocale() → t.* (never hardcoded)
- CSS: logical properties only (padding-inline-*, margin-inline-*, border-inline-*)
  NEVER use physical left/right for layout — RTL must work from day one
- One file / one component per task — no parallel multi-file changes
- Show no code until task is fully understood and discussed

---

## i18n pattern (HTML mockups → reference for Next.js)
TR objects with ru/he keys.
setLang() references lgItemRu/lgItemHe.
applyLang() must sync globe dropdown state on load.
Atom content fields: descRu and descHe stored separately (never a single desc field).

---

## Header standard (both shells)
3-column CSS grid (1fr auto 1fr):
  LEFT:   [Logo] [Brand name]
  CENTER: [Search]
  RIGHT:  [Globe-dropdown] [Bell] [Avatar-dropdown]
Avatar dropdown: Display name / Email / divider / Профиль / Настройки / divider / Выйти

---

## Student sidebar
Groups: Main (Главная/Курсы/Статус/Достижения) · Tools (Формулы/Лаборатория) · System (Помощь/Настройки)

## Student mobile bottom nav
5 items: [Главная][Курсы][Статус][Лаборатория][Помощь→popup]
"Помощь" opens context popup (not bottom sheet) with: Формулы · Диалог с Йоси

## Constructor sidebar (author shell)
Items: Главная/Шейлоны/Группы/Атом/Экзамен/Граф // Лаборатория // Помощь/Настройки
No submenus. Desktop only (no tablet/mobile constructor shell).

---

## Three.js coordinate system (Lab / visualizations)
- Math system: X=East, Y=Up, Z=South — ALL data stored in math coordinates
- ALL calculations in math coordinates
- ONLY convert to Three.js for rendering via mathToThree()
- ONLY raycasting converts back via threeToMath()
- eval() replaced by callFn() dispatcher (Safari/sandbox compatibility)

---

## Professor Yosi (mascot)
Cartoon professor — MWL guide and logo.
Assets: frontend/public/professor/
  yosi-present_{ltr,rtl}.png   ← default, presenting vector arrow
  yosi-happy_{ltr,rtl}.png     ← correct answer
  yosi-thinking_{ltr,rtl}.png  ← new problem / loading
  yosi-encourage_{ltr,rtl}.png ← wrong answer, keep trying
  yosi-icon_{ltr,rtl}.png      ← head only, avatar/favicon
Color palette: teal #22D3EE · amber #FBBF24

---

## Known critical bugs / learnings
- Sidebar shift bug: caused by margin:0 auto + padding changes on open. Fix: use etalon CSS verbatim.
- .hico border fix: must use explicit .d .hico{border-color:#64748b;color:#94a3b8} — currentColor breaks.
- JS injection: use c.rfind('</script>') (last occurrence) — first occurrence breaks external script tags.
- CSS help menu: must be inside <style>, not after </style>.
- RTL positioning: use inset-inline-end, not physical right.
- Globe dropdown inactive color: .d .lg-item{color:#94a3b8}
- Inactive bottom nav icon: #64748b (not #475569)
- navHome TR key: 'Главная'/'ראשי' — not 'Дашборд'

---

## Etalon reference files
Two shells — each has its own etalon:
- Constructor shell: mwl_shalon_manager_desktop.html — header + author sidebar + i18n pattern
- Student shell:     mwl_dashboard_desktop.html      — header + student sidebar + i18n pattern

Both share the same header standard and i18n mechanism.
Sidebar content (nav items) differs — use the correct etalon for each shell.
All shell files must match their etalon exactly. No cosmetic approximations.

---

*Updated: 2026-07-11*
