# MWL Design System

Math With Love — educational platform for vector mathematics (Bagrut 572).
Stack: Next.js 14 + TypeScript + Tailwind CSS.

---

## 1. Color Palette

### Core principle
- Accent colors are **identical in both themes** — only backgrounds and text invert.
- Green and red are reserved **exclusively** for correct/incorrect answer states.
- No other color families (blue, purple, etc.) are used as accents.

### Accent — Cyan/Teal

| Token | Hex | Usage |
|---|---|---|
| `cyan-400` | `#22D3EE` | Primary accent: buttons, active borders, progress bars, logo circle (both themes) |
| `cyan-700` | `#0e7490` | Accent text in light theme: tags, headings, formula text |
| `cyan-900` | `#164e63` | Accent background in dark theme: tags, formula bg, badge bg |
| `cyan-100` | `#cffafe` | Accent background in light theme: tags, formula bg, badge bg |
| `cyan-200` | `#a5f3fc` | Accent border in light theme: tags, formula border |

### Amber — rewards, Professor Yosi, gamification, checkpoints

| Token | Hex | Usage |
|---|---|---|
| `amber-400` | `#FBBF24` | Yosi badge, stars, streak indicators, correct-answer sparkles, checkpoint node stroke, checkpoint KT-card |

### Semantic — answer states only

| State | Dark theme | Light theme |
|---|---|---|
| Correct answer | `green-400 #4ade80` | `green-600 #16a34a` |
| Wrong answer | `red-400 #f87171` | `red-600 #dc2626` |

### Group categorization — "Карта графа" and "Группы" screens only

Используется исключительно для различения тематических групп узлов на экране
"Карта графа" и в дереве "Конструктора групп". Это единственное место в системе,
где вводится более одного акцентного цвета одновременно — осознанное и
задокументированное исключение из принципа "only cyan as accent".

| Группа | Hex | Примечание |
|---|---|---|
| Векторы | `#22D3EE` (cyan-400) | Совпадает с основным акцентом системы |
| Тригонометрия | `#FB923C` (orange-400) | Выбран вместо amber — amber зарезервирован под тип «контрольная точка» |
| Производная | `#FB7185` (rose-400) | ⚠️ Технически из «красной» цветовой семьи, зарезервированной §1 под answer-state «неверно». Сознательно принято как исключение по решению автора (июнь 2026). Если в будущем на графе появится индикация неверных/проблемных атомов — потребуется пересмотреть. |

Применение:
- **Карта графа**: обводка (stroke) узла-атома; фон тега группы в детальной панели (`background: color+22, border: color+55`)
- **Конструктор групп**: цветная точка-свотч рядом с названием группы в дереве и фильтрах
- Не используется как заливка узла (заливка нейтральна и зависит от темы)
- Цвет идентичен в обеих темах (соответствует core principle §1)

---

### Dark theme — Slate scale

| Token | Hex | Usage |
|---|---|---|
| `slate-950` | `#0f172a` | Page background, deepest layer |
| `slate-900` | `#1e293b` | Cards, panels, header, sidebar |
| `slate-800` | `#334155` | Borders, dividers, secondary card bg |
| `slate-400` | `#94a3b8` | Secondary text, hover icon color |
| `slate-100` | `#f1f5f9` | Primary text |

### Light theme — inverted Slate scale

| Token | Hex | Usage |
|---|---|---|
| `white` | `#ffffff` | Page background, cards |
| `slate-50` | `#f8fafc` | Cards, panels, header |
| `slate-200` | `#e2e8f0` | Borders, dividers |
| `slate-500` | `#64748b` | Secondary text |
| `slate-900` | `#0f172a` | Primary text |

### Content-constructor background zones (§17, §18 screens)

Applies to all author-facing screens (Карта графа, Конструктор групп). Four distinct
zones create visual depth. Values are identical in concept across screens — exact hex
listed per screen where first defined.

| Zone | Dark | Light |
|---|---|---|
| Header + Sidebar | `#1e293b` (p1) | `#ffffff` (p1) |
| Ctrl-bar (contextual action strip) | `#1e293b` (p1) | `#c5e3eb` |
| Side panel (tree/legend/filters) | `#13233a` | `#f3fbfc` |
| Main field (canvas/content area) | `#0b1322` | `#e2f3f7` |
| Detail/right panel | `#1e293b` (p1) | `#ffffff` (p1) |

---

## 2. Typography

Font: system-ui / Tailwind default sans.
All UI strings start in Russian, then bilingual RU/HE.

| Role | Size | Weight | Color (dark) | Color (light) |
|---|---|---|---|---|
| Page title (H1) | 28px / `text-3xl` | 500 | `slate-100` | `slate-900` |
| Section title (H2) | 20px / `text-xl` | 500 | `slate-100` | `slate-900` |
| Card title | 14px / `text-sm` | 500 | `slate-100` | `slate-900` |
| Body text | 14px / `text-sm` | 400 | `slate-400` | `slate-500` |
| Formula (monospace) | 13px | 400 | `cyan-400` | `cyan-700` |
| Label / caption | 11px | 400 | `slate-500` | `slate-400` |
| Section label (uppercase) | 9–10px | 500 | `slate-600` | `slate-400` |

---

## 3. Spacing & Layout

### Breakpoints (Tailwind standard)

| Name | Width | Layout |
|---|---|---|
| `mobile` | < 768px | Single column, mobile-first |
| `md` (tablet) | 768–1023px | 2 columns in hero, stacked lesson |
| `lg` (desktop) | 1024px+ | Full layout: 2-col hero, 3-col courses, side-by-side lesson |

### Container

```
max-w-6xl mx-auto px-4        // mobile: 16px padding
md:px-6                        // tablet: 24px padding
lg:px-8                        // desktop: 32px padding
```

### Grid — courses section

```
grid-cols-1                    // mobile: stacked
md:grid-cols-2                 // tablet: 2 columns
lg:grid-cols-3                 // desktop: 3 columns
gap-3
```

### Hero section

```
// mobile: single column, center-aligned
flex-col items-center text-center

// md+: two columns, left text + right Yosi
md:flex-row md:items-center md:text-left
```

---

## 4. Components

### Header

```
// Structure (LTR — Russian)
[Logo circle] [Site name]        [RU|HE toggle] [Login] [Register button]

// Structure (RTL — Hebrew)
[Register button] [Login] [RU|HE toggle]        [Site name] [Logo circle]
```

- Height: `h-14` (56px)
- Background: dark `slate-900` / light `slate-50`
- Border bottom: dark `slate-800` / light `slate-200`
- Mobile: hide "Register" button, show only "Login" (full registration via landing CTA)

### Language toggle

