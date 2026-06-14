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

Center of topbar. Strictly round: `width=height=28px`, `border-radius:50%`. Clickable — navigate to that question.

| Status | bg | border | color |
|---|---|---|---|
| Unanswered | transparent | slate-700/slate-300 | slate-500 |
| Correct | green-400/13 | green-400/40 | green-400 |
| Partial | amber-400/13 | amber-400/40 | amber-400 |
| Wrong | red-400/13 | red-400/40 | red-400 |
| Skipped | slate-700/13 | slate-600/30 | slate-500 |
| Active | cyan-400/13 | cyan-400 2px | cyan-400, fw 700 |

### Adaptive timer (optional)

Pill shape (`border-radius:20px`), no icons — digits only. Color transitions automatically:

```
> 2 min:  green  #4ade80 — calm
< 2 min:  amber  #FBBF24 — hurry
< 30 sec: red    #f87171 — critical + bg pulses between #f8717133↔#f8717118
```

Progress bar fill color mirrors timer state.

### Stats block

```
bg dark #0c1926 / light #f8fafc, border top+bottom slate-800/slate-200

5 items (icon circle 26px border-radius:50%):
  ✓ верно     green-400
  ~ частично  amber-400
  ✗ ошибок    red-400
  → пропущен  slate-500
  ★ очков     amber-400, value text also amber-400
```

### Answer types

**Numeric fields** — same colors as lesson page answer fields (see section 11).

**Choice A/B/C/D** — 2×2 grid:
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

### Action buttons

```
Skip:  ghost — transparent, border slate-700/b0c8d8, secondary color
Check: dark bg cyan-400 color slate-950 | light transparent border 1.5px #b0c8d8 color slate-900
Next:  bg cyan-400/0891b2, color white — display:none until answer checked
IMPORTANT: apply via element.style inline (not CSS class)
```

---

## 13. AI Chat Drawer (Professor Yosi)

Approved: all pages, both themes, RU (LTR) + HE (RTL) (June 2026).

### Concept

Single unified `AIChatPanel` component on all pages. Only `systemPrompt` changes per context. One interface for text and voice — no separate voice screen.

| Page | Behaviour |
|---|---|
| Lesson | Task context + subquestion. Hints only, no direct answers. |
| Test | Question context. Hints only. |
| Exam | Theory questions only. |
| Dashboard | General course assistant. |

### Trigger button

```
dark:  bg #FBBF2418, border 1.5px #FBBF2455, color #FBBF24
light: bg #FEF9EC,   border 1.5px #FBBF2488, color #92400e
icon 🧑‍🏫 + text "Спросить Йоси" / "שאל את יוסי"
border-radius: 24px
```

### Drawer

Slides up from bottom, `transform: translateY`, `cubic-bezier(0.32,0.72,0,1)`, 350ms. Dim overlay behind (click to close). Max-height 90%. Handle: 36×4px pill, slate-700/slate-300.

### Header

```
[🧑‍🏫 34px avatar] [Title 14px fw600 | subtitle 11px]  [RU|HE toggle] [✕ 28px circle]

avatar:  bg amber-400/10, border amber-400/27
toggle active:   bg cyan-400, color slate-950
toggle inactive: dark bg #1a3a4e color #7a9ab0 | light bg #f0f4f8 color #445566
close:   dark bg #1a3a4e border #334a5a | light bg #f0f4f8 border #c0ccd8
```

### Context strip

```
bg dark #0b1622 border slate-800 | light #f5f7fa border slate-200, border-radius 7px
label 10px uppercase slate-600/slate-400
text  11px slate-400/slate-500
badge cyan-400 pill (same as chip style)
```

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

Yosi avatar:   26px, bg amber-400/10, border amber-400/27
Student avatar: 26px, bg slate-800/e2e8f0, border slate-700/b0c8d8
Typing indicator: 3 amber dots, bounce 1.2s
```

### Input field

```
Container: border-radius 16px, border 1.5px
           dark bg #0b1622 border #334a5a | light bg #f5f7fa border #c0ccd8
           focus: border-color cyan-400
           padding LTR 10px 8px 8px 14px | RTL 10px 14px 8px 8px

Textarea: flex:1, transparent bg, font-size 13px, line-height 1.5
          min-height 20px, max-height 120px (~5 lines), then scroll inside
          auto-resize on input, resets after send
          RTL: dir="rtl", text-align right

Right group (LTR) / Left group (RTL): mic 🎤 + send ↑

Send button:
  active:   bg #FBBF24, color #0a0a00, cursor pointer
  inactive: bg slate-700/d0dde8, opacity 0.5, cursor not-allowed
  inactive when: no text OR recording OR text > 500 chars
  IMPORTANT: apply via element.style inline

Char counter (appears after 200 chars):
  10px right-aligned, slate-600 → amber-400 (<50 left) → red-400 (over limit)
```

### Voice recording

```
Trigger: click 🎤 mic button
Recording: mic shows 🔴, bg #f8717122, border #f87171, pulse animation
           send button blocked (inactive)
Below field: red dot + wave bars (7, animation) + timer + "✕ отмена"/"✕ ביטול"
Auto-send on final speech result
Cancel: clear input, restore all to default
```

### RTL full mirror (HE mode)

- `drawer`, `ctx-strip` → `dir="rtl"`
- Input padding swaps, buttons group moves before textarea in DOM
- `textarea` → `dir="rtl"`, `text-align:right`
- Bubble border-radius flips (see above)
- Yosi right side, student left side
- Typing indicator: `flex-direction: row-reverse`

---

## 14. Open Questions

- [ ] 3D visualization on mobile: simplified WebGL / static image fallback / toggle button?
- [ ] Platform name: "Math With Love" is temporary
- [ ] Favicon: based on yosi-icon.png (needs 32×32 and 180×180 versions)
- [ ] Dark/light theme toggle: user preference saved in Supabase profile or localStorage?
- [ ] KaTeX rendering: inline vs block, font size on mobile

*Last updated: June 2026. Approved: landing page (desktop + tablet + mobile), login/register modal, dashboard (desktop + tablet + mobile), lesson page (desktop + tablet + mobile), test page (desktop), AI chat drawer (all pages, both themes, RU/HE) — both themes.*
