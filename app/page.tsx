/*
 * The homepage, docs/DESIGN.md §9.2, in the order the spec lists it.
 *
 * Every `<PLACEHOLDER>` below is copy that design does not own and engineering
 * must not invent. They are sized to the character budgets in §9.2 so the
 * layout is tested at realistic lengths, and every one of them is listed in the
 * handover report for Mohammad to fill.
 *
 * No lock state is rendered on the term lists. §9.2 step 3 describes locked
 * rows, but which terms are locked derives from prerequisites in
 * `content/terms/*.json`, which does not exist. Guessing would be inventing
 * content, so every row renders unlocked.
 */
import Link from "next/link";

import { GraphTeaser } from "@/components/GraphTeaser";
import { Ticker } from "@/components/Ticker";
import { ButtonLink } from "@/components/ui/Button";
import { CORE_TERMS, SLANG_TERMS, displayTitle, termHref } from "@/lib/terms";
import type { TermStub } from "@/lib/terms";

/* §4 — section spacing is 64px / 96px at md *between* sections, so it is paid
   once, on the top of each section, not on both edges of every neighbour. */
const SECTION = "mx-auto w-full max-w-[1200px] px-5 pt-16 md:px-8 md:pt-24 xl:px-12";
const LATTICE = "grid grid-cols-1 border-t border-l border-line";
const CELL = "flex flex-col border-r border-b border-line p-8";
const HOVER = "transition-[background-color,border-color,color,text-decoration-color] duration-80 ease-linear";

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <TwoTrackSplit />
      <HowItWorks />
      <GamesBand />
      <GraphBand />
    </>
  );
}