```
dark:  bg-slate-700  |  active: bg-cyan-400 text-slate-950
light: bg-slate-200  |  active: bg-cyan-400 text-slate-950
```

### Buttons

**Primary (CTA)**
```
bg-cyan-400 text-slate-950 font-medium
px-5 py-2.5 rounded-lg
hover: brightness-110
mobile: w-full
```

**Secondary (ghost)**
```
border border-slate-700 (dark) / border-slate-300 (light)
text-slate-400 (dark) / text-slate-500 (light)
px-5 py-2.5 rounded-lg
mobile: w-full
```

### Tag / Badge (Bagrut label, module tags)

```
// Dark theme
bg-cyan-900 border border-cyan-400/20 rounded-full
text-cyan-400 text-xs

// Light theme
bg-cyan-100 border border-cyan-200 rounded-full
text-cyan-700 text-xs font-medium
```

### Formula block

```
// Dark theme
bg-slate-950 border border-cyan-900 rounded
font-mono text-cyan-400

// Light theme
bg-cyan-100 border border-cyan-200 rounded
font-mono text-cyan-700
```

### Course card

```
// Active course
border-2 border-cyan-400 bg-slate-900 (dark) / bg-white (light)
rounded-xl p-4
Label badge: bg-cyan-400 text-slate-950

// Coming soon
border border-slate-800 (dark) / border-slate-200 (light)
opacity-50
rounded-xl p-4
```

### Progress bar

```
h-1 bg-slate-950 (dark) / bg-slate-100 (light) rounded-full
inner: bg-cyan-400 rounded-full
```

### Modal / Dialog

```
Overlay: background rgba(0,0,0,0.5), covers .shell inset
  — IMPORTANT: modal markup must live inside .shell so that .d/.l theme
    classes propagate correctly; placing it outside breaks theme inheritance.

Card:
  dark:  bg #1e293b (p1), border #334155, border-radius 14px
  light: bg #ffffff  (p1), border #e2e8f0, border-radius 14px
  padding 20px, min-width 360px, max-width 420px
  box-shadow: 0 8px 24px rgba(0,0,0,0.4)

Title: 14px fw600, t1 color
Body:  13px, t2 color, line-height 1.6

Actions row (flex, gap 8px, justify:flex-end):
  Cancel: standard gr-btn style (see §17)
  Confirm: bg cyan-400, border cyan-400, color slate-950

Position: position:fixed breaks inside sandboxed iframes.
  In mockups use: wrapper div min-height:400px + flex centering inside .shell.
  In Next.js: use portal to document.body or Radix Dialog.
```

### Professor Yosi bubble

```
// Appears bottom-right during lesson, bottom-center on landing (mobile)
Image: /professor/yosi-{state}.png  (present | happy | thinking | encourage)
Bubble: bg-slate-900 (dark) / bg-white (light)
        border border-slate-800 (dark) / border-slate-200 (light)
        rounded-2xl p-3 text-xs
Name:   text-cyan-400 (dark) / text-cyan-700 (light) font-medium text-xs
```

### Answer states (correct / wrong)

```
// Correct
border-green-400 bg-green-400/10 text-green-400  (dark)
border-green-600 bg-green-50    text-green-700   (light)
Yosi: yosi-happy.png + amber sparkles

// Wrong
border-red-400 bg-red-400/10 text-red-400    (dark)
border-red-600 bg-red-50    text-red-700     (light)
Yosi: yosi-encourage.png
```

---

## 5. Responsive Behavior

### Landing page

| Section | Mobile | Tablet (md) | Desktop (lg) |
|---|---|---|---|
| Hero | 1 col, centered, Yosi below text | 2 col, Yosi right (medium) | 2 col, Yosi right (large) |
| CTA buttons | Full width, stacked | Side by side | Side by side |
| Courses | 1 col stacked | 2 col grid | 3 col grid |
| Lesson preview | Formula full width, 3D placeholder below | Formula + 3D side by side | Formula + 3D side by side |

### Lesson page (TBD)

| Section | Mobile | Tablet+ |
|---|---|---|
| Theory | Full width | Left panel |
| 3D visualization | Full width (TBD — static image fallback?) | Right panel inline |
| Answer input | Full width, sticky bottom | Inline below theory |
| Yosi | Bottom center popup | Bottom right fixed |

---

## 6. RTL Support

Applied when language = Hebrew (`dir="rtl"`).

```
// Tailwind RTL utilities
rtl:flex-row-reverse   // mirror flex rows
rtl:text-right         // text alignment
rtl:space-x-reverse    // spacing direction
rtl:ml-0 rtl:mr-3      // swap margins
```

Key rules:
- All flex rows mirror automatically via `rtl:flex-row-reverse`
- Physical `margin-left/right` and `padding-left/right` must use logical CSS
  properties (`margin-inline-start/end`, `padding-inline-start/end`) so they
  flip correctly in RTL without explicit overrides
- Icons that indicate direction (arrows →) must flip: `rtl:rotate-180`
- Progress bars fill from right in RTL
- Sidebar border: use `border-inline-end` not `border-right`
- **Double-flip trap:** never combine `dir="rtl"` on a container with explicit
  `flex-direction:row-reverse` on the same flex children — both reverse the
  order, cancelling out and keeping LTR appearance. Use one or the other.

---

## 7. Gamification Indicators

Used in dashboard and lesson pages. Not leaderboards.

| Element | Description |
|---|---|
| Progress bar | Per-topic completion, cyan fill |
| Streak counter | Days in a row, amber flame icon |
| XP / points | Earned per correct answer, amber color |
| Topic lock | Locked topics shown at 50% opacity |
| Completion badge | Small amber star on completed topic card |

---

## 8. Professor Yosi Usage Rules

- **yosi-present.png** — default state, landing hero, new lesson start
- **yosi-thinking.png** — while problem loads, "thinking" pause
- **yosi-happy.png** — correct answer, module completion
- **yosi-encourage.png** — wrong answer with explanation, retry prompt
- **yosi-icon.png** — avatar in answer input bar, favicon base

Yosi **never appears** on: auth pages (login/register), error pages (404/500).

---

## 9. Login / Register Modal

Implemented as a modal overlay (not a separate page) — works on all screen sizes.

### Structure

```
[Backdrop: page-bg with subtle diagonal pattern]
  └── [Modal card: max-w 420px, rounded-2xl]
        ├── [Close button — top right]
        ├── [Logo circle — cyan-400]
        ├── [Title + subtitle]
        ├── [Tabs: Войти | Регистрация]
        ├── [Google button]
        ├── [Divider: — или —]
        ├── [Form fields]
        │     ├── Имя (register only)
        │     ├── Email
        │     ├── Пароль
        │     └── Подтвердите пароль (register only)
        ├── [Забыли пароль? — login only]
        ├── [Submit button — cyan-400]
        └── [Switch link: Нет аккаунта? / Уже есть аккаунт?]
```

