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
// Structure desktop/tablet (LTR — Russian)
[Logo circle] [Site name]        [RU|HE toggle] [Login btn] [Register btn]

// Structure desktop/tablet (RTL — Hebrew)
[Register btn] [Login btn] [RU|HE toggle]        [Site name] [Logo circle]

// Structure mobile (LTR — Russian)
[Logo circle] [Site name]        [RU|HE toggle] [Login icon] [Register icon]

// Structure mobile (RTL — Hebrew)
[Register icon] [Login icon] [RU|HE toggle]        [Site name] [Logo circle]
```

- Height: `h-14` (56px) desktop/tablet / `h-12` (48px) mobile
- Background: dark `slate-900` / light `slate-50`
- Border bottom: dark `slate-800` / light `slate-200`

**Desktop/tablet buttons:**
```
// Login — ghost
border border-slate-700 (dark) / border-slate-300 (light)
text-slate-400 (dark) / text-slate-500 (light)
px-4 py-1.5 rounded-lg text-sm

// Register — primary
bg-cyan-400 text-slate-950 font-medium
px-4 py-1.5 rounded-lg text-sm
```

**Mobile icon buttons (Tabler Icons webfont):**
```
// Login icon — ti-login
w-[34px] h-[34px] rounded-lg
border border-slate-700 (dark) / border-slate-200 (light)
text-slate-400 (dark) / text-slate-500 (light)
icon size: 18px

// Register icon — ti-user-plus
w-[34px] h-[34px] rounded-lg
bg-cyan-400 border-cyan-400 text-slate-950
icon size: 18px

// Tooltip on hover
bg-slate-700 (dark) / bg-slate-800 (light) text-slate-100
text-[10px] px-2 py-1 rounded-md
appears below icon with small arrow
```

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
// Dark theme — dark bg + cyan border + cyan text
bg-slate-950 border border-cyan-400 rounded-full
text-cyan-400 text-xs px-3 py-0.5

// Light theme — cyan-100 bg + cyan-200 border + cyan-700 text
bg-cyan-100 border border-cyan-200 rounded-full
text-cyan-700 text-xs font-medium px-3 py-0.5
```

### Formula block

Outer card wraps label + highlight block + description text.

```
// Outer card
// Dark: bg-slate-900 border border-slate-800 rounded-xl p-5
// Light: bg-white border border-slate-200 rounded-xl p-5

// Inner highlight block (formula itself)
// Dark: bg-slate-950 border border-cyan-900 rounded-lg p-4
//   font-mono text-cyan-400 (main formula, 18px)
//   font-mono text-cyan-300 (alt row, 14px)
// Light: bg-cyan-100 border border-cyan-200 rounded-lg p-4
//   font-mono text-cyan-700 (main formula, 18px)
//   font-mono text-cyan-600 (alt row, 14px)

// Description text below highlight
// Dark: text-slate-400 text-sm
// Light: text-slate-500 text-sm
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

### Professor Yosi — landing card

On landing page hero, Yosi appears as a card (not a bubble):

```
// Card structure
[Image area — cyan-900 bg (dark) / cyan-100 bg (light)]
[Name + greeting text]

// Dark: bg-slate-900 border border-slate-800 rounded-xl overflow-hidden
// Light: bg-white border border-slate-200 rounded-xl overflow-hidden

// Name: text-cyan-400 (dark) / text-cyan-700 (light) text-sm font-medium
// Text: text-slate-400 (dark) / text-slate-500 (light) text-xs

// Sizes by breakpoint:
// mobile:  width 100px, image height 90px
// tablet:  width 180px, image height 150px
// desktop: width 210px, image height 190px
```

### Professor Yosi — lesson bubble

### Professor Yosi — lesson bubble

```
// Appears bottom-right during lesson
Image: /professor/yosi-{state}.png  (present | happy | thinking | encourage)
Bubble: bg-slate-900 (dark) / bg-white (light)
        border border-slate-800 (dark) / border-slate-200 (light)
        rounded-2xl p-3 text-xs
Name:   text-cyan-400 (dark) / text-cyan-700 (light) font-medium text-xs
```

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

| Section | Mobile (<768px) | Tablet (768–1023px) | Desktop (1024px+) |
|---|---|---|---|
| Header | Logo + name + lang toggle + 2 icon buttons | Logo + name + lang toggle + 2 text buttons | Logo + name + lang toggle + 2 text buttons |
| Hero | 1 col centered: badge → h1+Yosi side-by-side → full-width buttons | 2 col: left text+buttons / right Yosi card | 2 col: left text+buttons / right Yosi card |
| Professor Yosi | Compact card (100px wide) right of h1+text, above buttons | Medium card (180px) right column | Large card (210px) right column |
| CTA buttons | Full width, stacked vertically | Side by side | Side by side |
| Courses | 1 col stacked | 2 col grid | 3 col grid |
| Lesson preview | Formula full width, 3D below | Formula + 3D side by side | Formula + 3D side by side |
| Gamification | 1 col stacked | 3 col grid | 3 col grid |

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

## 9. Open Questions

- [ ] 3D visualization on mobile: simplified WebGL / static image fallback / toggle button?
- [ ] Platform name: "Math With Love" is temporary
- [ ] Favicon: based on yosi-icon.png (needs 32×32 and 180×180 versions)
- [ ] Dark/light theme toggle: user preference saved in Supabase profile or localStorage?
- [ ] KaTeX rendering: inline vs block, font size on mobile

---

*Last updated: June 2026. Approved: landing page (desktop + tablet + mobile), both themes.*
