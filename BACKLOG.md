# MWL — Backlog

Список задач и доработок перед/во время реализации.
Статусы: [ ] не начато · [~] в процессе · [x] готово

---

## Правила взаимодействия с Claude

```
ОБЯЗАТЕЛЬНЫЕ ПРИНЦИПЫ:
- НИКОГДА не реализовывать код без предварительного обсуждения задачи
- ВСЕГДА задавать уточняющие вопросы при неясности требований
- ОБЯЗАТЕЛЬНО полностью проверять синтаксис, логику и структуру кода перед демонстрацией
- ЗАПРЕЩЕНО показывать результат до полной проверки всех аспектов
- ПРИ ЛЮБЫХ СОМНЕНИЯХ — обсуждать варианты решений, НЕ принимать решения самостоятельно
- НИКОГДА не переходить на другой язык в чате без просьбы
- ВСЕГДА учитывать предыдущие изменения и изменять только указанные части

ПОРЯДОК РАБОТЫ:
1. Внимательно изучить задачу и задать ВСЕ уточняющие вопросы
2. Всегда изучать возможные последствия изменений влияющие на другой функционал проекта
3. Получить исчерпывающие ответы на каждый вопрос
4. Тщательно проверить код на ошибки, логику, синтаксис
5. Только после полной проверки показать результат

КАЧЕСТВО КОДА:
- Проверять синтаксис JavaScript/HTML/CSS
- Проверять логику функций и их взаимодействие
- Убеждаться в правильности всех событий и обработчиков
- Тестировать все пути выполнения кода мысленно
- Все комментарии в коде всегда писать только на английском языке

КОММУНИКАЦИЯ:
- Быть точным и конкретным в вопросах
- Не додумывать детали — спрашивать
- Объяснять свои решения и подходы
- Предупреждать о потенциальных проблемах

ЗАПРЕТЫ:
- Показывать неработающий код
- Делать предположения без уточнений
- Пропускать этап проверки
- Реализовывать функции без детального понимания требований

ПРИНЦИПЫ Three.js:
- ВСЕ данные в памяти → своя система (X,Y,Z)
- ВСЕ вычисления и формулы → своя система
- ТОЛЬКО визуализация Three.js → преобразование через mathToThree()
- ТОЛЬКО raycasting → преобразование через threeToMath()
```

---

## Аутентификация и аккаунт

- [ ] Регистрация через email + пароль
- [ ] Вход через email + пароль
- [x] Вход через Google OAuth (реализован на production)
- [ ] Восстановление пароля
- [ ] Выбор и загрузка фото профиля
- [ ] Автогенерация аватара из инициалов (cyan-400 фон, slate-950 текст) — fallback
- [ ] Сохранение предпочтения темы (dark/light) в Supabase профиле
- [ ] Сохранение предпочтения языка (RU/HE) в Supabase профиле

---

## Landing page

- [x] Дизайн мокапа landing page (desktop + tablet + mobile) — `mwl_landing_page_desktop.html`, `mwl_landing_page_tablet.html`, `mwl_landing_page_mobile.html`
      Globe-dropdown (lang), кнопка «Войти» (без кнопки регистрации в header).
      Auth modal встроен: desktop/tablet — centered overlay с backdrop blur; mobile — bottom sheet.
      Все CTA («Войти» / «Начать бесплатно» / «Создать аккаунт») открывают modal через openModal('login'/'register').
      Логотип убран из header мокапа — встраивается при реализации (Next.js).
      Кнопка «Посмотреть курсы» — поведение TBD (scroll-to или openModal). Сейчас: openModal('register').
      i18n: полный RU/HE, dir="rtl", applyI18n(). Modal синхронизирует язык с глобальным CL.
- [ ] Реализовать landing page по утверждённому дизайну (Next.js)
- [ ] Подключить реальные изображения профессора Йоси (yosi-present.png)
- [ ] Финализировать название платформы (сейчас "Math With Love" — временное)
- [ ] Создать favicon на основе yosi-icon.png (32×32 и 180×180)
- [ ] Решить поведение кнопки «Посмотреть курсы» (scroll-to section vs openModal('register'))

---

## Login / Register modal

