# MWL — Plan

Статусы: [ ] не начато · [~] в процессе · [x] готово · [—] заморожено (ждём)

---

## Фаза 0 — Текущие фиксы (завершена)

- [x] Исправить дизайн-токены `/app/login/page.tsx` (gray/indigo → slate/cyan)
- [x] Обновить BACKLOG.md, DESIGN_SYSTEM.md, MWL_CONTENT_ARCHITECTURE.md

---

## Фаза 0.5 — Конструктор контента: макеты (завершена, июнь 2026)

Все четыре экрана конструктора запланированы в MWL_CONTENT_ARCHITECTURE.md §8.
Сделаны как статичные HTML-мокапы (desktop, оба theme, RTL/i18n).

- [x] Редактор атома — desktop (`mwl_atom_editor.html`) + tablet (`mwl_atom_editor_tablet.html`)
      MathLive WYSIWYG, двуязычный контент HE/RU, верификационные бейджи,
      пририквизиты как теги, формульная панель символов.
      Исправлены: bidi-изоляция inline-формул, баг курсора после формулы,
      отсутствующий сайдбар в desktop-версии.
- [x] Карта графа — desktop (`mwl_graph_map.html`)
      Force-directed SVG, два типа узлов (атом/КТ), два типа рёбер,
      pan/zoom/drag, создание/удаление связей, фильтр по группам,
      детальная панель (сдвигает канву), RTL/i18n.
- [x] Конструктор групп — desktop (`mwl_groups_v4.html`)
      Рекурсивное дерево групп, drag-and-drop рекурсивный (рекурсивный D&D),
      черновики атомов, КТ-карточка, batch-перевод через Anthropic API, RTL/i18n.
- [x] Примеры вопросников — desktop (`mwl_exam_schema_v2.html`)
      Двухуровневый список (тип → сессии), разделы, вопросы с формулами
      и изображениями, правила выбора, превью, batch-перевод, auto-save.

---

## Фаза 0.6 — Страницы студента: макеты (завершена, июль 2026)

- [x] Страница настроек — desktop (`mwl_settings_desktop.html`) + tablet (`mwl_settings_tablet.html`) + mobile (`mwl_settings_mobile.html`)
      Три секции: Профиль (аватар, имя, фамилия, email с верификацией) / Внешний вид (тема) / Язык.
      Каждая секция со своей кнопкой сохранения. Аватар-dropdown с выходом. Обе темы, RU/HE, RTL.
- [x] Страница достижений — desktop (`mwl_achievements_v2_desktop.html`)
      Объединяет прогресс + достижения + сроки. Активность, модуль, дедлайны Багрута.
      Обе темы, RU/HE, RTL. Маршрут: /achievements.
- [x] Страница статуса — desktop (`mwl_status_desktop.html`) + tablet (`mwl_status_tablet.html`) + mobile (`mwl_status_mobile.html`)
      Активные темы с прогресс-барами и кнопкой «Продолжить». Обзор всех тем по шейлонам.
      Глобус-dropdown (lang), аватар-dropdown (Профиль/Настройки/Выйти).
      Mobile: bottom nav 5 табов (Главная/Курсы/Статус/Лаборатория/Помощь), RTL зеркалирование.
      Обе темы, RU/HE, RTL. Маршрут: /status.

---

---

## Фаза 0.7 — Student Shell: реализация Next.js (в процессе, 2026-07-14)

### Выполнено:
- [x] `contexts/LocaleContext.tsx` — useLocale(), lang (he/ru), setLang(), t()
- [x] `contexts/ThemeContext.tsx` — useTheme(), theme (dark/light), setTheme()
- [x] `contexts/AuthContext.tsx` — useAuth(), user, profile, signOut()
- [x] `components/shell/ThemeShell.tsx` — wrapper, применяет .dark на html
- [x] `components/shell/Header.tsx`:
      Логотип динамический: logo-rtl.png (he) / logo-ltr.png (ru) / fallback logo-mwl_transparent.png.
      Поиск адаптивный: desktop — поле растягивается на всю ширину hdr-center;
      tablet/mobile — иконка лупы → overlay на всю ширину хедера (font-size:16px, iOS zoom prevention).
      Globe-dropdown (RU/HE), Bell, Avatar-dropdown (профиль/настройки/выйти).
