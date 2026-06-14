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

### Amber — rewards, Professor Yosi, gamification

| Token | Hex | Usage |
|---|---|---|
| `amber-400` | `#FBBF24` | Yosi badge, stars, streak indicators, correct-answer sparkles |

### Semantic — answer states only

| State | Dark theme | Light theme |
|---|---|---|
| Correct answer | `green-400 #4ade80` | `green-600 #16a34a` |
| Wrong answer | `red-400 #f87171` | `red-600 #dc2626` |

### Dark theme — Slate scale

| Token | Hex | Usage |
|---|---|---|
| `slate-950` | `#0f172a` | Page background, deepest layer |
| `slate-900` | `#1e293b` | Cards, panels, header |
| `slate-800` | `#334155` | Borders, dividers |
| `slate-400` | `#94a3b8` | Secondary text |
| `slate-100` | `#f1f5f9` | Primary text |

### Light theme — inverted Slate scale

| Token | Hex | Usage |
|---|---|---|
| `white` | `#ffffff` | Page background |
| `slate-50` | `#f8fafc` | Cards, panels, header |
| `slate-200` | `#e2e8f0` | Borders, dividers |
| `slate-500` | `#64748b` | Secondary text |
| `slate-900` | `#0f172a` | Primary text |

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
- Icons that indicate direction (arrows →) must flip: `rtl:rotate-180`
- Padding/margin on one side must swap: `pl-4` → `rtl:pr-4 rtl:pl-0`
- Progress bars fill from right in RTL

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

Same style as primary/ghost buttons:
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

### Answer input fields (lesson page only)

Different from auth form inputs — high contrast for math entry.

```
// Active fields (student enters answer):
//   Dark:  bg #c8e8f4  border #6ab8d4  color #0b2233
//   Light: bg #e0f4fa  border #6ac8e0  color #0b3a4a
//   Both:  border-radius 6px, width 64–68px (desktop) / 62px (tablet/mobile)
//          height 34–36px, text-align center, font-family monospace

// Readonly fields (pre-filled, e.g. y=0, z=0):
//   Dark:  bg #1a3a4e  border #1e3040  color #334a5a
//   Light: bg #f0f8fb  border #c0dde8  color #99aabb

// IMPORTANT: apply via element.style (inline) — CSS classes are overridden
//            by claude.ai iframe environment during development/mockup phase
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


- [ ] 3D visualization on mobile: simplified WebGL / static image fallback / toggle button?
- [ ] Platform name: "Math With Love" is temporary
- [ ] Favicon: based on yosi-icon.png (needs 32×32 and 180×180 versions)
- [ ] Dark/light theme toggle: user preference saved in Supabase profile or localStorage?
- [ ] KaTeX rendering: inline vs block, font size on mobile

---

*Last updated: June 2026. Approved: landing page (desktop + tablet + mobile), login/register modal — both themes.*

### Layout by breakpoint

| Element | Desktop (1024px+) | Tablet (768–1023px) | Mobile (<768px) |
|---|---|---|---|
| Sidebar | Left, collapsible 52→180px | Left, collapsible 44→170px | Hidden |
| Bottom nav | — | — | Fixed bottom, 5 tabs |
| Content | 2-col grid | 2-col grid | 1-col stack |

### Header (authenticated)

```
[Logo] [Site name] [Search field ——————] [Lang] [Bell] [User]
Search icon: right-aligned inside field
```

### Sidebar — 3 groups, no divider lines, only spacing

```
[Toggle btn]           ← expand/collapse
Group 1 (top):
  [ti-home     Dashboard]   ← active
  [ti-books    Модули]

Group 2 (margin: auto 0 — vertically centered):
  [ti-math          Формулы]
  [ti-cube-3d-sphere Лаборатория]

Group 3 (bottom):
  [ti-settings  Настройки]
```

Nav item states:
```
active dark:  bg #164e63 / color #22D3EE
active light: bg #cffafe / color #0e7490
hover dark:   bg #334155 / color #f1f5f9
hover light:  bg #e2e8f0 / color #0f172a
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

## 11. Lesson Page

Approved: desktop + tablet + mobile — both themes (June 2026).

### Layout structure — 3 vertical zones

```
┌─────────────────────────────────────────────┐
│  TOPBAR                                     │
├──────────────────┬──────────────────────────┤
│  ZONE 1 LEFT     │  ZONE 1 RIGHT            │
│  Task condition  │  Three.js visualization  │
│  + subquestion   │                          │
├──────────────────┴──────────────────────────┤
│  ZONE 2 — Collapsible: "Show solution"      │
├─────────────────────────────────────────────┤
│  ZONE 3 — Self-answer input + check button  │
└─────────────────────────────────────────────┘
```

### Topbar

| Breakpoint | Content |
|---|---|
| Desktop (1024px+) | `[Topic chip] [Lesson title]` · · · `[Step А] — [Step Б] — [Step В] — [Step Г]` · · · `[✕ Exit]` |
| Tablet (768–1023px) | `[Topic chip]` · · · `[Steps]` · · · `[✕ Exit]` (title hidden) |
| Mobile (<768px) | `[Topic chip]` · · · `[Steps]` · · · `[✕ Exit]` (title hidden) |

Height: 46px desktop / 42px tablet / 40px mobile.

**Step indicators:**
```
done:   bg cyan-400, color slate-950, no border
active: bg transparent, color cyan-400, border 1.5px cyan-400
locked: bg transparent, color slate-500, border 1px slate-800
size:   26px desktop+tablet / 22px mobile, border-radius 50%
```

