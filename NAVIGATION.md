# MWL — Navigation & State Flows

This file describes screen transitions, role-based routing, and interaction state machines.
It is the reference for implementing routing logic in Next.js.
Implementation phases → see PLAN.md.
Design tokens, components → see DESIGN_SYSTEM.md.

---

## 1. Roles & shells

### User roles

Stored in `profiles.role` (Supabase):

| Role | Value | Description |
|---|---|---|
| Student | `'student'` | Accesses courses, labyrinth, exams |
| Author | `'author'` | Creates content + can preview as student |
| Admin | `'admin'` | Platform management (scope TBD) |

### Role assignment — how it works

**Registration:**
Every new user automatically gets `role = 'student'`.
No role selection during registration — keeps the flow simple.

**Assigning 'author' role:**
Currently: manually in Supabase dashboard by the platform owner.
```sql
update profiles set role = 'author' where email = 'author@example.com';
```
Future (if multiple authors needed): invite system via admin panel — deferred, not needed now.

**Assigning 'admin' role:**
Always directly in Supabase only — never via UI.
```sql
update profiles set role = 'admin' where email = 'admin@example.com';
```

**Admin panel** for role management: deferred until there is demand for multiple authors.

---

### Active mode (author only)

Stored in `localStorage.activeMode: 'student' | 'author'`.
Only meaningful when `role === 'author'`.
Controls which UI shell is rendered.

| role | activeMode | Shell rendered |
|---|---|---|
| student | — | Student shell |
| author | 'author' | Author shell |
| author | 'student' | Student shell + persistent banner |
| admin | — | Admin shell |

### Student shell

```
Header (desktop/tablet/mobile — identical structure):
  [Logo] [Platform name]  →  flex gap  →  [Search]  →  flex gap  →  [Globe-dropdown] [Bell] [Avatar-dropdown]

  Logo click = умный редирект:
    profiles.active_shalon заполнен → /maze
    profiles.active_shalon пуст     → /courses

Sidebar (desktop/tablet) — 3 groups:
  Group 1 — Main:
    - Карта         → /maze           icon: ti-map (карта/маршрут)  ← главная рабочая страница
    - Курсы         → /courses        icon: graduation-cap ← каталог шейлонов
    - Статус        → /status         icon: map-pin        ← учебная история по всем шейлонам
    - Достижения    → /achievements   icon: trophy
  ── separator ──
  Group 2 — Tools:
    - Формулы       → /formulas       icon: Σ (ti-sum)
    - Лаборатория   → /lab            icon: atom
  ── separator ──
  Group 3 — System:
    - Помощь        → opens Yosi AI Chat (help context mode)   icon: message-circle
    - Настройки     → /settings                                icon: gear

  УБРАН пункт «Главная» — логотип в header выполняет функцию умного редиректа.

Bottom nav (mobile only, 5 tabs) — РЕШЕНО 2026-07-15:
  - Карта        → /maze        icon: ti-map (карта)
  - Курсы        → /courses     icon: graduation-cap
  - Статус       → /status      icon: map-pin
  - Лаборатория  → /lab         icon: atom
  - Помощь       → popup menu (opens upward above tab):
      ┌─────────────────────┐
      │  Σ  Формулы         │  → /formulas
      │  💬 Диалог с Йоси   │  → opens Yosi AI Chat
      └─────────────────────┘
      Closes on tap outside. No bottom sheet — context menu only.

RTL: .bnav mirrors on dir="rtl" (direction:ltr removed — tabs reverse order in HE).

Avatar-dropdown (desktop/tablet/mobile):
  [Display name]
  [email]
  ──────────────
  Профиль    → /settings#profile
  Настройки  → /settings
  ──────────────
  Выйти

Notes:
  - «Главная» как пункт меню УДАЛЕНА — логотип = умный редирект (maze/courses)
  - Курсы (/courses) — каталог-витрина. Read-only. Единственное место выбора шейлона.
  - Лабиринт (/maze) — операционная карта активного шейлона. ЕДИНСТВЕННОЕ место откуда запускаются атомы.
  - Статус (/status) — учебная история по всем шейлонам (академический взгляд, не игровой).
  - last_page — записывается в profiles.last_page при каждом переходе; восстанавливается при повторном входе.
  - Достижения и Настройки в mobile — только через avatar-dropdown.
  - Поиск: always-visible field на desktop; icon с overlay-expansion на tablet/mobile.
```

