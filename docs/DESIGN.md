# Design

The visual system for 3alemny. Owned by `head-of-design` — nobody else writes here.

Status: **settled.** This is not a proposal. Direction chosen by Mohammad, 2026-09-07: brutalist / terminal.
If something here is wrong in the built site, describe the fix and hand it to `head-of-software`. Do not
re-open the direction.

---

## 1. Direction

**Near-black ground. One acid colour. Monospace-led. Hard corners. Borders instead of shadows.**

The site teaches machine vocabulary — tokens, context windows, wrappers, slop. It should read like the
thing it is teaching about: a terminal buffer, a spec sheet, a hazard label. Type does the work. Structure
is visible: every edge is a real 1px line you can see, not a soft shadow implying one. Colour is rationed —
there is exactly one non-neutral hue on the entire site, and when it appears it means something.

Density is a feature. Whitespace is used for rhythm, not for airiness. The homepage is closer to a printed
index page than to a product tour.

### What this is deliberately not

Do not ship any of the following. If a PR contains one, it is wrong regardless of how well it is built.

- Purple-to-blue gradients. Any gradient used as decoration. (Gradients are permitted only as
  `repeating-linear-gradient` hatch patterns, which are hard-edged, not blends.)
- Glassmorphism, backdrop blur, frosted panels, translucent cards.
- Floating 3D blobs, orbs, mesh backgrounds, animated gradient auras.
- Generic sans-serif body copy. There is no sans-serif body face on this site.
- Stock illustration of any kind. Especially people pointing at charts.
- "Powered by AI" badges, sparkle icons, wand icons, robot mascots.
- A hero with a laptop or phone mockup. There is no device frame anywhere.
- Rounded corners. Any radius above `0`.
- Box shadows, drop shadows, text shadows — including "hard" offset shadows. See §6.
- Icon fonts and icon libraries. Glyphs are ASCII or basic Unicode already present in the mono face.
- Emoji anywhere in the UI or in content.

---

## 2. Colour

### 2.1 How the tokens are structured

Three layers. Components only ever touch layer 3.

1. **Raw ramp** — `--n-*` and `--acid-*` in `:root`. Literal values. Never referenced by a component.
2. **Semantic assignment** — `--surface`, `--ink`, `--line`, `--acid`… in `:root`. Points at layer 1.
3. **Tailwind theme** — `@theme inline { --color-surface: var(--surface); … }` in `app/globals.css`,
   which generates `bg-surface`, `text-surface`, `border-surface`, etc.

`@theme inline` is load-bearing. It inlines the *reference* into the generated utility, so
`bg-surface` compiles to `background-color: var(--surface)`. Redefining `--surface` under a selector
re-themes every component with no class changes.

**This is how a light theme lands in v2 with zero renames.** Add one block:

```
[data-theme="light"] { --surface: var(--n-100); --ink: var(--n-900); --ink-inverse: var(--n-100); … }
```

Only the layer-2 assignments change. The ramp does not change. The token names do not change. The utility
classes do not change. No component is edited. This is why the tokens are named by role
(`--color-surface`, `--color-ink`) and never by appearance (`--color-black`, `--color-white`,
`--color-dark-grey`). Do not add a literal-named colour token, ever.

**v1 ships dark only.** There is no theme toggle, no `prefers-color-scheme` branch, no light values.
The existing `@media (prefers-color-scheme: dark)` block in `app/globals.css` is deleted, not extended.

### 2.2 Raw neutral ramp

Cool-grey, very slightly blue. Ten steps, monotonic in lightness.

| Token | Hex | Notes |
|---|---|---|
| `--n-950` | `#050506` | Deepest. Wells, inputs, code blocks, game playfield. |
| `--n-900` | `#0B0C0E` | Page ground. The site's base colour. |
| `--n-850` | `#131417` | Raised panels, cards. |
| `--n-800` | `#1C1E22` | Card hover fill. |
| `--n-700` | `#2A2C31` | Soft rule — decorative dividers only. |
| `--n-600` | `#3C4046` | Hatch stripe. Decorative only. |
| `--n-500` | `#6B7078` | Default visible border. |
| `--n-400` | `#8A9099` | Muted text. |
| `--n-300` | `#9AA1AB` | Strong border, hover border. |
| `--n-100` | `#E8EAED` | Primary text. Inverted slab fills. |

### 2.3 Raw acid ramp

One hue (~72°, chartreuse). Four steps. **There is no second hue anywhere in this system.**

| Token | Hex | Notes |
|---|---|---|
| `--acid-500` | `#CCFF00` | The accent. Fills, key text, correct answers, active state. |
| `--acid-600` | `#A3CC00` | Dimmed accent. Visited links, pressed fills. |
| `--acid-800` | `#3D4D00` | Deep tint fill. Selected states, "done" chips. |
| `--acid-900` | `#1A2000` | Wash tint fill. Hover backgrounds, inline code chips. |

### 2.4 Semantic tokens — the only ones components use

| Tailwind token | Value | Role |
|---|---|---|
| `--color-surface` | `#0B0C0E` | Page ground. |
| `--color-surface-raised` | `#131417` | Card, panel, quiz option. |
| `--color-surface-hover` | `#1C1E22` | Hover fill for raised things. |
| `--color-surface-sunken` | `#050506` | Input, code block, explanation panel, playfield. |
| `--color-ink` | `#E8EAED` | Primary text. Also the fill for the "wrong" slab. |
| `--color-ink-muted` | `#8A9099` | Secondary text, metadata, placeholders, captions. |
| `--color-ink-inverse` | `#0B0C0E` | Text on any light fill (acid or ink). |
| `--color-line` | `#6B7078` | Default border. Every interactive boundary. |
| `--color-line-strong` | `#9AA1AB` | Hover / emphasis border. |
| `--color-line-soft` | `#2A2C31` | Decorative rules between text blocks, **and** the boundary of controls that are disabled or inert. Never the boundary of an *enabled* control. |
| `--color-hatch` | `#3C4046` | Locked-state hatch stripe. Decorative. |
| `--color-acid` | `#CCFF00` | The accent. |
| `--color-acid-dim` | `#A3CC00` | Visited links, pressed acid fills. |
| `--color-acid-deep` | `#3D4D00` | Selected fill, done chip. |
| `--color-acid-wash` | `#1A2000` | Hover wash, inline code chip fill. |
| `--color-focus` | `#E8EAED` | Focus ring on dark surfaces — which is nearly everywhere. On a light fill (`--color-acid` or `--color-ink`) an inset ring flips to `--color-ink-inverse` instead. See §2.6. |

Sixteen colour tokens. If you need a seventeenth, the design is wrong — raise it with `head-of-design`.

Also declare `--color-transparent: transparent` and `--color-current: currentColor` after clearing the
namespace (§2.8), so `border-transparent` and `text-current` still exist.

### 2.5 Contrast table

All ratios are **estimates computed by hand** from the WCAG 2.x relative-luminance formula. Measure them
before merge and send back anything that misses. Where a pair sits close to a threshold it is flagged.

**Text on backgrounds — must clear 4.5:1 (normal) / 3:1 (≥24px, or ≥18.66px bold).**

| Foreground | Background | Ratio | Verdict |
|---|---|---|---|
| `--color-ink` `#E8EAED` | `--color-surface` `#0B0C0E` | **16.2** | AAA |
| `--color-ink` | `--color-surface-raised` `#131417` | **15.3** | AAA |
| `--color-ink` | `--color-surface-hover` `#1C1E22` | **13.9** | AAA |
| `--color-ink` | `--color-surface-sunken` `#050506` | **16.9** | AAA |
| `--color-ink` | `--color-acid-deep` `#3D4D00` | **7.7** | AAA |
| `--color-ink` | `--color-acid-wash` `#1A2000` | **13.9** | AAA |
| `--color-ink-muted` `#8A9099` | `--color-surface` | **6.1** | AA |
| `--color-ink-muted` | `--color-surface-raised` | **5.7** | AA |
| `--color-ink-muted` | `--color-surface-hover` | **5.2** | AA — tightest normal-text pair, verify |
| `--color-ink-muted` | `--color-surface-sunken` | **6.3** | AA |
| `--color-ink-muted` | `--color-acid-wash` | **5.2** | AA — verify |
| `--color-acid` `#CCFF00` | `--color-surface` | **16.7** | AAA |
| `--color-acid` | `--color-surface-raised` | **15.7** | AAA |
| `--color-acid` | `--color-surface-hover` | **14.2** | AAA |
| `--color-acid` | `--color-surface-sunken` | **17.3** | AAA |
| `--color-acid` | `--color-acid-wash` | **14.3** | AAA |
| `--color-acid` | `--color-acid-deep` | **7.9** | AAA |
| `--color-acid-dim` `#A3CC00` | `--color-surface` | **10.4** | AAA |
| `--color-acid-dim` | `--color-surface-raised` | **9.8** | AAA |
| `--color-acid-dim` | `--color-acid-wash` `#1A2000` | **9.0** | AAA — added for §7.6 link active + visited code chip |
| `--color-ink-inverse` `#0B0C0E` | `--color-acid` `#CCFF00` | **16.7** | AAA |
| `--color-ink-inverse` | `--color-acid-dim` `#A3CC00` | **10.4** | AAA |
| `--color-ink-inverse` | `--color-ink` `#E8EAED` | **16.2** | AAA |
| `--color-line-strong` `#9AA1AB` | `--color-surface` | **7.5** | AAA (usable as text if ever needed) |

