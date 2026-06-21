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

### Group categorization — "Карта графа" only

Используется исключительно для различения тематических групп узлов на экране
"Карта графа" (§ TBD, конструктор контента). Это единственное место в системе,
где вводится более одного акцентного цвета одновременно — осознанное и
задокументированное исключение из принципа "only cyan as accent".

| Группа | Hex | Примечание |
|---|---|---|
| Векторы | `#22D3EE` (cyan-400) | Совпадает с основным акцентом системы |
| Тригонометрия | `#FB923C` (orange-400) | Выбран вместо amber — amber зарезервирован под тип «контрольная точка», см. Патч 2 |
| Производная | `#FB7185` (rose-400) | ⚠️ Технически из «красной» цветовой семьи, зарезервированной §1 под answer-state «неверно». Сознательно принято как исключение по решению автора (июнь 2026), а не как ошибка реализации. Если в будущем на графе появится индикация неверных/проблемных атомов — потребуется пересмотреть. |

Применение: используется только как **stroke** (обводка) узла-атома и фон
тега группы (`background: color+22, border: color+55`, ~13% и ~33% непрозрачности
соответственно) в детальной панели. Не используется как заливка узла (заливка
нейтральна и зависит от темы, см. компонент "Node fill").

Цвет идентичен в обеих темах (соответствует core principle §1).

---

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

### Persistent shell (applies to ALL authenticated pages, not just Dashboard)

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
above is for static-HTML mockups only, to let the same persistence be evaluated
visually before the real layout is wired up.

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
// Revised June 2026 — supersedes original bg-pill spec below.
// Decision: color-only state change, no background fill.
// Rationale: a background pill tested as visually too heavy for the
// 46–164px icon-rail sidebar at this width; color-only keeps the rail calm.
// Applies to ALL persistent-shell screens (Dashboard, Карта графа, Atom Editor, etc).

active (both themes): color #22D3EE — icon + label, no background
hover  (both themes): color #94a3b8 — icon + label, no background
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
  // shortcuts: a test may skip ahead to the next test/exam if >1 node lies between
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
  cur: 0,                  // index of the node the token currently sits on
  earned: {},               // points earned per node
  passed: {},               // nodes completed (lesson read / test passed)
  problems: new Set(),      // tests currently blocking forward progress
  failCount: {},            // attempts since the LAST success (resets on pass)
  totalFails: {},           // attempts EVER (never resets — for the badge)
  remedialActive: null,     // testIdx if a remedial mini-course is open right now
  shortcutsUsed: new Set(), // shortcut edges (testIdx) the student has actually taken
  remedialUsed: new Set(),  // tests for which remedial has been completed at least once
  historyFails: new Set(),  // any node ever failed — drives the permanent fail badge
  returnPaths: {},          // testIdx -> returnNodeIdx, fixed forever on first shortcut-fail
  segs: new Set()           // "from:to" — segments ACTUALLY walked, see below
};
```

`prevNode` is deliberately **not** part of state — an earlier version stored it
to remember "where the student came from," and every scenario-specific bug in
this widget traced back to that field. Position (`cur`) plus the permanent sets
above is sufficient; nothing needs to be reconstructed from history.

### computeSt() — the single source of truth for node status

```js
function computeSt(){
  var st = new Array(n).fill('locked');
  for(var i=0;i<n;i++) if(s.passed[i]) st[i] = 'done';
  st[s.cur] = 'current';

  // next opens from EVERY passed node independently — not just from cur.
  // This is what lets the main path stay open after a shortcut detour.
  for(var i=0;i<n;i++){
    if(s.passed[i] && i+1<n && st[i+1]==='locked') st[i+1] = 'next';
  }
  for(var k in sc){
    k = parseInt(k);
    if(s.passed[k] && st[sc[k]]==='locked') st[sc[k]] = 'next';
  }

  s.problems.forEach(function(pi){
    if(st[pi]==='done' || st[pi]==='current') return; // already resolved, don't touch
    if(allPriorDone(pi)){
      // all material before this test is done, yet it's still failing —
      // if remedial was already completed once, just reopen the test (next);
      // otherwise force the remedial branch before allowing another attempt
      st[pi] = s.remedialUsed.has(pi) ? 'next' : 'remedial-needed';
    } else {
      st[pi] = 'problem'; // material before it is incomplete — go learn it first
    }
  });
  return st;
}