### Author shell

```
Header (desktop only — no tablet/mobile for constructor):
  [Logo] [Platform name]  →  flex gap  →  [Search]  →  flex gap  →  [Globe-dropdown] [Bell] [Avatar-dropdown]

Sidebar (desktop only — no tablet or mobile variants for constructor screens):
  Group 1:
  - Главная       → /constructor/dashboard   icon: home
  - Шейлоны       → /constructor/shalon      icon: book
  - Группы        → /constructor/groups      icon: 4-squares
  - Атом          → /constructor/atom        icon: doc+lines
  - Экзамен       → /constructor/exam        icon: hourglass
  - Граф          → /constructor/graph       icon: graph-nodes
  ── separator ──
  Group 2:
  - Лаборатория   → /constructor/lab         icon: atom
  ── separator ──
  Group 3:
  - Помощь        → opens Yosi AI Chat (help context mode)   icon: message-circle
  - Настройки     → /settings                                icon: gear

Avatar-dropdown (identical to student shell):
  [Display name]
  [email]
  ──────────────
  Профиль    → /settings#profile
  Настройки  → /settings
  ──────────────
  Выйти
```

No sub-menus. Flat structure. No tablet or mobile sidebar for constructor screens.
Globe-dropdown replaces RU/HE toggle in header (standard since 07/07/2026).

**Editor dashboard (`/constructor/dashboard`):** separate from student `/dashboard`.
Shows content status: shalons / themes / modules / atoms with readiness indicators
(done / in progress / not started / draft).

**Production translation:** Save button triggers auto-translate via FastAPI backend
(not browser fetch) — avoids CORS and survives page close. Result saved to Supabase.
`beforeunload` warning shown in browser until FastAPI confirms task received.

### Author student-mode banner

Shown on ALL student-facing pages when author is in student mode.
Must never disappear on scroll.

```
Position: fixed top, full width, z-index above header
Height: 36px
Style: amber-400 background, slate-950 text
Content: [icon] "Режим студента — вы просматриваете платформу как студент"
         [button: "Вернуться в режим автора"] → sets activeMode='author', redirects to /constructor/graph
```

---

## 2. Authentication flows

### 2a — Not authenticated user

Any protected route → redirect to `/login` with `?next=` query param (original URL).
After successful login → redirect back to `next` (or `/dashboard` if `next` is absent).

```
/dashboard (no session)  →  /login?next=/dashboard
/lesson/123 (no session) →  /login?next=/lesson/123
```

**Auth routes (Next.js App Router):**

| Route | Description | Access |
|---|---|---|
| `/login` | Login page (email/password + Google OAuth) | public |
| `/register` | Registration page (name + email + password) | public |
| `/auth/callback` | Supabase OAuth callback handler | public |
| `/auth/reset-password` | Password reset (token in query param) | public |

Both `/login` and `/register` are standalone pages — not modals.
If user is already authenticated → redirect to `/dashboard`.

**Mockup note:** In HTML mockups (`mwl_landing_page_*.html`, `mwl_login_modal_*.html`),
the AuthModal component is an embedded overlay that simulates navigation to `/login` and `/register`.
This is a mockup-only pattern — it does NOT represent the production architecture.
In Next.js: clicking "Войти" navigates to `/login`; "Начать бесплатно" / "Создать аккаунт" navigate to `/register`.

### 2b — Login flow

```
AuthModal opens (login tab)
  ↓
User fills email + password (or clicks Google OAuth)
  ↓
Submit → loading state on button
  ↓
Success:
  role='student':
    profiles.last_page заполнен      → profiles.last_page
    profiles.active_shalon заполнен  → /maze
    иначе                            → /courses
  role='author', activeMode='author'  → /constructor/graph
  role='author', activeMode='student' → /courses (with banner)
  role='admin'            → /admin
  ↓
First login (onboarding_done=false, role='student'):
  → /onboarding  (instead of /courses)
  ↓
Error: show inline error under relevant field
  "Неверный пароль" / "Email не найден" / "Аккаунт не подтверждён"
```

### 2c — Registration flow