**Non-text boundaries — must clear 3:1 (WCAG 1.4.11).**

| Boundary | Against | Ratio | Verdict |
|---|---|---|---|
| `--color-line` `#6B7078` | `--color-surface` | **3.9** | Pass |
| `--color-line` | `--color-surface-raised` | **3.7** | Pass — tightest boundary, verify |
| `--color-line` | `--color-surface-sunken` | **4.1** | Pass |
| `--color-line-strong` `#9AA1AB` | `--color-surface` | **7.5** | Pass |
| `--color-acid` | `--color-surface` | **16.7** | Pass |
| `--color-acid` | `--color-line` (filled vs unfilled progress) | **4.2** | Pass |
| `--color-focus` `#E8EAED` | `--color-surface` | **16.2** | Pass |
| `--color-ink` slab | `--color-surface` | **16.2** | Pass |

**Deliberately below threshold — decorative or exempt. Do not "fix" these.**

| Pair | Ratio | Why it is allowed |
|---|---|---|
| `--color-line-soft` `#2A2C31` on `--color-surface` | 1.4 | Two sanctioned uses, both exempt from 1.4.11. **(a)** Decorative rules between text blocks — carries no state. **(b)** The border of a control that is disabled or inert: disabled buttons (§7.3), disabled inputs (§7.4), post-submit inert quiz options (§7.5 state 8). WCAG 1.4.11 exempts "inactive user interface components", and the recessive border is doing real work there — it is *how* the control reads as unavailable. It must never bound an enabled control; enabled boundaries use `--color-line` at 3.9 or better. |
| `--color-hatch` `#3C4046` on `--color-surface` | 1.9 | Locked-state texture. Reinforcement only — locked is *also* signalled by a `[LOCKED]` chip, a `REQUIRES:` line, and `aria-disabled`. |
| `--color-acid-deep` `#3D4D00` fill on `--color-surface` | 2.1 | A fill, not a boundary. Every element using it also carries a 2px `--color-acid` border at 16.7. |
| `--color-line` `#6B7078` text on `--color-surface-raised` | 3.7 | Disabled control label. WCAG 1.4.3 exempts disabled controls. Applies to buttons and inputs only — **never** to locked lesson cards, whose text stays at `--color-ink-muted`. |

### 2.6 One accent — how every state is expressed

There is no red, no green, no amber, no blue. States are built from the acid ramp and the neutral ramp,
and **every state also carries a text label or an ASCII glyph**, so no state is signalled by colour alone
(WCAG 1.4.1).

| State | Expression |
|---|---|
| **Correct / success** | Solid `--color-acid` fill, `--color-ink-inverse` text, 2px `--color-acid` border, `[OK]` glyph cell, right-aligned label `CORRECT`. A filled acid slab. |
| **Wrong / error** | **Inversion.** Solid `--color-ink` `#E8EAED` fill, `--color-ink-inverse` text, 2px `--color-ink` border, `[X]` glyph cell, label `WRONG`, plus a 6px hazard-hatch bar flush to the bottom inner edge (45°, 3px `--color-surface` stripe / 3px transparent, over the ink fill). A white slab in a black page is louder than red, and it can never be confused with acid. |
| **The answer you missed** | Outlined, not filled: `--color-surface` fill, 2px `--color-acid` border, `--color-acid` text, `>` glyph cell, label `ANSWER`. Distinguishable from "you got it right" because that one is filled. |
| **Warning / caution** | `--color-acid-wash` fill, 1px `--color-acid-dim` border, `!!` prefix, `--color-ink` text. Low-energy acid. |
| **Focus** | `outline: 2px solid; outline-offset: 2px`. Never acid — acid is reserved for meaning, and an acid ring on an acid button is invisible. **Ring colour follows the surface the ring lands on:** `--color-focus` `#E8EAED` on any dark surface, `--color-ink-inverse` `#0B0C0E` on a light fill (`--color-acid` or `--color-ink`). An *outward* ring (`+2px`) lands on the page ground, which is always dark, so buttons and cards always use `--color-focus` (16.2:1) even when the control itself is acid-filled. Only an *inset* ring (`-2px`, used in collapsed stacks — see §7.5) ever lands on the control's own fill, and that is the case that flips. |
| **Selected (pre-commit)** | `--color-acid-deep` fill, 2px `--color-acid` border, acid-filled key glyph cell. |
| **Visited link** | `--color-acid-dim` `#A3CC00` text (10.4:1) instead of `--color-acid`. Same hue, clearly dimmer. |
| **Disabled control** | No `opacity`. Explicit token swap: fill `--color-surface-raised`, text `--color-line`, border 2px `--color-line-soft`, `cursor: not-allowed`, no hover transition. `opacity` is banned for disabled states because it makes contrast unpredictable. |
| **Locked lesson** | Not a disabled control — it is readable content. Fill stays `--color-surface` (flush with the page, so it recedes), 1px `--color-line` border, title in `--color-ink-muted` (6.1:1), acid marker replaced by an `--color-ink-muted` square, `[LOCKED]` chip top-right, body copy replaced by `REQUIRES: <prereq>`, and a 45° `--color-hatch` texture over the whole card. |

### 2.7 Track distinction — core vs slang

Two tracks, one accent. The difference is **figure/ground inversion plus a word**, not two colours.

| | Core | Slang |
|---|---|---|
| Header strip | Transparent, 1px `--color-line-soft` bottom rule, `CORE` in `--color-acid` | Solid `--color-acid` bar, `SLANG` in `--color-ink-inverse` |
| Marker | 8px solid `--color-acid` square | 8px square, 2px `--color-acid` border, hollow centre |
| Title rendering | `tokens` — plain | `"slop"` — wrapped in straight double quotes, because it is vernacular |
| Graph node | `--color-surface-raised` fill, 1px `--color-line` border, `--color-ink` label | `--color-acid` fill, `--color-ink-inverse` label |

The quote convention is content-level and applies everywhere a slang term is titled: cards, lesson pages,
graph nodes, quiz stems, the ticker. It is free, it survives greyscale, and it teaches the distinction.

### 2.8 Guard rails in `globals.css`

Inside `@theme`, clear the namespaces that let old habits back in:

- `--color-*: initial;` — removes Tailwind's entire default palette. `bg-purple-600` stops compiling.
  Then declare the sixteen tokens above plus `--color-transparent` and `--color-current`.
- `--radius-*: initial;` — removes every `rounded-*` utility.
- `--shadow-*: initial;` `--inset-shadow-*: initial;` `--drop-shadow-*: initial;` `--text-shadow-*: initial;`
  — removes every shadow utility.
- `--text-*: initial;` — removes Tailwind's default type scale, then declare the twelve steps from §3.3.
  Without this, `text-xs`, `text-lg`, `text-xl`, `text-2xl` … all survive and the scale is not a scale.
  Two things to know before doing it:
  - **`text-sm` is a name collision.** Tailwind's default `text-sm` is `0.875rem`/`1.25`; this system's
    `text-sm` is `0.9375rem`/`1.6`. Clearing the namespace first makes the override explicit rather than
    silent — that is the point. Anyone reading `text-sm` in a component gets the value in §3.3.
  - Clearing `--text-*` does **not** affect `--text-shadow-*`; they are separate namespaces. Both are
    cleared here for different reasons.
- `--font-sans:` set to the same stack as `--font-mono` (see §3), and set
  `--default-font-family: var(--font-mono)` so Preflight does not fall back to a system sans.
  `font-sans` therefore becomes a no-op alias and must not appear in any component.

Also in `@layer base`: `*, *::before, *::after { border-radius: 0; }` and
`::selection { background: var(--color-acid); color: var(--color-ink-inverse); }` (16.7:1).

---

## 3. Type

### 3.1 Families

Two. Both on Google Fonts, both loaded via `next/font/google`, which self-hosts at build time. No CDN
request, no licence, no cost.

| Role | Google Fonts family | `next/font/google` import | Config |
|---|---|---|---|
| Everything functional | **JetBrains Mono** | `JetBrains_Mono` | `{ variable: "--font-jetbrains", subsets: ["latin"], display: "swap" }` — variable font, weights 100–800. **Do not pass `weight`.** |
| Display only | **Archivo Black** | `Archivo_Black` | `{ variable: "--font-archivo", subsets: ["latin"], weight: "400", display: "swap" }` — static, single weight. **`weight: "400"` is required** or the import throws. |

**The `variable:` names above are deliberately not `--font-mono` / `--font-display`.** Those two names are
Tailwind theme keys. If `next/font` is told to emit `--font-mono` and `@theme inline` then declares
`--font-mono: var(--font-mono)`, the declaration is circular and resolves to nothing. Keep the two layers
separate: `next/font` emits `--font-jetbrains` and `--font-archivo` on the `<html>` element, and
`@theme inline` maps them onto the Tailwind keys:

```
@theme inline {
  --font-mono: var(--font-jetbrains), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  --font-display: var(--font-archivo), Impact, "Haettenschweiler", sans-serif;
  --font-sans: var(--font-mono);
  --default-font-family: var(--font-mono);
  --default-mono-font-family: var(--font-mono);
}
```

That produces the `font-mono` and `font-display` utilities and makes mono the document default.

Engineering notes:

- `Archivo Black` has exactly one weight. **Never set `font-weight` on a display step.** Leaving it at 400
  gives the intended ultra-heavy face; setting 700 either does nothing or triggers ugly synthetic bold.
