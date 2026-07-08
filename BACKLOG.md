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
- [ ] Реализовать landing page по утверждённому дизайну (Next.js)
- [ ] Подключить реальные изображения профессора Йоси (yosi-present.png)
- [ ] Финализировать название платформы (сейчас "Math With Love" — временное)
- [ ] Создать favicon на основе yosi-icon.png (32×32 и 180×180)

---

## Login / Register modal

- [ ] Реализовать модальное окно по утверждённому дизайну
- [ ] Переключение Войти ↔ Регистрация без перезагрузки
- [ ] Валидация полей
- [ ] Показ ошибок под полями
- [ ] Состояние загрузки на кнопке Submit (spinner)
- [ ] Закрытие по клику на backdrop или кнопку ✕

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
      Двухуровневый список (тип → сессии), разделы, вопросы с формулами
      и изображениями, правила выбора, превью, batch-перевод, auto-save индикатор.
- [x] Управление шейлоном desktop (`mwl_shalon_manager.html`) — пятый экран конструктора. ГОТОВО (07/07/2026).
      Иерархическое дерево: шейлон → темы → модули. D&D + ↑↓ + inline edit + expand/collapse.
      Detail panel: одно поле активного языка (titleRu/titleHe, descRu/descHe разделены).
      Save → toast "Сохранено ✓" → авто-перевод через API → shimmer → toast "Переведено ✓".
      Batch-translate убран — перевод автоматически при сохранении.
      Новый sidebar редактора: Главная/Шейлоны/Группы/Атом/Экзамен/Граф // Лаборатория // Помощь/Настройки (без подменю).
      Globe-dropdown в header вместо RU/HE toggle. Bell + Avatar dropdown (Профиль/Настройки/Выйти).
      Desktop only — tablet и mobile версии не создаются.
      Спецификация: MWL_CONTENT_ARCHITECTURE.md §8, DESIGN_SYSTEM.md §19.

---

## Конструктор контента — исправления мокапов (обнаружены в процессе)

- [x] Bidi-изоляция inline-формул (`<bdi>` обёртка) — реализована и проверена
- [x] Баг курсора после вставки формулы — исправлен (zero-width-space якорь)
- [x] Сайдбар в desktop-версии редактора атома — добавлен (отсутствовал)
- [x] Подменю «Контент» в сайдбаре — добавлено во все четыре авторских экрана
- [x] `.shell{min-height}` → `height:100vh;overflow:hidden` — исправлено на всех файлах
- [x] Баг потери контента полей вопроса при перерендере — исправлен (oninput → data model)
- [x] Виртуальная клавиатура MathLive — подавлена через CSS + JS (частично, см. спайк)

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
      Две карточки вопросников (35571 / 35572), список тем с иконками и прогрессом,
      попап силлабуса (ready) + попап «В работе» (in_work), locked темы без клика.
      Оба theme, RU/HE, RTL.
      Файлы: `mwl_courses_desktop.html`, `mwl_courses_tablet.html`, `mwl_courses_mobile.html`.
- [x] /courses/[themeId] — уровень 2: список модулей — desktop + tablet + mobile
      Крошки, шапка с иконкой темы + счётчики модулей и баллов + прогресс-бар.
      Карточки модулей: бейдж, название, баллы (набрано/макс), прогресс атомов,
      подтемы с полными описаниями и цветными точками статуса, КТ-карточка (пунктир amber).
      Сетка 2 колонки desktop/tablet, одна колонка mobile. Оба theme, RU/HE, RTL.
      Файлы: `mwl_courses_theme_desktop.html`, `mwl_courses_theme_tablet.html`, `mwl_courses_theme_mobile.html`.
- [x] /courses/[themeId]/[moduleId] — уровень 3: лабиринт атомов — desktop + tablet + mobile
      Движок v17 (done/current/next/locked/problem/remedial-needed), статусы engine v17.
      Узлы: скруглённые прямоугольники (атомы) + ромбы (КТ) — те же формы что в mwl_graph_map.html.
      Рёбра: сплошная заливка отрезка (без стрелок): cyan = пройден, purple = shortcut, red = return.
      Desktop/tablet: 3 модуля × 5 узлов, облака модулей, cross-module рёбра пунктиром.
      Mobile: только текущий модуль (5 узлов), вертикальный layout, bottom sheet легенда.
      Touch events (tablet/mobile): pan одним пальцем, pinch-zoom двумя.
      RTL поддержка: zoom-controls, легенда, breadcrumbs зеркалятся через [dir="rtl"].
      Файлы: `mwl_courses_module_desktop.html`, `mwl_courses_module_tablet.html`, `mwl_courses_module_mobile.html`.
- [x] /status — страница статуса студента — desktop + tablet + mobile
      Активные темы (параллельное обучение): название темы + текущий модуль + кнопка «Продолжить».
      Обзор всех тем: done / in_progress / not_started, сгруппировано по шейлону.
      Файлы: `mwl_status_desktop.html`, `mwl_status_tablet.html`, `mwl_status_mobile.html`.
      Оба theme, RU/HE, RTL. Глобус-dropdown (lang), аватар-dropdown (profile/settings/logout).