```
AuthModal opens (register tab)
  ↓
User fills: display name + email + password + confirm password
  ↓
Submit → loading state
  ↓
Success:
  → create profile in Supabase (role='student', onboarding_done=false)
  → auto-login
  → redirect to /onboarding
  ↓
Error: inline errors under fields
  "Email уже используется" / "Пароли не совпадают" / "Слабый пароль"
```

### 2d — Password recovery

```
AuthModal: "Забыли пароль?" link → shows recovery tab
  ↓
User enters email
  ↓
Submit → Supabase sends recovery email
  ↓
Success: "Письмо отправлено на [email]"
  ↓
User clicks link in email → /auth/reset-password
  ↓
New password form → submit → redirect to /dashboard
```

### 2e — Sign out

```
Avatar menu → "Выйти"
  ↓
Supabase signOut()
  ↓
Clear localStorage (activeMode)
  ↓
Redirect to /
```

### 2f — Author mode toggle

```
Header button "Режим автора" / "Режим студента" (visible only when role='author')
  ↓
Toggle activeMode in localStorage
  ↓
If switching to 'author'  → redirect to /constructor/graph
If switching to 'student' → redirect to /dashboard (banner appears)
```

---

## 3. Student learning flow (core)

### 3a — Atom structure

Each atom has exactly 4 sequential steps:

```
1. Теория (Lesson)        → /lesson/[atomId]
2. Проверка понимания     → /test/[atomId]/check
3. Упражнения             → /test/[atomId]/exercises
4. Тест атома             → /test/[atomId]/atom-test
```

Student cannot skip steps. Each step unlocks the next on completion.
Step progress stored in Supabase `progress` table.

### 3b — Lesson page flow

```
/lesson/[atomId]
  ↓
Student reads theory content (no interaction required)
  ↓
"Все понятно" button (sticky bottom)
  ↓
→ /test/[atomId]/check  (Проверка понимания)

At any point:
  Yosi bubble → opens AI Chat drawer (overlay, does not navigate away)
  Back button → returns to /maze (progress saved at current step)
```

### 3c — Test page flow (per question)

```
/test/[atomId]/[step]

Question displayed
  ↓
Student inputs answer (see answer types below)
  ↓
"Проверить" button
  ↓
Answer evaluated (see evaluation logic below)
  ↓
"Следующий вопрос" → next question
  (timer continues, stats block updates)
  ↓
Last question answered:
  → Results overlay (full-screen)
  Shows: score / time / correct count / wrong count / points earned
  ↓
"Продолжить" button on results overlay:
  step='check'      → /test/[atomId]/exercises
  step='exercises'  → /test/[atomId]/atom-test
  step='atom-test'  → return to /maze + update labyrinth + points awarded
  ↓
Skip button (only available before Check):
  Marks question as skipped, moves to next question
  Skipped questions cannot be revisited in this session

⚠️ Atom-test failure behavior: TBD after first atoms are built.
   Recorded in PLAN.md Open Questions.
```

#### Test page layout

```
Topbar (fullscreen, no sidebar):
  Left:   topic chip (e.g. "Векторы") — cyan badge
  Center: question number buttons (1…N circles, color-coded by status)
  Right:  timer (optional, toggleable) + "✕ Выйти" button

Progress bar (thin, below topbar):
  Shows current question index / total
  Color matches timer state when timer is active (green/amber/red)

Stats block (horizontal row, below progress bar):
  5 counters: ✓ Верно | ~ Частично | ✗ Ошибок | → Пропущен | ★ Очков

Zone 1 (two-column, desktop/tablet):
  Left:  question label + question text + inline math tags
  Right: Three.js visualization panel (3D/2D toggle buttons)

Answer zone (below Zone 1):
  One of three answer types (per question, set by author):
    1. Numeric   — coordinate inputs (x/y/z or custom labels)
    2. Choice    — A/B/C/D buttons (2×2 grid)
    3. Text      — textarea with AI review badge + char counter
                   + reference answer block (visible to system/author, hidden from student)

  Action buttons row:
    Left:  "Пропустить →" (skip, disabled after Check)
    Right: "Проверить" + "Следующий →" (Next appears after Check)
```

#### Question number circle colors

```
Active (current):  cyan ring + cyan text, light cyan bg
Done — correct:    green bg tint + green ring
Done — partial:    amber bg tint + amber ring
Done — wrong:      red bg tint + red ring
Skipped:           slate bg tint + slate ring
Unanswered:        transparent bg + slate border
```

