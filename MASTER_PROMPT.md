# CLAUDE STATS CARD — MASTER SYSTEM PROMPT FOR AI CODER

---

## WHAT ARE WE BUILDING?

You are building **Claude Stats Card** — an open-source, self-hosted GitHub README card generator, similar to `github-readme-stats` or `star-history`, but specifically for **AI usage analytics**. Developers add a simple markdown image tag to their README and it renders a beautiful, live card showing how they use AI in their workflow.

**The product has 3 parts:**

1. **Card Builder UI** — A web app where users configure their card, enter their stats manually, customize layout/fields/theme, and copy the embed code.
2. **API Server** — A Next.js API that serves the card as a dynamic SVG image (so GitHub can render it inline in READMEs).
3. **Embed System** — A URL-based card system like shields.io. The card is embedded via a single `<img>` or markdown image tag.

**Hosted on Vercel (free tier). No database required for basic usage — all data is encoded in the URL as query params.**

---

## TECH STACK

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** CSS-in-JS via inline styles + CSS variables (no Tailwind, no CSS modules)
- **SVG generation:** `satori` + `@vercel/og` for rendering React → SVG/PNG
- **Fonts:** DM Sans + DM Mono (via Google Fonts and satori font loading)
- **Deployment:** Vercel (free)
- **No database** — stats are passed as URL query params by the user

---

## BASE UI CODE (REFERENCE)

The following TSX file is your **design reference and base component**. Match its aesthetic exactly in all new components you build. Do not change the visual language.

```
[INSERT claude-stats-card.tsx CONTENT HERE]
```

**Design language to preserve:**
- Background: light `#f9f7f4` / dark `#1a1a1a`
- Surface: light `#ffffff` / dark `#212121`
- Border: light `#e8e4de` / dark `#2e2e2e`
- Accent (light): `#c96442` (Claude coral)
- Accent (dark): `#d4a96a` (Claude amber)
- Font: `DM Sans` for UI, `DM Mono` for code/labels
- Card width: 380px (compact) or 720px (wide/horizontal)
- Corner radius: 14px cards, 8px tags, 99px pills
- No glows, no gradients on text, no heavy shadows
- Minimal, warm, clean — like claude.ai itself

---

## FULL FEATURE SPEC

### 1. CARD BUILDER UI (`/` — homepage)

A step-by-step card builder. Three sections side by side on desktop, stacked on mobile:

#### A) Field Selector (left panel)
User picks which fields to show on their card. Fields are toggleable chips/checkboxes.

**Available fields (with icons and labels):**

| Field ID         | Icon | Label               | Input type        |
|------------------|------|---------------------|-------------------|
| `username`       | @    | Username            | text              |
| `model`          | ◈    | Main Model Used     | select dropdown   |
| `tokens`         | ⬡    | Total Tokens        | number            |
| `cost`           | $    | Estimated Cost (USD)| number (decimal)  |
| `ai_pct`         | 〜   | AI Contribution %   | number (0–100)    |
| `human_pct`      | ◯    | Human Contribution %| auto (100 - ai)   |
| `streak`         | ⚡   | Vibe Coding Streak  | number (days)     |
| `chaos`          | 💀   | Chaos Level         | number (0–100)    |
| `session_hours`  | ◷    | Session Hours       | number            |
| `tools`          | ⊞    | Top Tools Used      | multi-text input  |
| `activity`       | ▂▄▆  | 28-day Activity     | 28 comma-sep nums |
| `badges`         | ◉    | Badges              | multi-select      |
| `prompt_type`    | ✦    | Fav Prompt Type     | text              |
| `hallucinations` | ∿    | Lines Hallucinated  | number (joke)     |

User can **drag to reorder** fields on the card.

#### B) Live Preview (center panel)
- Real-time preview of the card as user fills in values
- Toggle between **Compact** (380px vertical) and **Wide** (720px horizontal) layouts
- Toggle between **Light** and **Dark** theme
- The card preview updates instantly on every input change

