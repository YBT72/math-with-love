# MWL — Technical Architecture

Reference document for Claude Code. Read before any implementation task.
Last updated: 07/07/2026.

---

## 1. Stack

| Layer | Technology | Hosting |
|---|---|---|
| Frontend | Next.js 14 + TypeScript + Tailwind CSS | Vercel |
| Backend | Python 3.12 + FastAPI + Uvicorn | Railway |
| Database | Supabase (PostgreSQL) — Frankfurt `krcghalxpcpjkeghfjkn` | Supabase EU |
| Auth | Supabase Auth + Google OAuth | Supabase |
| 3D | React Three Fiber (R3F) | — |
| Formula rendering | MathLive (`<math-field>` web component) | — |
| Repo | `YBT72/math-with-love`, branch `main` | GitHub |
| Local path | `/Users/ybt/Desktop/mathwithlove/math-site/` | — |

### Project structure on disk

```
math-site/
  frontend/          ← Next.js app
  backend/           ← FastAPI app
    venv/            ← Python virtualenv (not in git)
    main.py
    .env
  _old/              ← legacy files (reference only, do not touch)
  ARCHITECTURE.md    ← this file
  PLAN.md
  BACKLOG.md
  DESIGN_SYSTEM.md
  NAVIGATION.md
  MWL_CONTENT_ARCHITECTURE.md
```

---

## 2. Shell architecture (Next.js App Router)

**Critical rule:** Header, sidebar, and bottom nav are rendered ONCE in `layout.tsx`
and never remount on page transitions. Only `{children}` (the page content) changes.
Do NOT duplicate shell elements inside `page.tsx` files.

### Directory structure

```
frontend/
  app/
    layout.tsx                    ← root layout: fonts, theme provider, Supabase provider
    middleware.ts                 ← auth guard (see §4 Auth)

    (public)/                     ← unauthenticated routes
      page.tsx                    ← landing page /
      login/page.tsx              ← login/register modal trigger

    (student)/                    ← student shell
      layout.tsx                  ← StudentShell: Header + StudentSidebar + BottomNav
      dashboard/page.tsx          ← /dashboard
      courses/
        page.tsx                  ← /courses (level 1: catalog)
        [themeId]/
          page.tsx                ← /courses/[themeId] (level 2: modules)
          [moduleId]/page.tsx     ← /courses/[themeId]/[moduleId] (level 3: labyrinth)
      lesson/[atomId]/page.tsx    ← /lesson/[atomId]
      test/[atomId]/page.tsx      ← /test/[atomId]
      exam/[sessionId]/page.tsx   ← /exam/[sessionId]
      status/page.tsx             ← /status
      achievements/page.tsx       ← /achievements
      formulas/page.tsx           ← /formulas
      lab/page.tsx                ← /lab
      help/page.tsx               ← /help
      settings/page.tsx           ← /settings

    (constructor)/                ← author shell (role === 'author' only)
      layout.tsx                  ← ConstructorShell: Header + ConstructorSidebar
      dashboard/page.tsx          ← /constructor/dashboard
      shalon/page.tsx             ← /constructor/shalon
      groups/page.tsx             ← /constructor/groups
      atom/
        page.tsx                  ← /constructor/atom (new)
        [id]/page.tsx             ← /constructor/atom/[id]
      exam/page.tsx               ← /constructor/exam
      graph/page.tsx              ← /constructor/graph
      lab/page.tsx                ← /constructor/lab
      settings/page.tsx           ← /settings (shared)

    api/                          ← Next.js API routes (thin proxy to FastAPI)
      auth/
        callback/route.ts         ← Supabase OAuth callback (already implemented)
```

### Shell components

```
frontend/components/
  shell/
    StudentShell.tsx              ← wraps (student) layout
    ConstructorShell.tsx          ← wraps (constructor) layout
    Header.tsx                   ← shared header: logo + search + globe-dropdown + bell + avatar
    StudentSidebar.tsx            ← student sidebar (desktop/tablet only)
    ConstructorSidebar.tsx        ← constructor sidebar (desktop only)
    BottomNav.tsx                 ← mobile bottom nav (student only)
    GlobeDropdown.tsx             ← RU/HE language switcher
    AvatarDropdown.tsx            ← Profile / Settings / Logout
    AuthorBanner.tsx              ← persistent amber banner when author previews as student
```