#### Timer states (adaptive color)

```
> 2:00 remaining:  green  (#4ade80)  — calm
1:00–2:00:         amber  (#FBBF24)  — warning
< 0:30:            red    (#f87171)  — pulse animation (alternating bg opacity)
Timer optional:    hidden by default; student can toggle on/off
Progress bar color follows timer color when timer is active
```

#### Answer evaluation logic

```
Numeric answer:
  All coordinates exact match  → Correct   (+10 XP, qStatus = done-correct)
  Some coordinates match       → Partial   (+5 XP,  qStatus = done-partial)
  No match                     → Wrong     (+0 XP,  qStatus = done-wrong)

Choice A-D answer:
  Correct option selected      → Correct   (+10 XP)
  Wrong option selected        → Wrong     (+0 XP)
  (no partial state for choice)

Text answer (AI review — обучающий тест только):
  Sent to AI backend for semantic evaluation
  AI returns: verdict (correct/partial/wrong) + score (0–10) + feedback text
  UI shows "AI проверяет ответ..." with animated dots during processing (~2–3s)
  After AI response:
    Correct  → green result + AI feedback card (+10 XP)
    Partial  → amber result + AI feedback card (+score XP, e.g. 6/10)
    Wrong    → red result + AI feedback card   (+0 XP)
  AI feedback card shows: title + score badge + explanation text
  Reference answer block (эталонный ответ) — shown in mockup for author reference;
    in production: visible to author/admin only, hidden from student in rendered UI

  Note: text answer type used only in check/exercises steps, not in atom-test.
```

#### Stats block update rules

```
After each Check:
  nOk    increments if correct
  nPart  increments if partial
  nErr   increments if wrong
  nSk    increments on Skip (before Check)
  xp     increments by points awarded
All counters update immediately after answer evaluation.
Question number circles re-render to reflect new status.
```

### 3d-exam — Exam page flow

```
/exam/[examId]

Fullscreen. No sidebar, no bottom nav, no globe/bell/avatar. No Yosi FAB.
Formulas FAB present (допустимые формулы экзамена).

Student navigates freely between questions via Q-circles (topbar).
No forced order. Can skip and return.

For each question:
  Student enters answer (numeric / choice / text)
  No per-question Check button
  Q-circle updates: unanswered → answered (neutral, not colored)

When all desired questions filled:
  "Сдать экзамен" button (bottom of answer zone or fixed bottom bar)
  → Confirmation dialog: "Вы уверены? Неотвеченные вопросы: N"
  → On confirm: submit all answers

After submission:
  Results overlay (full-screen)
  Shows: total score / max score / per-question breakdown / time elapsed
  "Завершить" → navigate back to /maze or /courses

Timer: optional (same adaptive green/amber/red as test page)
Points badge: "Вопрос N · X баллов" inline in question label
Q-circles: answered (cyan tint) / unanswered (transparent) — no correct/wrong colors until after submission
```

### Exam vs Test — key differences summary

| Feature | Test | Exam |
|---|---|---|
| Check per-question | ✅ кнопка «Проверить» | ❌ нет |
| Yosi FAB | ✅ | ❌ нет |
| Skip & return | ✅ | ✅ |
| Q-circles colors in-session | correct/partial/wrong | answered/unanswered only |
| Final submission | «Завершить» (last Q) | «Сдать экзамен» (explicit) |
| AI text review | ✅ (обучающий тест) | ❌ |
| Points badge | ✅ | ✅ |
| Dev ctrl-bar | mockup-only | mockup-only |

### 3d — Points & progress on atom completion

Triggered when step='atom-test' completes successfully:

```
1. Write to Supabase:
   progress: mark atom as 'done' for this student
   points: add earned points to student total
   streak: update last_active date, recalculate streak days

2. Recompute labyrinth state:
   Run computeSt() on updated progress
   Check if any new nodes become unlocked
   Check if any group checkpoint becomes unlocked (all group atoms done)

3. If checkpoint unlocked:
   Show checkpoint unlock toast (amber, above labyrinth node)
   Show notification on dashboard (placement TBD — see PLAN.md Open Questions)

4. Navigate to /maze
   Maze re-renders with updated node states
   Newly unlocked nodes animate in
```