### Tabs (Войти / Регистрация)

```
// Active: bg-cyan-400 text-slate-950 border border-cyan-400 rounded-lg
// Inactive dark: border border-slate-700 text-slate-400 bg-transparent rounded-lg
// Inactive light: border border-slate-200 text-slate-500 bg-transparent rounded-lg
```

### Modal card

```
// Dark: bg-slate-800 (#1e293b) border border-slate-700 rounded-2xl
//       box-shadow: 0 24px 64px rgba(0,0,0,0.5)
// Light: bg-white border border-slate-200 rounded-2xl
//        box-shadow: 0 24px 64px rgba(0,0,0,0.12)
```

### Form inputs

```
// Dark: bg #334155 (slate-700) border #475569 (slate-600) color #f1f5f9
//       placeholder #64748b  |  focus border-color #22D3EE
// Light: bg #ffffff border #cbd5e1 (slate-300) color #0f172a
//        placeholder #94a3b8  |  focus border-color #22D3EE
// Both: border-radius 8px, padding 10px 40px 10px 14px
// Icon inside field: right-aligned, slate-500
```

### Google button

```
// Dark: bg #334155 border #475569 text #f1f5f9
// Light: bg #ffffff border #cbd5e1 text #0f172a
// Google color SVG logo inline
```

### Icons (Tabler Icons webfont v2.44)

```
ti-x          — close button
ti-login      — login icon in mobile header
ti-user-plus  — register icon in mobile header
ti-user       — name field
ti-mail       — email field
ti-eye        — password toggle
CDN: https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.44.0/tabler-icons.min.css
```

### Backdrop

```
// Dark: bg #0f172a (slate-950)
// Light: bg #f1f5f9 (slate-100)
// Pattern: repeating-linear-gradient 45deg, cyan-400 at 3% opacity
```

---

## 10. Dashboard

### Layout by breakpoint

| Element | Desktop (1024px+) | Tablet (768–1023px) | Mobile (<768px) |
|---|---|---|---|
| Sidebar | Left, collapsible 52→180px | Left, collapsible 44→170px | Hidden |
| Bottom nav | — | — | Fixed bottom, 5 tabs |
| Content | 2-col grid | 2-col grid | 1-col stack |

### Persistent shell (applies to ALL authenticated pages)

**Rule:** header, sidebar (desktop/tablet), and bottom nav (mobile) never scroll away
or reload when navigating between authenticated pages (Dashboard, Lesson, Test,
Exam, Atom Editor, future content-constructor screens). Only the central content
area scrolls.

```
.shell { height: 100vh; overflow: hidden }   // NOT min-height — that was the bug:
                                              // min-height let the whole page grow
                                              // past the viewport, so header/sidebar
                                              // scrolled away with everything else.
.main  { flex: 1; overflow-y: auto }         // only this area scrolls internally
```

In the real Next.js 14 app this is solved natively via the App Router's shared
`layout.tsx` (header + sidebar render once, `{children}` swaps) — the CSS rule
above is for static-HTML mockups only.

### Header (authenticated)

```
[Logo] [Site name] [Search field ——————] [Lang] [Bell] [User]
Search icon: right-aligned inside field
```

### Header

3-column CSS Grid layout — поиск всегда строго по центру, не зависит от ширины боковых секций:

```css
.hdr {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  height: 48px;
  padding: 0 14px;
}
.hdr-left  { display: flex; align-items: center; gap: 10px }
.hdr-center{ display: flex; align-items: center; justify-content: center }
.hdr-right { display: flex; align-items: center; justify-content: flex-end; gap: 6px }
```

RTL-поведение (иврит): CSS Grid автоматически зеркалит колонки при `dir="rtl"` на `.shell`:
- LTR: [лого + бренд | поиск | кнопки] — лого слева, кнопки справа
- RTL: [кнопки | поиск | лого + бренд] — кнопки слева, поиск по центру, лого справа

### Sidebar — 3 groups, no divider lines, only spacing

```
[Toggle btn]           ← expand/collapse, width: collapsed 46px / expanded 164px
Group 1 (top):
  [🏠  Дашборд]        — home icon
  [🎓  Модули]         — graduation cap — ЗАФИКСИРОВАНО ✓
  [📊  Прогресс]       — bar chart
  [📝  Редактор]       — document + pencil — ЗАФИКСИРОВАНО ✓
    └─ submenu (visible only when «Редактор» is active):
         [⬡  Граф]       — route/path: circle cx5 cy6 r2, circle cx19 cy6 r2,
                            circle cx12 cy18 r2, path M7 6h10, path M14 18H7 a2 2... — ЗАФИКСИРОВАНО ✓
         [☰  Атом]       — document with lines (rect + 2 lines)
         [⊞  Группы]     — 4 squares grid (2×2)
         [✎✓ Экзамены]   — pencil-check (Tabler): path M4 20h4l10.5-10.5... — ЗАФИКСИРОВАНО ✓

Group 2 (margin: auto 0 — vertically centered):
  [±×  Формулы]  — math-symbols (Tabler) — ЗАФИКСИРОВАНО ✓
                   SVG: M3 12l18 0 / M12 3l0 18 / M16.5 4.5l3 3 / M19.5 4.5l-3 3 /
                   M6 4l0 4 / M4 6l4 0 / M18 16l.01 0 / M18 20l.01 0 / M4 18l4 0
  [⚛  Лаборатория] — atom: circle r2 + 3 ellipses rx10 ry4 rotated 0°/60°/120° — ЗАФИКСИРОВАНО ✓
  [🏆  Достижения] — trophy

Group 3 (bottom):
  [?   Помощь]    — circle with question mark
  [⚙   Настройки] — gear
```

#### Sidebar icon alignment (зафиксировано июнь 2026)

Иконки должны стоять на одной горизонтальной позиции в обоих состояниях — свёрнутом и развёрнутом.

```css
/* Ключевое правило: .ni всегда 46px (= ширина свёрнутого сайдбара) */
.ni { width: 46px; height: 38px; display: flex; align-items: center; }
.sb.open .ni { width: 100%; }  /* растягивается при открытии */

/* icon-wrap всегда 46px — иконка физически не сдвигается */
.ni .icon-wrap { width: 46px; display: flex; align-items: center; justify-content: center; flex-shrink: 0 }
/* При открытии icon-wrap остаётся 46px — текст появляется справа */
```

Nav item states:
```
active (both themes): color #22D3EE — icon + label, no background
hover  (both themes): color #94a3b8 — icon + label, no background
```