- [x] `components/shell/StudentSidebar.tsx`:
      3 группы: [Главная/Курсы/Статус/Достижения] / [Формулы/Лаборатория] / [Помощь/Настройки].
      Toggle кнопка с LayoutIcon (иконка двух панелей).
      collapsed/expanded с localStorage ('mwl-sidebar-collapsed').
      Закрытие по клику вне (mousedown listener).
      Кастомный tooltip (position:fixed, getBoundingClientRect, direction-aware RTL/LTR).
      RTL позиционирование через CSS order ([dir="rtl"] .sb { order: 2 }).
      onHelpClick?: () => void проп для будущей интеграции Yosi.
      Все стили вынесены в globals.css.
- [x] `app/(student)/layout.tsx` — ThemeShell → Header / body(StudentSidebar + main{children})
- [x] `app/(student)/dashboard/page.tsx` — Phase 0 placeholder
- [x] `app/globals.css` — CSS custom properties dark/light, shell layout, полный блок sidebar
- [x] `locales/he.json` / `locales/ru.json` — базовый набор ключей

### Не начато (следующие шаги):
- [ ] `components/shell/BottomNav.tsx` — мобильная нижняя навигация
      5 табов: Главная / Курсы / Статус / Лаборатория / Помощь(→popup: Формулы + Йоси).
      Показывать только на mobile (<768px).
- [ ] Адаптивность сайдбара по breakpoints:
      Desktop (≥1024px): expanded по умолчанию (если localStorage не задан).
      Tablet (768–1023px): collapsed по умолчанию.
      Mobile (<768px): display:none (заменяется BottomNav).


## Фаза 1 — Dashboard v2 (ждём макеты)

Триггер: загрузка новых макетов (desktop + tablet + mobile, оба theme).

- [ ] Принять макеты от пользователя
- [ ] Адаптировать `app/dashboard/page.tsx` под новый layout
- [ ] Обновить/переписать компоненты в `components/dashboard/`:
  - [ ] `WelcomeBlock` — аватар, приветствие по времени, кнопки действий, Yosi card
  - [ ] `Sidebar` — student menu: Главная / Курсы / Статус / Достижения / Формулы / Лаборатория / Помощь / Настройки; collapse, active states
  - [ ] `StatsRow` — 3 карточки (серия / очки / темы), без знака %
  - [ ] `TopicsAndPreview` — список тем + превью (Progress Maze встанет сюда)
  - [ ] `CurrentModule` — прогресс бар, кнопка Продолжить
  - [ ] `RecentResults` — таблица последних результатов
  - [ ] `DashboardHeader` — search field
- [ ] Добавить Bottom Navigation для мобайла (5 табов)
- [ ] Sidebar: сохранять состояние (collapsed/expanded) в localStorage

---

## Фаза 2 — Progress Maze (после Dashboard)

Источник логики: `DESIGN_SYSTEM.md` §11 + `mwl_maze_v10.html`.

- [ ] Создать `components/dashboard/ProgressMaze.tsx` (SVG-based)
- [ ] Портировать state machine из HTML-прототипа (`buildCourse`, `computeSt`, `simLesson/Pass/Fail`)
- [ ] Реализовать 5 статусов нод: done / current / next / problem / remedial-needed
- [ ] Реализовать сегменты: main-path / shortcut / return / remedial
- [ ] Permanent fail badge
- [ ] Адаптив: node radius, gap, font-size для tablet и mobile

---

## Фаза 3 — Страница урока

- [ ] `app/lesson/[id]/page.tsx`
- [ ] Установить KaTeX (`npm install katex @types/katex`) для read-only рендеринга студенту
- [ ] Компонент формул (inline + block, RTL-safe)
- [ ] Панель теории (левая колонка)
- [ ] 3D placeholder / заглушка
- [ ] Answer input block (sticky bottom на мобайле)
- [ ] Professor Yosi bubble (fixed bottom-right / bottom-center mobile)
- [ ] RTL адаптация