**Exit button (all themes visible):**
```
dark:  border #334a5a  color #556677  bg transparent
light: border #b0c8d8  color #445566  bg transparent
border-radius 6px, font-size 12px (desktop/tablet) / 10px (mobile)
```

### Zone 1 — Task condition + visualization

Two columns side by side on desktop and tablet. Single column on mobile (condition first, viz below).

**Left column — task condition:**
```
padding: 18px 20px (desktop) / 14px 16px (tablet) / 12px 14px (mobile)
border-right: 1px slate-800 (dark) / slate-200 (light)
```

- Section label (УСЛОВИЕ ЗАДАЧИ): 11px uppercase, slate-600 (dark) / slate-400 (light)
- Task text: 13px (desktop) / 12px (tablet/mobile), line-height 1.75
- Given data rows: key in slate-500, value in slate-100 (dark) / slate-900 (light)
- Formula tokens (inline `math-tag`): font-mono 12px, cyan-400 bg-cyan-900/10

**Subquestion block:**
```
bg slate-900 (dark) / slate-50 (light)
border-left 3px solid cyan-400 (dark) / cyan-700 (light)
border-radius 6–7px, padding 9–10px 12–13px
tag: 11px cyan-400 / cyan-700
text: 13px (desktop) / 12px (tablet/mobile)
```

**Right column — Three.js visualization:**
```
bg: dark #060e18 / light #e8f2f8
viz-bar: border-bottom 1px rgba(255,255,255,0.08) (dark) / #c0d8e8 (light)
caption: 10px, slate-600 (dark) / slate-400 (light)
```

SVG/Three.js element colors:
```
dark:  edges cyan-400, base lines #334a5a, secondary #445566
       vectors: u⃗ #a78bfa, v⃗ cyan-400, midpoint #6ee7b7
light: edges #0891b2, base #8aabbb, secondary #aabbcc
       vectors: u⃗ #7c3aed, v⃗ #0891b2, midpoint #059669
```

Visualization size:
```
desktop: 210×210px  |  tablet: 185×185px  |  mobile: 200×170px
```

Mobile: visualization stacked below condition (not side by side).

### Zone 2 — Collapsible solution

```
trigger bg: dark #0e1c2a / light #fffbf0
trigger: 💡 icon (amber-400) + label + ▾ chevron
label: 13px (desktop/tablet) / 12px (mobile)
body: slides open (max-height transition 0.25s)
step: font-size 13px / 12px mobile, border-left 2px solid amber-400/30
      color slate-400 (dark) / slate-500 (light)
```

**Auto-close behavior:** when student starts typing in Zone 3, Zone 2 closes automatically.

### Zone 3 — Self-answer input

```
padding: 16px 20px (desktop) / 12px 14–16px (tablet/mobile)
title: 13px font-weight 500
subtitle: 11px (auto-close note), slate-600 (dark) / slate-400 (light)
```

**Coordinate input layout:**
```
desktop: two separate rows, each row: [Point label] [x field] [y field] [z field]
         fields wrap if needed
tablet:  same as desktop but fields in one strict row (no wrap)
mobile:  same as tablet — one row per point, no wrap, field width 62px
```

**Check button:**
```
dark:  bg cyan-400, color slate-950, border none
       padding 9px 26–28px, border-radius 6–7px, font-size 14px (desktop/tablet) / 13px (mobile)
light: bg transparent, color slate-900, border 1.5px #b0c8d8
       hover: bg cyan-600, color white
IMPORTANT: apply via element.style inline (not CSS class) to avoid iframe override
```

**Answer result states:**
```
correct: bg green-400/10, border green-400/30, color green-400 (dark)
         bg green-50, border green-600/30, color green-700 (light)
wrong:   bg red-400/10, border red-400/20, color red-400 (dark)
         bg red-50, border red-600/20, color red-700 (light)
```

**Professor Yosi hint (toggleable):**
```
trigger: "Подсказка от Профессора Йоси" link, cyan-400 / cyan-700, underline
bubble:  bg slate-900 (dark) / slate-50 (light)
         border 1px dashed cyan-400/30
         avatar 30–32px, border-radius 50%
text:    12px / 11px mobile, slate-400 (dark) / slate-500 (light)
```

### Responsive summary

| Element | Desktop | Tablet | Mobile |
|---|---|---|---|
| Zone 1 layout | 2 columns | 2 columns (narrower) | 1 column stacked |
| Lesson title in topbar | Visible | Hidden | Hidden |
| Font sizes | 13px base | 12px base | 11–12px base |
| Viz size | 210px | 185px | 200×170px |
| Field width | 64–68px | 58px | 62px |
| Fields per row | Wrap OK | No wrap | No wrap |

---

## 12. Open Questions

- [ ] 3D visualization on mobile: simplified WebGL / static image fallback / toggle button?
- [ ] Platform name: "Math With Love" is temporary
- [ ] Favicon: based on yosi-icon.png (needs 32×32 and 180×180 versions)
- [ ] Dark/light theme toggle: user preference saved in Supabase profile or localStorage?
- [ ] KaTeX rendering: inline vs block, font size on mobile

*Last updated: June 2026. Approved: landing page (desktop + tablet + mobile), login/register modal, dashboard (desktop + tablet + mobile), lesson page (desktop + tablet + mobile) — both themes.*