### §10a. Content constructor sidebar entry point

Resolved (June 2026): top-level пункт **«Редактор»** в основном сайдбаре с раскрывающимся
подменю (Граф / Атом / Группы / Экзамены).

- Подменю открывается **только когда «Редактор» активен** (не как отдельный toggle)
- Активация «Редактора» деактивирует все остальные пункты верхнего уровня
- Клик на Дашборд/Модули/Прогресс → закрывает подменю и деактивирует «Редактор»
- В свёрнутом сайдбаре: клик на иконку «Редактора» → разворачивает сайдбар + открывает подменю
- Подпункты: `.ni-sub` flex-row с иконкой 14px + текстом, indent `padding-inline-start: 14px`
- Активный подпункт: `color: #22D3EE; font-weight: 600; svg stroke: #22D3EE`

### i18n — Dashboard

```javascript
// TR_DASH dictionary (RU + HE), setLang() + applyI18n() via data-i18n attributes
// Sandbox-safe onclick: callFn() dispatcher вместо eval()

function callFn(expr) {
  // parses: fn(), fn('str'), fn(n), fn('str', n)
}

function setLang(lang) {
  // sets dir="rtl/ltr" on #shell, updates TR_DASH labels, placeholder
}
```

RTL switching: `dir="rtl/ltr"` устанавливается на `#shell`. Header grid зеркалит
автоматически. Sidebar position (left/right) зеркалит автоматически через flex-direction.

### Contextual action strip (`.ctrl`)

Strip directly under header, specific to each content-constructor screen.
Contains: theme toggle + screen label + screen-specific action buttons.

```
height: auto (flex wrap), padding: 8px 14px
border-bottom: 1px solid
dark:  bg p1 (#1e293b)
light: bg #c5e3eb

Theme toggle buttons: standard tcb style (see below)
Screen label: 12px, t2 color, flex:1 (pushes actions right)
Action buttons: tcb style with accent border (border-color: #475569 dark / #94a3b8 light)
  — matches sidebar icon color in both themes; no colored text on these buttons
```

### `.tcb` — small toolbar button

```
padding: 4px 12px, border-radius: 8px, font-size: 11px, font-weight: 500
border: 1px solid, background: transparent, cursor: pointer
dark:  color #94a3b8, border-color #334155
light: color #64748b, border-color #e2e8f0
active (.tcb.on): bg #22D3EE, border-color #22D3EE, color #0f172a (both themes)
```

### Bottom navigation (mobile only)

Height 52px. 5 tabs: Главная | Модули | Формулы | Лаборатория | Настройки
Active tab: cyan-400 (dark) / cyan-700 (light). Label 8px below icon.

### Welcome section structure

```
[Avatar] [Greeting + subtitle]          [Yosi card]

[Action buttons — bottom-aligned with Yosi card height]
```

Left column: `flex-direction:column; justify-content:space-between`

**Avatar (initials, auto-generated):**
- 44px desktop / 36px tablet / 32px mobile, border-radius 50%
- bg cyan-400, color slate-950, font-weight 600

**Greeting:**
- "Добрый день/утро/вечер, [Имя] 👋" — time-based
- Subtitle: "Что сегодня делаем?" — indented under avatar

**Action buttons:**
- desktop/tablet: flex-row — [▶ Продолжить] [↺ Повторить] [→ Новая тема]
- mobile: flex-col, full width

**Yosi card sizes:**
- desktop: 200px wide, image 110px tall
- tablet: 160px wide, image 85px tall
- mobile: 90px wide, image auto

### Stats row

3 cards: 🔥 Серия дней | ⭐ Очки | ✓ Пройдено тем
No % signs on any numeric values across dashboard.

### Average score badge

```
bg rgba(74,222,128,0.1) border rgba(74,222,128,0.3) color #4ade80
light: bg rgba(22,163,74,0.08) color #16a34a
label "ср. балл" 9px + number without %
```

### User avatar

- Registration: auto-generated initials, cyan-400 bg
- Settings: option to upload photo
- Fallback: always initials

---

## 11. Progress Maze (Dashboard Widget)

SVG-based node map showing a student's path through one course (topics: theory →
test → exam). Lives inside the dashboard's right column, below the welcome row.
Approved logic: desktop test rig (v17), validated against ~15 fail/return/remedial
scenarios. **This section is the single source of truth for the maze's JS state
machine — copy verbatim into any new layout (tablet/mobile), only resizing CSS
(node radius, gap, font sizes) around it.**

### Core principle

No history is invented or guessed from "how we got here." Every visual fact on
the map (a solid line, a badge, a remedial node) is backed by an explicit,
permanent record in state — written only at the moment the action actually
happens (a lesson/test is passed, a click moves the token). Nothing is inferred
after the fact, which is what makes the logic safe to extend as node count grows.

### Course data structure

```js
function buildCourse(n){
  var types=[], labels=[], sc={}, li=0, ti=0;
  for(var i=0;i<n;i++){
    var t = i===n-1 ? 'exam' : ((i+1)%3===0 ? 'test' : 'lesson');
    types.push(t);
    labels.push(t==='lesson' ? lN[li++%lN.length] : t==='test' ? tN[ti++%tN.length] : 'Экзамен');
  }
  for(var i=0;i<n;i++){
    if(types[i]==='test'){
      for(var j=i+1;j<n;j++){
        if(types[j]==='test'||types[j]==='exam'){ if(j>i+1) sc[i]=j; break; }
      }
    }
  }
  return {types, labels, sc, n};
}
```

### State (minimal — no "how did we get here" memory)

```js
var s = {
  cur: 0,
  earned: {},
  passed: {},
  problems: new Set(),
  failCount: {},
  totalFails: {},
  remedialActive: null,
  shortcutsUsed: new Set(),
  remedialUsed: new Set(),
  historyFails: new Set(),
  returnPaths: {},
  segs: new Set()
};
```

`prevNode` is deliberately **not** part of state.

### computeSt() — the single source of truth for node status

```js
function computeSt(){
  var st = new Array(n).fill('locked');
  for(var i=0;i<n;i++) if(s.passed[i]) st[i] = 'done';
  st[s.cur] = 'current';
  for(var i=0;i<n;i++){
    if(s.passed[i] && i+1<n && st[i+1]==='locked') st[i+1] = 'next';
  }
  for(var k in sc){
    k = parseInt(k);
    if(s.passed[k] && st[sc[k]]==='locked') st[sc[k]] = 'next';
  }
  s.problems.forEach(function(pi){
    if(st[pi]==='done' || st[pi]==='current') return;
    if(allPriorDone(pi)){
      st[pi] = s.remedialUsed.has(pi) ? 'next' : 'remedial-needed';
    } else {
      st[pi] = 'problem';
    }
  });
  return st;
}
```