- Replace the scaffold's `Geist` / `Geist_Mono` imports and the `--font-geist-*` variables in
  `app/layout.tsx` entirely. They are not part of this system.
- Fallback stacks: mono → `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
  display → `Impact, "Haettenschweiler", sans-serif` (only ever visible for ~one frame with `swap`).
- Both faces are Latin-only. If Arabic script ever appears in content, neither covers it — that is a
  v2 font decision, not a v1 fix.

### 3.2 Why monospace leads

This site teaches the vocabulary of machines. Setting the body in a mono face makes the page read as a
buffer rather than a brochure, and it makes term names, code, prompts, and prose share one rhythm — a term
inside a sentence looks like the same object as a term inside a code block, because it is. It also enforces
discipline: mono is unforgiving of long measures, which keeps prose blocks short, which is the right shape
for micro-lessons.

Archivo Black exists only to make the four or five biggest moments on the site hit like a poster. It never
sets a paragraph, never sets a label, never sets anything below 28px.

### 3.3 Scale

Root font size is the browser default (16px). Sizes in `rem` with px shown at root 16.

Tailwind v4 token form — declare each step with its paired modifiers:

```
--text-body: 1.0625rem;
--text-body--line-height: 1.65;
--text-body--letter-spacing: 0em;
--text-body--font-weight: 400;
```

| Token | Size | Line height | Weight | Tracking | Family | Use |
|---|---|---|---|---|---|---|
| `text-d1` | `clamp(2.75rem, 8vw, 6rem)` — 44→96px | 0.92 | 400 | `-0.03em` | display | Homepage H1. Quiz score number. Nothing else. |
| `text-d2` | `clamp(2.125rem, 5.5vw, 4rem)` — 34→64px | 0.95 | 400 | `-0.02em` | display | Lesson page title. Results headline. Section slabs. |
| `text-d3` | `clamp(1.75rem, 3.5vw, 2.5rem)` — 28→40px | 1.00 | 400 | `-0.01em` | display | Lattice cell headers. Game titles wherever a game is *presented* — the homepage games band and the game page. Step numerals. Overlay headlines. |
| `text-h1` | `2rem` — 32px | 1.15 | 700 | `-0.01em` | mono | Sub-page headings where display is too loud. |
| `text-h2` | `1.5rem` — 24px | 1.25 | 700 | `0` | mono | Lesson section headings. **Quiz question stem.** |
| `text-h3` | `1.1875rem` — 19px | 1.35 | 700 | `0` | mono | Card titles. Sub-headings. |
| `text-lede` | `1.1875rem` — 19px | 1.60 | 400 | `0` | mono | Lesson one-line definition. Hero sub. |
| `text-body` | `1.0625rem` — 17px | 1.65 | 400 | `0` | mono | Default prose. Quiz option text. |
| `text-sm` | `0.9375rem` — 15px | 1.60 | 400 | `0` | mono | Secondary copy, captions, help text, card descriptions. |
| `text-code` | `0.9375rem` — 15px | 1.50 | 400 | `0` | mono | Inline and block code. Distinguished by fill + border, not family. |
| `text-label` | `0.8125rem` — 13px | 1.20 | 700 | `+0.12em`, uppercase | mono | Buttons, chips, eyebrows, nav, track tags. |
| `text-micro` | `0.6875rem` — 11px | 1.30 | 500 | `+0.16em`, uppercase | mono | Meta rows, graph labels, keyboard hints, breadcrumbs. |

**How the Family column is applied.** Tailwind v4 has `--text-*--line-height`,
`--text-*--letter-spacing` and `--text-*--font-weight` modifiers, but there is **no
`--text-*--font-family` modifier**. A `text-*` utility can therefore never set the typeface. The Family
column is a binding instruction, not something the token does for you:

- `--font-mono` is the document default (§3.1), so every mono step inherits it and needs no font utility.
- **The three display steps must always be written with `font-display` alongside them** —
  `class="font-display text-d1"`. `text-d1`, `text-d2` and `text-d3` are the only steps this applies to,
  and they must never appear without it, or they render at display sizes in the mono face.
- Because Archivo Black ships one weight, the display steps carry `--text-d*--font-weight: 400`. Do not add
  a `font-bold` next to `font-display`; it triggers synthetic bold.
- If engineering prefers to make this unforgettable, bind it once in `@layer components` —
  `.text-d1, .text-d2, .text-d3 { font-family: var(--font-display); }` — rather than repeating the utility.
  Either approach is acceptable; leaving it to memory is not.

Rules:

- Uppercase is applied by the step (`text-label`, `text-micro` are always uppercase). Never uppercase
  `text-body` or above.
- **`text-micro` has a brightness floor, not a whitelist:** it must clear 4.5:1 against whatever it sits on,
  and `--color-ink-muted` is the dimmest value permitted. Brighter is always fine — `text-micro` is
  routinely set in `--color-acid` (eyebrows, score readouts, the `PLACEMENT` marker) and in
  `--color-ink-inverse` on light fills (chips, result labels), and those are correct, not exceptions.
  What is banned is anything dimmer than `--color-ink-muted`: never `--color-line` (3.9), never
  `--color-line-soft` (1.4), never `--color-hatch` (1.9) at this size. At 11px it must also never be the
  *only* place a piece of information appears.
- Measure: prose columns cap at `64ch`. Because the face is monospace, `1ch` is exactly one character, so
  `64ch` is a literal 64-character line — the top of the comfortable range. Lede caps at `52ch`.
- Numerals: JetBrains Mono is tabular by default. Score readouts, progress counters, and the graph use it
  as-is; no `font-variant-numeric` needed.
- Hyphenation off. `text-wrap: balance` on `text-d1`/`text-d2`/`text-h2`; `text-wrap: pretty` on prose.

### 3.4 Wordmark

`3alemny`, lowercase, `text-h3` (19px / 700) in mono, `--color-ink`, letter-spacing `-0.02em`, followed by
a `0.55em × 1.05em` `--color-acid` block that blinks (§8). The `3` is a numeral in the source string — it
is Arabizi, not a stylised glyph. Never set the wordmark in the display face; never set it in caps.

---

## 4. Spacing

Base unit **4px**. Tailwind v4's default `--spacing: 0.25rem` is retained, so `p-4` = 16px.

Permitted steps only — do not invent arbitrary values:

Tailwind v4 computes spacing from `--spacing`, so fractional multipliers (`p-0.5`, `gap-2.5`, `px-3.5`)
are generated natively with no configuration. Three of them are in the permitted set below because
components genuinely need them; they are not an invitation to invent more.

| Utility | px | Typical use |
|---|---|---|
| `0` | 0 | Gapless lattices. |
| `0.5` | 2 | Progress-segment gaps. Inline code chip padding-y. Link hover bleed. |
| `1` | 4 | Glyph nudges, chip inner gaps. |
| `2` | 8 | Label→field gap, chip padding-x. |
| `2.5` | 10 | Button inner `gap` between label and trailing glyph. |
| `3` | 12 | Tight stacks. |
| `3.5` | 14 | Button padding-x (`sm`). Input padding-x. Quiz option text-cell padding-y. |
| `4` | 16 | Default gap between blocks inside a card. |
| `5` | 20 | Card padding (mobile). |
| `6` | 24 | Card padding (desktop). Quiz block padding (mobile). |
| `8` | 32 | Quiz block padding (desktop). Page gutter (md). |
| `10` | 40 | Gap above an `h2` inside prose. |
| `12` | 48 | Page gutter (xl). Column gutter. |
| `16` | 64 | Section spacing (mobile). |
| `20` | 80 | — |
| `24` | 96 | Section spacing (desktop). Sticky rail top offset. |
| `32` | 128 | Hero vertical padding (desktop). |
| `40` | 160 | Rare. Results screen top offset. |

### Layout dimensions

| Name | Value |
|---|---|
| Content max width | `1200px` |
| Prose measure | `64ch` |
| Lede measure | `52ch` |
| Quiz column max | `720px` |
| Lesson rail width | `300px` |
| Page gutter | `20px` / `32px` at `md` / `48px` at `xl` |
| Header height | `64px` |
| Section spacing | `64px` / `96px` at `md` |

Breakpoints are Tailwind defaults: `sm` 640, `md` 768, `lg` 1024, `xl` 1280.

Z-index scale: `0` base, `10` sticky rail, `20` header, `30` game overlay, `40` modal. Nothing else.

---

## 5. Radii

**`border-radius: 0`. Everywhere. Zero exceptions.**

Not on cards, not on buttons, not on inputs, not on chips, not on the progress segments, not on the game
viewport, not on the favicon, not on images. There are no avatars and no pills on this site.

Enforcement: `--radius-*: initial` in `@theme` deletes the `rounded-*` utilities, and
`*, *::before, *::after { border-radius: 0 }` in `@layer base` catches anything set in raw CSS.

---

## 6. Borders and shadows

### Shadows

**None.** No `box-shadow`, no `filter: drop-shadow()`, no `text-shadow`, at any value.

This includes hard offset shadows (`box-shadow: 4px 4px 0 …`). Yes, they are a brutalist staple. They are
still banned here, because "no shadows except the ones I like" is a rule nobody enforces. Elevation is
expressed by, in order of preference:

1. A surface step (`--color-surface` → `--color-surface-raised` → `--color-surface-hover`).
2. Border weight (1px → 2px).
3. Border colour (`--color-line` → `--color-line-strong` → `--color-acid`).
4. Full inversion (dark-on-light instead of light-on-dark).

Focus rings use `outline`, which is not a shadow and works correctly at zero radius.

### Border widths

| Width | Use |
|---|---|
| `1px` | Default. Cards, inputs, dividers, grid lattice, chips. |
| `2px` | Buttons (all variants, all states). Focus rings. **Quiz options in every state** — the width is constant there so selection cannot shift the stack (§7.5). Game viewport. |
| `3px` | Track markers — the acid bar on a `CORE` cell's left edge. |
| `4px` | Accent rule on callouts — the acid left border on TL;DR and explanation panels. |
| `6px` | The hazard bar on a wrong answer. |

Nothing above 6px. Border colours are always explicit — Tailwind v4's default border colour is
`currentColor`, so `border` alone is never sufficient; always pair with `border-line`, `border-acid`, etc.

### The gapless lattice

Card grids do not use `gap`. They share single-pixel edges. The recipe:

- Grid container: `display: grid; gap: 0; border-top: 1px solid var(--color-line);
  border-left: 1px solid var(--color-line);`
- Every cell: `border-right: 1px solid var(--color-line); border-bottom: 1px solid var(--color-line);`

Result is a perfect 1px lattice with no doubled lines. Used on: the homepage two-track split, the how-it-works
row, the games band, the results-screen term map, the prev/next bar, and the graph side panel.

### The hatch

One pattern, two densities. Both are `repeating-linear-gradient(45deg, …)` — hard-edged, never a blend.

| Name | Declaration | Over | Use |
|---|---|---|---|
| Locked hatch | `repeating-linear-gradient(45deg, var(--color-hatch) 0 3px, transparent 3px 8px)` | `--color-surface` | Locked lesson cards, locked graph nodes, locked term rows. Sparse and quiet on purpose. |
| Hazard hatch | `repeating-linear-gradient(45deg, var(--color-surface) 0 3px, transparent 3px 6px)` | `--color-ink` | The 6px bar on a wrong answer, the top edge of a `NOT THIS` cell, the confirm panel on `danger`. Denser (6px period vs 8px) and loud on purpose. |

The 45° angle and the 3px stripe are constant across both. Only the period changes.

---

## 7. Components

Every component is `border-radius: 0`, has no shadow, and uses only §2.4 tokens.

### 7.1 Chip

A 22px-tall inline tag. Never interactive.

- `display: inline-flex; align-items: center; height: 22px; padding: 0 8px; border-width: 1px;`
- Type: `text-micro` (11px / `+0.16em` / uppercase) with the weight overridden from 500 to 700. Tracking is
  the step's own `+0.16em` — it is not adjusted for chips.

| Variant | Fill | Border | Text | Contrast on `--color-surface-raised` |
|---|---|---|---|---|
| `track-core` | transparent | 1px `--color-line` | `--color-acid` | 15.7 |
| `track-slang` | `--color-acid` | 1px `--color-acid` | `--color-ink-inverse` | 16.7 |
| `status-locked` | transparent | 1px `--color-line` | `--color-ink-muted` | 5.7 |
| `status-done` | `--color-acid-deep` | 1px `--color-acid` | `--color-acid` | 7.9 |
| `status-new` | `--color-acid` | 1px `--color-acid` | `--color-ink-inverse` | 16.7 |

Chip text is always the literal word: `CORE`, `SLANG`, `[LOCKED]`, `DONE`, `NEW`.

### 7.2 Card

Two variants. `Card` is standalone and owns all four borders. `LatticeCard` sits in a gapless grid and owns
only `border-right` and `border-bottom` (§6).

**Structure**, top to bottom:

1. **Header strip** — 32px tall, `display: flex; justify-content: space-between; align-items: center`.
   Left: track chip. Right: status chip. For slang cards the whole strip is the `--color-acid` bar
   (full card width, flush to the card's inner edges via `-20px -20px 0` negative margin, `-24px -24px 0`
   at `md`), with the `SLANG` word in `--color-ink-inverse` and the status chip inverted to
   transparent-fill / `--color-ink-inverse` text / 1px `--color-ink-inverse` border. For core cards the
   strip is transparent with a 1px `--color-line-soft` bottom rule.
   **The strip has no `margin-bottom` in either track.** The gap below it is owned entirely by the title's
   `margin-top`. Margins do not collapse inside a flex column, so giving the strip a bottom margin *and*
   the title a top margin would put 32px under a slang strip and 16px under a core strip — the two tracks
   would not line up when placed side by side in a lattice.
2. **Title** — `text-h3`, `--color-ink`. Slang titles are quoted (§2.7). `margin-top: 16px`, in both tracks.
3. **Description** — `text-sm`, `--color-ink-muted`, clamped to 2 lines with `line-clamp-2`. Margin-top 8px.
4. **Meta row** — `text-micro`, `--color-ink-muted`, pushed to the bottom with `margin-top: auto`.
   Format: `CORE · 4 MIN · UNLOCKS 2`.

**Box:**

| Property | Value |
|---|---|
| Fill | `--color-surface-raised` |
| Border | 1px solid `--color-line` (3.7:1) |
| Radius | 0 |
| Padding | 20px; 24px at `md` |
| Min height | 168px |
| Layout | `display: flex; flex-direction: column` |

**States** (whole card is the link target — one `<a>`, not a nested link):

| State | Change |
|---|---|
| Hover | Fill → `--color-surface-hover`; border → `--color-line-strong`; title → `--color-acid` (14.2:1). No transform, no scale, no lift. |
| Focus-visible | `outline: 2px solid var(--color-focus); outline-offset: 2px`. In a lattice, `outline-offset: -2px` so the ring does not clip against neighbours, plus `position: relative; z-index: 3`. The inset ring lands on the card's own fill, which is `--color-surface-raised` (15.3:1) or `--color-surface` when locked (16.2:1) — both dark, so the ring stays `--color-focus` and never flips. Cards never take a light fill. |
| Active | Fill → `--color-surface-sunken`; border stays `--color-line-strong`. |
| Locked | Fill → `--color-surface`; locked hatch overlay; title → `--color-ink-muted` (6.1:1); acid marker → `--color-ink-muted`; description replaced by `REQUIRES: <prereq term>`; `[LOCKED]` chip; `aria-disabled="true"`; `cursor: not-allowed`; no hover response. |
| Done | `status-done` chip; a 3px `--color-acid` bar flush to the card's left inner edge, full height. |

### 7.3 Button

Shared across all variants and sizes:

- `display: inline-flex; align-items: center; justify-content: center; gap: 10px;`
- `border-width: 2px; border-style: solid; border-radius: 0;`
- Type: `text-label` — 13px / 700 / `+0.12em` / uppercase, mono. `lg` uses 15px with the same tracking.
- `white-space: nowrap; cursor: pointer; text-decoration: none;`
- `transition: background-color 80ms linear, border-color 80ms linear, color 80ms linear;`
  Never `transition: all`.
- Focus-visible on every variant and state: `outline: 2px solid var(--color-focus); outline-offset: 2px`.
  Buttons always use `--color-focus`, including `primary` in its acid-filled default state: the `+2px`
  offset means the ring is painted on the page ground behind the button (16.2:1), never on the acid itself.
  Buttons are never placed in a collapsed stack, so a button ring is never inset and never flips (§2.6).
- Disabled never uses `opacity`.
- Optional trailing glyph is ASCII or a mono-covered arrow: `→`, `>`, `↗`.

**Sizes:**

| Size | Height | Padding-x | Type |
|---|---|---|---|
| `sm` | 36px | 14px | `text-label` 13px |
| `md` (default) | 48px | 20px | `text-label` 13px |
| `lg` | 60px | 32px | 15px / 700 / `+0.12em` / uppercase |

Below `sm` breakpoint, a `lg` primary goes full width.

**Variant: `primary`** — the acid slab. One per screen region. Hover *inverts* rather than darkens; that is
the house move.

| State | Fill | Border | Text | Ratio |
|---|---|---|---|---|
| Default | `--color-acid` | 2px `--color-acid` | `--color-ink-inverse` | 16.7 |
| Hover | `--color-surface` | 2px `--color-acid` | `--color-acid` | 16.7 |
| Focus-visible | unchanged from current state | unchanged | unchanged | + `--color-focus` ring |
| Active | `--color-acid-dim` | 2px `--color-acid-dim` | `--color-ink-inverse` | 10.4 |
| Disabled | `--color-surface-raised` | 2px `--color-line-soft` | `--color-line` | 3.7 (exempt) |

**Variant: `secondary`** — outlined.

| State | Fill | Border | Text | Ratio |
|---|---|---|---|---|
| Default | transparent | 2px `--color-line` | `--color-ink` | 16.2 |
| Hover | `--color-acid-wash` | 2px `--color-acid` | `--color-acid` | 14.3 |
| Active | `--color-acid-deep` | 2px `--color-acid` | `--color-acid` | 7.9 |
| Disabled | transparent | 2px `--color-line-soft` | `--color-line` | 3.9 (exempt) |

**Variant: `ghost`** — text with a rule.

| State | Fill | Border | Text | Underline |
|---|---|---|---|---|
| Default | transparent | 2px transparent | `--color-ink-muted` (6.1) | 1px `--color-line`, offset 4px |
| Hover | transparent | 2px transparent | `--color-acid` (16.7) | 1px `--color-acid` |
| Active | transparent | 2px transparent | `--color-acid-dim` (10.4) | 1px `--color-acid-dim` |
| Disabled | transparent | 2px transparent | `--color-line` (3.9, exempt) | none |

**Variant: `danger`** — used only for `RESET PROGRESS` in the footer. No second hue; it inverts.

| State | Fill | Border | Text | Ratio |
|---|---|---|---|---|
| Default | transparent | 2px `--color-ink` | `--color-ink` | 16.2 |
| Hover | `--color-ink` | 2px `--color-ink` | `--color-ink-inverse` | 16.2 |
| Active | `--color-line-strong` | 2px `--color-line-strong` | `--color-ink-inverse` | 7.5 |

`danger` always opens a confirm step. The confirm panel carries a 2px `--color-ink` border and a 6px hazard
hatch bar across its top inner edge.

### 7.4 Input

Applies to text inputs, the game console field, and search.

| Property | Value |
|---|---|
| Height | 48px (single-line). Textarea: `min-height: 140px`, padding `12px 14px`, line-height 1.6. |
| Width | 100% of its container by default |
| Fill | `--color-surface-sunken` |
| Border | 1px solid `--color-line` (4.1:1) |
| Radius | 0 |
| Padding | `0 14px` |
| Type | `text-body` — 17px / 1.65 / 400, mono |
| Text colour | `--color-ink` (16.9:1) |
| Placeholder | `--color-ink-muted` (6.3:1) |
| Caret | `caret-color: var(--color-acid)` |
| Transition | `border-color 80ms linear` |

Surrounding parts:

- **Label** — `text-label`, `--color-ink-muted`, 8px above the field. Always present, never a placeholder
  substitute.
- **Help text** — `text-sm`, `--color-ink-muted`, 8px below.
- **Error message** — `text-sm`, `--color-ink`, 8px below, prefixed with `!! `. The label gains a
  trailing `*`.

| State | Change |
|---|---|
| Hover | Border → `--color-line-strong` (7.5:1) |
| Focus-visible | Border → 1px `--color-acid`; plus `outline: 2px solid var(--color-focus); outline-offset: 2px` |
| Filled | No visual change. Do not float the label. |
| Error | Border → 2px `--color-ink`; error message shown; `aria-invalid="true"`; `aria-describedby` points at the message |
| Disabled | Fill `--color-surface-raised`; text `--color-line` (3.7, exempt); border 1px `--color-line-soft`; `cursor: not-allowed` |

**`input--prompt` variant** (game console, search): a non-focusable, `aria-hidden` `>` in `--color-acid`
sits at 14px from the left edge, and the field's text padding-left becomes 34px. Nothing else changes.

### 7.5 Quiz question

The centrepiece. Used by the placement quiz and by end-of-lesson exercises.

**Container**

| Property | Value |
|---|---|
| Max width | 720px, centred |
| Fill | `--color-surface` |
| Border | 1px solid `--color-line` |
| Padding | 24px; 32px at `md` |

**Top strip** — 40px tall, flush to the container's inner edges (negative margin `-24px -24px 0`, or
`-32px -32px 0` at `md`), `border-bottom: 1px solid var(--color-line-soft)`, padding-x matching the
container.

- Left: `Q03 / 10` in `text-micro`, `--color-ink-muted` (6.1:1).
- Right: track chip (`CORE` or `SLANG`).

**Progress segments** — directly beneath the top strip, flush to the container's inner edges, then 24px
before the stem.

- A row of N segments (N = question count), each `flex: 1`, height 12px, 2px gap, radius 0. The 2px gaps
  show `--color-surface`, so no two segments ever touch — each is judged against the page ground, not
  against its neighbour.
- Unfilled: `--color-line` `#6B7078` (3.9:1 against the page).
- Filled: `--color-acid` (16.7:1 against the page, 4.2:1 against unfilled).
- Current: `--color-ink` **and 18px tall** instead of 12px, growing upward from a shared baseline
  (16.2:1 against the page, 4.1:1 against unfilled). The height change is load-bearing:
  `--color-ink` against `--color-acid` is only **1.0:1**, so filled and current are *not* distinguishable
  by colour. Shape carries that distinction. Do not "simplify" the current segment back to 12px.