### Student sidebar nav order (desktop/tablet)

```
Главная        → /dashboard        [home icon]
Курсы          → /courses          [graduation-cap icon]
Статус         → /status           [map-pin icon]
Достижения     → /achievements     [trophy icon]
Формулы        → /formulas         [Σ icon]
Лаборатория    → /lab              [atom icon]
──
Помощь         → opens Yosi AI Chat
Настройки      → /settings
```

### Mobile bottom nav order

```
Главная / Курсы / Статус / Лаборатория / Помощь
```

Tab "Помощь" opens Yosi AI Chat drawer (does not navigate).
Tab is amber-active while drawer is open; deactivates on close.

### Constructor sidebar nav order (desktop only — no tablet/mobile)

```
Главная        → /constructor/dashboard   [home icon]
Шейлоны        → /constructor/shalon      [book icon]
Группы         → /constructor/groups      [4-squares icon]
Атом           → /constructor/atom        [doc+lines icon]
Экзамен        → /constructor/exam        [hourglass icon]
Граф           → /constructor/graph       [graph-nodes icon]
──
Лаборатория    → /constructor/lab         [atom/3-ellipses icon]
──
Помощь         → opens Yosi AI Chat (technical help mode only)
Настройки      → /settings
```

No sub-menus. Flat structure. Collapsible (52px collapsed → 164px expanded).

---

## 3. Responsive breakpoints

| Breakpoint | Range | Shell |
|---|---|---|
| Mobile | < 768px | Header + BottomNav (no sidebar) |
| Tablet | 768–1023px | Header + Sidebar (collapsed by default) |
| Desktop | ≥ 1024px | Header + Sidebar (expanded by default) |

Constructor screens: **desktop only** — no tablet or mobile layouts.
RTL: use logical CSS properties everywhere (`padding-inline-*`, `margin-inline-*`,
`inset-inline-*`, `border-inline-*`). Never use physical `left`/`right` in component CSS.

---

## 4. Auth

Provider: **Supabase Auth** (email+password + Google OAuth).
Middleware: `frontend/middleware.ts` — already implemented.

### Role system

Stored in `profiles.role` (varchar): `'student'` | `'author'` | `'admin'`.

```sql
-- Assign author role:
UPDATE profiles SET role = 'author' WHERE email = 'author@example.com';
```

### Route guards (middleware.ts)

| Route pattern | Requires |
|---|---|
| `/dashboard`, `/courses/*`, `/lesson/*`, `/test/*`, `/exam/*`, `/status`, `/achievements`, `/formulas`, `/lab` | authenticated |
| `/constructor/*` | authenticated + `role === 'author'` |
| `/` (landing) | public |
| `/login` | public (redirect to /dashboard if already authenticated) |

### Author preview mode

`localStorage.activeMode: 'student' | 'author'`
When author sets `activeMode = 'student'` → student shell renders + `<AuthorBanner>` shown.
Banner: fixed top, full width, z-index above header, amber-400 bg, slate-950 text.
Button "Вернуться в режим автора" → sets `activeMode = 'author'` → redirect to `/constructor/graph`.

### Redirect logic on login

```
role === 'student'                        → /dashboard
role === 'author', activeMode === 'author' → /constructor/graph
role === 'author', activeMode === 'student'→ /dashboard
role === 'admin'                          → /constructor/dashboard
```

---

## 5. Database (Supabase)

Project: `mwl` | ID: `krcghalxpcpjkeghfjkn` | Region: EU Central (Frankfurt).

### Existing tables (created in session 1)

```sql
profiles          -- id (uuid, FK auth.users), role, display_name, avatar_url
topics            -- id, title, description (legacy linear schema — to be migrated)
lessons           -- id, topic_id, title, content (legacy — to be migrated)
exercises         -- id, lesson_id, ... (legacy — to be migrated)
progress          -- id, user_id, lesson_id, completed_at (legacy — to be migrated)
```

### Target schema (Phase 8 migration — do not implement yet)