---

## Фаза 4 — Страница теста

Fullscreen режим (без сайдбара, без bottom nav, без globe/bell/avatar).
Спецификация: NAVIGATION.md §3c (обновлён 08/07/2026).
Макеты: `mwl_test_desktop.html`, `mwl_test_tablet.html`, `mwl_test_mobile.html`.

### Shell & topbar
- [ ] `app/test/[atomId]/[step]/page.tsx` (step: check | exercises | atom-test)
- [ ] Fullscreen shell: `height: 100vh`, no sidebar, no bottom nav
- [ ] Topbar (3-column grid): topic chip left | Q-circles center | timer + exit right
- [ ] Topic chip: cyan badge with theme name from atom metadata
- [ ] Exit button: "✕ Выйти" → confirmation dialog before leaving (progress lost warning)

### Question number circles
- [ ] Render N circles (N = question count for this step)
- [ ] Color states: active (cyan) / correct (green) / partial (amber) / wrong (red) / skipped (slate) / unanswered (transparent)
- [ ] Clickable — navigates to that question (only visited questions, not future)
- [ ] Separators (thin lines) between circles

### Timer
- [ ] Optional: hidden by default, student toggles on
- [ ] Countdown from step-defined duration (e.g. 5:00 for check, longer for atom-test)
- [ ] Adaptive color: green (>2:00) → amber (1:00–2:00) → red (<0:30) with pulse animation
- [ ] Progress bar color follows timer color when timer active
- [ ] When timer off: progress bar shows question index / total (cyan)

### Progress bar
- [ ] Thin bar (3px) below topbar
- [ ] Width = current_question / total_questions × 100%
- [ ] Animates on question change (CSS transition)
- [ ] Color: cyan (no timer) or timer-state color

### Stats block
- [ ] 5 counters horizontal row: ✓ Верно | ~ Частично | ✗ Ошибок | → Пропущен | ★ Очков
- [ ] Each counter: icon circle (color-coded) + number + label
- [ ] Updates immediately after each answer evaluation or skip
- [ ] XP counter: amber color (★), always visible

### Zone 1 — question
- [ ] Two-column layout (desktop/tablet): question left | visualization right
- [ ] Mobile: stacked (question above, viz below, compact)
- [ ] Question label: "Вопрос N" (uppercase, slate)
- [ ] Question text: supports inline math tags (`<span class="mtag">`)
- [ ] Hint line: "Смотрите визуализацию справа →" (slate, bottom of text column)
- [ ] Visualization panel: Three.js placeholder + 3D/2D toggle buttons (right column)
- [ ] Viz colors update on theme change

### Answer zone — 3 types (mutually exclusive, set per question by author)

#### Type 1: Numeric
- [ ] Label: "Ваш ответ" (uppercase, slate)
- [ ] Point label (e.g. "a⃗+b⃗ =") + axis labels (x/y/z or custom)
- [ ] Input fields: 64×34px, monospace, centered, number type
- [ ] Active fields: light cyan bg on dark, light blue on light
- [ ] clrRes() on input: hide result, hide Next button

#### Type 2: Choice A-D
- [ ] Label: "Выберите ответ"
- [ ] 2×2 grid of buttons: A / B / C / D
- [ ] Each button: letter (bold) + answer text
- [ ] Selected state: cyan ring + cyan text + light cyan bg
- [ ] Unselected: slate border, normal text
- [ ] Only one selection at a time; re-click changes selection

#### Type 3: Text (AI review — обучающий тест только)
- [ ] Label: "Развёрнутый ответ" + AI badge ("🤖 Проверка AI")
- [ ] Reference answer block (эталонный ответ): shown for author/admin in mockup;
      in production render: hidden from student (CSS `display:none` or server-side)
- [ ] Textarea: min-height 90px, resize:vertical, line-height 1.6
- [ ] Char counter: appears when text entered (e.g. "47 символов"), slate color
- [ ] Shift+Enter hint: "Shift+Enter — новая строка"
- [ ] On Check: show "AI проверяет ответ..." indicator (🤖 + animated dots)
      Disable Check button during processing