- Colour transition 160ms linear. **Never animate width or height.**
- Accompanied by a visually-hidden `Question 3 of 10` and `role="progressbar"` with
  `aria-valuenow` / `aria-valuemin` / `aria-valuemax`.

**Stem**

- `text-h2` — 24px / 1.25 / 700, `--color-ink` (16.2:1). At 24px this is large text, but it clears normal-text
  AA anyway.
- Terms inside the stem are wrapped in an inline code chip: fill `--color-acid-wash`, 1px
  `--color-acid-deep` border, `--color-acid` text (14.3:1), padding `2px 6px`, radius 0. The chip border is
  inline text decoration, not a control boundary, so its 2.1:1 against the page is acceptable.
- 24px below the progress row. 24px above the options.

**Options**

A vertically stacked list with collapsed borders. **Every option carries a 2px border in every state** and
`margin-top: -2px` so adjacent edges share the same two pixels. Border *width* never changes — only border
*colour* changes. This is deliberate: if idle were 1px and selected were 2px, choosing an option would grow
the element by 2px and shove every option below it down the page mid-interaction.

Each option is `position: relative` so the active one can paint its border over its neighbours':

| Situation | `z-index` |
|---|---|
| Idle, inert | `0` |
| Hover | `1` |
| Focus-visible | `3` |
| Selected, correct, wrong, missed answer | `2` |