### Five node statuses

| Status | Meaning | Visual |
|---|---|---|
| `done` | Passed | Solid fill in type color, dark checkmark |
| `current` | Token is here | Colored ring (2.5px), 🧑‍🎓 token via `<text>` |
| `next` | Reachable now | Lighter ring, dimmed fill |
| `problem` | Blocked — material before it is incomplete | Red dashed ring |
| `remedial-needed` | Blocked — material is complete but test keeps failing | Same red dashed ring; remedial node appears below it |

### Transitions — who moves `cur` and who writes a segment

| Action | Moves `cur`? | Writes a segment? |
|---|---|---|
| `simLesson()` (pass a lesson) | Yes, auto to `cur+1` | Yes, `"i:i+1"` |
| `simPass()` (pass a test/exam) | No | No |
| Click on an open node | Yes | Yes, if `cur+1` or `sc[cur]` |
| `simFail()`, shortcut-fail branch | Yes, auto to `findReturnNode()` | Yes, `"ret{test}:{node}"` |
| `simFail()`, remedial branch | No | No |
| Remedial completed | Yes, to the test | Yes, `"rem{test}"` |

### Segments

`segs` is a `Set` recording only edges the student has physically walked.

| Segment key | Painted as |
|---|---|
| `"i:i+1"` | Solid cyan line, 3px |
| `"i:j"` where `sc[i]===j` | Solid purple line, 3px, arc above row |
| `"ret{test}:{node}"` | Solid red arc below row |
| `"rem{test}"` | Remedial node: outlined → solid purple fill + dark checkmark |

### Hard rules (checklist before copying into a new layout)

1. `cur` only changes via `simLesson()`, click handler, or `simFail()` auto-relocation.
2. Segments written only at moment of real traversal — never speculatively.
3. `remedialUsed`, `historyFails`, `totalFails`, `returnPaths`, `shortcutsUsed` are append-only.
4. SVG icons are native `<text>` with emoji — never `foreignObject`.
5. No vector arrowheads on any line.
6. Theme background from `BGMAP = {d:'#0f172a', l:'#f1f5f9'}` — never CSS variables inside SVG.

---

## 12. Test Page

Approved: desktop — both themes (June 2026).

### Layout structure

```
┌─────────────────────────────────────────────────┐
│  TOPBAR: [chip] [Q1][Q2]...[Q7] [timer] [exit]  │
├─────────────────────────────────────────────────┤
│  PROGRESS BAR (full width, color matches timer) │
├─────────────────────────────────────────────────┤
│  STATS BLOCK: ✓ верно | ~ частично | ✗ ошибок  │
│               → пропущен | ★ очков (amber)      │
├──────────────────┬──────────────────────────────┤
│  ZONE 1 LEFT     │  ZONE 1 RIGHT                │
│  Question text   │  Three.js visualization      │
├──────────────────┴──────────────────────────────┤
│  ZONE 2 — Answer input (numeric or A/B/C/D)    │
│  + result + Skip / Check / Next buttons         │
└─────────────────────────────────────────────────┘
```

### Topbar — question number circles

Center of topbar. Strictly round: `width=height=28px`, `border-radius:50%`.

| Status | bg | border | color |
|---|---|---|---|
| Unanswered | transparent | slate-700/slate-300 | slate-500 |
| Correct | green-400/13 | green-400/40 | green-400 |
| Partial | amber-400/13 | amber-400/40 | amber-400 |
| Wrong | red-400/13 | red-400/40 | red-400 |
| Skipped | slate-700/13 | slate-600/30 | slate-500 |
| Active | cyan-400/13 | cyan-400 2px | cyan-400, fw 700 |

### Adaptive timer

Pill shape, no icons — digits only.

```
> 2 min:  green  #4ade80
< 2 min:  amber  #FBBF24
< 30 sec: red    #f87171 + bg pulses between #f8717133↔#f8717118
```

Progress bar fill color mirrors timer state.

### Answer types

**Choice A/B/C/D:**
```
default:  dark bg #0f1e2e border slate-800  |  light bg #f5f7fa border slate-200
selected: dark bg cyan-400/13 border cyan-400 1.5px color cyan-400
          light bg #e0f4fa border #0891b2 color #0891b2
```

**Result states:**
```
correct: dark bg #08251a color #4ade80  |  light bg #ecfdf5 color #065f46
partial: dark bg #2a1f00 color #FBBF24  |  light bg #fffbeb color #92400e
wrong:   dark bg #250808 color #f87171  |  light bg #fef2f2 color #dc2626
```

### Responsive — Test Page

| Element | Desktop (1024px+) | Tablet (768–1023px) | Mobile (<768px) |
|---|---|---|---|
| Layout | Zone 1: 2 columns | Zone 1: 2 columns | Zone 1: 1 column stacked |
| Q circles | 28px | 26px | 24px |
| Timer font | 15px | 14px | 13px |
| Viz size | 185×158px | 175×152px | 200×150px |

---

## 13. AI Chat Drawer (Professor Yosi)

Approved: all pages, both themes, RU (LTR) + HE (RTL) (June 2026).

### Trigger button

```
dark:  bg #FBBF2418, border 1.5px #FBBF2455, color #FBBF24
light: bg #FEF9EC,   border 1.5px #FBBF2488, color #92400e
icon 🧑‍🏫 + text "Спросить Йоси" / "שאל את יוסי"
border-radius: 24px
```

### Drawer

Slides up from bottom, `transform: translateY`, `cubic-bezier(0.32,0.72,0,1)`, 350ms. Dim overlay behind. Max-height 90%. Handle: 36×4px pill, slate-700/slate-300.

### Messages

**LTR (RU):** Yosi left, student right. **RTL (HE):** fully mirrored.

```
Yosi bubble:
  dark  bg #2a1e0a border #FBBF2433 color #e8d5a0
  light bg #fffbeb border #FBBF2466 color #78350f
  border-radius LTR 3px 10px 10px 10px | RTL 10px 3px 10px 10px

Student bubble:
  dark  bg #1e3040 border #334a5a color #94a3b8
  light bg #f0f4f8 border #c0ccd8 color #475569
  border-radius LTR 10px 3px 10px 10px | RTL 3px 10px 10px 10px
```

### RTL full mirror (HE mode)

- `drawer`, `ctx-strip` → `dir="rtl"`
- Input padding swaps, buttons group moves before textarea in DOM
- `textarea` → `dir="rtl"`, `text-align:right`
- Bubble border-radius flips (see above)
- Yosi right side, student left side

### Text answer type (AI-checked)