- [ ] After AI response: show result (correct/partial/wrong) + AI feedback card
- [ ] AI feedback card: 🤖 icon + title + score badge (e.g. "6 / 10 баллов") + explanation text
- [ ] AI backend: prompt format TBD (see Open Questions)

### Action buttons
- [ ] "Пропустить →": left-aligned, available before Check; disabled after Check pressed
- [ ] "Проверить": right side, primary cyan button; disabled during AI processing
- [ ] "Следующий →": appears after Check (replaces or sits next to Проверить)
      On last question: "Завершить" → triggers results overlay

### Results overlay (full-screen)
- [ ] Appears after last question answered
- [ ] Shows: final score / time elapsed / correct / partial / wrong / skipped / XP earned
- [ ] "Продолжить" button → navigates per step (check→exercises→atom-test→maze)
- [ ] "Разобрать ошибки" button (review wrong answers inline — TBD)

### Floating action buttons (FABs — same as lesson page)
- [ ] 📐 Формулы FAB → formula reference modal/sheet
- [ ] 🧑‍🏫 Йоси FAB → Yosi hint popup (desktop: anchored card; mobile: bottom sheet)
- [ ] Position: fixed bottom-right

### Question navigation (уточнение 2026-07-08)
- [ ] Q-circles кликабельны → переход к любому вопросу
- [ ] Студент может оставить вопрос пустым, уйти, вернуться и заполнить
- [ ] Никакой принудительной линейной последовательности
- [ ] Points badge в строке вопроса: "Вопрос N · X баллов" (значение из данных атома)

### Dev ctrl-bar — MOCKUP ONLY
Строка с кнопками темы/типа/таймера существует только в мокапах.
В Next.js НЕ реализовывать. См. ARCHITECTURE.md §12.

---

## Фаза 5 — Страница экзамена

Fullscreen режим. Спецификация: NAVIGATION.md §3d (TBD). Макеты: `mwl_exam_*.html`.

### Отличия от теста (Фаза 4)
- **Нет Йоси** — FAB с подсказкой AI отсутствует полностью
- **Нет Check per-question** — нет кнопки «Проверить» после каждого вопроса
- **Финальная кнопка «Сдать»** — проверка всех ответов одновременно в конце
- **Нет AI-проверки текста** — текстовые ответы оцениваются только в финале (или вручную)
- **Q-circles** — показывают только answered/unanswered до сдачи (нет correct/partial/wrong в процессе)

### Общее с тестом
- [ ] Fullscreen shell (нет sidebar, bottom nav, globe, bell, avatar)
- [ ] Topbar: topic chip | Q-circles (кликабельны) | timer + exit
- [ ] Q-circles кликабельны → свободная навигация между вопросами
- [ ] Студент может оставить вопрос, вернуться, заполнить
- [ ] Points badge: "Вопрос N · X баллов" в строке вопроса
- [ ] Progress bar
- [ ] Stats block (адаптированный для экзамена: баллы за заполненные вопросы)
- [ ] Формулы FAB (без Йоси)
- [ ] 3 типа ответов: numeric / choice / text
- [ ] RTL + responsive

### Dev ctrl-bar — MOCKUP ONLY, не реализовывать в Next.js
- [ ] Exit confirmation dialog
- [ ] Results screen (full-screen overlay)
- [ ] "Ответ сохранён" индикатор
- [ ] Завершить ✓
- [ ] RTL + responsive

---

## Фаза 6 — AI Chat Drawer (Профессор Йоси)

Макеты готовы (07/07/2026): `mwl_ai_chat_desktop.html`, `mwl_ai_chat_tablet.html`, `mwl_ai_chat_mobile.html`.
Спецификация: DESIGN_SYSTEM.md §13 (обновлён 07/07/2026).