Focus outranks everything so the ring is never clipped by a neighbour.

| Property | Value |
|---|---|
| Min height | 60px |
| Width | 100% |
| Layout | `display: grid; grid-template-columns: 44px 1fr; align-items: stretch; text-align: left` |
| Fill | `--color-surface-raised` |
| Border | 2px solid, colour per state table. Never any other width. |
| Radius | 0 |
| Position | `relative`, `z-index` per the table above |
| Transition | `background-color 160ms linear, color 160ms linear, border-color 80ms linear` |

- **Key cell** (column 1): 44px wide. The grid is `align-items: stretch`, so **the key cell fills the full
  row height and its `border-right: 1px solid var(--color-line)` runs the full row height, edge to edge** —
  it is a full-height column rule, not a 44px stub. The glyph inside is centred with
  `display: flex; align-items: center; justify-content: center`. Letter `A`/`B`/`C`/`D` in `text-label`,
  `--color-ink-muted` (5.7:1). This doubles as the keyboard shortcut hint — pressing `A`–`D` selects.
- **Text cell** (column 2): `text-body` — 17px / 1.65, `--color-ink` (15.3:1), padding `14px 16px`.
  Set `align-self: center` so short text sits centred in a tall row.
- **Result label** (column 2, right-aligned, post-submit only): `text-micro`.

Option states. Rows 1, 2, 4–8 are mutually exclusive fills. **Row 3 is a modifier that composes with any
of them** — an option can be focused while correct, wrong, selected, or idle.

| # | State | Fill | Border (2px) | Text | Key cell | Right label |
|---|---|---|---|---|---|---|
| 1 | Idle | `--color-surface-raised` | `--color-line` | `--color-ink` 15.3 | `--color-ink-muted` 5.7 | — |
| 2 | Hover (pre-submit) | `--color-surface-hover` | `--color-line-strong` | `--color-ink` 13.9 | `--color-acid` 14.2 | — |
| 3 | Focus-visible *(modifier)* | unchanged | unchanged | unchanged | unchanged | see the focus rule below |
| 4 | Selected (pre-submit) | `--color-acid-deep` | `--color-acid` | `--color-ink` 7.7 | `--color-acid` fill, `--color-ink-inverse` glyph, 16.7 | — |
| 5 | Correct | `--color-acid` | `--color-acid` | `--color-ink-inverse` 16.7 | `--color-surface` fill, `[OK]` in `--color-acid`, 16.7 | `CORRECT` in `--color-ink-inverse` |
| 6 | Wrong (the one picked) | `--color-ink` | `--color-ink` | `--color-ink-inverse` 16.2 | `--color-surface` fill, `[X]` in `--color-ink`, 16.2 | `WRONG` in `--color-ink-inverse` |
| 7 | Missed answer | `--color-surface` | `--color-acid` | `--color-acid` 16.7 | `>` in `--color-acid` | `ANSWER` in `--color-acid` |
| 8 | Inert (unpicked, post-submit) | `--color-surface` | `--color-line-soft` | `--color-ink-muted` 6.1 | `--color-ink-muted` 6.1 | — |

**Focus ring on a quiz option — read this carefully.**

The ring is drawn *inside* the option (`outline: 2px solid; outline-offset: -4px`) because the options form
a collapsed stack and an outward ring would be painted over by the neighbour below.

The offset is `-4px`, not `-2px`. At `-2px` the outline lands exactly on top of the option's own 2px border
and replaces it visually, so a focused option in state 4, 5, 6 or 7 would lose the acid or ink border that
tells the user what the option *is*. At `-4px` the ring sits just inside the border and both are legible —
border says "this is correct / wrong / selected", ring says "this is where your keyboard is".

An inset ring therefore sits **on the option's own fill**, and states 5 and 6 have light fills. A `#E8EAED`
ring on the `#E8EAED` wrong-answer fill is 1.0:1 — invisible. These options remain keyboard-reachable after
submit, so this is a real defect, not a theoretical one.

**The ring colour is therefore chosen by the lightness of the fill it is drawn on:**