```sql
-- Content
atoms              -- id, titleRu, titleHe, status (draft|published), three_js_type, created_at
groups             -- id, titleRu, titleHe, parentId, color, order
group_members      -- atomId, groupId, order
prerequisite_edges -- id, fromId, toId, type (direct|via-checkpoint)
checkpoints        -- id, groupId, type (group|block|final)

-- Shalon structure
shalon_types       -- id, number (572|571|471…)
topics             -- id, shalonId, titleRu, titleHe, order  (replaces legacy)
modules            -- id, topicId, titleRu, titleHe, order, descRu, descHe

-- Exam
shalon_sessions    -- id, shalonTypeId, label, duration, answerK, ptsPerQuestion
shalon_prakim      -- id, sessionId, labelRu, labelHe, order
shalon_questions   -- id, prakId, contentRu, contentHe, pts, imageUrl, order

-- Progress
student_progress   -- id, userId, atomId, status (done|current|next|locked|problem|remedial-needed), updated_at

-- Access control (future monetization)
student_access     -- studentId, resourceType (subcourse|exam-pack|full), resourceId, grantedAt
```

RLS policies required on all tables. Migration script must be written and reviewed
before running — do not run migrations without explicit approval.

---

## 6. i18n

Language: `'ru'` (Russian, LTR) | `'he'` (Hebrew, RTL).
Russian is the author/interface language. Hebrew is the student content language.

### Storage

```
frontend/locales/
  ru.json     ← all Russian UI strings
  he.json     ← all Hebrew UI strings
```

### Usage in components

```tsx
// Use useLocale() hook — to be implemented in Phase 0
const { t, lang, dir } = useLocale();
// t('navHome') → 'Главная' or 'ראשי'
// lang → 'ru' or 'he'
// dir → 'ltr' or 'rtl'
```

### RTL implementation

Apply `dir={dir}` on root `<html>` or shell wrapper.
Use logical CSS properties everywhere — never physical `left`/`right`.

```css
/* CORRECT */
padding-inline-start: 16px;
margin-inline-end: 8px;
inset-inline-end: 24px;

/* WRONG */
padding-left: 16px;
margin-right: 8px;
right: 24px;
```

---

## 7. FastAPI backend

Local: `http://localhost:8000`
Production: Railway (URL TBD)

```
backend/
  main.py          ← app entry point, CORS config, router includes
  routers/
    translate.py   ← POST /translate — proxy to Anthropic API (RU↔HE)
    progress.py    ← GET/POST student progress endpoints
    maze.py        ← GET maze state for student (v17 engine)
  .env             ← SUPABASE_URL, SUPABASE_SERVICE_KEY, ANTHROPIC_API_KEY
```

### CORS (already configured in main.py)

```python
allow_origins=["http://localhost:3000", "https://math-with-love-sandy.vercel.app"]
```

### Priority endpoint (Phase 0)

```
POST /translate
Body: { texts: string[], fromLang: 'ru'|'he', toLang: 'he'|'ru' }
Response: { translated: string[] }
```

This replaces browser-direct Anthropic API calls in mockups (CORS issue).

---

## 8. State management

**React Context** for global state (lang, theme, user profile, activeMode).
No external state library unless complexity demands it — decide per-feature.

```
frontend/contexts/
  LocaleContext.tsx   ← lang, dir, t(), setLang()
  ThemeContext.tsx    ← theme ('dark'|'light'), setTheme()
  AuthContext.tsx     ← user, role, activeMode, setActiveMode()
```

---

## 9. Three.js coordinate system

**ALL data stored in math coordinates. ONLY convert for rendering/raycasting.**

```ts
// Math system: X=East, Y=Up, Z=South
// Three.js conversion:
function mathToThree(azimuthDeg: number): number {
  return (azimuthDeg + 60) * (Math.PI / 180);
}
function threeToMath(threeAngle: number): number {
  return threeAngle * (180 / Math.PI) - 60;
}
```

---

## 10. Code conventions