/** §9.2 step 1 — the type is the hero. No image, no mockup, no device. */
function Hero() {
  return (
    <section className="border-b border-line bg-surface">
      <div className="mx-auto flex min-h-[min(68vh,720px)] w-full max-w-[1200px] flex-col justify-center px-5 py-16 md:px-8 md:py-32 xl:px-12">
        <p className="text-micro text-acid">
          PLACEMENT QUIZ · 18 TERMS · 3 GAMES
        </p>

        <h1 className="mt-6 text-d1 text-ink text-balance">
          <span className="block">{"<HEADLINE_1>"}</span>
          <span className="block">{"<HEADLINE_2>"}</span>
          <span className="block">
            <span className="text-acid">{"<ACID_NOUN>"}</span>
            <span
              aria-hidden="true"
              className="ml-1 inline-block h-[0.72em] w-[0.38em] animate-caret bg-acid motion-reduce:animate-none motion-reduce:opacity-100"
            />
          </span>
        </h1>

        <p className="mt-6 max-w-[52ch] text-lede text-ink-muted text-pretty">
          {"<HERO_SUB · ONE SENTENCE · 52 CHARACTERS MAX>"}
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <ButtonLink
            href="/quiz"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
          >
            TAKE THE PLACEMENT QUIZ
          </ButtonLink>
          <ButtonLink
            href="/lessons"
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
          >
            BROWSE ALL TERMS
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

/** §9.2 step 3 — one accent, figure/ground inversion, and a word (§2.7). */
function TwoTrackSplit() {
  return (
    <section aria-label="Core and slang tracks" className={SECTION}>
      <div className={`${LATTICE} md:grid-cols-2`}>
        <div className={`${CELL} relative`}>
          {/* §9.2 step 3 — 3px acid bar on the cell's left inner edge. Absolute
              rather than a border so it cannot shift the cell's content box out
              of alignment with the slang cell beside it. */}
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-[3px] bg-acid"
          />
          <div className="-mx-8 -mt-8 flex h-8 items-center border-b border-line-soft px-8">
            <span className="text-label text-acid">CORE</span>
          </div>
          <h2 className="mt-4 text-d3 text-ink">{"<CORE_HEADING>"}</h2>
          <p className="mt-2 text-sm text-ink-muted">
            {"<CORE_BLURB · ONE LINE · 64 CHARACTERS MAX>"}
          </p>
          <TermList terms={CORE_TERMS} />
        </div>

        <div className={CELL}>
          <div className="-mx-8 -mt-8 flex h-8 items-center bg-acid px-8">
            <span className="text-label text-ink-inverse">SLANG</span>
          </div>
          <h2 className="mt-4 text-d3 text-ink">{"<SLANG_HEADING>"}</h2>
          <p className="mt-2 text-sm text-ink-muted">
            {"<SLANG_BLURB · ONE LINE · 64 CHARACTERS MAX>"}
          </p>
          <TermList terms={SLANG_TERMS} />
        </div>
      </div>
    </section>
  );
}

/** §7.6 `link--list` — no resting underline; linkness is carried by structure. */
function TermList({ terms }: { terms: readonly TermStub[] }) {
  return (
    <ul className="mt-6 flex flex-col">
      {terms.map((term) => (
        <li key={term.slug}>
          <Link
            href={termHref(term)}
            className={`block py-2 text-body text-ink decoration-1 underline-offset-4 hover:text-acid hover:underline focus-visible:text-acid focus-visible:underline ${HOVER}`}
          >
            {displayTitle(term)}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** §9.2 step 4 — the numerals recede, the copy carries it. */
const STEPS = [
  {
    numeral: "01",
    title: "<STEP_TITLE_1>",
    body: "<STEP_BODY_1 · 90 CHARACTERS MAX · TWO LINES AT TEXT-SM · COPY IS CURRICULUM'S>",
  },
  {
    numeral: "02",
    title: "<STEP_TITLE_2>",
    body: "<STEP_BODY_2 · 90 CHARACTERS MAX · TWO LINES AT TEXT-SM · COPY IS CURRICULUM'S>",
  },
  {
    numeral: "03",
    title: "<STEP_TITLE_3>",
    body: "<STEP_BODY_3 · 90 CHARACTERS MAX · TWO LINES AT TEXT-SM · COPY IS CURRICULUM'S>",
  },
] as const;

function HowItWorks() {
  return (
    <section aria-label="How it works" className={SECTION}>
      <ol className={`${LATTICE} md:grid-cols-3`}>
        {STEPS.map((step) => (
          <li key={step.numeral} className={`${CELL} min-h-[200px]`}>
            <span className="text-d3 text-line-strong">{step.numeral}</span>
            <h2 className="mt-4 text-label text-ink">{step.title}</h2>
            <p className="mt-2 text-sm text-ink-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** §9.2 step 5 — no screenshots. */
const GAMES = [
  {
    name: "<GAME_1_NAME>",
    rule: "<GAME_1_RULE · ONE LINE OF RULE-OF-PLAY · 90 CHARACTERS MAX · NOT DESIGN'S>",
  },
  {
    name: "<GAME_2_NAME>",
    rule: "<GAME_2_RULE · ONE LINE OF RULE-OF-PLAY · 90 CHARACTERS MAX · NOT DESIGN'S>",
  },
  {
    name: "<GAME_3_NAME>",
    rule: "<GAME_3_RULE · ONE LINE OF RULE-OF-PLAY · 90 CHARACTERS MAX · NOT DESIGN'S>",
  },
] as const;

function GamesBand() {
  return (
    <section aria-label="Games" className={`${SECTION} pb-16 md:pb-24`}>
      <div className={`${LATTICE} md:grid-cols-3`}>
        {GAMES.map((game) => (
          // One <a> per cell, not a link nested inside a hoverable cell —
          // §7.2's rule, so each cell has exactly one target and one name.
          <Link
            key={game.name}
            href="/games"
            className={`${CELL} group relative min-h-[200px] no-underline hover:bg-acid-wash focus-visible:z-[3] ${HOVER}`}
          >
            <span className="text-d3 text-ink group-hover:text-acid">
              {game.name}
            </span>
            <span className="mt-2 text-sm text-ink-muted">{game.rule}</span>
            <span className="mt-auto pt-6 text-label text-ink-muted underline decoration-line decoration-1 underline-offset-4 group-hover:text-acid group-hover:decoration-acid">
              PLAY →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/** §9.2 step 6 — full-bleed band, 96px padding-y, inline SVG, no asset. */
function GraphBand() {
  return (
    <section aria-label="Term graph" className="bg-surface-sunken py-24">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-8 px-5 md:px-8 xl:px-12">
        <GraphTeaser />
        <ButtonLink href="/graph" variant="secondary" size="lg">
          OPEN THE GRAPH
        </ButtonLink>
      </div>
    </section>
  );
}