| Option state | Fill | Ring colour | Ratio |
|---|---|---|---|
| 1 Idle | `--color-surface-raised` | `--color-focus` `#E8EAED` | 15.3 |
| 2 Hover | `--color-surface-hover` | `--color-focus` | 13.9 |
| 4 Selected | `--color-acid-deep` | `--color-focus` | 7.7 |
| 5 **Correct** | `--color-acid` | **`--color-ink-inverse` `#0B0C0E`** | **16.7** |
| 6 **Wrong** | `--color-ink` | **`--color-ink-inverse` `#0B0C0E`** | **16.2** |
| 7 Missed answer | `--color-surface` | `--color-focus` | 16.2 |
| 8 Inert | `--color-surface` | `--color-focus` | 16.2 |

No new colour token and no new hue: the dark ring reuses `--color-ink-inverse`, and both flipped pairs are
already measured in §2.5. Implement as a single rule plus two overrides keyed off the state class — do not
compute it at runtime.

The same principle governs the whole system: **the focus ring is `--color-focus` when it lands on a dark
surface and `--color-ink-inverse` when it lands on a light fill (`--color-acid` or `--color-ink`).** For
buttons and cards the ring is offset *outward* onto the page ground, which is always dark, so those always
use `--color-focus` — only inset rings ever flip.

State 6 additionally carries the hazard bar: a 6px-tall, full-width element flush to the option's bottom
inner edge, painted `repeating-linear-gradient(45deg, var(--color-surface) 0 3px, transparent 3px 6px)`
over the `--color-ink` fill (16.2:1 stripe contrast). It also shakes once (§8).

Every post-submit state carries a word (`CORRECT` / `WRONG` / `ANSWER`) and an ASCII glyph, so none of them
depends on colour. Post-submit, all options get `aria-disabled="true"` and `pointer-events: none`; the
picked option gets `aria-live="polite"` announcement text.

**Use `aria-disabled`, not the `disabled` attribute.** `disabled` removes the element from the tab order;
`aria-disabled` does not. Keeping the answered options focusable lets a keyboard or screen-reader user walk
back over the results and read what they picked against what was correct — which is the entire point of
showing the resolved state. It is also exactly why the focus-ring flip above is required rather than
cosmetic: a focused option in state 5 or 6 is a real thing a real user reaches.

**Explanation panel** — revealed after submit, 24px below the options.

| Property | Value |
|---|---|
| Fill | `--color-surface-sunken` |
| Border | 1px `--color-line`, plus `border-left: 4px solid var(--color-acid)` |
| Padding | 20px |
| Heading | `WHY` in `text-label`, `--color-acid` (17.3:1), 12px below |
| Body | `text-body`, `--color-ink` (16.9:1), max 64ch |
| Link | ghost button, `LEARN MORE →`, points at the term page |

**Footer row** — 24px below the explanation (or the options, pre-submit).

- Left: ghost button `SKIP`.
- Right: primary `md` button, label `CHECK`, becoming `NEXT →` after submit.
- Below `sm`: stack vertically, primary first and full width, `SKIP` beneath.
- Beneath both, 16px down: keyboard hint row in `text-micro`, `--color-ink-muted` (6.1:1) —
  `[A–D] SELECT   [ENTER] SUBMIT   [ESC] EXIT`.

One question per screen. At a 900px viewport a four-option question must fit without scrolling.

### 7.6 Link

Three variants. Every variant is `border-radius: 0`, has no background on rest, and transitions
`color, text-decoration-color 80ms linear`. Focus on all three is the standard outward ring:
`outline: 2px solid var(--color-focus); outline-offset: 2px` (dark ground, so never flips — §2.6).

**`link` — the default. Any link sitting inside a run of prose.**

| State | Colour | Underline | Background | Ratio |
|---|---|---|---|---|
| Default | `--color-acid` | 1px solid `--color-acid`, `text-underline-offset: 3px`, `text-decoration-thickness: 1px` | none | 16.7 |
| Hover | `--color-acid` | `text-decoration-thickness: 2px` | `--color-acid-wash`, with 2px horizontal bleed via `padding: 0 2px; margin: 0 -2px` | 14.3 |
| Focus-visible | unchanged | unchanged | unchanged | + `--color-focus` ring |
| Active | `--color-acid-dim` | 2px `--color-acid-dim` | `--color-acid-wash` | 9.0 on wash |
| Visited | `--color-acid-dim` | 1px `--color-acid-dim` | none | 10.4 |

The resting underline is **not optional** on this variant. Inside prose, colour alone must not be the only
thing distinguishing a link (WCAG 1.4.1), and acid-vs-ink is a colour difference.

**`link--list` — a link that is its own list item, where every sibling is also a link.**

Used by: the homepage term lists (§9.2 step 3), the rail's `REQUIRES` / `UNLOCKS` lists (§9.3), the mobile
nav panel, the prev/next bar.

| State | Colour | Underline | Ratio |
|---|---|---|---|
| Default | `--color-ink` | none | 16.2 |
| Hover | `--color-acid` | 1px `--color-acid` | 16.7 |
| Focus-visible | `--color-acid` | 1px `--color-acid` | + ring |
| Visited | `--color-ink` (unchanged) | none | 16.2 |
| Locked | `--color-ink-muted`, locked hatch on the row, trailing `[LOCKED]`, `aria-disabled` | none | 6.1 |

No resting underline here, and that is deliberate rather than sloppy: 1.4.1 governs links embedded *in
text*. In a list where every row is a link, linkness is carried by structure, and 18 underlined acid rows
would be unreadable. Rows still gain an underline plus an acid colour shift on hover and focus, so the
affordance is never colour-only at the moment of interaction. Visited is intentionally not distinguished
in this variant — these lists show completion state via the `status-done` chip and the acid left bar
instead, which is more accurate than "you clicked this once".

**`link--quiet` — footer and metadata links.**

| State | Colour | Underline | Ratio |
|---|---|---|---|
| Default | `--color-ink-muted` | none | 6.1 |
| Hover | `--color-ink` | 1px `--color-ink` | 16.2 |
| Focus-visible | `--color-ink` | 1px `--color-ink` | + ring |
| Visited | `--color-ink-muted` (unchanged) | none | 6.1 |

Keeps the footer from becoming a wall of acid. Acid stays rationed.

**Inline code-chip links** (a term reference inside prose, §9.3 step 7) use the chip fill from §7.5 with
`link` behaviour: `--color-acid` text on `--color-acid-wash` (14.3:1), no resting underline — the chip's
border and fill already mark it as a distinct object — gaining a 1px `--color-acid` underline on hover and
focus. Visited chips take `--color-acid-dim` text (9.0:1 on wash).

**External links** get a trailing `↗` at `text-micro` in the link's current colour, plus
`rel="noopener noreferrer"`. There are very few of these; sources live in `docs/GLOSSARY.md`.

This section introduces exactly one pair not already in §2.5 — `--color-acid-dim` on `--color-acid-wash`,
estimated **9.0:1**, used for the active state of a prose link and for a visited inline code chip. It is
added to the §2.5 table. Every other ratio above already appears there.

---

## 8. Motion

Motion here is mechanical. It moves like a relay closing, not like a spring settling. Nothing overshoots,
nothing bounces, nothing scales, nothing rotates, nothing blurs, nothing parallaxes, nothing fades in on
scroll.

### Tokens

Easings go in `@theme` as `--ease-*` and become `ease-*` utilities. Durations use Tailwind's built-in
numeric `duration-<ms>` utilities — there is no `--duration-*` theme namespace in v4, so do not invent one.

| Token | Value | Use |
|---|---|---|
| `--ease-hard` | `cubic-bezier(0.2, 0, 0.2, 1)` | **Every** wipe and one-shot reveal, without exception. |
| `linear` | — | Everything else. Colour, border, opacity. |
| duration `80` | 80ms | Hover and focus colour/border swaps. |
| duration `160` | 160ms | Committed state changes. Progress segment fill. |
| duration `240` | 240ms | One-shot judder. The explanation wipe. |
| duration `300` | 300ms | The unlock wipe. |

These four durations are the complete set. **No animation in this system uses a duration that is not on
this list** — if a value like 200ms appears in a PR, it is a mistake, not a nuance. Never
`transition: all`; always enumerate properties.

### What animates

| Thing | Property | Duration | Easing | Notes |
|---|---|---|---|---|
| Hover / focus on buttons, cards, options, inputs, links, graph nodes | `background-color`, `border-color`, `color`, `text-decoration-color` | 80ms | `linear` | The only universal transition. |
| Quiz option resolving on submit | `background-color`, `color` | 160ms | `linear` | No transform. |
| Progress segment filling | `background-color` | 160ms | `linear` | Width is never animated. |
| Explanation panel reveal | `clip-path` `inset(0 0 100% 0)` → `inset(0 0 0 0)` | 240ms | `--ease-hard` | A hard wipe down. No fade, no slide. |
| Wrong answer | `transform: translateX` — 0, −6px, 6px, −4px, 4px, 0 | 240ms | `linear` | Runs once. Max displacement 6px. No rotation. |
| Lesson unlock (locked → unlocked) | Hatch overlay `clip-path` wipes left→right, then border colour swaps | 300ms | `--ease-hard` | Fires only on the unlock event. Never on page load. |
| Caret block (wordmark, hero, prompt inputs) | `opacity` 1 → 0 | 1000ms | `steps(2, start)` | Infinite. The only infinite animation permitted, alongside the ticker. |
| Homepage ticker | `transform: translateX(0)` → `translateX(-50%)` | 40s per lap | `linear` | `animation-play-state: paused` on hover and on focus-within. `aria-hidden="true"`; the same terms exist as real links elsewhere on the page. |
| Graph force settle | simulation | ≤1200ms then frozen | — | Does not re-run on hover, filter, or selection. |