Third answer type — free-form textarea, checked by AI against a pre-stored reference answer.

```
AI checking indicator:
  dark:  bg #0f1e2e, border slate-800
  light: bg #f0f8fb, border slate-200
  🤖 icon + "AI проверяет..." text + 3 amber bounce dots

AI feedback block:
  correct: dark bg #0a2010 border green-400/20  | light bg #f0fdf4
  partial: dark bg #1a1400 border amber-400/20  | light bg #fffbeb
  wrong:   dark bg #200808 border red-400/20    | light bg #fef2f2
```

---

## 14. Exam Page

Approved: desktop — both themes (June 2026).

### Concept — how exam differs from test

| Feature | Test | Exam |
|---|---|---|
| Result after each answer | ✓ Immediate | ✗ Only at the end |
| Skip button | ✓ Yes | ✗ No |
| Timer | Optional | Required, auto-starts |
| Check button | ✓ Per question | ✗ Replaced by "Finish Exam" |
| Navigation | Next only | ← Previous + Next → |

### Exit confirmation dialog

```
Dialog card:
  dark:  bg #0f1e2e, border slate-800, border-radius 12px
  light: bg #ffffff,  border slate-200
  padding 24px, max-width 320px

Buttons:
  "Остаться": dark bg #1a3a4e | light bg #f0f4f8
  "Выйти":    bg #f87171, color white (always red)
```

### Results screen

Full-screen overlay. Score circle: 72px desktop / 60px tablet / 56px mobile.
Score progress bar: 8px height, cyan-400 fill, animated 0.8s.

### Responsive — Exam Page

| Element | Desktop | Tablet | Mobile |
|---|---|---|---|
| Zone 1 | 2 columns | 2 columns | 1 column stacked |
| Q circles | 28px | 24px | 22px |
| Nav layout | Single row | Single row | Two rows |
| "Завершить" | Inline in nav row | Inline in nav row | Full-width below nav |
| Score circle | 72px | 60px | 56px |

---

## 15. Atom Editor (Content Constructor)

**Status: draft, mid-iteration — not yet approved.** Author-facing. Scope: desktop + tablet only.

Access: same persistent shell as Dashboard — header + collapsible left sidebar (§10a).

### Step cards (4, stacked vertically, not tabs)

```
① Теория              — rich text + inline formulas + "Динамичная графика" block
② Проверка понимания  — short comprehension check
③ Упражнения           — sequential practice with full step-by-step solution
④ Тест атома           — final check; hints only (NO full solution)
```

Each card: numbered circle badge (cyan), title, grey subtitle, divider, body padding 14px.

### Translation / verification badge (per text field)

Content authored in **Hebrew** (primary); Russian is an AI-generated draft.

```
Badge states (small pill, top-right of field label row):
  Original (primary language):    green, ✓ icon, not clickable
  Draft (non-primary, unverified): amber, ⚠ icon, "Черновик ИИ"
  Verified (non-primary, clicked): green, ✓ icon, "Перевод проверен"
```

### Formula input — MathLive WYSIWYG

Uses **MathLive** (`<math-field>`, CDN — first external dependency).

```
Mixed text+formula fields:
  contenteditable + "∑ Вставить формулу" button
  → inserts inline <math-field> at cursor wrapped in:
    <bdi style="unicode-bidi:isolate; direction:ltr">

Bidi-isolation fix (June 2026):
  Live formula insertion (insertFormula()) now wraps in <bdi> to match
  static demo content. Also: a zero-width-space text node (\u200B) is
  inserted immediately after the <bdi> wrapper — this gives the browser
  a real text node to click on at the formula boundary, fixing a known
  Selection API ambiguity where clicks at a custom-element edge resolve
  to "before" instead of "after" the element.
```

MathLive chrome removed (`::part(virtual-keyboard-toggle)`, `::part(menu-toggle)` → `display:none`).

---

## 16. Graph Map (Content Constructor)

**Status: approved mockup (mwl_graph_map.html).** Author-facing. Scope: desktop only.

### Layout

```
[Sidebar §10a] | [Ctrl-bar: theme · screen label · Link nodes · New atom]
               | [Filter/Legend panel 190px] | [SVG canvas] | [Detail panel 290px, slides open]
```

Background zones match §1 content-constructor zone spec:
- Filter/legend panel: `#13233a` dark / `#f3fbfc` light
- SVG canvas: `#0b1322` dark / `#e2f3f7` light

### Node types

| Type | Shape | Stroke color | Fill |
|---|---|---|---|
| Atom | Rounded rect (rx 9) | Group color | Neutral (theme-dependent) |
| Checkpoint | Diamond (polygon) | `#FBBF24` (amber-400) — always, regardless of group | Neutral |

Checkpoint stroke is always amber regardless of which group it belongs to —
type identity takes precedence over group color.

### Edge types

| Kind | Visual |
|---|---|
| Direct (atom → atom) | Solid `#22D3EE`, 1.6px |
| Via checkpoint | Dashed `#64748B` dark / `#94a3b8` light, 1.6px, dasharray 5 4 |

### Interactions

- **Pan/zoom**: mouse wheel + drag on canvas background
- **Drag node**: changes position, physics relaxes around it (force-directed, O(n²) naive)
- **Click node**: opens detail panel (canvas width shrinks, auto-fit re-zoom on close)
- **Click edge**: opens edge detail (type + delete)
- **Link mode**: click source → click target → popover to choose edge type
- **Filter by group**: checkboxes dim non-selected groups (opacity 0.18) without hiding — cross-group edges remain visible

### Detail panel (right, 290px)

Slides open on node/edge click, pushes canvas (does not overlay). Contents:
- Node: type badge, title (HE title in RU mode as small subtitle), group tag (colored by group), prerequisite list with edge-type indicator, action buttons
- Edge: edge type badge, From/To nodes, delete button

### i18n / RTL

Full RU/HE translation via `TR{ru, he}` dictionary. `dir="rtl"` set on shell root on HE. Logical CSS properties used throughout (`border-inline-*`, `margin-inline-*`, `padding-inline-*`) — no physical `left/right` properties except where inherited.

Group tag colors use `background: color + "22"` (≈13% opacity) + `border: color + "55"` (≈33% opacity) + text in group color — same formula in both themes.

---

## 17. Groups Constructor (Content Constructor)

**Status: approved mockup (mwl_groups_v4.html).** Author-facing. Scope: desktop only.

### Concept

Groups are tags over the flat atom graph — not containers. A group is a named filter that atoms belong to; the same atom can belong to multiple groups (many-to-many). Hierarchy is achieved via a `parentId` field on each group (tag references tag), not via structural nesting.

