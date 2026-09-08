import type { Track } from "@/content/schema";

/**
 * TEMPORARY STRUCTURAL STAND-IN.
 *
 * `content/terms/*.json` does not exist yet. Until it does, the homepage needs
 * the eighteen v1 term *names* to render its lists, its ticker and its links —
 * nothing more.
 *
 * The names and tracks below are copied from the "v1 scope" section of
 * CLAUDE.md. They are scope, not content. Nothing else belongs in this file:
 * no definitions, no descriptions, no prerequisites, no lesson copy, no lock
 * state. All of that lives in `content/terms/*.json` and is owned by Research
 * and Curriculum.
 *
 * Delete this module the moment the real content lands and read `Term` from
 * `content/schema.ts` instead.
 */
export interface TermStub {
  /** URL-safe id. Will match `content/terms/<slug>.json`. */
  readonly slug: string;
  readonly title: string;
  readonly track: Track;
}

export const TERMS: readonly TermStub[] = [
  { slug: "tokens", title: "tokens", track: "core" },
  { slug: "apis", title: "APIs", track: "core" },
  { slug: "agents", title: "agents", track: "core" },
  { slug: "mcp", title: "MCP", track: "core" },
  { slug: "n8n", title: "n8n", track: "core" },
  { slug: "claude", title: "Claude", track: "core" },
  { slug: "grok", title: "Grok", track: "core" },
  { slug: "context-window", title: "context window", track: "core" },
  { slug: "slop", title: "slop", track: "slang" },
  { slug: "vibe-coding", title: "vibe coding", track: "slang" },
  { slug: "clanker", title: "clanker", track: "slang" },
  { slug: "glazing", title: "glazing", track: "slang" },
  { slug: "brainrot", title: "brainrot", track: "slang" },
  { slug: "context-rot", title: "context rot", track: "slang" },
  { slug: "gpt-ese", title: "GPT-ese", track: "slang" },
  { slug: "wrapper", title: "wrapper", track: "slang" },
  { slug: "hallucinating", title: "hallucinating", track: "slang" },
  { slug: "skills", title: "skills", track: "slang" },
];

export const CORE_TERMS: readonly TermStub[] = TERMS.filter(
  (term) => term.track === "core",
);

export const SLANG_TERMS: readonly TermStub[] = TERMS.filter(
  (term) => term.track === "slang",
);

/**
 * docs/DESIGN.md §2.7 — a slang term is wrapped in straight double quotes
 * everywhere it is titled, because it is vernacular. The quotes are a rendering
 * convention, so they are added here and never stored in the data.
 */
export function displayTitle(term: TermStub): string {
  return term.track === "slang" ? `"${term.title}"` : term.title;
}

/** Where a term's lesson will live. */
export function termHref(term: TermStub): string {
  return `/lessons/${term.slug}`;
}