### What does not animate

Page transitions (navigation is instant), scroll-triggered anything, card lift or scale on hover, number
count-ups, skeleton shimmer, typewriter text, progress bar width, modal entrance beyond a 160ms opacity step.

Game-internal motion is exempt from the 240ms cap because gameplay requires it, but it obeys the
reduced-motion rules below.

### `prefers-reduced-motion: reduce`

Global rule in `@layer base`:

```
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
    scroll-behavior: auto !important;
  }
}
```

Then these specific substitutions, which the global rule cannot express:

| Normally | Under reduced motion |
|---|---|
| Ticker scrolls | Does not translate at all. Renders as a static single row, `overflow: hidden`, animation removed (not just shortened). |
| Caret blinks | Renders solid, permanently visible. |
| Wrong answer shakes | The shake is simply removed. **No substitute is added, and none is needed** — state 6 already carries four non-motion signals: the full fill inversion to `--color-ink`, the 2px `--color-ink` border, the `[X]` glyph, the word `WRONG`, and the 6px hazard bar. The shake was always redundant emphasis, never the signal. Do not compensate by thickening the border: option borders are a constant 2px so the stack cannot shift (§7.5), and the hazard bar is capped at 6px by §6. |
| Explanation wipes in | Appears instantly, fully drawn. |
| Unlock hatch wipes out | Hatch is removed instantly. |
| Games use particles, trails, screen shake | All removed. Timed mechanics keep running; decorative motion does not. |

**Nothing that carries meaning may depend on motion.** Every animated state above is also expressed by a
colour token, a border, a glyph, and a word.

---

## 9. Layout

### 9.1 Global frame

- **Header** — 64px, full-bleed, `border-bottom: 1px solid var(--color-line)`, sticky, `z-index: 20`,
  fill `--color-surface` (opaque — no blur, no transparency).
  - Left: the wordmark (§3.4).
  - Right: nav in `text-label`, `--color-ink-muted`, 24px apart — `LESSONS`, `GRAPH`, `GAMES`.
    Current route: `--color-acid` plus a 2px `--color-acid` underline flush to the header's bottom border.
    Hover: `--color-ink`.
  - Far right: `PROGRESS 04/18` in `text-micro`, `--color-ink-muted`, with the numerals in `--color-acid`.
  - Below `md`: nav collapses to a `MENU` ghost button opening a full-screen panel — `--color-surface` fill,
    items at `text-h1`, one per line, separated by 1px `--color-line-soft` rules. No slide animation; it
    appears.
- **Content column** — max 1200px, centred, gutters per §4. At `lg` and up, a 1px `--color-line-soft`
  vertical rule runs the full page height at each edge of the content column. This is the frame. It is
  decorative and marked `aria-hidden`.
- **Footer** — `border-top: 1px solid var(--color-line)`, 64px padding-y, three columns at `md`
  (single column below).
  - Column 1: wordmark + one line at `text-sm`, `--color-ink-muted`.
  - Column 2: link list at `text-sm`.
  - Column 3: `RESET PROGRESS` danger button, and the line
    `PROGRESS LIVES IN LOCALSTORAGE. NOTHING LEAVES YOUR BROWSER.` in `text-micro`, `--color-ink-muted`.
    That line is true and worth saying.

### 9.2 Homepage

In the order the eye hits it: the headline's single acid word, then the acid ticker band, then the primary
button. Everything else recedes into `--color-ink-muted` at `text-sm`.

1. **Hero slab.** Full-bleed, `min-height: 68vh` capped at 720px, fill `--color-surface`,
   `border-bottom: 1px solid var(--color-line)`. Content is hard-left against the gutter — not centred.
   - Eyebrow: `text-micro`, `--color-acid` — `PLACEMENT QUIZ · 18 TERMS · 3 GAMES`.
   - H1: `text-d1`, Archivo Black, `--color-ink`, left-aligned, three short lines with manual breaks.
     Exactly **one** word in the headline is `--color-acid` — the most important noun, nothing else. The
     final line ends with the blinking acid caret block.
   - Sub: `text-lede`, `--color-ink-muted`, max 52ch, 24px below.
   - Actions: 32px below. Primary `lg` `TAKE THE PLACEMENT QUIZ` + secondary `lg` `BROWSE ALL TERMS`,
     16px gap, stacking full-width below `sm`.
   - **No image. No mockup. No illustration. No device. The type is the hero.**
2. **Ticker strip.** Full-bleed, 44px tall, fill `--color-acid`, text `--color-ink-inverse` (16.7:1),
   `text-label`, all 18 terms separated by ` /// `, slang terms quoted. Scrolls left, 40s per lap, pauses on
   hover. This is the single loudest band on the site; nothing else gets a full-bleed acid fill.
3. **Two-track split.** A 2-column gapless lattice, stacking below `md`. Each cell padded 32px.
   - Left cell `CORE`: transparent header bar with `CORE` in `--color-acid` and a 1px `--color-line-soft`
     bottom rule; a 3px `--color-acid` bar on the cell's left inner edge.
   - Right cell `SLANG`: solid `--color-acid` header bar with `SLANG` in `--color-ink-inverse`.
   - Each cell: `text-d3` heading (paired with `font-display`, §3.3), one line of `text-sm`
     `--color-ink-muted` description, then the term names one per line at `text-body`, each a
     `link--list` (§7.6). Locked terms show the locked hatch on their row and a trailing `[LOCKED]`.
4. **How it works.** 3-cell gapless lattice, stacking below `md`, each cell 32px padded, 200px min height.
   Each cell: a numeral `01` / `02` / `03` at `text-d3` with `font-display` in `--color-line-strong`
   (recedes deliberately), then a `text-label` `--color-ink` title, then two lines of `text-sm`
   `--color-ink-muted`.
   **Content: `<STEP_TITLE>` and `<STEP_BODY>` ×3 — copy, not design.** The numerals are fixed at three
   because the lattice is three cells. Design owns the budget the copy has to fit: title **≤ 18 characters**
   uppercase on one line, body **≤ 90 characters** across two lines at `text-sm`. Anything longer breaks the
   200px cell.
5. **Games band.** 3-cell gapless lattice. Each cell: game name at `text-d3` with `font-display`,
   `--color-ink`; one line of rule-of-play at `text-sm` `--color-ink-muted`; a `PLAY →` ghost link pinned
   bottom-left. Hover fills the cell with `--color-acid-wash` and turns the game name `--color-acid`.
   **No screenshots.**
6. **Graph teaser.** Full-bleed band, fill `--color-surface-sunken`, 96px padding-y. A static,
   non-interactive rendering of the term lattice drawn in inline SVG by engineering — 1px `--color-line`
   orthogonal edges, hard-edged square nodes, no labels at this size, no external asset. Centred beneath it:
   secondary `lg` button `OPEN THE GRAPH`.
7. Footer.

### 9.3 Lesson page

Two columns at `lg` and up: content `1fr` (prose capped at 64ch) and a 300px rail, separated by a 1px
`--color-line-soft` vertical rule with a 48px gutter each side. Single column below `lg`, with the rail's
contents moved to the bottom above the prev/next bar.

Top to bottom in the content column:

1. **Breadcrumb** — `text-micro`, `--color-ink-muted`, separators `/` in `--color-line-strong`.
   `LESSONS / CORE / TOKENS`.
2. **Chip row** — track chip + status chip, 16px below.
3. **Title** — `text-d2`, Archivo Black, `--color-ink`, 16px below. Slang titles quoted.
4. **One-line definition** — `text-lede`, `--color-acid`, max 52ch (the lede measure, §4), 16px below.
   This is the memorable line and **the only acid prose on the page**. Everything else that is acid is a
   chip, a rule, or a control.
5. **TL;DR block** — 40px below. Fill `--color-surface-sunken`, 1px `--color-line`,
   `border-left: 4px solid var(--color-acid)`, 20px padding. Label `TL;DR` in `text-label` `--color-acid`,
   then three bullets at `text-sm` `--color-ink`. Bullet marker is a 6px `--color-acid` square, not a disc.
6. **Body sections** — each `h2` at `text-h2` `--color-ink` with a full-measure 1px `--color-line-soft` rule
   above it and 40px top margin. Prose at `text-body`, 64ch, `--color-ink`, 16px between paragraphs.
7. **Inline term references** — the code chip style from §7.5. Linked. Visited chips take
   `--color-acid-dim` text.
8. **Code / prompt blocks** — fill `--color-surface-sunken`, 1px `--color-line`, `text-code`, 16px padding.
   A **40px** top bar with a 1px `--color-line-soft` bottom rule carries a `text-micro` label on the left
   (`PROMPT`, `RESPONSE`, `JSON`) and a `COPY` ghost `sm` button (36px, §7.3) on the right, vertically
   centred with 2px of clearance above and below. The bar is 40px, not 28px, precisely so the smallest
   button in the system fits inside it — 40px also matches the quiz top strip and the game console bars,
   so every chrome bar on the site is one height. Horizontal scroll, never wrap.