- [x] Мокап auth modal — desktop (`mwl_login_modal_desktop.html`), tablet (`mwl_login_modal_tablet.html`), mobile (`mwl_login_modal_mobile.html`)
- [x] Auth modal встроен в landing page (desktop + tablet + mobile) — mockup-only overlay
      Desktop/tablet: centered card overlay + backdrop blur.
      Mobile: bottom sheet (выезжает снизу, drag handle, max-height 92vh).
      Архитектура продакшна: /login и /register — отдельные роуты Next.js (см. NAVIGATION.md §2a).
- [ ] Реализовать /login и /register как отдельные страницы Next.js
- [ ] Переключение Войти ↔ Регистрация без перезагрузки (client-side mode toggle)
- [ ] Валидация полей (email format, password strength, confirm match)
- [ ] Показ ошибок под полями (inline, не modal alert)
- [ ] Состояние загрузки на кнопке Submit (spinner)
- [ ] Google OAuth через Supabase + /auth/callback handler

---

## Dashboard

- [x] Дизайн мокапа dashboard (desktop + tablet + mobile) — `mwl_dashboard_desktop.html`, `mwl_dashboard_tablet.html`, `mwl_dashboard_mobile.html`
- [ ] Реализовать dashboard по утверждённому дизайну (Next.js)
- [ ] Динамическое приветствие по времени суток
- [ ] Подтягивать реальные данные: прогресс, очки, серия дней
- [ ] Кнопка "Продолжить" → последний незавершённый урок
- [ ] Sidebar: сохранять состояние (свёрнут/развёрнут) в localStorage
- [ ] Sidebar: student menu — Главная / Курсы / Статус / Достижения / Формулы / Лаборатория / Помощь / Настройки
- [ ] Sidebar: author submenu «Контент» — Карта графа / Редактор атома / Группы / Примеры вопросников
- [ ] [MOCKUP FIX] Привести sidebar-меню dashboard (desktop + tablet + mobile) в соответствие с установленным стандартом навигации — сейчас пункты меню отличаются от эталона

---

## Страница урока

- [x] Дизайн мокапа страницы урока (desktop + tablet + mobile) — `mwl_lesson_desktop.html`, `mwl_lesson_tablet.html`, `mwl_lesson_mobile.html`
- [ ] Реализовать страницу урока (Next.js)
- [ ] KaTeX рендеринг формул — размер шрифта на мобайле
- [ ] 3D визуализация на мобайле — упрощённый WebGL / статичная картинка / кнопка

---

## Конструктор контента — мокапы

**Правило: конструктор контента — только desktop.** Авторы работают на десктопе; планшетная и мобильная версии редакторов не предусмотрены и не будут создаваться.

- [x] Редактор атома desktop (`mwl_atom_editor.html`)
- [x] Редактор атома tablet (`mwl_atom_editor_tablet.html`)
- [x] Карта графа desktop (`mwl_graph_map.html`)
- [x] Конструктор групп desktop (`mwl_groups.html`)
- [x] Примеры вопросников desktop (`mwl_exam_schema.html`)
- [x] Управление шейлоном desktop (`mwl_shalon_manager.html`)

---

## Конструктор контента — инженерный спайк (БЛОКЕР для реализации)

