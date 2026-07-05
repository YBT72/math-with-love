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
Header: [Logo] [Platform name]    [RU/HE] [Avatar menu]
Sidebar (desktop/tablet) — 3 groups:
  Group 1 — Main:
    - Главная          → /dashboard      icon: home                    ← первая позиция, точка входа после логина
    - Курсы           → /courses        icon: graduation cap (шапка)  ← каталог курсов, 3 уровня
    - Статус          → /status         icon: map-pin                 ← текущее положение + список тем
    - Достижения      → /achievements   icon: trophy
  Group 2 — Tools:
    - Формулы         → /formulas
    - Лаборатория     → /lab  (placeholder)
  Group 3 — System:
    - Помощь          → opens AI Chat (Yosi) in help context mode
    - Настройки       → /settings
Bottom nav (mobile only, 5 tabs):
  - Главная            → /dashboard      icon: home
  - Курсы             → /courses        icon: graduation cap
  - Статус            → /status         icon: map-pin
  - Йоси              → opens AI Chat drawer
  - Профиль           → /settings

Notes:
  - Главная (/dashboard) — точка входа после логина: приветствие, кнопка «Продолжить», статистика, Йоси
  - Курсы (/courses) — 3-уровневый каталог: шейлон → тема → лабиринт модуля
  - Статус (/status) — текущее положение студента в лабиринте + список открытых/завершённых тем;
    студент может параллельно учиться по нескольким темам
  - Иконка map-pin для «Статус»: интуитивная метафора «где я сейчас» — положение на маршруте
  - Retrofit: применить во всех существующих макетах при следующем касании
```

### Author shell

```
Header: [Logo] [Platform name]    [RU/HE] [Mode toggle] [Avatar menu]
Sidebar (desktop only — tablet layout not yet designed):
  - Дашборд редактора  → /constructor/dashboard
  - Карта графа        → /constructor/graph
  - Редактор атома     → /constructor/atom/new (or last edited)
  - Группы             → /constructor/groups
  - Примеры экз.       → /constructor/examples
  ──
  - Помощь             → opens AI Chat (Yosi) in help context mode
  - Настройки          → /settings
Note: tablet menus hidden until tablet layouts are designed.
```

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

Any protected route → redirect to `/` (landing page) with `?modal=login` query param.
Landing page reads query param → opens AuthModal automatically.

```
/dashboard (no session)  →  / ?modal=login
/lesson/123 (no session) →  / ?modal=login
```

### 2b — Login flow

```
AuthModal opens (login tab)
  ↓
User fills email + password (or clicks Google OAuth)
  ↓
Submit → loading state on button
  ↓
Success:
  role='student'          → /dashboard
  role='author', activeMode='author'  → /constructor/graph
  role='author', activeMode='student' → /dashboard (with banner)
  role='admin'            → /admin
  ↓
First login (onboarding_done=false, role='student'):
  → /onboarding  (instead of /dashboard)
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
Student inputs answer (numeric / choice A-D / formula)
  ↓
"Проверить" button
  ↓
Answer evaluated:
  Correct → green highlight + AI feedback + "Следующий вопрос" button
  Wrong   → red highlight + AI feedback + "Следующий вопрос" button
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

Лабиринт живёт внутри раздела Курсы (уровень 3). Отдельного URL /maze нет.

```
/courses/[themeId]/[moduleId]
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
  → redirect to /dashboard
  ↓
Re-access: sidebar "Как работает платформа" → /onboarding
  (onboarding_done not reset — page always accessible)
```

---

## 6. URL structure (Next.js App Router)

```
/                          Landing page (public)
/onboarding                Welcome Tour (protected, student — first login only)
/dashboard                 Главная — точка входа после логина: приветствие, кнопка «Продолжить», статистика, Йоси (protected)
                           Entry point after login for all student roles.
/courses                   Course catalog: two exam-type cards (35571 / 35572), themes with progress (protected)
/courses/[themeId]         Theme detail: module list with atom counts and points (protected)
/courses/[themeId]/[moduleId]  Atom labyrinth for a specific module — engine v17 (protected)
/status                    Student status: active themes + current labyrinth position(s) + all themes overview (protected)
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

/auth/reset-password       Password reset (public, token in query param)
```

---

## 7. Access control matrix

| Route | student | author (student mode) | author (author mode) | admin |
|---|---|---|---|---|
| / | ✓ | ✓ | ✓ | ✓ |
| /dashboard | ✓ | ✓ | redirect → /constructor/dashboard | ✓ |
| /courses | ✓ | ✓ | ✓ | ✓ |
| /courses/* | ✓ | ✓ | ✓ | ✓ |
| /status | ✓ | ✓ | ✗ → /dashboard | ✓ |
| /achievements | ✓ | ✓ | ✗ → /dashboard | ✓ |
| /formulas | ✓ | ✓ | ✓ | ✓ |
| /lab | ✓ | ✓ | ✓ | ✓ |
| /lesson/* | ✓* | ✓* | ✓* | ✓ |
| /test/* | ✓* | ✓* | ✓* | ✓ |
| /exam/* | ✓* | ✓* | ✓* | ✓ |
| /settings | ✓ | ✓ | ✓ | ✓ |
| /constructor/* | ✗ → /dashboard | ✗ → /dashboard | ✓ | ✓ |
| /admin | ✗ → /dashboard | ✗ → /dashboard | ✗ → /constructor/dashboard | ✓ |

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
*Cross-references: PLAN.md (phases), DESIGN_SYSTEM.md (components), MWL_CONTENT_ARCHITECTURE.md (content model)*