#### C) Embed Panel (right panel)
Once user fills in their data:
- Shows the generated embed URL
- Shows 3 copy-ready formats:
  - **Markdown** `![Claude Stats](url)`
  - **HTML** `<img src="url" />`
  - **Shields.io-style badge** (just the compact badge version)
- One-click copy button for each
- "Deploy your own" button → links to Vercel deploy button

---

### 2. CARD LAYOUTS

#### Compact Card (vertical, 380px wide)
Default. Matches the base UI code. Fields stacked vertically. Used for sidebars.

```
┌─────────────────────────────┐
│ ◈  username      model-tag  │
│ ─────────────────────────── │
│ Tokens used       2.8M      │
│ Est. cost         $34.18    │
│ Vibe streak       14 days   │
│ Chaos level       91% chaos │
│ ─────────────────────────── │
│ AI ████████░░ 87% · H 13%   │
│ ─────────────────────────── │
│ 28d ▂▄▃▇▅▆▄▂▃▅▇▄▃▅▂▇▃▅▄▂▇ │
│ ─────────────────────────── │
│ [web search] [code exec]    │
│ ─────────────────────────── │
│ ⚡ Powered  〜 Vibe  ◈ Token │
└─────────────────────────────┘
```

#### Wide Card (horizontal, 720px wide)
Two-column layout. Left: identity + stats. Right: activity graph + badges.

```
┌──────────────────────────────────────────────────────────────┐
│ ◈ username                    │ 28-day activity graph        │
│ model-tag                     │ ▂▄▃▇▅▆▄▂▃▅▇▄▃▅▂▇▃▅▄▂▇▃▅▄▂▇ │
│ ──────────────────            │ ───────────────────────────  │
│ Tokens    2.8M                │ ⚡ Powered by Claude          │
│ Cost      $34.18              │ 〜 90% Vibe Coded             │
│ Streak    14 days             │ ◈ Token Addict               │
│ AI ████░ 87% · H 13%          │ ○ Touched Grass: No          │
└──────────────────────────────────────────────────────────────┘
```

---

### 3. API ROUTES

#### `GET /api/card`

Generates and returns the card as an SVG or PNG image.

**Query params:**

```
username=vibe_coder_9000
model=claude-sonnet-4-6
tokens=2847392
cost=34.18
ai_pct=87
streak=14
chaos=91
session_hours=312
tools=Web+Search,Code+Exec,Artifacts
activity=2,5,3,8,6,12,9,4,7,11,8,5,14,10,6,9,13,7,11,8,15,12
badges=claude_powered,vibe_coded,token_addict
hallucinations=4204
layout=compact          ← or "wide"
theme=light             ← or "dark"
fields=username,model,tokens,cost,ai_pct,streak,chaos,tools,activity,badges
                        ← controls which fields render and their order
```

**Response:** SVG image with correct `Content-Type: image/svg+xml` header.

**Implementation:** Use `satori` to render a React component tree into SVG. Load DM Sans and DM Mono fonts via fetch from Google Fonts at build time (cache them). Use `@vercel/og` as the runtime wrapper.

#### `GET /api/badge`

Returns a compact single-line badge (like shields.io). Example:

```
⚡ claude-sonnet-4-6  |  2.8M tokens  |  87% AI
```

Returns SVG badge, compatible with standard README badge embedding.

---

### 4. BADGE SYSTEM

Badges are small pill labels shown at the bottom of the card.

| Badge ID          | Icon | Label               | When to show              |
|-------------------|------|---------------------|---------------------------|
| `claude_powered`  | ⚡   | Powered by Claude   | always available           |
| `vibe_coded`      | 〜   | 90% Vibe Coded      | if ai_pct >= 80            |
| `human_verified`  | ◯    | Human Verified      | if human_pct >= 40         |
| `token_addict`    | ◈    | Token Addict        | if tokens >= 1,000,000     |
| `no_grass`        | ○    | Touched Grass: No   | if session_hours >= 200    |
| `chaos_agent`     | 💀   | Chaos Agent         | if chaos >= 85             |
| `prompt_goblin`   | ✦    | Prompt Goblin       | always available           |

