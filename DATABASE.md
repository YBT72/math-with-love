# MWL — Database Design (Supabase)
# Reference document for Claude Code. Read before any DB-related implementation.
# Do NOT run migrations without explicit approval from יגאל.

Project: `mwl` | ID: `krcghalxpcpjkeghfjkn` | Region: EU Central (Frankfurt)

---

## Status of existing tables

```
profiles     ← KEEP, extend with new fields (see §1)
topics       ← LEGACY — to be migrated (see ARCHITECTURE.md §5)
lessons      ← LEGACY — to be migrated
exercises    ← LEGACY — to be migrated
progress     ← LEGACY — to be migrated (replace with student_progress + session_state)
```

---

## §1 — profiles

Extends Supabase Auth `auth.users`. One row per user.

```sql
profiles (
  id              uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role            varchar NOT NULL DEFAULT 'student',  -- 'student' | 'author' | 'admin'
  display_name    varchar,
  avatar_url      varchar,
  lang            varchar NOT NULL DEFAULT 'he',       -- 'he' | 'ru' — UI language preference
  theme           varchar NOT NULL DEFAULT 'dark',     -- 'dark' | 'light'
  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now()
)
```

**Notes:**
- Password change: handled by Supabase Auth (email reset flow) — NOT stored here
- Guest users (unauthenticated): no profile row. Defaults: lang='he', theme='dark'
- Author-specific settings: none defined yet
- `lang` and `theme` sync across devices automatically (stored in DB, not localStorage)

---

## §2 — Content: atoms

```sql
atoms (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            varchar UNIQUE,                      -- URL-friendly identifier
  title_he        varchar NOT NULL,                    -- Hebrew title (primary, author input)
  title_ru        varchar,                             -- Russian title (auto-translated)
  status          varchar NOT NULL DEFAULT 'draft',    -- 'draft' | 'published'
  three_js_type   varchar,                             -- lab module type if atom has visualization
  created_by      uuid REFERENCES profiles(id),
  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now()
)
```

---

## §3 — Content: atom blocks

An atom is composed of an ordered sequence of blocks. Each block has a type.
Author assembles blocks in arbitrary order; multiple blocks of the same type are allowed.

```sql
atom_blocks (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  atom_id         uuid NOT NULL REFERENCES atoms(id) ON DELETE CASCADE,
  type            varchar NOT NULL,   -- see block types below
  order_index     integer NOT NULL,   -- display order within atom
  content_he      jsonb,              -- Hebrew content (primary, author input)
  content_ru      jsonb,              -- Russian content (auto-translated)
  settings        jsonb,              -- block-specific settings (points, lab config, etc.)
  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now()
)
```

### Block types

| type | Description |
|------|-------------|
| `theory` | Theory text with inline formulas and graphics |
| `example` | Worked example with optional step-by-step solution |
| `exercise` | Problem with student answer input; solution viewable (reduces points) |
| `comprehension` | Short comprehension check (≤3 questions, no time limit) |
| `test` | Atom test — one attempt only; blocks movement forward |
| `lab` | Embedded lab visualization (module + constraints defined in settings) |

### content_he / content_ru structure (per block type)

**theory / example:**
```json
{
  "blocks": [
    { "type": "text", "value": "..." },
    { "type": "formula", "value": "\\vec{AB}" },
    { "type": "image", "url": "..." }
  ]
}
```

**exercise / comprehension question:**
```json
{
  "prompt": [...],          // same block array as above
  "answer_type": "number",  // "number" | "formula" | "text" | "choice" | "graph"
  "answer": "...",          // correct answer (for number/text/choice)
  "choices": [...],         // for answer_type "choice" only
  "solution": [...]         // step-by-step solution blocks (shown on demand, reduces points)
}
```

**test:**
```json
{
  "questions": [ ...exercise structure... ],
  "total_points": 100,
  "passing_score": 70
}
```

**lab:**
```json
{
  "module": "vectors_3d",   // lab module identifier
  "constraints": {          // what student can/cannot interact with
    "locked_params": ["axis_z"],
    "visible_controls": ["vector_a", "vector_b"]
  }
}
```

### settings (per block)
```json
{
  "points": 10,                  // points for this block (exercise/test)
  "penalty_view_solution": 0.5,  // multiplier when student views solution (0.5 = 50% points)
  "required": true               // whether block must be completed to progress
}
```

---

## §4 — Content: prerequisite graph

```sql
atom_edges (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_id     uuid NOT NULL REFERENCES atoms(id) ON DELETE CASCADE,
  to_id       uuid NOT NULL REFERENCES atoms(id) ON DELETE CASCADE,
  edge_type   varchar NOT NULL DEFAULT 'direct',  -- 'direct' | 'via-checkpoint'
  UNIQUE(from_id, to_id)
)

checkpoints (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id    uuid NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  type        varchar NOT NULL,  -- 'group' | 'block' | 'final'
  title_he    varchar,
  title_ru    varchar
)
```

---

## §5 — Content: groups and structure

```sql
groups (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_he    varchar NOT NULL,
  title_ru    varchar,
  parent_id   uuid REFERENCES groups(id),   -- null = top-level group
  color       varchar,
  order_index integer DEFAULT 0
)

group_members (
  atom_id     uuid NOT NULL REFERENCES atoms(id) ON DELETE CASCADE,
  group_id    uuid NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  order_index integer DEFAULT 0,
  PRIMARY KEY (atom_id, group_id)
)
```