function allPriorDone(idx){
  for(var k=0; k<idx; k++) if(!s.passed[k]) return false;
  return true;
}
function findReturnNode(problemIdx){
  for(var k=0; k<problemIdx; k++) if(!s.passed[k]) return k; // first unfinished node
  return Math.max(0, problemIdx-1); // everything done — fall back to the step before the test
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

| Action | Moves `cur`? | Writes a segment? | Why |
|---|---|---|---|
| `simLesson()` (pass a lesson) | **Yes**, auto to `cur+1` | Yes, `"i:i+1"` | A lesson has only one way forward — no choice to preserve |
| `simPass()` (pass a test/exam) | **No** | No | After a test the student may have two valid next steps (main path or shortcut) — the click that follows decides, and that click is what gets recorded |
| Click on an open node (`svg.onclick`) | Yes | Yes, if the click is `cur+1` (main path) or `sc[cur]` (shortcut) | This is the only place the route choice is actually made, so it's the only place that should be remembered |
| `simFail()`, shortcut-fail branch | **Yes**, auto to `findReturnNode()` | Yes, `"ret{test}:{node}"` | One action — the failure — both diagnoses the problem and relocates the student; no second click should be required to open the right content |
| `simFail()`, remedial branch | No (stays on the test) | No | The remedial node becomes the only reachable target; finishing it is what produces the segment |
| Remedial completed (`simLesson()` while `remedialActive`) | Yes, to the test | Yes, `"rem{test}"` | Marks both "remedial was used" (permanent) and "this specific lap was walked" |

```js
function simLesson(){
  if(s.remedialActive!==null){
    var t=s.remedialActive;
    s.problems.delete(t); s.failCount[t]=0; s.remedialUsed.add(t); s.remedialActive=null;
    addSeg('rem'+t); s.cur=t; return;
  }
  if(types[s.cur]!=='lesson') return; // guard
  s.earned[s.cur]=(s.earned[s.cur]||0)+10; s.passed[s.cur]=true;
  if(s.cur+1<n){ addSeg(s.cur+':'+(s.cur+1)); s.cur=s.cur+1; }
}

function simPass(){
  if(types[s.cur]==='lesson') return; // guard
  var pts = types[s.cur]==='exam' ? 83 : 25;
  s.earned[s.cur]=(s.earned[s.cur]||0)+pts;
  s.passed[s.cur]=true; s.problems.delete(s.cur); s.failCount[s.cur]=0;
  // cur is NOT moved here — the next click (main path or shortcut) writes the segment
}

function simFail(){
  if(types[s.cur]==='lesson') return; // guard
  var t=s.cur;
  s.failCount[t]=(s.failCount[t]||0)+1;
  s.totalFails[t]=(s.totalFails[t]||0)+1;
  s.historyFails.add(t);

  // "arrived via shortcut" is derived from graph structure, not from memory:
  // a test j is a shortcut target if some k<j has sc[k]===j AND k !== j-1
  // (k === j-1 would just mean it's the immediately preceding node — not a shortcut)
  var arrivedViaShortcut=false, viaKey=-1;
  for(var k in sc){ k=parseInt(k); if(sc[k]===t && k!==t-1){ arrivedViaShortcut=true; viaKey=k; break; } }
  if(viaKey>=0) s.shortcutsUsed.add(viaKey);

  if(allPriorDone(t)){
    s.problems.add(t); s.remedialActive=t; // remedial branch — cur stays put
  } else if(arrivedViaShortcut){
    s.problems.add(t);
    var ret=findReturnNode(t);
    if(s.returnPaths[t]===undefined) s.returnPaths[t]=ret; // fixed forever, first time only
    addSeg('ret'+t+':'+ret);
    s.cur=ret; // one action = diagnosis + relocation, no extra click needed
  }
  // else: ordinary fail on the main path — stay put, try again
}
```

### Click handler — the only place route choice is recorded

```js
svg.onclick = function(e){
  var i = /* node under cursor, via distance-to-center check */;
  var st = computeSt();
  if(st[i]==='locked')          { /* blocked, no-op */ return; }
  if(st[i]==='problem')         { /* "go finish the material first" message */ return; }
  if(st[i]==='remedial-needed') { /* "finish the remedial node below first" message */ return; }

  var from = s.cur;
  if(i === from+1)            addSeg(from+':'+i); // main path
  else if(sc[from] === i)     addSeg(from+':'+i); // shortcut
  // any other reachable click (e.g. revisiting a done node) — no segment written

  s.cur = i;
};
```

### Segments — what actually gets painted solid

`segs` is a `Set` of strings recording **only** edges the student has physically
walked, separate from `passed` (which only says a node was completed). This
split is what prevents a node-2-to-node-3 connector from lighting up solid when
the student actually skipped from node 2 straight to node 5 via shortcut and
only reached node 3 later, from the other direction.

| Segment key | Written by | Painted as |
|---|---|---|
| `"i:i+1"` | Main-path lesson/test completion, or the click that confirms it | Solid cyan line, 3px |
| `"i:j"` where `sc[i]===j` | The click on a shortcut target after the test is passed | Solid purple line, 3px, drawn as an arc above the row |
| `"ret{test}:{node}"` | The auto-relocation inside `simFail()`'s shortcut-fail branch | Solid red arc below the row, drawn **below** the row specifically so it never overlaps the purple shortcut arc above |
| `"rem{test}"` | Completing the remedial mini-course | Turns the remedial node from outlined to solid purple fill + dark checkmark |

None of these are ever deleted. A later successful retry dims a segment's
visual weight slightly (e.g. the return-path arc goes from bright to muted red)
but never removes it — the whole point is that the maze stays a readable record
of the student's actual journey, including the detours, not just the final
green state.

### Remedial node (extra branch for "material complete, test still failing")

Triggered when `s.totalFails[testIdx]` keeps climbing while `allPriorDone(testIdx)`
is already true — i.e. the student has genuinely learned everything before the
test and is still failing it, so re-reading the same lessons would not help.

- Renders as a small circle (r=14–16px) below the test node, connected by a short
  dashed curve.
- States: **not yet needed** (hidden) → **active** (`remedialActive===testIdx`,
  bright purple, dashed ring, 🔄 icon, only reachable target) → **completed**
  (`remedialUsed.has(testIdx)`, solid purple fill, dark ✓, permanent — stays
  visible even after the test is later passed, as a record of the detour).
- Completing it (`simLesson()` while active) resets `failCount[testIdx]` to 0,
  marks `remedialUsed`, and reopens the test (`computeSt` now returns `next`
  instead of `remedial-needed` for it, per the rule above) — content-wise this
  is a different variant of the test/lesson, generated from the student's
  specific error pattern; that swap happens at the content layer, not in the
  maze schema.

### Permanent fail badge

Any `done` node where `s.historyFails.has(i)` shows a small red circle badge
(top-right of the node, 8px radius) with `s.totalFails[i]` inside — e.g. a node
passed on the third attempt keeps a small "3" on it permanently, even though
the node itself is solid green/done. This is intentional: the student should be
able to look at the finished map later and see where they struggled, not just
that everything is now complete.

### Hard rules (checklist before copying this logic into a new layout)

1. `cur` only ever changes via `simLesson()`'s auto-advance, the click handler,
   or `simFail()`'s auto-relocation — never set directly anywhere else.
2. A segment is written **only** at the moment of real traversal (lesson/test
   completion that has just one way forward, or the click that picks a route)
   — never written speculatively when a test is merely passed.
3. `remedialUsed` and `historyFails`/`totalFails`/`returnPaths`/`shortcutsUsed`
   are **append-only** — nothing is ever deleted from them, even after a
   successful retry. `failCount` is the one counter that resets on success.
4. SVG icons are native `<text>` with emoji (📖📝🎓✓🧑‍🎓🔄) — never
   `foreignObject`, which renders unreliably inside the widget iframe.
5. No vector arrowheads on any line — status is conveyed by color and stroke
   width only, to keep the map from feeling cluttered as node count grows.
6. Theme background read from a hardcoded JS map (`BGMAP = {d:'#0f172a', l:'#f1f5f9'}`)
   keyed by the current mode — never from CSS variables inside the SVG.

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

### Text answer type (AI-checked)

Third answer type — free-form textarea, checked by AI against a pre-stored reference answer.

```
Header row:
  left:  label "РАЗВЁРНУТЫЙ ОТВЕТ" 10px uppercase slate-600/slate-400
  right: badge "🤖 Проверка AI" — cyan pill (same as ctx-badge style)

Textarea:
  dark:  bg #0b1622, border 1.5px #334a5a, color #d0dde8
  light: bg #f5f7fa, border 1.5px #c0ccd8, color #1a2533
  border-radius 7–8px, padding 8–10px 10–12px
  font-size 12–13px, line-height 1.6, resize vertical
  min-height 72–90px
  IMPORTANT: apply via element.style inline

Reference answer block (hidden from student, stored server-side only):
  dark:  bg #0f1e2e, border-left 3px slate-700, color #445566
  light: bg #f5f7fa, border-left 3px slate-300, color #8899aa
  font-size 11px — visible only in admin/teacher view

Char counter: bottom-right, 9–10px, slate-600/slate-400

AI checking indicator (shown while API call runs):
  dark:  bg #0f1e2e, border slate-800
  light: bg #f0f8fb, border slate-200
  🤖 icon + "AI проверяет..." text + 3 amber bounce dots

AI feedback block (shown after check):
  header: 🤖 icon + "Разбор AI" title + score badge (right-aligned)
  score badge colors match result: green/amber/red
  feedback text matches result color
  correct: dark bg #0a2010 border green-400/20  | light bg #f0fdf4
  partial: dark bg #1a1400 border amber-400/20  | light bg #fffbeb
  wrong:   dark bg #200808 border red-400/20    | light bg #fef2f2
```

**Check button behaviour for text type:**
- Shows AI checking indicator, disables button (opacity 0.5, pointer-events none)
- After AI response: re-enables button, shows result + feedback block
- Score format: "10/10", "6/10", "2/10" in badge

### Question module system

Each question is a self-contained module configured at test/exam creation time:

```typescript
interface QuestionModule {
  type: 'numeric' | 'choice' | 'text'
  question: string
  visualization?: ThreeJSConfig
  answer: number[] | string | string[]  // stored server-side only
  points: number
  aiPrompt?: string  // system prompt for text type AI check
}
```

Renderer automatically selects the correct answer zone based on `type`. No code changes needed when adding new questions.

### Responsive — Test Page

| Element | Desktop (1024px+) | Tablet (768–1023px) | Mobile (<768px) |
|---|---|---|---|
| Layout | Zone 1: 2 columns | Zone 1: 2 columns (narrower) | Zone 1: 1 column stacked |
| Topbar height | 46px | 42px | 40px |
| Q-number circles | 28px | 26px | 24px |
| Circle separators | 8px line | 6px line | 4px line |
| Timer font | 15px | 14px | 13px |
| Stats icons | 24px | 22px | 18px |
| Stats text | 14px / 10px | 13px / 9px | 12px / 8px |
| Viz size | 185×158px | 175×152px | 200×150px |
| Field width (numeric) | 64px | 58px | 56px |
| Field height | 34px | 32px | 32px |
| Base font | 13px | 12px | 12px |
| Label font | 10px | 9px | 9px |
| Lesson title in topbar | Visible | Hidden | Hidden |

**Mobile-only differences:**
- Zone 1 stacks vertically: question text → visualization below
- Viz moved below question text (not side by side)
- "Следующий →" shortened to "След →"
- AI feedback more compact (no reference answer block shown)
- Stats labels abbreviated: "частично"→"часть", "пропущен"→"пропущ."

---

## 14. Exam Page

Approved: desktop — both themes (June 2026).

### Concept — how exam differs from test

| Feature | Test | Exam |
|---|---|---|
| Result after each answer | ✓ Immediate | ✗ Only at the end |
| Skip button | ✓ Yes | ✗ No — free navigation via circles |
| Hints (Yosi) | Hints allowed | Theory questions only |
| Ready solution | ✗ No | ✗ No |
| Timer | Optional | **Required, auto-starts** |
| Points per question | Not shown | Shown on circle + in row |
| Check button | ✓ Per question | ✗ Replaced by "Finish Exam" |
| Navigation | Next only | ← Previous + Next → |
| "Exit" button | Closes immediately | **Confirmation dialog** (progress saved) |
| Answer save indicator | ✗ No | ✓ "Answer saved" note appears |
| Text answer AI check | Immediate | After all answers submitted |

---

### Layout structure

```
┌──────────────────────────────────────────────────────┐
│  TOPBAR: [chip] [🎓 Экзамен]  [Q1·4б][Q2·6б]...  [timer] [✕ Выйти] │
├──────────────────────────────────────────────────────┤
│  PROGRESS BAR (full width, color = timer state)      │
├──────────────────────────────────────────────────────┤
│  POINTS ROW: "Вопрос 3 из 5"    ★ 5 / 25 итого      │
├──────────────────┬───────────────────────────────────┤
│  ZONE 1 LEFT     │  ZONE 1 RIGHT                     │
│  Question text   │  Three.js visualization           │
│  + Yosi note     │                                   │
├──────────────────┴───────────────────────────────────┤
│  ZONE 2 — Answer input (numeric / choice / text)     │
│  + "Answer saved" note                               │
│  + [← Предыдущий] [Заполнено N из M] [Следующий →] [Завершить ✓] │
└──────────────────────────────────────────────────────┘
```

---

### Topbar

Same height as test (46–48px). Two badges on the left:

```
[chip: тема]  [🎓 Экзамен badge]    [Q circles]    [timer]  [✕ Выйти]

Exam badge:
  dark:  bg #a78bfa22, color #a78bfa, border #a78bfa44
  light: bg #ede9fe,   color #7c3aed, border #a78bfa55
  border-radius 4px (pill slightly squared vs chip)
  font-size 10px, font-weight 600
```

---

### Question circles (topbar)

Same as test circles (28px, border-radius 50%), but with **points label below each**:

```
┌──┐
│ 3 │   ← circle (28px)
└──┘
 5б     ← points label, 8px, slate-600 (dark) / slate-400 (light)
```

Circle states on exam — simpler than test (no green/red during exam):
```
unanswered: transparent bg, border slate-700/slate-300, color slate-500
answered:   bg cyan-400/10, border cyan-400/33, color cyan-400 — student filled something
active:     bg cyan-400/13, border cyan-400 2px, color cyan-400, font-weight 700
```
Note: no green/red/yellow until results screen — student doesn't see correctness during exam.

---

### Timer — required, auto-starts

Same adaptive timer as test (see section 12), but:
- Starts automatically when exam loads (no toggle)
- Thresholds adjusted for longer exam time:
  ```
  > 5 min:  green  #4ade80
  < 5 min:  amber  #FBBF24
  < 1 min:  red    #f87171 + pulse
  ```
- On timer = 0: auto-submits exam → shows results screen

---

### Points row

Replaces stats block from test. Shows current question info + points:

```
bg dark #0c1926 / light #f8fafc
border top+bottom slate-800/slate-200

Left:  "Текущий вопрос:" label (11px slate-400) + "Вопрос 3 из 5" (13px fw600)
Right: "Баллов за вопрос:" label (11px slate-400) + amber pill badge:
         ★ [N] / [total] итого
         bg amber-400/10, border amber-400/27
         font-size 14px font-weight 700, color amber-400
```

Question label in zone 1 also shows points: "ВОПРОС 3 · 5 БАЛЛОВ"

---

### Zone 1 — Yosi note

Instead of hint link, a locked note at bottom of left panel:

```
bg dark #0f1e2e / light #f5f7fa
border slate-800/slate-200, border-radius 6px
padding 6px 9px
icon 🧑‍🏫 + text: "На экзамене Йоси отвечает только на теоретические вопросы"
color slate-600 (dark) / slate-400 (light), font-size 11px, opacity 0.7
```

---

### Answer zone — no Skip, no Check

Same answer types as test (numeric / choice / text — see section 12 for colors).

**Text type badge** — different label:
```
"🤖 Проверка AI после экзамена"  (not "Проверка AI")
```

**Save indicator** — appears after student inputs anything:
```
dark:  bg #0f1e2e, color cyan-400, border cyan-400/20
light: bg #f5f7fa, color #0891b2, border #0891b244
font-size 12px, border-radius 6px, padding 7px 12px
text: "✓ Ответ сохранён — можно перейти к другому вопросу"
Hides on question switch, reappears on new input.
```

---

### Navigation buttons row

```
[← Предыдущий]   [Заполнено N из M — center]   [Следующий →]   [Завершить ✓]

Layout: flex row, items center, gap 8px
"Заполнено" counter: flex:1, text-align center, font-size 12px, slate-400
```

**← Предыдущий:**
```
visibility:hidden on question 1 (not display:none — preserves layout spacing)
style: bg dark #1a3a4e / light #f0f4f8, color slate-400, border none
padding 9px 16px, border-radius 6px, font-size 13px fw500
```

**Следующий →:**
```
visibility:hidden on last question
same style as ← Предыдущий
```

**Завершить ✓ (always visible):**
```
Inactive (not all answered):
  dark:  bg #1a3a4e, color #7a9ab0
  light: bg #e8f0f8, color #8899aa

Active (all answered):
  dark+light: bg cyan-400, color slate-950, box-shadow 0 0 0 2px cyan-400/27
  font-weight 600

IMPORTANT: button is always clickable (student can submit partial exam)
           — only visual state changes, not disabled attribute
padding 9px 20px, border-radius 6px, font-size 14px
```

---

### Exit confirmation dialog

Triggered by "✕ Выйти" button. Modal overlay over exam content.

```
Overlay: rgba(0,0,0,0.6), covers entire shell (position:absolute inset:0)
z-index: 20 (above results screen)

Dialog card:
  dark:  bg #0f1e2e, border slate-800
  light: bg #ffffff,  border slate-200
  border-radius 12px, padding 24px
  max-width 320px, width 90%
  box-shadow 0 8px 32px rgba(0,0,0,0.5)
  display:flex flex-direction:column gap:14px

Content:
  ⚠️ icon (24px, centered)
  Title: "Выйти из экзамена?" — 15px fw600, slate-100/slate-900
  Body:  "Ваши ответы будут сохранены. Вы сможете вернуться и продолжить,
          но таймер продолжит идти." — 13px, slate-400/slate-500

Buttons row (flex, gap 8px):
  "Остаться" (flex:1): dark bg #1a3a4e border #334a5a | light bg #f0f4f8 border #c0ccd8
  "Выйти"    (flex:1): bg #f87171, color white, border none — always red
  padding 9px, border-radius 7px, font-size 13px
```

---

### Results screen

Full-screen overlay (position:absolute inset:0, z-index:10) that slides over exam content.

```
bg dark #0b1622 / light #ffffff
overflow-y: auto
padding 22px 20px
display: flex flex-direction:column gap:14px
```

**Score header:**
```
Left: "Экзамен завершён" (18px fw700) + subtitle (12px slate-400)
Right: Score circle (72px, border-radius 50%, border 3px cyan-400):
         number: 22px fw700 cyan-400
         "/max": 10px slate-400
```

**Score progress bar:**
```
label "Итоговый балл" (12px) + percentage (12px fw600 cyan-400)
track: 8px height, border-radius 4px, bg slate-800/slate-200
fill:  bg cyan-400, animated width 0.8s
```

**Per-question breakdown:**
```
Section label: 11px uppercase slate-600/slate-400

Each row: flex, align-items center, gap 10px
  bg dark #0f1e2e / light #f5f7fa
  border slate-800/slate-200, border-radius 7px, padding 9px 12px

  Left:  26px circle with question number + status color (same as test)
         type icon below: 🔢 numeric, ☑ choice, ✍ text

  Middle: comment text — 12px slate-100/slate-900
          e.g. "✍ AI проверяет..." / "☑ Верно: вариант B"

  Right: earned/total points badge
    correct:    color green-400 / green-600
    partial:    color amber-400 / amber-700
    wrong:      color red-400   / red-600
    ai-pending: color cyan-400, shows "⏳" instead of number
    empty:      color red-400, shows "0/N"
    font-size 13px fw700
    sub-label "баллов" 9px slate-500
```

**AI status block (for text answers):**
```
bg dark #0f1e2e / light #f0f8fb
border cyan-400/20
border-radius 8px, padding 10px 13px
🤖 icon + "AI проверяет текстовые ответы..." (13px fw500) + "Обычно 10–30 секунд" (11px)
3 amber bounce dots (right-aligned)
Hides and updates when AI returns results.
```

**"← Вернуться к обзору" button:**
```
full width, bg dark #1a3a4e / light #f0f4f8, color slate-400
border-radius 8px, padding 10px, font-size 14px fw500
Clicking re-shows exam (student can still change answers while timer runs)
```

---

### Responsive — Exam Page

#### Tablet (768–1023px)

**Topbar (42px):**
```
[chip 10px] [🎓 9px badge]   [circles 24px + pts 7px]   [timer 13px] [✕ Выйти 10px]
```

**Exam badge** — shortened but text kept: "🎓 Экзамен" (9px)

**Question circles** — 24px diameter, points label 7px below

**Points row** — compact labels:
```
"Вопрос:" + "3 из 5"   |   "Баллов:" + ★ 5 / 25
```

**Zone 1** — two columns (same as desktop), narrower proportions:
```
grid-template-columns: 1fr 1fr, min-height 185px
font-size 12px, viz 175×148px
```

**Yosi note** — inside left column, bottom, shorter text: "Йоси — только теория"

**Answer zone** — same types, slightly smaller:
```
numeric fields: 58px width, 32px height
choice grid: gap 7px, padding 9px 12px
text textarea: min-height 76px
```

**Save note** — shortened: "✓ Ответ сохранён"

**Navigation row** — single row (fits on tablet):
```
[← Пред]  [Заполнено N из M]  [Следующий →]  [Завершить ✓]
← Пред / Следующий: visibility:hidden on first/last question
font-size 12px, padding 8px 14px
```

**Results screen** — score circle 60px, font-sizes reduced ~1–2px

**Exit dialog** — max-width 300px, padding 20px

---

#### Mobile (<768px)

**Topbar (40px):**
```
[chip 10px] [🎓 only emoji, no text]   [circles 22px + pts 7px]   [timer 13px] [✕ only]
```

Exam badge collapses to emoji only to save space. Exit button shows only "✕" (no "Выйти" text).

**Question circles** — 22px diameter, points label 7px

**Points row** — single line, ultra-compact:
```
"Вопрос 3 из 5"   |   ★ 5 / 25
No labels ("Вопрос:" / "Баллов:") — values only
```

**Zone 1 — single column (key mobile difference):**
```
1A: Question text block (padding 10px 12px)
    font-size 12px, line-height 1.7
1B: Visualization block below (200×145px SVG)
    border-top + border-bottom
```

**Yosi note** — separate row below viz, outside column layout:
```
margin 0 10px 6px, padding 5px 8px, border-radius 5px
"🧑‍🏫 Йоси — только теория на экзамене"
font-size 10px
```

**Answer zone:**
```
numeric fields: 56px width, 32px height — one row, no wrap
choice grid: gap 6px, padding 9px 10px
text textarea: min-height 72px
char counter: 9px right-aligned
```

**Save note** — ultra-short: "✓ Сохранено"

**Navigation — two rows (key mobile difference):**
```
Row 1: [← Пред] [N из M заполнено — center] [Сл →]
         visibility:hidden on first/last question
         font-size 12px, padding 8px 12px

Row 2: [Завершить экзамен ✓]
         full width (width:100%), padding 10px
         font-size 14px font-weight 600
         inactive: bg #1a3a4e / #e8f0f8, color slate-400
         active:   bg cyan-400, color slate-950, box-shadow glow
```

**Results screen** — score circle 56px, everything ~1px smaller, gap reduced to 11px

**Exit dialog** — width 88%, padding 18px

---

#### Breakpoint comparison table

| Element | Desktop | Tablet | Mobile |
|---|---|---|---|
| Topbar height | 48px | 42px | 40px |
| Exam badge | 🎓 Экзамен | 🎓 Экзамен | 🎓 only |
| Exit button | ✕ Выйти | ✕ Выйти | ✕ |
| Zone 1 layout | 2 columns | 2 columns | 1 column stacked |
| Viz size | 185×158px | 175×148px | 200×145px |
| Yosi note location | Left column bottom | Left column bottom | Below viz, full width |
| Q circles size | 28px | 24px | 22px |
| Points label | 8px | 7px | 7px |
| Numeric field | 64×34px | 58×32px | 56×32px |
| Timer font | 15px | 13px | 13px |
| Nav layout | Single row | Single row | Two rows |
| "Завершить" | Inline in nav row | Inline in nav row | Full-width below nav |
| Save note | "✓ Ответ сохранён — можно перейти к другому вопросу" | "✓ Ответ сохранён" | "✓ Сохранено" |
| Score circle | 72px | 60px | 56px |
| Exit dialog width | 320px max | 300px max | 88% screen |

---

## 15. Atom Editor (Content Constructor)

**Status: draft, mid-iteration — not yet approved.** Author-facing tool (teacher
role), not student-facing. Scope: **desktop + tablet only** — mobile authoring
is not planned at this stage (content creation needs screen real estate the
phone breakpoint doesn't have; teachers use desktop/tablet for this task).

Access: same authenticated shell as Dashboard (see §10 "Persistent shell") —
header + collapsible left sidebar, never standalone. Sidebar entry point not
yet decided, see Open Questions.

### Page header (within the persistent app header's content area)

```
[Breadcrumb: Тема: Векторы › Атом: Скалярное произведение]   [RU|HE]   [Сохранить]
```

Breadcrumb arrow (`›`) mirrors horizontally in RTL (`transform: scaleX(-1)`).

### Layout — 2 columns

```
desktop: [Step cards — flexible width]   [280px sidebar, sticky]
tablet:  same 2-column grid, ~20px narrower step column, sidebar unchanged
```

### Step cards (4, stacked vertically, not tabs)

```
① Теория              — rich text + inline formulas + "Динамичная графика" block
② Проверка понимания  — short comprehension check, immediately after theory
③ Упражнения           — sequential practice; each item: task text + final
                          answer + full step-by-step solution (self-study aid)
④ Тест атома           — final check; each item: task text + final answer +
                          hints only (NO full solution — would defeat the test)
```

Each card: numbered circle badge (cyan), title, grey subtitle, divider, body padding 14px.

### Dynamic graphics block (inside Теория)

```
Pill selector: Вектор | Функция | 3D-фигура | Плоскость (single active, cyan)
Preview box: dashed border, cube icon placeholder, caption explaining
             parameters are configured after type selection (Three.js scene,
             not built yet at this stage)
```

### Translation / verification badge (per text field)

Content is authored in **Hebrew** (primary — students' language); Russian is
an AI-generated draft requiring human verification. Applies to: title, theory,
question/task text, full solutions, hints — **every real text field**, not
just title/theory. Pure numeric/formula-only answer fields are exempt (math
notation doesn't translate).

```
Badge states (small pill, top-right of each field's label row):
  Original (primary language):  green, ✓ icon, not clickable
  Draft (non-primary, unverified): amber, ⚠ icon, "Черновик ИИ"
  Verified (non-primary, clicked): green, ✓ icon, "Перевод проверен"
Click target: the badge itself, only active when viewing the non-primary language.
```

### Language switch = interface + content together (no mixing)

Switching RU↔HE flips **everything** on the page at once: every UI label
(button text, section headers, field labels), `dir`/text-direction, AND the
authored content shown in each field. Never a mix of Hebrew interface with
Russian content or vice versa.

### Formula input — WYSIWYG, no visible LaTeX code

Uses **MathLive** (`<math-field>` web component, MIT license, loaded from CDN —
**first external dependency in the project**; everything else is deliberately
CDN-free, see CLAUDE.md). Rationale: a real Word/MathType-style equation
editor cannot be hand-built; MathLive is the standard library for this exact
use case.

```
Pure-formula fields (student answer, final answers):
  the entire field IS a <math-field> — type, see live-rendered math immediately

Mixed text+formula fields (theory, task text, solutions, hints):
  contenteditable area + "∑ Вставить формулу" toolbar button
  → inserts an inline <math-field> at the cursor position, exactly like
    Word's "Insert Equation" — type plain text around it as normal
```

**Inline math + RTL text bidi isolation:**

```
Every embedded <math-field> wrapped in <bdi style="unicode-bidi:isolate;
direction:ltr">. Plain <dir="ltr"> attribute alone was NOT reliable enough —
formulas visually reordered relative to surrounding Hebrew text on line
wraps. <bdi> is the W3C-recommended fix for embedding foreign-direction
content inside bidi text. NOT YET VERIFIED in a real browser — see Open
Questions.
```

**Built-in MathLive chrome removed:** the virtual-keyboard toggle and
hamburger/menu icon that MathLive shows by default on every instance are
hidden (`::part(virtual-keyboard-toggle)`, `::part(menu-toggle)` set to
`display:none`, plus `virtual-keyboard-mode="off"` attribute) — too much
visual noise with many formulas on one page.

**Formula symbol panel** (replaces the removed per-field menu icon):

```
Single "⋮" icon per formula toolbar/field → opens one shared dropdown
(position:fixed, follows the clicked icon) with a 4×3 grid of common symbols
(fraction, √, x², xₙ, vector, |·|, θ, π, ∑, ∫, ∞, ·). Click inserts into
whichever formula last had focus, via MathLive's public `mf.insert()` API.
Closes on outside click or Esc.
NOTE: this is NOT a copy of MathLive's real right-click context menu — that
menu cannot be triggered programmatically (browsers reject synthetic
`contextmenu` events for library UI). Real right-click still opens MathLive's
own menu separately, unstyled.
```

### Right sidebar (280px, sticky)

```
┌ Метаданные ──────────────┐
│ Название [badge]          │  ← single field, content follows language toggle
│ Группа [dropdown]         │
│ Теги [pills]               │
├ Пререквизиты ─────────────┤
│ Tag chips (atom | контрольная точка, different colors) with × to remove │
│ + dropdown to add          │
│ note: full graph view lives on a separate "Карта графа" screen (not built) │
├ Контрольная точка ────────┤
│ Plain text: which group this atom belongs to, what closes it │
└────────────────────────────┘
```

Prerequisite tag colors: cyan bg = atom target, amber bg = checkpoint target
(matches the two prerequisite-edge types in MWL_CONTENT_ARCHITECTURE.md §5).

Эта же пара цветов используется и на экране "Карта графа" как индикатор
**типа узла**, поверх групповой категоризации (см. §1 "Group categorization"):
контрольная точка всегда отрисовывается amber-обводкой (`#FBBF24`), независимо
от того, к какой тематической группе она относится — тип узла имеет приоритет
над группой для контрольных точек. Узлы-атомы используют цвет своей группы.
Маркер группы для контрольной точки на текущем этапе не показывается отдельно
(открытый вопрос на будущее, если потребуется — см. §16).

---

## 16. Open Questions

- [x] ~~Atom Editor sidebar entry point~~ — решено (июнь 2026): top-level пункт
      "Контент" в основном сайдбаре с раскрывающимся подменю (Карта графа /
      Редактор атома / Группы / Схема экзамена). Подменю видно только при
      развёрнутом сайдбаре; клик по "Контенту" в свёрнутом состоянии
      автоматически разворачивает сайдбар.
- [ ] MathLive bidi-isolation fix (`<bdi>` wrapping for inline formulas in RTL
      text) implemented but not verified in a real browser — needs visual QA.
- [ ] MathLive's built-in right-click context menu cannot be triggered
      programmatically (browsers ignore synthetic `contextmenu` events for
      security) — replaced with a custom symbol-insert panel instead; real
      ПКМ-меню remains available as a separate, unstyled fallback.

- [ ] 3D visualization on mobile: simplified WebGL / static image fallback / toggle button?
- [ ] Platform name: "Math With Love" is temporary
- [ ] Favicon: based on yosi-icon.png (needs 32×32 and 180×180 versions)
- [ ] Dark/light theme toggle: user preference saved in Supabase profile or localStorage?
- [x] ~~KaTeX rendering: inline vs block, font size on mobile~~ — superseded:
      formula editing uses **MathLive** (`<math-field>`), not plain KaTeX —
      KaTeX is read-only rendering, MathLive is needed for editable WYSIWYG
      input. See §15 Atom Editor. Mobile font-size question still open if/when
      formulas appear on student-facing mobile screens (lesson/test/exam).

*Last updated: June 2026. Approved: landing page (desktop + tablet + mobile), login/register modal, dashboard (desktop + tablet + mobile), lesson page (desktop + tablet + mobile), test page (desktop + tablet + mobile, 3 answer types), exam page (desktop + tablet + mobile, both themes), AI chat drawer (all pages, both themes, RU/HE) — both themes.*
