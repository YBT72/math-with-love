# MWL — Plan

Статусы: [ ] не начато · [~] в процессе · [x] готово · [—] заморожено (ждём)

---

## Фаза 0 — Текущие фиксы (сейчас)

- [x] Исправить дизайн-токены `/app/login/page.tsx` (gray/indigo → slate/cyan)
- [ ] Обновить BACKLOG.md: пометить реализованные пункты (landing, dashboard, login modal)

---

## Фаза 1 — Dashboard v2 (ждём макеты)

Триггер: загрузка новых макетов (desktop + tablet + mobile, оба theme).

- [ ] Принять макеты от пользователя
- [ ] Адаптировать `app/dashboard/page.tsx` под новый layout
- [ ] Обновить/переписать компоненты в `components/dashboard/`:
  - [ ] `WelcomeBlock` — аватар, приветствие по времени, кнопки действий, Yosi card
  - [ ] `Sidebar` — 3 группы, collapse, active states, иконки
  - [ ] `StatsRow` — 3 карточки (серия / очки / темы), без знака %
  - [ ] `TopicsAndPreview` — список тем + превью (Progress Maze widget встанет сюда)
  - [ ] `CurrentModule` — прогресс бар, кнопка Продолжить
  - [ ] `RecentResults` — таблица последних результатов
  - [ ] `DashboardHeader` — search field (сейчас отсутствует)
- [ ] Добавить Bottom Navigation для мобайла (5 табов)
- [ ] Sidebar: сохранять состояние (collapsed/expanded) в localStorage

---

## Фаза 2 — Progress Maze (после Dashboard)

Источник логики: `DESIGN_SYSTEM.md` секция 11 + `mwl_maze_v10.html`.

- [ ] Создать `components/dashboard/ProgressMaze.tsx` (SVG-based)
- [ ] Портировать state machine из HTML-прототипа (`buildCourse`, `computeSt`, `simLesson/Pass/Fail`)
- [ ] Реализовать 5 статусов нод: done / current / next / problem / remedial-needed
- [ ] Реализовать сегменты: main-path / shortcut (arc above) / return (arc below) / remedial
- [ ] Permanent fail badge (красный кружок с числом)
- [ ] Адаптив: node radius, gap, font-size для tablet и mobile

---

## Фаза 3 — Страница урока

Источник: `mwl_lesson_dark.html` (desktop + tablet + mobile).

- [ ] `app/lesson/[id]/page.tsx`
- [ ] Установить KaTeX (`npm install katex @types/katex`)
- [ ] Компонент формул (inline + block, RTL-safe)
- [ ] Панель теории (левая колонка)
- [ ] 3D placeholder / заглушка (React Three Fiber — потом)
- [ ] Answer input block (sticky bottom на мобайле)
- [ ] Professor Yosi bubble (fixed bottom-right / bottom-center mobile)
- [ ] RTL адаптация

---

## Фаза 4 — Страница теста

Источник: `mwl_test_dark.html` (desktop + tablet + mobile).

- [ ] `app/test/[id]/page.tsx`
- [ ] Topbar: chip + Q-circles + timer + exit
- [ ] Adaptive timer (green → amber → red + pulse)
- [ ] Stats block (5 иконок)
- [ ] Zone 1: question text + 3D viz
- [ ] Answer zone: numeric / choice A-D / text (3 типа)
- [ ] Кнопки Skip / Check / Next
- [ ] AI feedback block (для text type — заглушка)
- [ ] RTL + responsive

---

## Фаза 5 — Страница экзамена

Источник: `mwl_exam_dark.html` (desktop + tablet + mobile).

- [ ] `app/exam/[id]/page.tsx`
- [ ] Отличия от теста: нет Skip, нет Check per-question, Prev/Next nav, points row
- [ ] Exit confirmation dialog
- [ ] Results screen (full-screen overlay)
- [ ] "Ответ сохранён" индикатор
- [ ] Завершить ✓ (всегда кликабелен, меняется визуально)
- [ ] RTL + responsive

---

## Фаза 6 — AI Chat Drawer (Профессор Йоси)

Источник: `mwl_ai_chat_dark.html`.

- [ ] `components/AIChatPanel.tsx` — единый компонент для всех страниц
- [ ] Trigger button (amber style)
- [ ] Drawer slide-up с dim overlay
- [ ] Context strip (badge текущего контекста)
- [ ] Yosi / student bubbles + typing indicator
- [ ] Input: textarea с auto-resize + char counter
- [ ] Voice recording (Web Speech API / заглушка)
- [ ] RTL full mirror
- [ ] Подключить Claude API (systemPrompt меняется по контексту)

---

## Фаза 7 — Аутентификация

Триггер: готовы предыдущие страницы + настроен Supabase.

- [ ] Активировать middleware.ts (Supabase session check)
- [ ] Email + пароль (форма в LoginModal — уже есть UI)
- [ ] Google OAuth (уже работает на /login)
- [ ] Восстановление пароля
- [ ] Сохранение темы / языка в Supabase профиле
- [ ] Динамическое приветствие (имя из профиля)

---

## Постоянные правила

- Все новые компоненты: TypeScript strict, no `any`
- Все UI строки: через `useLocale()` → `t.*`
- RTL: `rtl:flex-row-reverse`, `rtl:text-right` и т.д. с первого дня
- HTML-мокапы в корне: источник дизайна, не трогать
- `mwl_maze_v10.html` — закоммитить отдельно перед Фазой 2

---

## Использование и лимиты

### Подписка: Claude.ai Pro ($20/мес)
Claude Code (VS Code) + claude.ai/chat тянут из **одного пула** лимитов.
Это не бюджет в долларах — лимит по вычислительной нагрузке, сбрасывается каждые ~5 часов.

**Где смотреть расход:** claude.ai → профиль → Usage

**Когда приближается лимит:**
- Claude начинает отвечать короче
- В VS Code появляется ошибка в терминале
- На claude.ai — баннер "You've reached your usage limit"
- После сброса работа возобновляется автоматически

**Тяжёлые для лимита операции** (расходуют пул быстрее):
- Чтение больших файлов (DESIGN_SYSTEM.md — ~1500 строк)
- Написание сложных компонентов с нуля за одну сессию
- Одновременная работа и в VS Code, и на claude.ai

**Практика для Pro:**
- 1–2 часа работы в VS Code = одна сессия до лимита
- Разбивать задачи: один компонент за раз, не всю фазу сразу
- Чат на claude.ai использовать для планирования, Code — для кода

---

*Создан: 2026-06-19*