**Draft atom**: a lightweight placeholder — just a title and group membership, no content. Created in the Groups Constructor to plan the course structure before authoring. Becomes a full atom when opened in the Atom Editor. Order is tracked via an `order` integer on each group for display/planning purposes; the actual learning sequence comes from the prerequisite graph (§ MWL_CONTENT_ARCHITECTURE §5), not from this order.

### Layout

```
[Sidebar §10a] | [Ctrl-bar: theme · screen label · New group (context-aware) · Translate btn]
               | [Group tree 280px] | [Group content area: full width]
```

Background zones (from §1 content-constructor zone spec):
- Group tree: `#13233a` dark / `#f3fbfc` light
- Content area: `#0b1322` dark / `#e2f3f7` light

### Group tree

Recursive tree rendered from `{id, title, titleHe, parentId, order}` items.

```
Indent per level: padding-inline-start: 10 + depth×16 px
Row: [chevron 14px] [label flex:1] [atom count badge]
  — chevron hidden (visibility:hidden) if no children
  — chevron rotates 90° when open

Colors:
  default: t1/t2 text, no background
  active:  background rgba(34,211,238,0.12), color #22D3EE
  hover:   theme-appropriate background (see §1 bg tokens)

Add subgroup: NOT shown as an inline button per node.
  "New group" button in ctrl-bar is context-aware:
    — nothing selected → "＋ Новая группа" (creates top-level)
    — group selected   → "＋ Подгруппа" (creates child of selected)
  Bottom of tree also has "＋ Новая группа верхнего уровня" link.
```

### Drag-and-drop (tree reorder / reparent)

Like Windows Explorer:
- Drag source: `opacity 0.4`
- Drop **onto** a node (center 50%): highlight `outline: 2px solid #22D3EE` + `background rgba(34,211,238,0.1)` → dropped item becomes child of target
- Drop **between** nodes (top/bottom 25%): shows 2px cyan insertion line → dropped item reorders at that position within the same parent level
- Auto-expand on 400ms hover over a closed node with children
- Guard: cannot drop a parent into its own descendant (`isAncestor()` check)
- Order stored as integer `.order` on each group; `childrenOf()` sorts by it

### Checkpoint status card

Appears only when the group has ≥1 atom (hidden for empty groups).

```
Border: amber-400 at 30% opacity
Background: rgba(251,191,36,0.06) dark / rgba(251,191,36,0.08) light

Layout (top → bottom):
  Row: [diamond icon amber] [title] [status pill]
  Note text (11px, t2)
  Progress row: [bar] [text "Готово N / M"]

Status pill:
  Locked: bg rgba(148,163,184,0.15), color #94a3b8
  Open:   bg rgba(74,222,128,0.15),  color #4ade80

Progress bar: 6px height, bg #0f172a dark / #e2e8f0 light, fill #FBBF24

Rule: checkpoint opens automatically when ALL atoms in the group are ready
(status=published). No manual configuration of which atoms it covers.
```

### Atom list

```
Published atom row:
  dark:  bg #1e293b, border #334155
  light: bg #ffffff, border #e2e8f0
  Icon:  30×30px rounded rect, bg rgba(34,211,238,0.1), stroke #22D3EE
  Status badge: green pill "готов"

Draft atom row (same structure, different visuals):
  border-style: dashed
  opacity: 0.72
  Icon:  transparent bg + 1.5px dashed border (theme-appropriate)
         stroke dimmed (#64748b)
  Status badge: slate pill "черновик"
```

### Add atom modal

Two-tab modal (standard modal style, §4):
- **Tab 1 — New draft**: text input for title only → creates `{status:'draft'}` atom
- **Tab 2 — Link existing**: searchable list of atoms not yet in this group (respects many-to-many)

### Batch translation (AI)

```
Button in ctrl-bar: "RU → HE" or "HE → RU" (label flips with current language)
Style: tcb with accent border (same as other action buttons in §10 ctrl-bar)

Modal:
  Title and body fully translated via TR{} dictionary (no hardcoded language)
  Body: "Перевести все названия групп и атомов с [X] на [Y]? Существующие переводы
         будут перезаписаны."

Progress bar (appears after clicking Translate):
  Animated fill 0%→80% while API call runs (simulated progress)
  Jumps to 100% on success, turns red (#f87171 fill) on error
  height 5px, bg #0f172a dark / #e2e8f0 light

State machine:
  Translate btn visible → (click) → Cancel visible + bar animating
  → success: bar 100%, progress label, OK btn appears (Translate btn hidden)
  → error:   bar red, error text, Translate btn reappears
  → OK click or Cancel: apply/discard buffered result, close modal

API: Anthropic /v1/messages (claude-sonnet-4-6), batch prompt — all titles
in a numbered list, returns JSON array in the same order. Prompt includes
"mathematics educator translator" context for correct term translation.
```

### i18n / RTL

Full RU/HE translation via `TR{ru, he}` dictionary. RTL set on shell root. Group titles stored as `title` (RU) and `titleHe` (HE) — tree and content area show the appropriate field based on active language.

---

## 18. Exam Schema Editor — «Примеры вопросников» (Content Constructor)

**Status: approved mockup (mwl_exam_schema_v2.html).** Author-facing. Scope: desktop only.

### Concept

Screen for authoring Bagrut exam instances (שאלונים). Two-level structure:
- **Shalon type** (вопросник): number only (572, 571, 471…) — no title shown in list
- **Session** (экземпляр вопросника): free-form label authored by teacher, no date fields, not bound to any calendar date — purely content-based

Multiple sessions per shalon type — the more the better (archive of past exams for practice).

### Layout

```
[Sidebar §10a] | [Ctrl-bar: theme · RU→HE translate · Preview · + New срок (contextual)]
               | [Shalon list panel, collapsible] | [Editor / Preview panel]
```

### Shalon list panel (left, collapsible)

Collapsible like sidebar: open (220px) / closed (46px strip).

```
Toggle button: ☰ hamburger (NOT the sidebar icon — different to avoid confusion)
Title "Примеры вопросников" / "דוגמאות שאלונים": visible only when open (opacity fade)
Toggle button stays fixed at same position regardless of open/closed state.

Open state:
  Type row: [number badge: 572] [▾/▸ chevron]  ← no title text, no session count
  Session rows (visible when type selected):
    [exam document icon 14px] [free label or "Без названия"]
  [+ Вопросник] button at bottom — always visible, adds new shalon type

Closed state (46px):
  [☰ toggle]
  [572 badge]  ← clickable, expands panel + selects type
  [571 badge]
```

Auto-close: panel closes automatically when a session is selected, giving more editor space.