---

## §6 — Shalon structure

```sql
shalon_types (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  number      varchar NOT NULL,   -- '572' | '571' | '471' etc.
  title_he    varchar,
  title_ru    varchar
)

shalon_topics (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shalon_type_id  uuid NOT NULL REFERENCES shalon_types(id) ON DELETE CASCADE,
  title_he        varchar NOT NULL,
  title_ru        varchar,
  desc_he         text,
  desc_ru         text,
  order_index     integer DEFAULT 0
)

shalon_modules (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id    uuid NOT NULL REFERENCES shalon_topics(id) ON DELETE CASCADE,
  title_he    varchar NOT NULL,
  title_ru    varchar,
  desc_he     text,
  desc_ru     text,
  order_index integer DEFAULT 0
)

-- Atoms are global; they are linked to modules via group membership (see §5)
-- No direct atom→module FK — use group_members + group→module relationship
```

---

## §7 — Exam schema (shalon sessions)

```sql
shalon_sessions (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shalon_type_id  uuid NOT NULL REFERENCES shalon_types(id),
  label           varchar NOT NULL,    -- e.g. "Summer 2023"
  duration_min    integer,             -- exam duration in minutes
  extra_time_pct  integer DEFAULT 0,   -- additional time percentage
  total_points    integer DEFAULT 100
)

shalon_prakim (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id  uuid NOT NULL REFERENCES shalon_sessions(id) ON DELETE CASCADE,
  label_he    varchar,
  label_ru    varchar,
  order_index integer DEFAULT 0,
  required_q  integer NOT NULL,    -- how many questions student must answer
  pts_per_q   integer NOT NULL     -- points per question in this section
)

shalon_questions (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prak_id     uuid NOT NULL REFERENCES shalon_prakim(id) ON DELETE CASCADE,
  content_he  jsonb,   -- question content blocks (text + formulas + images)
  content_ru  jsonb,
  pts         integer,
  order_index integer DEFAULT 0
)

shalon_subquestions (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id     uuid NOT NULL REFERENCES shalon_questions(id) ON DELETE CASCADE,
  label           varchar,   -- 'א' | 'ב' | 'ג' or 'a' | 'b' | 'c'
  content_he      jsonb,
  content_ru      jsonb,
  pts             integer,
  order_index     integer DEFAULT 0
)
```

---

## §8 — Student progress

```sql
student_progress (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  atom_id     uuid NOT NULL REFERENCES atoms(id) ON DELETE CASCADE,
  status      varchar NOT NULL DEFAULT 'locked',
              -- 'locked' | 'available' | 'in_progress' | 'done' | 'problem' | 'remedial_needed'
  score       integer,              -- final score for this atom (0–100)
  attempts    integer DEFAULT 0,    -- number of test attempts
  started_at  timestamptz,
  completed_at timestamptz,
  updated_at  timestamptz DEFAULT now(),
  UNIQUE(user_id, atom_id)
)
```

---

## §9 — Session state (persistence)

Stores everything needed to resume exactly where the student left off.

```sql
session_state (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  context_type    varchar NOT NULL,  -- 'atom' | 'test' | 'exam' | 'maze' | 'lab'
  context_id      uuid NOT NULL,     -- atom_id / session_id / module_id etc.
  state           jsonb NOT NULL,    -- full state snapshot (see below)
  updated_at      timestamptz DEFAULT now(),
  UNIQUE(user_id, context_type, context_id)
)
```

### state jsonb structure per context_type

**atom:**
```json
{
  "current_block_index": 3,
  "block_states": {
    "block_uuid_1": { "completed": true, "score": 10 },
    "block_uuid_2": { "completed": true, "score": 7, "viewed_solution": true },
    "block_uuid_3": { "completed": false, "current_answer": "..." }
  }
}
```

**test:**
```json
{
  "current_question_index": 2,
  "answers": {
    "q_uuid_1": { "value": "42", "submitted": true },
    "q_uuid_2": { "value": null, "submitted": false }
  },
  "started_at": "2026-07-11T10:00:00Z"
}
```

**maze:**
```json
{
  "scroll_x": 320,
  "scroll_y": 150,
  "zoom": 1.2,
  "path": [
    { "atom_id": "uuid", "entered_at": "...", "status": "done" },
    { "atom_id": "uuid", "entered_at": "...", "status": "problem", "attempts": 2 }
  ]
}
```

**lab:**
```json
{
  "module": "vectors_3d",
  "params": {
    "vector_a": [1, 2, 3],
    "vector_b": [0, 1, -1],
    "show_projection": true
  }
}
```

---

## §10 — RLS policies

All tables require Row Level Security. General rules:

- `profiles`: user can read/update own row only. Admin can read all.
- `atoms`, `atom_blocks`, `groups`, `shalon_*`: public read if status='published'. Authors can write.
- `student_progress`, `session_state`: user can read/write own rows only. Admin can read all.

Policies must be written and reviewed before any migration is run.

---

## §11 — Open questions

- [ ] Subquestions (shalon_subquestions): label format — Hebrew (א/ב/ג) or Latin (a/b/c) or both?
- [ ] Graph type for answer_type: exact student interaction mechanic not yet designed
- [ ] Points penalty formula: currently `score × penalty_multiplier` — confirm with יגאל
- [ ] student_access table (future monetization): not designed yet

---

*Created: 2026-07-12*