- [x] Страница урока — desktop + tablet + mobile
      Файлы: `mwl_lesson_desktop.html`, `mwl_lesson_tablet.html`, `mwl_lesson_mobile.html`.
- [x] Страница теста — desktop + tablet + mobile
      Файлы: `mwl_test_desktop.html`, `mwl_test_tablet.html`, `mwl_test_mobile.html`.
- [x] Страница экзамена — desktop + tablet + mobile
      Файлы: `mwl_exam_desktop.html`, `mwl_exam_tablet.html`, `mwl_exam_mobile.html`.
- [x] Компонент Йоси (AI Chat Drawer) — макеты готовы (desktop + tablet + mobile, оба theme, RU/HE, RTL)
      Файлы: `mwl_ai_chat_desktop.html`, `mwl_ai_chat_tablet.html`, `mwl_ai_chat_mobile.html`.
      Floating card (desktop/tablet landscape) + bottom sheet (tablet portrait/mobile).
      Trigger: icon-circle 52px amber. Context-aware greeting. Char counter 500. PNG Йоси по ситуации.
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
- [ ] **Retrofit аватар-dropdown** — добавить `.av-wrap/.av-dropdown` (Профиль / Настройки / Выйти) во всех макетах при следующем касании.
- [ ] **Retrofit bottom nav RTL** — убрать `direction:ltr` с `.bnav` во всех существующих mobile-макетах: `mwl_achievements_mobile.html`, `mwl_courses_mobile.html`, `mwl_courses_theme_mobile.html`, `mwl_courses_module_mobile.html`, `mwl_dashboard_mobile.html`, `mwl_settings_mobile.html`, `mwl_exam_mobile.html`, `mwl_test_mobile.html`, `mwl_lesson_mobile.html`.
- [ ] **Навигация — retrofit всех макетов**: обновить сайдбар и bottom nav во всех HTML-мокапах:
      порядок: Главная (home) / Курсы (graduation cap) / Статус (map-pin, /status) / Достижения (trophy);
      mobile bottom nav: Главная / Курсы / Статус / Лаборатория / Помощь(?);
      применить при следующем касании каждого файла.
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

*Обновлён: 2026-07-05 · Навигация финализирована: Главная (home) → позиция 1; Курсы (graduation cap) → позиция 2; Статус (map-pin, /status) → позиция 3; Достижения → позиция 4. /maze упразднён — лабиринт в /courses/[themeId]/[moduleId]. Добавлены задачи: лабиринт уровень 3 (spec уточнён), /status страница.*
*Обновлён: 2026-07-05 (3) · Лабиринт уровня 3 отмечен [x]: desktop + tablet + mobile готовы. Имена файлов групп и схемы экзамена исправлены (без суффиксов _v4/_v2).*
*Обновлён: 2026-07-05 (4) · Конструктор контента — desktop only. Достижения tablet/mobile отмечены [x].*
*Обновлён: 2026-07-05 (5) · Добавлен пятый экран конструктора: Управление шейлоном (mwl_shalon_manager.html). Спецификация в MWL_CONTENT_ARCHITECTURE.md §8 и DESIGN_SYSTEM.md §19.*
*Обновлён: 2026-07-06 · /status отмечен [x]: desktop + tablet + mobile готовы. Lang-btn заменён на глобус-dropdown (новый стандарт). Добавлены retrofit-задачи: глобус-dropdown, аватар-dropdown, bottom nav RTL (direction:ltr убран), навигация. Добавлена задача: компонент Йоси (AI Chat Drawer). Mobile bottom nav финализирован: Главная / Курсы / Статус / Лаборатория / Помощь(?). Landing page, dashboard, lesson, test, exam — отмечены как готовые макеты. Добавлен раздел правил взаимодействия с Claude.*
*Обновлён: 2026-07-07 · Компонент Йоси [x]: макеты desktop + tablet + mobile готовы. §13 DESIGN_SYSTEM.md переписан. Trigger icon-circle, floating card / bottom sheet, context-aware greeting, PNG по ситуации, char counter 500, RTL. Задача в дизайн-системе также закрыта [x].*
*Обновлён: 2026-07-07 · Shalon Manager [x]: mockup complete (desktop only). Detail panel: одно поле активного языка, descRu/descHe раздельно, авто-перевод при Save. Sidebar редактора финализирован (flat, без подменю). Globe-dropdown + bell + avatar-dropdown в header. Batch-translate убран. AI Chat Drawer [x]: все три breakpoints готовы, §13 переписан.*
*Обновлён: 2026-07-07 (вечер) · Login/register modal tablet + mobile отмечены [x]. Все основные макеты завершены. Открыты только retrofit-задачи (глобус-dropdown, аватар-dropdown, bottom nav RTL, навигация).*