**+ button (ctrl-bar) is context-aware:**
- Type selected → «+ Новый срок» (adds session inside selected type)
- Nothing selected → «+ Вопросник» (adds new shalon type)

### Session editor

```
Session header: [type number · session label] in cyan
Metadata grid (4 cols): duration (min) | total questions (read-only) | answer K | pts/question
Instructions field: free-form textarea (3 rows) — author writes any text; shown in preview as-is
פרקים list: collapsible cards (same structure as Groups Constructor)
+ Add פרק button
Selection rules constructor (below פרקים)
```

### פרק card

```
Header: [chevron] [badge Р1/פ1] [editable name input] [question count] [✕ delete]
Body (when open):
  Topics textarea (2 rows, italic placeholder)
  Question rows
  + Add question button
```

### Question row

```
Header: [q-num circle] [pts badge amber] [✓ save indicator] [toolbar]
  Toolbar: [∑ smart button] [📎 image] [✕ delete]
Body: contenteditable field (min-height 60px, dark bg #0f172a / light #f8fafc)
  — with image: text 66.7% | image 33.3%, vertical divider
  — no image: full width

∑ button behavior (single smart button, replaces two-button approach):
  — no focused math-field in this question → inserts new <math-field> at cursor + opens symbol panel
  — math-field already focused → opens symbol panel only
  — panel open → closes panel
  onmousedown="event.preventDefault()" on all formula buttons — never steals focus
```

### Save indicator

```
green ✓ in question header: appears 600ms after typing stops, fades after 1.4s
Content saved to data model on every keystroke (oninput → q.content = el.innerHTML)
```

### Tab key in question content fields

```
Tab inside .q-content → inserts 4 × \u00A0 (non-breaking space) as indent
Exit field: Escape or mouse click elsewhere
```

### Inline formula fields (`<math-field class="imf">`)

```
Wrapped in: <bdi style="unicode-bidi:isolate; direction:ltr">
Followed by: \u200B zero-width-space anchor (fixes Selection API boundary ambiguity)
virtual-keyboard-mode="off" attribute + JS: mf.virtualKeyboardMode='off'; mf.menuItems=[]
CSS: ::part(virtual-keyboard-toggle), ::part(menu-toggle) { display:none !important }
Delete empty field: Backspace/Delete when mf.getValue('latex').trim()==='' removes bdi+anchor

⚠️ ENGINEERING SPIKE REQUIRED (see §19):
Mixed contenteditable + inline MathLive + RTL bidi is a known hard problem.
The mockup demonstrates the intended UX; actual production implementation
needs a dedicated spike in Next.js before Фаза 8.
```

### Formula symbol panel

```
Single shared .fmenu (position:fixed, z-index:200), 4×4 grid of 16 symbols:
a∕b √ x² xₙ →a |a| θ π ∑ ∫ ∞ · log ln cos sin
mousedown → preventDefault on panel (no focus loss)
Close: click outside or Escape
Insert: mf.insert(latex, {insertionMode:'insertAfter', selectionMode:'placeholder'})
```

### Image in question

```
Upload via 📎 button → FileReader → base64 stored in q.images[]
Delete: ✕ button on thumbnail
Layout: text 66.7% / image 33.3% (both in editor and preview)
```

### Selection rules constructor

```
Main rule: "Ответить на [K] из [N] всего"
Constraint rows: "Минимум [M] из раздела: [chip] [chip OR] [+ add chip]"
  Chips: selected = cyan outline; unselected = addable (click to include)
  OR grouping: multiple chips in one constraint → min-or type
  + Add constraint button
```

### Translate button (RU → HE / HE → RU)

Opens confirmation modal (same pattern as Groups Constructor §17):
- Body: "Перевести названия разделов и темы с X на Y? Существующие переводы будут перезаписаны."
- Progress bar (animated) during API call
- On success: "Готово! Переведено N элементов." + OK button
- On error: red bar + error message, Перевести button reappears
- OK click applies buffered result to data model then closes modal

### Preview mode

Activated by «Превью» button in ctrl-bar (panel toggles, ctrl-bar button turns cyan).

```
Ministry header → title → session label
Instructions line (free text from field — displayed as-is, full direction/RTL support)
פרקים: chapter title + topics (italic)
Questions:
  [num]. ([pts] балла/балл/баллов)
       text indented inline-start:22px (next line)
       image: 66.7% / 33.3% same as editor
```

### i18n / RTL

Full RU/HE via TR{} dictionary. dir="rtl" on shell root when HE active.
Logical CSS properties throughout (`padding-inline-*`, `border-inline-*`, `margin-inline-*`).

---

## 19. Open Questions

- [ ] **Rich text + formulas engineering spike** — `contenteditable` + inline `<math-field>` + RTL bidi is a hard implementation problem. MathLive's virtual keyboard toggle appears despite `virtual-keyboard-mode="off"` in some browsers. Placeholder navigation (#0, #1 slots) inside shadow DOM across bidi boundaries needs careful testing. Must be solved as a dedicated spike in Next.js before Фаза 8, not in HTML mockups.
- [ ] 3D visualization on mobile: simplified WebGL / static image fallback / toggle button?
- [ ] Platform name: "Math With Love" is temporary
- [ ] Favicon: based on yosi-icon.png (needs 32×32 and 180×180 versions)
- [ ] Dark/light theme toggle: user preference saved in Supabase profile or localStorage?
- [ ] Supabase schema: current schema is linear (topics/lessons/exercises/progress) — needs full redesign to reflect graph+tags model before real data persistence.
- [ ] 3D dynamic graphics: mechanism for binding Three.js scene to a specific atom not designed — only type-selector placeholder in Atom Editor mockup.
- [ ] Formula AI-check: prompt format, equivalent-form comparison, backend not designed.
- [ ] Terminology: "Модуль" vs "Тема" vs "Блок" not finalized. Dashboard UI not yet reconciled with tag/group model.
- [ ] Maze navigation layer: architecturally sketched (§7 MWL_CONTENT_ARCHITECTURE), not implemented.
- [ ] Input fields spec: states default/focus/error/disabled — not yet added to this document.
- [ ] Settings page spec — not yet added.
- [ ] Mobile formula rendering: KaTeX font size on student-facing mobile screens — open when needed.

---

*Last updated: June 2026.*
*Approved screens: landing page (desktop + tablet + mobile), login/register modal, dashboard (desktop + tablet + mobile), lesson page (desktop + tablet + mobile), test page (desktop + tablet + mobile, 3 answer types), exam page (desktop + tablet + mobile, both themes), AI chat drawer (all pages, both themes, RU/HE), graph map (desktop, both themes), groups constructor (desktop, both themes), exam schema editor / «Примеры вопросников» (desktop, both themes) — all both themes.*
