# Math With Love - AI Agent Instructions

## Project Architecture

This is a **Hebrew educational math website** ("מתמטיקה באהבה") with a component-based SPA architecture. The site uses vanilla JavaScript with dynamic content loading and focuses on interactive mathematical learning tools.

### Core Architecture Patterns

**Component-Based HTML Loading**
- `index.html` serves as the layout shell with placeholders (`#header-placeholder`, `#page-content`, etc.)
- Components are loaded dynamically via `fetch()` from `/components/` (header.html, footer.html, contact-modal.html)
- Page content is loaded into `#page-content` via `pageNavigator.loadPage()`
- Each component is self-contained HTML that gets injected into placeholders

**Configuration-Driven Setup**
- Global config in `/config/site-config.js` exports `SITE_CONFIG` object with education levels, paths, debug settings
- EmailJS config in `/config/emailjs-config.js` for contact forms
- All configs are auto-loaded in `index.html` and available globally as `window.SITE_CONFIG`

**Script Loading Orchestration**
```javascript
// Critical initialization order in index.html:
loadExternalScripts() → styles-loader.js → search.js → side-menu.js → page-loader.js
// Dependencies: scripts rely on global objects being initialized first
```

## Educational Content Structure

**Hierarchical Course Organization**
```
pages/courses/[units]/[exam-code]/[module]/[lesson].html
pages/courses/5-units/35572/complex/unit1-algebraic-form.html
```

- **Units**: 3-units, 4-units, 5-units (Israeli education levels - יחידות לימוד)
- **Exam codes**: 35571/35572 (5-units), 35471/35472 (4-units), 35371/35372 (3-units)
- **Modules**: complex, vectors, calculus, analytical-geometry, diff_calc
- **Lessons**: unit1-*, unit2-*, etc. with Hebrew naming conventions

**Lesson Template System**
- Templates in `/templates/` and examples in `/tmp/topics/` show 3-tab structure:
  - טאב א': תיאוריה ודוגמאות (Theory & Examples)
  - טאב ב': תרגול מונחה (Guided Practice)  
  - טאב ג': שיעורי בית (Homework)
- Use `[כאן להכניס...]` Hebrew placeholders for content insertion
- All lessons auto-include KaTeX math rendering and support widget embedding
- Template guide: `/guides/lesson-template-guide.md`

## Interactive Widgets

**3D Mathematical Visualizations**
- Complex widgets in `/assets/widgets/[topic]/` (vectors/, complex/, analytical_math/, diff_calc/)
- Self-contained HTML files with Three.js CDN (`r128`) for 3D rendering
- Example: `/assets/widgets/vectors/box.html` - 2226-line vector laboratory with tool system
- **Critical coordinate conversion**: `mathToThreeJS(x,y,z)` and `threeJSToMath(pos)` functions
- Tool-based interaction: activeTool state management, raycasting for object selection
- Widget structure: left toolbar (7% width), main canvas, right info panel
- All dependencies inlined - no external imports except Three.js CDN

## Development Patterns

**CSS Architecture**
- Single entry point: `styles/main.css` imports all other CSS files
- Page-specific styles loaded dynamically via `StylesLoader.loadStyles()`
- CSS organized by component (`header.css`, `footer.css`) and page type (`lesson-template.css`)

**JavaScript Module Pattern**
```javascript
// Global objects pattern:
const pageNavigator = { loadPage(), checkPages() }
const StylesLoader = { loadStyles() }
const SITE_CONFIG = { /* global config */ }
```

**Debug Infrastructure**
- `SITE_CONFIG.debug.enabled` controls debug mode
- **Emoji logging convention**: `🔄` (loading), `✅` (success), `❌` (error), `📄` (file operations)
- Debug overlay: `#debug-info` fixed bottom-left, shows DOM analysis after 2s delay
- Debug script (`scripts/debug.js`) analyzes pageNavigator, DOM state, missing elements
- Load sequence logging: each script logs with specific emoji patterns

**Right-to-Left (RTL) Language Support**
- HTML uses `dir="rtl"` and `lang="he"` for Hebrew
- CSS should account for RTL layout patterns
- Text direction affects mathematical notation display

## Key File Locations

**Critical Scripts**
- `/scripts/page-navigator.js` - SPA routing and content loading
- `/scripts/page-loader.js` - Script orchestration and initialization
- `/scripts/styles-loader.js` - Dynamic CSS loading utility

**Templates & Guides**
- `/guides/lesson-template-guide.md` - Complete lesson creation guide
- `/guides/folder-structure-summary.md` - Course organization standards

**Widgets Development**
- Widget coordinate conversion: `mathToThreeJS()` and `threeJSToMath()`
- Tool state management with `activeTool`, event delegation patterns
- Three.js scene setup with camera controls, raycasting for interaction

## Development Workflow

**No build system** - direct file serving from web server
**No package.json** - uses CDN dependencies (Three.js r128, KaTeX 0.16.8, EmailJS v4)
**Local development**: serve from project root, open `index.html`
**Testing widgets**: open individual HTML files in `/assets/widgets/[topic]/[file].html`
**Debug command**: `open assets/widgets/vectors/box.html` (macOS)

**Common debugging scenarios:**
- Script load failures: check emoji sequence in browser console
- Missing DOM elements: debug overlay shows detailed analysis after 2s
- RTL layout issues: verify `dir="rtl"` and logical CSS properties
- Widget coordinate issues: verify `mathToThreeJS()`/`threeJSToMath()` usage

## Critical Conventions

1. **Always preserve Hebrew RTL layout** when modifying UI
2. **Use emoji logging** for development debugging (`console.log('🔄 Loading...')`)
3. **Follow 3-level course hierarchy** strictly (units/exam/module/lesson)
4. **Widget files are self-contained** - include all dependencies inline
5. **Dynamic loading order matters** - scripts have dependencies on global objects
6. **Configuration first** - check `SITE_CONFIG` before hardcoding paths or settings

## Common Tasks

**Adding new lesson**: Copy lesson template, replace `[כאן להכניס...]` placeholders, add to module index
**Adding new widget**: Create self-contained HTML in `/assets/widgets/[topic]/`, include Three.js if 3D
**Debugging loading issues**: Check browser console for emoji-marked load sequence, verify file paths in `SITE_CONFIG.paths`
**RTL layout issues**: Verify `dir="rtl"` propagation and CSS logical properties usage

---

## Agent Interaction Rules (MANDATORY — apply every session)

### Communication
- All chat responses: **Russian**
- All code (variable names, component names, comments, TODO): **English**

### Autonomy constraints
- When multiple implementation options exist — **always ask the user**, never choose independently
- When in doubt — ask, do not experiment
- No improvisation: write the most accurate code for the given task

### Design fidelity
- HTML mockups (`mwl_*.html` in project root) are the **source of truth** — replicate exactly
- No unsolicited improvements, no personal design decisions
- Any deviation from the mockup requires explicit user approval

### Database / Supabase
- Supabase is currently **disabled** — do not write any live DB calls
- All DB-dependent code: implement with **mocks / stubs** and mark with `// TODO: connect Supabase`

### Git
- After each completed work block: **create a git commit** (English message, concise)

### Frontend tech stack (active)
- Next.js 14, TypeScript (strict, no `any`), Tailwind CSS v4
- UI strings: Russian → `/frontend/locales/ru.json`, Hebrew → `/frontend/locales/he.json`
- Auth: Supabase Auth — currently disabled, use mocks