Badges can also be manually selected by user in the builder regardless of thresholds.

---

### 5. SELF-ENTRY DATA SYSTEM

**No tracking. No accounts. No database.**

Users enter their own stats manually in the card builder:
- They copy from their Claude usage dashboard (claude.ai/settings/usage)
- Or they estimate / track it themselves
- All data lives in the embed URL as query params
- To update their card, they regenerate the URL with new values

**The builder UI should make this easy:**
- Clear labeled inputs with helper text like "Find this in claude.ai → Settings → Usage"
- "Last updated" field (just a date, shown on card optionally)
- Preset buttons: "Light user", "Power user", "Absolute goblin" — pre-fills example values

---

### 6. CUSTOMIZATION OPTIONS

In the builder's right panel, expose these customization controls:

| Option          | Values                                      |
|-----------------|---------------------------------------------|
| Theme           | Light / Dark                                |
| Layout          | Compact / Wide                              |
| Accent color    | Claude Coral / Claude Amber / Custom hex    |
| Show border     | Yes / No                                    |
| Corner radius   | Rounded / Sharp                             |
| Field order     | Drag to reorder                             |
| Hide fields     | Toggle each field off                       |
| Font size       | Default / Compact / Spacious                |

---

### 7. DEPLOYMENT

The app should deploy to Vercel with zero config. Include:

- `vercel.json` with correct function timeout for satori (max 10s)
- `README.md` with one-click Vercel deploy button
- Environment variables: none required for basic usage

**One-click deploy button in the app:**
```
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_REPO)
```

---

### 8. FILE STRUCTURE

```
claude-stats-card/
├── app/
│   ├── page.tsx                  ← Card builder UI (main homepage)
│   ├── layout.tsx                ← Root layout, fonts, metadata
│   ├── globals.css               ← CSS variables, reset
│   └── api/
│       ├── card/
│       │   └── route.ts          ← GET /api/card → SVG card image
│       └── badge/
│           └── route.ts          ← GET /api/badge → SVG badge
├── components/
│   ├── CardPreview.tsx           ← Live card preview (compact + wide)
│   ├── FieldSelector.tsx         ← Draggable field picker
│   ├── EmbedPanel.tsx            ← Embed code + copy buttons
│   ├── CustomizePanel.tsx        ← Theme, layout, color controls
│   └── ui/
│       ├── Toggle.tsx            ← Light/dark pill toggle
│       ├── CopyButton.tsx        ← Copy to clipboard with feedback
│       ├── NumberInput.tsx       ← Styled number input
│       └── TagInput.tsx          ← Multi-value text input (tools)
├── lib/
│   ├── buildUrl.ts               ← Builds embed URL from config state
│   ├── parseParams.ts            ← Parses URL params into StatsData
│   ├── fonts.ts                  ← Loads DM Sans/Mono for satori
│   └── defaults.ts               ← Default values, field definitions
├── types/
│   └── stats.ts                  ← StatsData, FieldId, Theme, Layout types
├── public/
│   └── og.png                    ← OG image for the builder page
├── vercel.json
├── package.json
└── README.md
```

---

### 9. COMPONENT DETAILS

#### `CardPreview.tsx`
- Renders both compact and wide variants
- Accepts `StatsData`, `Theme`, `Layout`, `FieldOrder[]`, `AccentColor` as props
- This component is used both in the browser preview AND passed to satori for SVG generation
- Must use only inline styles (satori does not support CSS classes)
- Fonts must be subset to ASCII for satori compatibility