### 3e — Checkpoint (group test) flow

```
Checkpoint node in maze becomes available (all group atoms done)
  ↓
Student clicks checkpoint node
  ↓
→ /exam/[checkpointId]  (same exam page as Bagrut exam, different content)
  ↓
Student completes exam
  ↓
Results overlay
  ↓
"Вернуться в лабиринт" → /maze
  Points awarded, checkpoint marked as done
  Next block/group nodes unlock if applicable
```

### 3f — Bagrut exam flow

```
Student navigates to exam from:
  - Dashboard "Практика экзамена" button
  - /courses page (exam pack list)
  ↓
/exam/[examId]
  ↓
Exam header: type number (572) + session label + timer + exit button
Points row visible (how many pts per question)
  ↓
Student navigates questions with Prev/Next buttons
Answers auto-saved on input ("Ответ сохранён" indicator)
No per-question Check button (submit all at end)
No Skip button
  ↓
Submit button (active when minimum required questions answered)
  ↓
Exit confirmation if not submitted:
  "Вы уверены? Несохранённый прогресс будет потерян."
  [Отмена] [Выйти без сдачи]
  ↓
Submit → results overlay (full-screen)
  Score / correct / time / points
  "Разбор ошибок" button (shows correct answers with AI explanation)
  "Вернуться" button → /dashboard or /courses
```

---

## 4. Maze / Labyrinth navigation

### Архитектурное решение (2026-07-15)

Лабиринт — центральная рабочая страница активного шейлона. Живёт по URL `/maze`.
Это ЕДИНСТВЕННОЕ место откуда студент запускает атомы.

Отличие от Курсов:
- Курсы (/courses) — каталог-витрина. Read-only. Выбор шейлона.
- Лабиринт (/maze) — операционная карта. Запуск атомов, прогресс, Йоси.

⚠️ МАКЕТ ЛАБИРИНТА НЕ СОЗДАН. Требуется спроектировать /maze desktop+tablet+mobile.
До создания макета — `/maze` существует как страница-заглушка.

Игровой цикл:
```
/maze → клик на атом → /lesson/[atomId] → ... → /test/[atomId]/atom-test → /maze (обновлённый)
```

После выхода из атома студент всегда возвращается в /maze (не в /courses).
После завершения сессии — студент идёт в /status намеренно через меню.

```
/maze  (активный шейлон)
  ↓
Renders Atom Labyrinth SVG — engine v17 (ProgressMaze.tsx)
Node states — engine v17:
  done          → solid fill in group color, dark checkmark
  current       → colored ring (2.5px) + 🧑‍🎓 token
  next          → lighter ring, dimmed fill — clickable
  locked        → greyed out, not clickable
  problem       → red dashed ring
  remedial-need → red dashed ring + remedial node below
  checkpoint    → amber stroke (always distinct), diamond shape

Edges:
  traversed path  → solid cyan line, 3px
  shortcut (used) → solid purple arc above row, 3px
  return path     → solid red arc below row, 3px
  cross-module dep (locked) → dashed gray line to neighbor module node

Hover on node → info panel (name, status, type)
Click on unlocked atom node → /lesson/[atomId]  (step 1, or resume at current step)
Click on unlocked checkpoint → /exam/[checkpointId]
Click on locked node → tooltip: "Сначала пройдите: [prerequisite atom names]"

Checkpoint unlock animation:
  Node border animates amber glow
  Toast bubble appears above node: "🏆 Контрольная точка открыта!"
  Toast auto-dismisses after 4s

Back button → /courses/[themeId]  (module list)
```

---

## 5. Courses navigation (/courses)

Three-level hierarchy. All levels use breadcrumbs.

### Level 1 — /courses (Course catalog)

```
Two large exam-type cards: 35571 and 35572
  Desktop: side by side
  Tablet/Mobile landscape: side by side
  Tablet/Mobile portrait: stacked

Each card contains:
  - Exam number as heading
  - Overall progress bar for all themes in this exam
  - List of themes with atom counts: completed (green) / total (cyan)
    e.g. "3/6 модулей"

Click on a theme in the card:
  theme status = 'ready'    → opens syllabus popup
  theme status = 'in_work'  → opens "В работе" popup
  theme status = 'locked'   → shows real name, visually inactive (lock icon),
                              no popup — no clickable action

Syllabus popup (theme ready):
  - List of modules as headings
  - Under each module: list of sub-topics with lesson / test / exam counts
  - Button: "Начать" (no progress) / "Продолжить" (has progress)
    → navigates to /courses/[themeId]
  - Close: × button, click outside, Esc

"В работе" popup:
  - Icon (worker) + message "В работе"
  - Close: × button, click outside, Esc
```