- [ ] **Спайк: rich text + MathLive + bidi** — создать `app/spike/formula-editor/page.tsx`
      и проверить: вставка inline math-field, bidi-изоляция в RTL-тексте, cursor anchor,
      навигация по placeholder-слотам (#0/#1), подавление виртуальной клавиатуры.
      Результат: зафиксированное решение или альтернатива (ProseMirror + MathLive plugin).
      Этот пункт должен быть закрыт ДО начала реализации любого экрана конструктора.

---

## Конструктор контента — реализация (Next.js)

- [ ] Пересмотреть Supabase-схему для графа + тегов + шаалонов:
      `atoms`, `groups`, `group_members`, `prerequisite_edges`, `checkpoints`,
      `shalon_types`, `shalon_sessions`, `shalon_prakim`, `shalon_questions`
      (текущая схема линейна — не отражает граф/теги, MWL_CONTENT_ARCHITECTURE §4–6)
- [ ] `app/constructor/graph/page.tsx` — Карта графа
- [ ] `app/constructor/atom/[id]/page.tsx` — Редактор атома
- [ ] `app/constructor/groups/page.tsx` — Конструктор групп
- [ ] `app/constructor/examples/page.tsx` — Примеры вопросников
- [ ] Batch-перевод: подключить к реальному Anthropic API endpoint
- [ ] Batch-перевод: решить что делать с уже верифицированными полями при перезаписи

---

## Страницы студента — мокапы

- [x] Страница настроек desktop (`mwl_settings_desktop.html`) — обе темы, RU/HE, RTL
- [x] Страница настроек tablet (`mwl_settings_tablet.html`) — обе темы, RU/HE, RTL
- [x] Страница настроек mobile (`mwl_settings_mobile.html`) — обе темы, RU/HE, RTL
- [x] Страница достижений desktop (`mwl_achievements_v2_desktop.html`) — обе темы, RU/HE, RTL
- [x] Страница достижений tablet (`mwl_achievements_tablet.html`)
- [x] Страница достижений mobile (`mwl_achievements_mobile.html`)
- [x] /courses — уровень 1: каталог курсов — desktop + tablet + mobile
- [x] /courses/[themeId] — уровень 2: список модулей — desktop + tablet + mobile
- [x] /courses/[themeId]/[moduleId] — уровень 3: лабиринт атомов — desktop + tablet + mobile
- [x] /status — страница статуса студента — desktop + tablet + mobile
- [x] Страница урока — desktop + tablet + mobile
- [x] Страница теста — desktop + tablet + mobile
- [x] Страница экзамена — desktop + tablet + mobile
- [x] Компонент Йоси (AI Chat Drawer) — макеты готовы (desktop + tablet + mobile, оба theme, RU/HE, RTL)
- [ ] Лаборатория — после решения о рефакторинге Three.js / React Three Fiber

---

## Backlog — отложенные фичи

- [ ] **Cross-module обзор зависимостей** — визуализация пересечений между модулями
      для студентов в режиме повторения/закрепления. Не нужна на старте —
      студент не знает материал и граф зависимостей не даёт ему ценности.
      Рассмотреть как отдельный вид на /courses/[themeId] (переключатель «Список / Граф»).

---

## Дизайн-система

- [x] Добавить §16 Карта графа в DESIGN_SYSTEM.md
- [x] Добавить §17 Конструктор групп в DESIGN_SYSTEM.md
- [x] Добавить §18 Примеры вопросников в DESIGN_SYSTEM.md
- [x] Задокументировать цветовые зоны конструктора (ctrl-bar, side panel, main field)
- [x] Задокументировать `.tcb` компонент (toolbar button)
- [x] Задокументировать Modal/Dialog компонент
- [x] Обновить nav item states (color-only, без bg-pill)
- [x] Добавить RTL правила: логические CSS-свойства, double-flip trap
- [ ] Добавить секцию Input fields (состояния: default, focus, error, disabled)
- [x] Добавить спецификацию страницы настроек (DESIGN_SYSTEM.md §20)
- [x] Синхронизировать терминологию — «Курсы» (/courses) студенческий термин, «Темы» архитектурный
- [x] Добавить §23 Mobile Sheet popup в DESIGN_SYSTEM.md
- [x] Добавить §24 Courses page spec в DESIGN_SYSTEM.md
- [x] Обновить §22 — `.lang-btn` заменён на глобус-dropdown (`.lg-wrap/.lg-dropdown/.lg-item`)
- [ ] **Retrofit глобус-dropdown** — заменить `.lang-btn` на глобус-dropdown во всех макетах при следующем касании: dashboard, settings, achievements, courses, lesson, test, exam и все прочие.
- [ ] **Retrofit аватар-dropdown** — добавить во всех макетах где отсутствует (dashboard desktop/tablet/mobile и др.).
      Стандарт (одинаков для student + author shell):
      [Display name] / [email] / — / Профиль → /settings#profile / Настройки → /settings / — / Выйти
- [ ] **Retrofit bottom nav RTL** — убрать `direction:ltr` с `.bnav` во всех оставшихся mobile-макетах.
- [ ] **Навигация — retrofit всех макетов**: обновить sidebar и bottom nav под финализированный стандарт (NAVIGATION.md §1, зафиксирован 09/07/2026):
      Sidebar student: Главная/Курсы/Статус/Достижения // Формулы/Лаборатория // Помощь/Настройки.
      Bottom nav mobile: Главная/Курсы/Статус/Лаборатория/Помощь(?→popup вверх: Формулы + Йоси).
      Header оба shell: [Logo][Name] → gap → [Search] → gap → [Globe][Bell][Avatar].
      Применить при следующем касании каждого файла.
- [x] **Компонент Йоси (AI Chat Drawer)** — §13 DESIGN_SYSTEM.md полностью переписан (07/07/2026):
      trigger icon-circle 52px amber + glow, floating card vs bottom sheet по breakpoint,
      PNG Йоси по ситуации, динамический статус, контекстные приветствия по странице,
      char counter 500/≤100, session-only история, экзамен — только sidebar Help.
      Макеты: desktop + tablet (ResizeObserver) + mobile (bottom nav Help tab). RTL полное зеркало.

---

## Технический долг

- [ ] **Rich text + формулы** — см. «Конструктор контента — инженерный спайк» выше.
      Это первоочерёдная задача перед Фазой 8.
- [ ] Настроить локализацию RU/HE (файлы `/frontend/locales/ru.json` и `he.json`)
- [ ] RTL поддержка: везде использовать логические CSS-свойства
      (`padding-inline-*`, `margin-inline-*`, `border-inline-*`) вместо физических
      `padding-left/right` — особенно в компонентах сайдбара и модалок
- [x] Мобильный мокап login/register модала (планшет и мобайл) — `mwl_login_modal_tablet.html`, `mwl_login_modal_mobile.html`. ГОТОВО.
- [ ] Финализировать название платформы

---

## Технический долг — auth файлы (2026-07-12)

Обнаружено при аудите Claude Code. Не блокируют Фазу 0, исправить до реализации auth.

- [ ] `app/auth/callback/route.ts` — лежит не там. Перенести в `app/api/auth/callback/route.ts` согласно ARCHITECTURE.md §2. Добавить ролевой редирект согласно §4 (student → /dashboard, author → /constructor/graph, admin → /constructor/dashboard)
- [ ] `frontend/middleware.ts` — сейчас заглушка, роли не проверяет. Реализовать полные route guards согласно ARCHITECTURE.md §4 до начала тестирования auth
- [ ] `lib/supabase.ts` — только browser-клиент. Вынести `createServerClient` сюда для централизации когда auth заработает
- [ ] Таблица `profiles` в Supabase — добавить поля `lang varchar DEFAULT 'he'` и `theme varchar DEFAULT 'dark'` при первой миграции. До этого `AuthContext.fetchProfile` вернёт неполные данные (не сломает JS, но lang/theme из профиля работать не будут)

*Добавлено: 2026-07-12*

---

## Архитектурные решения — обсудить перед Фазой 1 (2026-07-11)

Четыре темы требуют отдельного обсуждения и фиксации в контролирующих документах
**до начала реализации Next.js компонентов.**

- [x] **Многоязычность** — зафиксировано в `MULTILANG.md` (создан 2026-07-12)
- [x] **Настройки аккаунта** — зафиксировано в `ARCHITECTURE.md §13` (2026-07-12)
- [x] **Структура учебного материала** — зафиксировано в `MWL_CONTENT_ARCHITECTURE.md §12` и `DATABASE.md §3` (2026-07-12)
- [x] **Персистентность сессии** — зафиксировано в `ARCHITECTURE.md §14` и `DATABASE.md §9` (2026-07-12)

Открытые подвопросы (перенесены в соответствующие документы):
- [ ] Смена пароля: через email или форму? → `ARCHITECTURE.md §13`
- [ ] Формула штрафа за просмотр решения / повторные попытки → `DATABASE.md §11`
- [ ] Тип ответа «график»: механика взаимодействия студента → `MWL_CONTENT_ARCHITECTURE.md §9`
- [ ] Подвопросы: структура и нумерация (иврит/латиница) → `DATABASE.md §11`
- [ ] Детали операбельности лаб-модулей внутри атома → при разработке лаборатории
- [ ] Fallback если RU перевод ещё не готов → `MULTILANG.md §8`

*Добавлено: 2026-07-11. Обновлено: 2026-07-12 — все 4 темы закрыты, зафиксированы в документах.*

---

## Конструктор схемы экзамена — retrofit и новая функциональность (2026-07-11)

- [x] `mwl_exam_schema_editor.html` — полный retrofit header/sidebar под стандарт
- [x] es-list колонка «Экзамены»: бургер-toggle, нумерация шейлонов в закрытом состоянии
- [x] Hover-иконки на строках шейлонов/сессий (CRUD) — drag-and-drop
- [x] Модель פרק: `pk.requiredQ × pk.pointsPerQ`, Σ = 100 с live-индикатором
- [x] meta-card упрощён: Длительность + Доп. время (%) + Σ
- [x] Порядок блоков: Инструкции → Правила выбора → Разделы
- [x] Стрелки разделов белые в тёмной теме
- [x] Тулбар вопроса: ∑/📎/💾/✕ — однородный стиль
- [x] Предпросмотр: доп. время (+X% = Y ч Z мин)
- [x] Кнопка «Предпросмотр» перенесена в meta-card заголовок
- [x] Spinner скрыт у всех `input[type=number]`
- [ ] **Подвопросы в вопросах** — кнопка «+ Подпункт», нумерация а/б/в или א/ב/ג

## Конструктор (atom, groups) — retrofit (2026-07-11)

- [x] `mwl_atom_editor.html` — header/sidebar стандарт, крошки в crumb-bar, Save в боксах
- [x] `mwl_groups_editor.html` — header/sidebar стандарт, нумерация тем, hover-иконки D&D

---

## Адаптация к новому навигационному флоу (2026-07-15)

Архитектурный пересмотр — подробности в NAVIGATION.md, PLAN.md §Фаза 1.

### Код — минимальные правки (Фаза 1a) — ЗАВЕРШЕНО 2026-07-15
- [x] StudentSidebar.tsx — убрать пункт «Главная», «Курсы» первый
- [x] BottomNav.tsx — убрать таб «Главная»; временно 4 таба
- [x] Header.tsx — логотип = Link href="/courses", cursor:pointer
- [x] app/(student)/dashboard/page.tsx → redirect("/courses")
- [x] app/(student)/courses/page.tsx → placeholder
- [x] app/(student)/maze/page.tsx → placeholder
- [x] locales: navMaze = מבוך / Лабиринт

### База данных (Фаза 1b)
- [ ] Миграция Supabase: profiles.active_shalon (uuid, FK shalons), profiles.last_page (varchar)

### Открытые вопросы — РЕШЕНЫ 2026-07-15
- [x] ⚠️ Состав 5 табов BottomNav — РЕШЕНО: Карта/Курсы/Статус/Лаборатория/Помощь
- [ ] ⚠️ Механизм выбора шейлона в Курсах → записывает active_shalon → редирект /maze
- [ ] ⚠️ Макет /maze (desktop+tablet+mobile) — ГЛАВНЫЙ БЛОКЕР следующего этапа

---

## Профессор Йоси — текст на Dashboard (зафиксировано 2026-07-14)

Решение: поле `yosi_hint` на уровне темы, вводится автором в конструкторе.
Детали в `MWL_CONTENT_ARCHITECTURE.md §11`.

- [ ] Добавить `yosi_hint_he` / `yosi_hint_ru` в схему Supabase (таблица тем/групп)
- [ ] Добавить поле в UI конструктора групп (экран 2)
- [ ] Подключить авто-перевод через FastAPI
- [ ] На Dashboard: загружать `yosi_hint` активной темы студента
- [ ] Добавить ключ `yosiDefault` в `locales/he.json` и `ru.json` (для Фазы 1 заглушка)

---

## Student Shell — реализация Next.js (Фаза 0.7, завершена 2026-07-14)

- [x] `contexts/LocaleContext.tsx` / `ThemeContext.tsx` / `AuthContext.tsx`
- [x] `components/shell/ThemeShell.tsx`
- [x] `components/shell/Header.tsx` — динамический логотип (logo-rtl/ltr по lang), адаптивный поиск
- [x] `components/shell/StudentSidebar.tsx` — 3 группы, localStorage, tooltip, display:none на mobile
- [x] `components/shell/BottomNav.tsx` — 5 табов, только иконки 30px, popup Помощь, RTL, mobile-only
- [x] `app/(student)/layout.tsx` — student shell подключён
- [x] `app/globals.css` — полный блок sidebar + bottom nav styles
- [x] `locales/he.json` / `locales/ru.json` — базовый набор ключей

### Header.tsx — финальное состояние (2026-07-14)
- Overlay поиска: лупа кликабельна, активируется cyan при вводе, очищает поле после поиска
- Закрытие overlay: ✕, Escape, Enter, mousedown вне поля (searchOverlayRef)

### StudentSidebar.tsx — финальное состояние (2026-07-14)
- Иконки SVG: 22×22px, Σ: 19px
- Подписи: 15px, высота строки `.sb-item`: 42px
- Collapsed по умолчанию на всех breakpoints (desktop и tablet)
- localStorage persists user choice (`mwl-sidebar-collapsed`)
- display:none !important на mobile (<768px)

### BottomNav.tsx — финальное состояние (2026-07-14)
- Только иконки (подписи `display:none !important`)
- Активный таб: cyan иконка. Неактивные: #94a3b8 dark / #64748b light
- Помощь popup: Формулы + Диалог с Йоси (stub)

---

## Header.tsx — доработки (Next.js, 2026-07-14)

Зафиксировано после анализа макетов и замечаний по адаптивности.

### Поиск — финализированное поведение

| Breakpoint | Поведение |
|---|---|
| Desktop (≥1024px) | Поле растягивается между левой и правой группами хедера с зазором; иконка лупы кликабельная внутри поля справа — запускает поиск; Enter тоже запускает |
| Tablet (768–1023px) | Иконка лупы в центре хедера (`.hdr-center`); клик открывает overlay на всю ширину хедера (`position:absolute, top:0, left:0, right:0, height:48px`); поле + кнопка ✕ справа |
| Mobile (<768px) | Та же логика что и tablet |

### Стили поля в overlay (tablet + mobile, из макетов)
- Input `font-size: 16px` — обязательно, предотвращает zoom на iOS
- Dark: `background:#334155; border-color:#475569; color:#f1f5f9`
- Light: `background:#f1f5f9; border-color:#e2e8f0; color:#0f172a`
- Overlay фон: Dark `#1e293b` / Light `#ffffff`
- Кнопка закрытия: символ `×`, `font-size:20px`, opacity 0.5

### Функциональность поиска — отложено
Что искать, где выводить результаты, API — **не реализовывать сейчас**.
Текущая задача: визуально корректная заглушка. Обработчики `onSearch` принимают
строку запроса и пишут `console.log` до реализации реального поиска.

- [x] Доработать `Header.tsx`: адаптивное поле поиска (desktop stretch / tablet+mobile overlay)
- [ ] Реализовать функциональность поиска (что искать, результаты, API) — **после Фазы 1**

### Технический долг — CSS в Header (зафиксировано 2026-07-14)

Два отступления от стандартов проекта, внесённые при реализации поиска.
Исправить при следующем рефакторинге CSS:

- [ ] `.srch-overlay` использует физические свойства `left: 0; right: 0` вместо логического
      `inset-inline: 0`. Симметрично — RTL не ломается, но нарушает правило проекта
      «только логические CSS-свойства». Заменить при рефакторинге.
- [ ] Цвета темы в правилах поиска (`srch-desktop`, `srch-overlay`) захардкожены hex-значениями
      (`#334155`, `#1e293b` и т.д.) вместо CSS-переменных (`--c-p2-bg`, `--c-p1-bg` и т.д.).
      Значения корректны и совпадают с токенами — визуально идентично.
      Токенизировать при рефакторинге globals.css.

---

*Обновлён: 2026-07-05 · Навигация финализирована: Главная (home) → позиция 1; Курсы (graduation cap) → позиция 2; Статус (map-pin, /status) → позиция 3; Достижения → позиция 4. /maze упразднён — лабиринт в /courses/[themeId]/[moduleId]. Добавлены задачи: лабиринт уровень 3 (spec уточнён), /status страница.*
*Обновлён: 2026-07-05 (3) · Лабиринт уровня 3 отмечен [x]: desktop + tablet + mobile готовы. Имена файлов групп и схемы экзамена исправлены (без суффиксов _v4/_v2).*
*Обновлён: 2026-07-05 (4) · Конструктор контента — desktop only. Достижения tablet/mobile отмечены [x].*
*Обновлён: 2026-07-05 (5) · Добавлен пятый экран конструктора: Управление шейлоном (mwl_shalon_manager.html). Спецификация в MWL_CONTENT_ARCHITECTURE.md §8 и DESIGN_SYSTEM.md §19.*
*Обновлён: 2026-07-06 · /status отмечен [x]: desktop + tablet + mobile готовы. Lang-btn заменён на глобус-dropdown (новый стандарт). Добавлены retrofit-задачи: глобус-dropdown, аватар-dropdown, bottom nav RTL (direction:ltr убран), навигация. Добавлена задача: компонент Йоси (AI Chat Drawer). Mobile bottom nav финализирован: Главная / Курсы / Статус / Лаборатория / Помощь(?). Landing page, dashboard, lesson, test, exam — отмечены как готовые макеты. Добавлен раздел правил взаимодействия с Claude.*
*Обновлён: 2026-07-07 · Компонент Йоси [x]: макеты desktop + tablet + mobile готовы. §13 DESIGN_SYSTEM.md переписан. Trigger icon-circle, floating card / bottom sheet, context-aware greeting, PNG по ситуации, char counter 500, RTL. Задача в дизайн-системе также закрыта [x].*
*Обновлён: 2026-07-07 · Shalon Manager [x]: mockup complete (desktop only). Detail panel: одно поле активного языка, descRu/descHe раздельно, авто-перевод при Save. Sidebar редактора финализирован (flat, без подменю). Globe-dropdown + bell + avatar-dropdown в header. Batch-translate убран. AI Chat Drawer [x]: все три breakpoints готовы, §13 переписан.*
*Обновлён: 2026-07-07 (вечер) · Login/register modal tablet + mobile отмечены [x]. Все основные макеты завершены. Открыты только retrofit-задачи (глобус-dropdown, аватар-dropdown, bottom nav RTL, навигация).*
*Обновлён: 2026-07-08 (ночь) · Landing page retrofit завершён: globe-dropdown добавлен во все три варианта (desktop/tablet/mobile), логотип убран из header мокапа, кнопка регистрации убрана из header. Auth modal встроен в landing: desktop/tablet — centered overlay, mobile — bottom sheet. Секция «Login / Register modal» обновлена: архитектура продакшна (отдельные роуты /login, /register) зафиксирована в NAVIGATION.md §2a. Добавлена открытая задача: поведение кнопки «Посмотреть курсы».*
*Обновлён: 2026-07-09 · Навигация финализирована. Header стандарт: [Logo][Name]→gap→[Search]→gap→[Globe][Bell][Avatar] — одинаков для student и author shell. Avatar-dropdown стандарт: Name/Email/—/Профиль/Настройки/—/Выйти. Bottom nav «Помощь(?)»: context menu вверх (не bottom sheet) — Формулы + Диалог с Йоси. Retrofit-задачи обновлены под новый стандарт.*
*Обновлён: 2026-07-11 · Retrofit mwl_atom_editor, mwl_groups_editor, mwl_exam_schema_editor завершён. Новая модель פרק (requiredQ × pointsPerQ). Подвопросы — следующий шаг.*
*Обновлён: 2026-07-14 · Добавлен раздел «Header.tsx — доработки»: финализировано поведение поиска по breakpoints (desktop stretch / tablet+mobile overlay), стили overlay из макетов, функциональность поиска отложена до после Фазы 1.*
*Обновлён: 2026-07-14 (2) · Добавлен раздел «Student Shell — реализация Next.js»: зафиксированы все компоненты Фазы 0.7 включая финальное состояние Header.tsx (кликабельная лупа overlay, закрытие по mousedown) и BottomNav.tsx (только иконки, цвета, popup).*
*Обновлён: 2026-07-14 (3) · StudentSidebar финальные размеры: иконки 22px, Σ 19px, подписи 15px, высота строки 42px. Адаптивность: collapsed по умолчанию на всех breakpoints, localStorage persists user choice.*
*Обновлён: 2026-07-14 (4) · CSS переменные: хардкод заменён на var() в search и avatar. Добавлена --c-input-border. Намеренный хардкод задокументирован в DESIGN_SYSTEM.md.*
*Обновлён: 2026-07-15 · Добавлен раздел «Адаптация к новому навигационному флоу»: задачи Фазы 1a (код), 1b (БД), открытые вопросы (BottomNav табы, механизм выбора шейлона, макет /maze).*
*Обновлён: 2026-07-15 (2) · Фаза 1a завершена: StudentSidebar/BottomNav/Header обновлены, /dashboard→redirect, /courses и /maze placeholders созданы, navMaze (מבוך) добавлен в locales.*