#### `FieldSelector.tsx`
- Grid of toggleable field chips
- Each chip shows: icon + label + toggle state
- Drag handle on each chip to reorder
- Use `@dnd-kit/core` for drag-and-drop
- Disabled fields are grayed out but still visible

#### `EmbedPanel.tsx`
- Three tabs: Markdown / HTML / Badge
- Each tab shows a code block + copy button
- Copy button shows "Copied!" for 2 seconds then resets
- "Deploy your own ↗" link at the bottom

#### `buildUrl.ts`
```typescript
export function buildUrl(stats: StatsData, config: CardConfig): string {
  const base = "https://claude-stats.vercel.app/api/card";
  const params = new URLSearchParams();
  // ... encode all non-empty fields
  return `${base}?${params.toString()}`;
}
```

---

### 10. CODING STANDARDS

- All components in TypeScript with explicit prop types
- No `any` types
- All inputs validated/sanitized in `parseParams.ts` before use in SVG
- Satori route must handle missing params gracefully (use defaults)
- Card must render correctly even if only `username` is provided
- All numbers clamped to safe ranges (e.g., pct: 0–100, chaos: 0–100)
- SVG output must have `width` and `height` attributes for GitHub rendering
- Response must include `Cache-Control: s-maxage=3600` header

---

### 11. EXAMPLE EMBED URLS

Compact light card, all fields:
```
https://claude-stats.vercel.app/api/card?username=vibe_coder&model=claude-sonnet-4-6&tokens=2847392&cost=34.18&ai_pct=87&streak=14&chaos=91&tools=Web+Search,Code+Exec&badges=claude_powered,vibe_coded&theme=light&layout=compact
```

Wide dark card, minimal fields:
```
https://claude-stats.vercel.app/api/card?username=devguy&tokens=500000&ai_pct=72&theme=dark&layout=wide&fields=username,tokens,ai_pct,activity
```

Badge only:
```
https://claude-stats.vercel.app/api/badge?username=devguy&model=claude-sonnet-4-6&tokens=500000
```

---

### 12. README EMBED INSTRUCTIONS (for end users)

The deployed app's README should instruct users:

```markdown
## Add to your GitHub README

1. Go to https://claude-stats.vercel.app
2. Enter your stats (find token usage in claude.ai → Settings → Usage)
3. Customize your card
4. Copy the embed code
5. Paste into your README.md

### Example
![Claude Stats](https://claude-stats.vercel.app/api/card?username=you&tokens=1000000&ai_pct=85&theme=light)
```

---

## WHAT TO BUILD FIRST (ORDER OF WORK)

1. `types/stats.ts` — define all types first
2. `lib/defaults.ts` — field definitions, default values
3. `lib/parseParams.ts` — param parser with validation
4. `lib/buildUrl.ts` — URL builder
5. `components/CardPreview.tsx` — the card (compact + wide, inline styles only)
6. `app/api/card/route.ts` — satori SVG endpoint
7. `components/FieldSelector.tsx` — field picker
8. `components/EmbedPanel.tsx` — embed code panel
9. `components/CustomizePanel.tsx` — theme/layout/color controls
10. `app/page.tsx` — assemble the full builder UI
11. `app/api/badge/route.ts` — badge endpoint
12. `vercel.json` + `README.md` — deployment config

---

## IMPORTANT CONSTRAINTS

- **No database.** All state lives in URL params.
- **No auth.** Fully anonymous, no accounts.
- **No tracking.** Don't log user data.
- **Satori only supports inline styles.** No className, no CSS modules, no Tailwind in card components.
- **Card component must be reusable** — same JSX used in browser preview and satori render.
- **GitHub strips scripts** from README embeds — only `<img>` tags work, so the SVG endpoint is the core product.
- **Keep bundle small** — satori and @vercel/og are server-only, never import in client components.

---

*This prompt is the single source of truth for the Claude Stats Card project. If you are unsure about a design decision, refer back to the base UI code and the design language section. When in doubt: clean, minimal, warm, Anthropic.*
