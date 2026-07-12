# MWL — Multilingual Architecture
# Reference document for Claude Code. Read before any i18n-related implementation.

---

## §1 — Two language layers

MWL has two completely separate language systems that must never be confused:

| Layer | What | Languages | Storage | Who controls |
|-------|------|-----------|---------|--------------|
| **UI strings** | Navigation, buttons, labels, system messages | RU + HE | JSON files in repo | Developer |
| **Content** | Atom text, exercises, titles, descriptions | HE (primary) + RU (auto-translated) | Supabase (jsonb fields) | Author + AI |

---

## §2 — UI strings

### Storage
```
frontend/locales/
  ru.json     ← all Russian UI strings
  he.json     ← all Hebrew UI strings
```

### Usage
```tsx
const { t, lang, dir } = useLocale();
// t('navHome')    → 'Главная'  (ru) or 'ראשי' (he)
// t('btnSave')    → 'Сохранить' (ru) or 'שמור' (he)
```

### Switching
- Switching happens instantly, no page reload
- New language preference saved to `profiles.lang` in Supabase
- Unauthenticated users: default = 'he', stored in localStorage only
- `dir` attribute applied to root `<html>` element on every switch

### Key TR values (canonical — do not change)
```
navHome      → 'Главная' / 'ראשי'
navCourses   → 'Курсы' / 'קורסים'
navStatus    → 'Статус' / 'סטטוס'
navAchieve   → 'Достижения' / 'הישגים'
navFormulas  → 'Формулы' / 'נוסחאות'
navLab       → 'Лаборатория' / 'מעבדה'
navHelp      → 'Помощь' / 'עזרה'
navSettings  → 'Настройки' / 'הגדרות'
```

---

## §3 — Content translation

### Primary language
Author writes content in **Hebrew** (he). This is the source of truth.
Russian is always the translation target.

### Auto-translation trigger
Translation is triggered automatically when author clicks **Save**.

Flow:
```
Author edits field(s) in HE
  → clicks Save
  → system detects dirty fields (changed since last save)
  → saves HE content to DB immediately
  → toast "Сохранено ✓"
  → button enters shimmer state "Переводим..."
  → POST /translate to FastAPI backend
  → FastAPI calls Anthropic API with dirty fields only
  → translated RU values saved to corresponding _ru fields in DB
  → toast "Переведено ✓"
  → button deactivates
  → on error: toast "Ошибка перевода" + button "↺ Повторить"
```

### Dirty tracking
System tracks which fields have changed since last save.
Only dirty fields are sent to /translate — not the entire document.
Field becomes "clean" after successful translation save.

### Manual override
Author CAN manually edit the auto-translated RU content.
Manually edited fields are marked — auto-translate will not overwrite them
on next save UNLESS the corresponding HE field was also changed.

Logic:
```
if (he_field_changed AND ru_field_manually_edited):
  → warn author: "Перевод будет перезаписан. Продолжить?"
  → on confirm: re-translate and overwrite
  → on cancel: keep manual RU, mark he as clean
```

---

## §4 — Fields that are NEVER translated

The following content types must be excluded from translation:

| Type | Reason | How to identify |
|------|---------|-----------------|
| MathLive formulas | Mathematical notation — language-independent | `{ "type": "formula", "value": "..." }` blocks |
| Images | Visual content — no text | `{ "type": "image", "url": "..." }` blocks |
| Lab visualizations | All labels in English | entire `lab` block type |
| Numbers | Universal | plain numeric strings |
| Code snippets | If any appear | `{ "type": "code" }` blocks |

### AI translator prompt rule
The `/translate` endpoint must instruct the model to:
1. Preserve all `{ "type": "formula" }` blocks verbatim
2. Preserve all `{ "type": "image" }` blocks verbatim
3. Translate only `{ "type": "text" }` blocks
4. Keep any LaTeX/MathLive markup found inline in text intact
5. Maintain RTL/LTR text structure appropriate for target language

---

## §5 — /translate API endpoint

```
POST /translate
Authorization: Bearer <supabase_jwt>

Body:
{
  "fields": [
    { "key": "title_he", "value": "וקטורים במרחב" },
    { "key": "content_he", "value": [ ...content blocks... ] }
  ],
  "from_lang": "he",
  "to_lang": "ru"
}

Response:
{
  "translated": [
    { "key": "title_ru", "value": "Векторы в пространстве" },
    { "key": "content_ru", "value": [ ...translated blocks... ] }
  ]
}
```

Backend: `backend/routers/translate.py`
The backend is the only caller of Anthropic API — never call it directly from frontend (CORS).

---

## §6 — RTL / LTR rules

Hebrew = RTL. Russian = LTR.

```tsx
// Apply dir to root on every language switch
document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
document.documentElement.lang = lang;
```

CSS: use logical properties everywhere — never physical left/right:
```css
/* CORRECT */
padding-inline-start: 16px;
margin-inline-end: 8px;
inset-inline-end: 24px;
border-inline-start: 2px solid;

/* WRONG — breaks RTL */
padding-left: 16px;
margin-right: 8px;
right: 24px;
```

Sidebar, header, bottom nav — all must work correctly in both directions.
Test every component in both RU (LTR) and HE (RTL) modes.

---

## §7 — Professor Yosi assets (LTR/RTL variants)

Yosi character faces a direction — separate assets for each:
```
public/professor/
  yosi-present-ltr.png   ← default, Yosi faces right (LTR context)
  yosi-present-rtl.png   ← Yosi faces left (RTL context)
  yosi-happy-ltr.png
  yosi-happy-rtl.png
  yosi-thinking-ltr.png
  yosi-thinking-rtl.png
  yosi-encourage-ltr.png
  yosi-encourage-rtl.png
  yosi-icon-ltr.png
  yosi-icon-rtl.png
```

Usage: always select asset based on current `dir`:
```tsx
const yosiSrc = `/professor/yosi-${mood}-${dir === 'rtl' ? 'rtl' : 'ltr'}.png`;
```

---

## §8 — Open questions

- [ ] Manual override warning UX: modal dialog or inline confirmation?
- [ ] Translation queue: if author saves multiple times quickly, queue or debounce?
- [ ] Fallback display: if RU translation not yet available, show HE content or placeholder?

---

*Created: 2026-07-12*