- **TypeScript strict mode** — no `any` types
- **Comments** — English only in all code files
- **UI strings** — always through `t()` from `useLocale()`, never hardcoded
- **CSS** — logical properties only (`padding-inline-*` etc), Tailwind for layout
- **Icons** — inline SVG only, no external icon CDN in production components
- **MathLive** — only permitted external CDN dependency (formula rendering)
- **No `eval()`** — use `callFn()` dispatcher pattern for dynamic function calls

---

## 11. Phase 0 — Project initialization (do this first)

Before any feature work Claude Code must complete:

- [ ] Verify `frontend/` and `backend/` structure matches §2 above
- [ ] Create `frontend/contexts/LocaleContext.tsx`
- [ ] Create `frontend/contexts/ThemeContext.tsx`
- [ ] Create `frontend/contexts/AuthContext.tsx`
- [ ] Create `frontend/components/shell/Header.tsx`
- [ ] Create `frontend/components/shell/StudentSidebar.tsx`
- [ ] Create `frontend/components/shell/ConstructorSidebar.tsx`
- [ ] Create `frontend/components/shell/BottomNav.tsx`
- [ ] Create `frontend/components/shell/GlobeDropdown.tsx`
- [ ] Create `frontend/components/shell/AvatarDropdown.tsx`
- [ ] Create `frontend/components/shell/AuthorBanner.tsx`
- [ ] Create `frontend/app/(student)/layout.tsx` using StudentShell
- [ ] Create `frontend/app/(constructor)/layout.tsx` using ConstructorShell
- [ ] Create `frontend/locales/ru.json` and `he.json` with all nav strings
- [ ] Verify `frontend/middleware.ts` covers all routes from §4
- [ ] Add `/translate` endpoint to `backend/routers/translate.py`
- [ ] Update CORS in `backend/main.py` with production URL

Only after Phase 0 is complete: begin Phase 1 (Dashboard page).

---

## 12. Mockup-only elements — DO NOT implement

The HTML mockups contain several elements that exist **only for design preview purposes**.
These must NOT be ported to Next.js under any circumstances.

### Simulator / ctrl-bar (dev control bar)

Every mockup has a ctrl-bar row with buttons like:
```
[🌙 Тёмная] [☀ Светлая] | Шейлоны | [+ Новый шейлон] ...
```
or a sim-bar with:
```
[🧑‍🏫 Открыть] [💭 Думает] [💬 Диалог] [↺ Сброс] | [🌙 Тёмная] [☀ Светлая] | [RU] [HE]
```

**These are mockup simulators only.** In production:
- Theme is controlled by `ThemeContext` (user preference, persisted in localStorage/DB)
- Language is controlled by `GlobeDropdown` in Header → `LocaleContext`
- State simulation buttons (Открыть / Думает / Диалог) have no equivalent — real state
  comes from API data and user interactions

**Never implement:** `.ctrl`, `.sim-bar`, `.tcb` (theme control button), `.sim-btn`,
`.tog` (language toggle inside ctrl-bar) as React components.

**Test/Exam ctrl-bar** (added 2026-07-08): The test and exam mockups contain an additional
ctrl-bar with buttons for theme, question type (numeric/choice/text), timer simulation,
and demo state switching. This entire row is mockup-only:
- Theme → `ThemeContext`
- Question type → driven by atom data (author-defined per question, not user-selectable)
- Timer → real countdown from step-defined duration, no simulation buttons
- Never implement `.ctrl-bar`, `.tcb`, `.tcb-amber`, `.tcb-red` from test/exam mockups

### Mode indicator

```html
<div class="mode-indicator" id="mode-indicator">⬜ Landscape</div>
```

Mockup-only. In production, responsive layout is handled by CSS breakpoints + `useMediaQuery()`.

### Inline JS theme/lang switchers

Functions like `setMode('d')`, `setTheme('l')`, `setLang('ru')` inside mockup `<script>` tags
are vanilla JS prototypes. In Next.js these are replaced by Context hooks:
```tsx
const { setTheme } = useTheme();   // ThemeContext
const { setLang } = useLocale();   // LocaleContext
```

---

*Created: 07/07/2026*
*Обновлён: 2026-07-08 — §12 дополнен: test/exam ctrl-bar явно добавлен в список mockup-only элементов (.ctrl-bar, .tcb, .tcb-amber, .tcb-red).*