- [ ] `components/AIChatPanel.tsx`
- [x] Trigger button — icon-circle 52px, amber border + glow ring
- [x] Floating card (desktop/tablet landscape: 380×520 / 340×460px) + bottom sheet (tablet portrait/mobile: 75vh)
- [x] Dim overlay (bottom sheet режим); без overlay на floating card
- [x] Handle-пилюля (bottom sheet only)
- [x] Context-aware greeting — меняется при каждом открытии по текущей странице
- [~] Context strip — убран (контекст передаётся через системный промпт, не показывается студенту)
- [x] Yosi / student bubbles + typing indicator (3 amber bounce dots)
- [x] PNG Йоси по ситуации (icon / thinking / happy / encourage / present)
- [x] Динамический статус (онлайн / думает... / отвечает...)
- [x] Input: textarea auto-resize + char counter (лимит 500, показ при ≤100)
- [x] RTL full mirror (HE mode)
- [x] Экзамен — триггер скрыт, Йоси только через sidebar Help
- [ ] Voice recording (Web Speech API) — отложено до после пилота
- [ ] Подключить Claude API
- [ ] Session history (в рамках сессии, не персистентна)

---

## Фаза 7 — Аутентификация

- [ ] Активировать middleware.ts (Supabase session check)
- [ ] Email + пароль
- [ ] Google OAuth (уже работает на /login)
- [ ] Восстановление пароля
- [ ] Сохранение темы / языка в Supabase профиле
- [ ] Динамическое приветствие (имя из профиля)

---

## Фаза 8 — Конструктор контента: реализация (после Фаз 1–7)

Перенос мокапов в реальные Next.js компоненты. Требует:
- пересмотра Supabase-схемы (линейная → граф + теги, см. MWL_CONTENT_ARCHITECTURE §9)
- завершения инженерного спайка по rich text + формулам (см. Фаза 8a)

### Фаза 8a — Спайк: rich text + MathLive + bidi (ОБЯЗАТЕЛЕН ПЕРВЫМ)

