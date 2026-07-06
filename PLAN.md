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

- [ ] `app/test/[id]/page.tsx`
- [ ] Topbar: chip + Q-circles + timer + exit
- [ ] Adaptive timer (green → amber → red + pulse)
- [ ] Stats block (5 иконок)
- [ ] Zone 1: question text + 3D viz
- [ ] Answer zone: numeric / choice A-D / text (3 типа)
- [ ] Кнопки Skip / Check / Next
- [ ] AI feedback block
- [ ] RTL + responsive

---

## Фаза 5 — Страница экзамена

- [ ] `app/exam/[id]/page.tsx`
- [ ] Отличия от теста: нет Skip, нет Check per-question, Prev/Next nav, points row
- [ ] Exit confirmation dialog
- [ ] Results screen (full-screen overlay)
- [ ] "Ответ сохранён" индикатор
- [ ] Завершить ✓
- [ ] RTL + responsive

---

## Фаза 6 — AI Chat Drawer (Профессор Йоси)

- [ ] `components/AIChatPanel.tsx`
- [ ] Trigger button (amber style)
- [ ] Drawer slide-up с dim overlay
- [ ] Context strip
- [ ] Yosi / student bubbles + typing indicator
- [ ] Input: textarea с auto-resize + char counter
- [ ] Voice recording (Web Speech API / заглушка)
- [ ] RTL full mirror
- [ ] Подключить Claude API

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

- [ ] Пересмотреть Supabase-схему: `atoms`, `groups`, `group_members`, `prerequisite_edges`, `checkpoints`, `shalon_types`, `shalon_sessions`
- [ ] `app/constructor/graph/page.tsx` — Карта графа
- [ ] `app/constructor/atom/[id]/page.tsx` — Редактор атома
- [ ] `app/constructor/groups/page.tsx` — Конструктор групп
- [ ] `app/constructor/examples/page.tsx` — Примеры вопросников
- [ ] Подключить batch-перевод к реальному Anthropic API endpoint

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