### Level 2 — /courses/[themeId] (Theme → module list)

```
Breadcrumbs: Курсы / [Theme name]  (transparent bg, below header)

Page header:
  - Theme icon (SVG, color: #22D3EE) + theme name + exam badge
  - Right: modules done/total + points earned/max
  - Below: overall theme progress bar

Module cards (2-col grid desktop/tablet landscape, 1-col tablet portrait/mobile):
  Each card:
    - Module number badge + score (earned/max pts, amber)
    - Module name
    - Status label (Завершён / В процессе) + atom count (done/total)
    - Progress bar (green = done, cyan = in progress)
    - Divider
    - Subtopic list: dot (green/cyan/gray) + name + full description
    - Footer: КТ indicator (amber) + arrow →

Locked modules: opacity 0.5, lock icon instead of score, no arrow
KT card: dashed amber border, КТ badge

Click on unlocked module → /courses/[themeId]/[moduleId]
```

### Level 3 — /courses/[themeId]/[moduleId] (Atom labyrinth)

```
Breadcrumbs: Курсы / [Theme name] / [Module name]

Atom labyrinth — engine v17 (same as dashboard maze)
Cross-module prerequisite dependencies shown as dashed lines on locked nodes
Click on unlocked atom node → /lesson/[atomId]
Click on locked atom node → tooltip with missing prerequisites
```

---

## 5b. Status page (/status)

```
/status
  ↓
Student personal space — «где я сейчас»

Two sections:

1. Active themes (параллельное обучение — может быть несколько):
   For each active theme:
     - Theme name + exam badge
     - Current module name + progress bar
     - "Продолжить" button → /courses/[themeId]/[moduleId] (current node)

2. All themes overview:
   List of all themes the student has touched, grouped by shalon (35571 / 35572):
     done       → green checkmark, score
     in_progress → cyan, last module name
     not_started → gray, locked visual

Sidebar active item: Статус (map-pin icon)
Breadcrumbs: none (top-level page)
```

---

## 6. Onboarding flow

```
First login (onboarding_done=false, role='student'):
  → /onboarding  (instead of /dashboard)
  ↓
Welcome Tour screen:
  Page 1: Labyrinth illustration + "Это ваш путь в математике"
  Page 2: Atom explanation + "Каждый атом — маленький урок"
  Page 3: Checkpoint explanation + "Контрольные точки закрепляют группу"
  Page 4: Exam explanation + "Тренируйтесь на реальных экзаменах Багрут"
  ↓
"Начать" button on last page:
  → set profiles.onboarding_done = true
  → redirect to /courses  (нет активного шейлона после онбординга)
  ↓
Re-access: sidebar "Как работает платформа" → /onboarding
  (onboarding_done not reset — page always accessible)
```

---

## 6. URL structure (Next.js App Router)

```
/                          Landing page (public)
/onboarding                Welcome Tour (protected, student — first login only)
/courses                   Каталог шейлонов — витрина, выбор шейлона (protected)
                           Точка входа для студента без активного шейлона.
/courses/[themeId]         Список модулей темы (protected)
/courses/[themeId]/[moduleId]  Список атомов модуля — read-only preview (protected)
/maze                      Лабиринт активного шейлона — операционная карта, запуск атомов (protected)
                           ⚠️ Макет не создан. Placeholder до проектирования.
                           Точка входа для студента с активным шейлоном.
/dashboard                 УСТАРЕЛ. redirect → /courses (сохранён для совместимости)
/status                    Учебная история по всем шейлонам (academic view, not game) (protected)
/achievements              Achievements: badges, streaks, XP history (protected)
/formulas                  Formula reference — official + platform (protected)
/lab                       Laboratory — interactive 3D/graph env (protected, placeholder)
/lesson/[atomId]           Lesson theory step (protected)
/test/[atomId]/check       Проверка понимания (protected)
/test/[atomId]/exercises   Упражнения (protected)
/test/[atomId]/atom-test   Тест атома (protected)
/exam/[examId]             Bagrut exam or checkpoint exam (protected)
/settings                  Settings / Profile (protected)

/constructor/dashboard     Author dashboard — bird's-eye view (author only)
/constructor/graph         Graph Map (author only)
/constructor/atom/[id]     Atom Editor (author only; id='new' for new atom)
/constructor/groups        Groups Constructor (author only)
/constructor/examples      Exam Schema Editor (author only)

/admin                     Admin panel (admin only, placeholder)

/login                     Login page — email/password + Google OAuth (public)
/register                  Registration page — name + email + password (public)
/auth/callback             Supabase OAuth callback handler (public)
/auth/reset-password       Password reset (public, token in query param)
```