Техническая проблема: `contenteditable` + inline `<math-field>` + RTL Hebrew.
В HTML-макетах работает на базовом уровне, но есть нерешённые вопросы:
- Виртуальная клавиатура MathLive появляется несмотря на `virtual-keyboard-mode="off"`
- Навигация по placeholder-слотам (#0, #1) в shadow DOM требует проверки
- Selection API на границах кастомных элементов ведёт себя непредсказуемо

- [ ] Создать `app/spike/formula-editor/page.tsx` — изолированный тест
- [ ] Проверить: вставка math-field, bidi-изоляция, cursor anchor, placeholder navigation
- [ ] Выбрать финальный подход или альтернативу (ProseMirror + MathLive plugin?)
- [ ] Зафиксировать решение в DESIGN_SYSTEM.md §15 до начала §8b

### Фаза 8b — Реализация экранов конструктора

Макеты всех 5 экранов конструктора готовы (07/07/2026).
Author shell sidebar стандарт финализирован: Главная/Шейлоны/Группы/Атом/Экзамен/Граф // Лаборатория // Помощь/Настройки (без подменю, desktop only).
Globe-dropdown вместо RU/HE toggle во всех конструкторах.

- [x] `mwl_shalon_manager.html` — макет готов (desktop only, no tablet/mobile)
- [x] `mwl_groups_editor.html` — макет готов
- [x] `mwl_atom_editor.html` / `mwl_atom_editor_tablet.html` — макеты готовы
- [x] `mwl_exam_schema_editor.html` — макет готов
- [x] `mwl_graph_map_editor.html` — макет готов
- [ ] `app/constructor/dashboard/page.tsx` — дашборд редактора (статус контента: шейлоны/темы/модули/атомы с индикаторами готовности)
- [ ] `app/constructor/shalon/page.tsx` — Шейлон менеджер
- [ ] `app/constructor/graph/page.tsx` — Карта графа
- [ ] `app/constructor/atom/[id]/page.tsx` — Редактор атома
- [ ] `app/constructor/groups/page.tsx` — Конструктор групп
- [ ] `app/constructor/exam/page.tsx` — Схема экзамена
- [ ] Пересмотреть Supabase-схему: `atoms`, `groups`, `group_members`, `prerequisite_edges`, `checkpoints`, `shalon_types`, `shalon_sessions`
- [ ] Auto-translate через FastAPI backend (не browser fetch) — server-side, результат в Supabase
- [ ] Retrofit globe-dropdown + avatar-dropdown в старые мокапы конструктора (logged in backlog)

---

## Постоянные правила

- Все новые компоненты: TypeScript strict, no `any`
- Все UI строки: через `useLocale()` → `t.*`
- RTL: logical CSS properties (`padding-inline-*`, `margin-inline-*`, `border-inline-*`) с первого дня — не физические `left/right`
- HTML-мокапы: источник дизайна, не трогать
- `mwl_maze_v10.html` — закоммитить отдельно перед Фазой 2

---

## Использование и лимиты

### Подписка: Claude.ai Pro ($20/мес)

Claude Code (VS Code) + claude.ai/chat тянут из **одного пула** лимитов.

**Тяжёлые для лимита операции:**
- Чтение больших файлов (DESIGN_SYSTEM.md, BACKLOG.md)
- Написание сложных компонентов с нуля за одну сессию
- Одновременная работа в VS Code и на claude.ai

**Практика для Pro:**
- 1–2 часа работы в VS Code = одна сессия до лимита
- Разбивать задачи: один компонент за раз
- Чат использовать для планирования, Code — для кода

---

*Создан: 2026-06-19 · Обновлён: 2026-06-27 (Фазы 0.5 и 0.6 завершены — макеты конструктора и студенческих страниц готовы)*
*Обновлён: 2026-07-05 — Фаза 1: Sidebar student menu обновлён (Главная / Курсы / Статус / Достижения / Формулы / Лаборатория / Помощь / Настройки); «Дашборд» → «Главная» / «דף הבית»; иконка Формулы — Σ (ti-sum).*
*Обновлён: 2026-07-06 — Фаза 0.6 дополнена: /status страница завершена (desktop + tablet + mobile). Новые компоненты: глобус-dropdown (lang), аватар-dropdown (Профиль/Настройки/Выйти). Mobile bottom nav RTL: direction:ltr убран — зеркалируется при HE. Табы финализированы: Главная/Курсы/Статус/Лаборатория/Помощь(?).*
*Обновлён: 2026-07-07 — Фаза 6: макеты AI Chat Drawer готовы (desktop + tablet + mobile). Список пунктов обновлён: [x] готово / [ ] реализация Next.js ещё нет. Voice recording и Claude API подключение — остаются открытыми.*
*Обновлён: 2026-07-07 — Фаза 8b обновлена: все 5 макетов конструктора готовы. Author sidebar стандарт финализирован (flat, без подменю). Добавлен /constructor/dashboard. Auto-translate через FastAPI backend (не browser fetch). Retrofit globe-dropdown в старые мокапы — в backlog. Создан ARCHITECTURE.md — полная техническая архитектура для Claude Code (shell, routes, DB, auth, i18n, Phase 0).*
*Обновлён: 2026-07-08 — Фаза 4 детализирована: полная спецификация страницы теста (shell, topbar, Q-circles, timer, stats block, zone 1, 3 типа ответов, AI-проверка текста, action buttons, FABs, dev toolbar). Спецификация также зафиксирована в DESIGN_SYSTEM.md §27 и NAVIGATION.md §3c.*
*Обновлён: 2026-07-08 — Фаза 4 дополнена: навигация по вопросам, points badge, dev ctrl-bar mockup-only. Фаза 5 переписана: полная спецификация экзамена (отличия от теста, отсутствие Йоси, «Сдать» вместо per-question Check).*
*Обновлён: 2026-07-14 — Добавлена Фаза 0.7: Student Shell реализация Next.js (в процессе). Выполнено: все контексты, Header.tsx (динамический логотип по lang, адаптивный поиск), StudentSidebar.tsx (3 группы, localStorage, tooltip, RTL order, стили в globals.css), layout.tsx, globals.css. Не начато: BottomNav.tsx, адаптивность сайдбара по breakpoints.*