9. **Say-this / not-this pair** — 2-cell gapless lattice.
   - Left: `SAY THIS` in `text-label` `--color-acid`, 3px `--color-acid` left bar.
   - Right: `NOT THIS` in `text-label` `--color-ink`, 3px `--color-ink` left bar, and a 6px hazard-hatch bar
     across the cell's top inner edge.
   Same one-accent logic as the quiz: acid means right, inverted white means wrong.
10. **Exercise block** — one to three quiz questions using the §7.5 component verbatim, preceded by a
    `text-h2` heading `PROVE IT`.

Rail (at `lg`+), sticky at `top: 96px`:

- `REQUIRES` — `text-label` `--color-ink-muted`, then linked prereq terms one per line at `text-sm`.
  Completed ones carry a `[OK]` glyph in `--color-acid`.
- `UNLOCKS` — same treatment, listing what this term opens.
- A mini progress readout: `04/18` at `text-h1`, numerator in `--color-acid`, denominator in
  `--color-line-strong`.
- Pinned to the rail's bottom: primary `md` button `NEXT: <TERM> →`.

Bottom of page: full-bleed 2-cell gapless prev/next bar, each cell 96px tall.
Left `← PREV` / term name; right `NEXT →` / term name, right-aligned. `text-label` for the direction word,
`text-h3` for the term. Hover fills the cell `--color-acid-wash` and turns both lines `--color-acid`.

### 9.4 Quiz page (placement)

A focused mode. The global nav is a distraction here and gets removed.

- **Header collapses**: wordmark on the left, the segmented progress bar centred (max 320px), and an `EXIT`
  ghost `sm` button on the right. No nav links, no progress readout.
- **Body**: single centred column, max 720px, 96px top offset, 96px bottom padding. No rail, no sidebar,
  no footer.
- Above the question block: `PLACEMENT` in `text-micro` `--color-acid`, 8px above the block.
- The question block exactly as specified in §7.5. One question per screen.
- No back button between questions — placement is a single forward pass. `SKIP` is the escape hatch.

**Results screen**, in the order the eye hits it:

1. **Headline** — `text-d2`, Archivo Black, `--color-ink`: `YOU'RE HERE.`
2. **Score** — the numeral at `text-d1` in `--color-acid`, immediately followed by `/ 10` at `text-d1` in
   `--color-line-strong`. One line, hard-left.
3. **Level slab** — full-bleed band, 88px tall, fill `--color-acid`, text `--color-ink-inverse` (16.7:1) at
   24px / 700 / `+0.12em` / uppercase, centred. This is the second full-bleed acid moment on the site and
   the only one outside the homepage ticker.
   **Content: `<PLACEMENT_BAND_LABEL>` — supplied by `head-of-curriculum`.** Placement outcomes and their
   names are quiz structure, not visual design, so this spec does not name them. What design does own is
   the container, and the constraint Curriculum needs in order to write them: **one line, uppercase,
   maximum 22 characters** including spaces, or the label wraps out of an 88px band at the `sm` breakpoint.
   However many bands Curriculum defines, they all use this identical treatment — the band never changes
   colour, height, or type by outcome. A "good" result and a "bad" result look the same here on purpose;
   the number above it is the message.
4. **The map** — a gapless lattice of all 18 terms, 3 columns at `md`, 2 at `sm`, 1 below. Each cell 64px
   tall: term name at `text-sm`, track marker, and either an unlocked border + acid marker or the locked
   hatch. The user should see their whole territory in one glance.
5. **Actions** — primary `lg` `START WITH <TERM>` + secondary `lg` `SEE THE GRAPH`.

### 9.5 Graph page

- Full-viewport-height canvas below the header. Fill `--color-surface`.
- **Nodes** are hard-edged rectangles, never circles. Height 32px, width sized to the label plus 12px
  padding-x, 1px `--color-line` border, `text-micro` label.
  - Core: `--color-surface-raised` fill, `--color-ink` label (15.3:1).
  - Slang: `--color-acid` fill, `--color-ink-inverse` label (16.7:1), name in quotes.
  - Locked: `--color-surface` fill, locked hatch, `--color-ink-muted` label (6.1:1), `[LOCKED]` in the
    accessible name.
  - Completed: 3px `--color-acid` bar on the node's left edge.
- **Edges** are 1px `--color-line` straight orthogonal polylines — horizontal and vertical segments with
  square corners. No curves, no beziers, no arrowheads other than a 6px solid triangle at the target.
- **Hover / focus on a node**: node border → 2px `--color-acid`; connected edges → `--color-acid`;
  all unconnected nodes' labels → `--color-ink-muted`. 80ms linear.
- **Selecting a node** opens a right-hand panel, 360px wide at `lg`+ (full-width sheet below), using the
  Card spec, with a primary `md` `OPEN LESSON →`.
- The graph is keyboard-navigable: arrow keys move between connected nodes, `Enter` opens. A visually
  parallel `<ul>` of the same relationships is always rendered for screen readers.

### 9.6 Games

Each game sits in a console frame.

- **Viewport**: 2px `--color-ink` border, fill `--color-surface-sunken`, radius 0, max width 960px.
- **Top bar**: 40px, `border-bottom: 1px solid var(--color-line)`, game name at `text-label`
  `--color-ink` on the left, `SCORE 0000` at `text-micro` on the right with the numerals in `--color-acid`.
  `text-label` here is deliberate and is not a conflict with `text-d3`: this is a chrome strip identifying
  the running game, not the game's title. The `text-d3` title appears above the console frame and in the
  start overlay.
- **Bottom bar**: 40px, `border-top: 1px solid var(--color-line)`, keyboard hints at `text-micro`
  `--color-ink-muted`.
- **Overlays** (start, pause, game over): fill `--color-surface` at full opacity — no blur, no translucency.
  Centred `text-d3` display headline, one line of `text-sm`, one primary `md` button.
- Games never introduce a colour outside the sixteen tokens. Win/lose feedback uses the same
  acid-fill / ink-inversion pair as the quiz.

---

## 10. Assets

Zero dollars. Every asset is a local file in `public/` or an inline SVG written by engineering. No stock
photography, no icon library, no image CDN, no external host, no remote pattern in `next.config.ts`.

There is no photography and no illustration in this design. The only two raster assets v1 needs:

**`public/og.png` — 1200 × 630.** Composition, to be built as an SVG and exported, or made by Mohammad in
any tool he already has:
- Ground `#0B0C0E`, full bleed.
- A 1px `#6B7078` rectangle inset 48px on all sides.
- Top-left, 88px from the frame: `3alemny` at 44px JetBrains Mono 700, `#E8EAED`, followed by a
  24 × 46px `#CCFF00` block.
- Centre-left, hard against the 88px left margin: three lines of Archivo Black at 96px / 0.92 line height,
  `#E8EAED`, with exactly one word in `#CCFF00`.
- Bottom-left: `PLACEMENT QUIZ · 18 TERMS · 3 GAMES` at 22px JetBrains Mono 700, `+0.16em`, uppercase,
  `#8A9099`.
- Bottom-right: a 44px-tall `#CCFF00` bar, 320px wide, with `START` in `#0B0C0E`.
- No logo lockup, no gradient, no photo, no device.

**`public/icon.svg` — 32 × 32.** `#0B0C0E` square, a `#CCFF00` square 18 × 18 positioned at x=4 y=7,
and a 4 × 18 `#E8EAED` bar at x=24 y=7. Zero radius. That is the caret mark. Export 180 × 180 to
`public/apple-icon.png`.

### Optional texture prompts

Not required for v1. If Mohammad wants a texture asset for the graph-teaser band or the results screen, run
these in whatever image tool he chooses and save the output to `public/`. Do not add an image service to the
project to produce them.

1. `High-contrast monochrome photocopy texture, pure black background, hairline white toner speckle and
   horizontal scanline drift, no subject matter, no gradient, no colour, flat, seamless tile, 1024x1024.`
2. `Extreme macro of a CRT phosphor grid, dead pixels, black background with faint grey-green scanlines,
   no bloom, no glow, no colour saturation, flat and hard-edged, 1600x900.`

Both are optional decoration. Neither may carry information, and both must sit under a solid
`--color-surface` layer at no more than 8% opacity so no contrast pair in §2.5 is affected.

---

## 11. Accessibility rules that are not negotiable

- Every text/background pair in §2.5 clears AA. Measure before merge.
- No state is signalled by colour alone. Every state carries a word or an ASCII glyph.
- Focus is always visible, on every fill: `2px solid` at `+2px` offset normally; inset inside
  collapsed-border stacks, at `-2px` for lattice cards (1px border) and `-4px` for quiz options (2px
  border). The ring is `--color-focus` on dark surfaces and `--color-ink-inverse` on light fills
  (`--color-acid`, `--color-ink`) — see §2.6 and the quiz-option focus table in §7.5. A single fixed ring
  colour is **not** acceptable here, because an inset `#E8EAED` ring on the `#E8EAED` wrong-answer fill is
  1.0:1. Never `outline: none` without a replacement of equal or greater visibility.
- Target size: interactive targets are at least 44 × 44px, or 24 × 24px with 24px of clear spacing.
  The quiz key cell is exactly 44px for this reason.
- `opacity` is never used to express a disabled or inactive state.
- Every `text-micro` string has a longer accessible equivalent somewhere in the DOM.
- The ticker is `aria-hidden`; its terms exist as real links in §9.2 step 3.
- The graph has a parallel list-based representation for screen readers and full keyboard navigation.
- `prefers-reduced-motion` is honoured per §8, including the specific substitutions — the global
  duration override alone is not sufficient.