---

## 7. Access control matrix

| Route | student | author (student mode) | author (author mode) | admin |
|---|---|---|---|---|
| / | ✓ | ✓ | ✓ | ✓ |
| /login | redirect → /courses | redirect → /courses | redirect → /constructor/dashboard | redirect → /admin |
| /register | redirect → /courses | redirect → /courses | redirect → /constructor/dashboard | redirect → /admin |
| /dashboard | redirect → /courses | redirect → /courses | redirect → /constructor/dashboard | redirect → /courses |
| /courses | ✓ | ✓ | ✓ | ✓ |
| /courses/* | ✓ | ✓ | ✓ | ✓ |
| /maze | ✓ (active_shalon required) | ✓ | ✗ → /courses | ✓ |
| /status | ✓ | ✓ | ✗ → /courses | ✓ |
| /achievements | ✓ | ✓ | ✗ → /courses | ✓ |
| /formulas | ✓ | ✓ | ✓ | ✓ |
| /lab | ✓ | ✓ | ✓ | ✓ |
| /lesson/* | ✓* | ✓* | ✓* | ✓ |
| /test/* | ✓* | ✓* | ✓* | ✓ |
| /exam/* | ✓* | ✓* | ✓* | ✓ |
| /settings | ✓ | ✓ | ✓ | ✓ |
| /constructor/* | ✗ → /courses | ✗ → /courses | ✓ | ✓ |
| /admin | ✗ → /courses | ✗ → /courses | ✗ → /constructor/dashboard | ✓ |

*Access subject to `student_access` check (currently: all content free).

---

## 8. Error & loading states

### Page-level loading

All protected pages show skeleton loader while:
- Supabase session is being verified
- Initial data fetch is in progress

Skeleton: same layout as target page, slate-800 animated shimmer blocks.

### Data fetch errors

```
API/Supabase error on page load:
  → Show error card in main content area
  Content: "Не удалось загрузить данные" + "Попробовать снова" button
  Do NOT redirect away or show blank page

Network offline:
  → Toast (bottom center): "Нет подключения к интернету"
  Auto-dismiss when connection restored
```

### Form submission errors

Inline, under the relevant field. Never as modal alerts.
See AuthModal spec in DESIGN_SYSTEM.md §4.

### 404

```
/app/not-found.tsx
  Content: "Страница не найдена" + "На главную" button
  Uses student shell if authenticated, plain layout if not
```

---

## 9. Toast / notification system

Global toast provider at app root level.
Maximum 3 toasts visible simultaneously.
Toasts stack bottom-right (desktop) / bottom-center (mobile).

| Type | Color | Duration | Dismissible |
|---|---|---|---|
| Success | green-400 border | 3s auto | yes |
| Error | red-400 border | 6s auto | yes |
| Info | cyan-400 border | 4s auto | yes |
| Checkpoint unlock | amber-400 border | 4s auto | yes |

Checkpoint unlock toast also triggers labyrinth node animation (separate from toast).

---

*Created: 2026-06-26 · Updated: 2026-06-30 — Student shell restructured: Курсы → первая позиция, Дашборд → «Мой статус» / «מצבי» с иконкой map-pin. §5 Level 2 spec updated.*
*Updated: 2026-07-05 — Student shell revised: Дашборд восстановлен как первый пункт (home icon, точка входа после логина); Курсы → второй пункт; «Мой статус» переименован в «Статус» и перенесён на /status (третий пункт, map-pin); /maze упразднён как отдельный URL — лабиринт живёт в /courses/[themeId]/[moduleId]; добавлен §5b spec для /status; добавлен /status в URL structure и access control matrix.*
*Updated: 2026-07-05 (2) — «Дашборд» переименован в «Главная» / «דף הבית» (студенческий пункт меню, позиция 1, home icon). Иконка «Формулы» — Σ (Tabler: ti-sum). Retrofit: применить при следующем касании каждого файла.*
*Updated: 2026-07-06 — Bottom nav tabs finalised: Главная/Курсы/Статус/Лаборатория/Помощь(?). Помощь(?) opens Yosi AI Chat (stub until Phase 6). RTL rule changed: direction:ltr removed from .bnav — tabs now mirror on dir=rtl. Lang switcher updated: lang-btn replaced by globe-dropdown (new standard). Avatar in header now opens dropdown (Profile/Settings/Logout).*
*Cross-references: PLAN.md (phases), DESIGN_SYSTEM.md (components), MWL_CONTENT_ARCHITECTURE.md (content model)*
*(07/07/2026 — Author shell sidebar финализирован: flat структура без подменю (Главная/Шейлоны/Группы/Атом/Экзамен/Граф // Лаборатория // Помощь/Настройки). Globe-dropdown вместо RU/HE toggle. Desktop only для конструктора — tablet/mobile не предусмотрены. Editor dashboard = /constructor/dashboard (отдельно от /dashboard студента).)*
*Обновлён: 2026-07-08 — §3c расширен: детальная спецификация test page flow — типы ответов (numeric/choice/text+AI), цвета Q-circles, логика таймера, правила оценки ответов, правила обновления stats block.*
*Обновлён: 2026-07-08 — §3d-exam добавлен: полный flow экзамена, таблица отличий test vs exam. §3c уточнён: skip & return для обоих, points badge (вариант A — inline в строке вопроса), Q-circles всегда кликабельны.*
*Обновлён: 2026-07-08 — §2a переработан: auth routes зафиксированы как отдельные страницы (/login, /register, /auth/callback). Redirect pattern: protected route → /login?next=. Mockup note добавлен: AuthModal в мокапах = симуляция этих переходов, не продакшн-архитектура. URL structure и access control matrix обновлены.*
*Обновлён: 2026-07-08 (ночь) — Landing page mockups завершены: header содержит только «Войти» (без кнопки регистрации); CTA «Начать бесплатно» и «Создать аккаунт» → openModal('register'); кнопка «Посмотреть курсы» — поведение TBD. Auth modal в мокапах: desktop/tablet centered overlay, mobile bottom sheet. В продакшне — переходы на /login и /register соответственно.*
*Обновлён: 2026-07-09 — §1 Shell specs финализированы. Header стандарт для обоих shell: [Logo][Name] → gap → [Search] → gap → [Globe][Bell][Avatar]. Поиск и Bell присутствуют в обоих shell (student + author). Student sidebar: 3 группы (Main/Tools/System), иконки финализированы. Bottom nav: «Помощь(?)» → context menu вверх (не bottom sheet) с двумя пунктами: Формулы и Диалог с Йоси. Avatar-dropdown финализирован: Name / Email / — / Профиль / Настройки / — / Выйти — одинаков для обоих shell. Достижения и Настройки в mobile только через avatar-dropdown.*
*Обновлён: 2026-07-15 — АРХИТЕКТУРНЫЙ ПЕРЕСМОТР навигационного флоу. «Главная» как пункт меню УДАЛЕНА. Логотип = умный редирект (active_shalon → /maze, иначе → /courses). /dashboard УСТАРЕЛ → redirect /courses. /maze добавлен как самостоятельный URL — центральная рабочая страница (лабиринт активного шейлона, единственное место запуска атомов). Курсы = каталог-витрина. Статус = учебная история (намеренный переход, не автоматический). last_page сохраняется в profiles. Access control matrix обновлён. Логин redirect: student → last_page → /maze → /courses. Онбординг → /courses. ⚠️ Макет /maze не создан — следующая крупная задача.*
*Обновлён: 2026-07-15 (2) — Страница /maze названа «Карта» (מפה). Иконка ti-map. Добавлена в sidebar (первый пункт группы 1) и BottomNav (первый таб). Состав BottomNav 5 табов финализирован: Карта/Курсы/Статус/Лаборатория/Помощь.*
