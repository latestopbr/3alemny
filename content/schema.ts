/**
 * The single source of truth for a term.
 *
 * Every file in `content/terms/*.json` must satisfy `Term`. Research owns the
 * factual fields, Curriculum owns the learning structure, engineers own neither
 * — they read this type and render it.
 *
 * Type-only. No runtime validator here; adding one would mean adding a
 * dependency nobody has authorized.
 */

/** Which of the two v1 tracks a term belongs to. */
export type Track = "core" | "slang";

/**
 * Difficulty, and the three buckets the placement quiz sorts users into.
 * See "The placement quiz is yours" in `.claude/agents/head-of-curriculum.md`.
 */
export type Level = "beginner" | "mid" | "advanced";

/** `draft` until Research has verified the facts and Curriculum has filled every field. */
export type Status = "draft" | "verified";

/** A source Research checked, with the date it was accessed. */
export interface Source {
  title: string;
  url: string;
  /** ISO date, YYYY-MM-DD. Anything older than 90 days gets flagged for recheck. */
  accessed: string;
}

/**
 * One block of a lesson. No block runs longer than 80 words.
 *
 * `type` is deliberately an open string: the block vocabulary is Curriculum's
 * to define, and pinning a union here before they have designed the lessons
 * would block them.
 */
export interface LessonBlock {
  type: string;
  body: string;
}

/**
 * The do-it-yourself step. Every term has one — a lesson that is only text has
 * failed. `kind` is an open string for the same reason `LessonBlock.type` is.
 */
export interface TryIt {
  kind: string;
  instructions: string;
  /** What the user must see happen for this to count as done. */
  successCriteria: string;
}

/** One quiz question. */
export interface QuizQuestion {
  q: string;
  choices: string[];
  /** Index into `choices` of the correct answer. */
  answer: number;
  /** Why the right answer is right, and where useful why the tempting wrong one is wrong. */
  explain: string;
}

export interface Term {
  /** URL-safe id. Matches the filename: `content/terms/<slug>.json`. */
  slug: string;
  title: string;
  track: Track;
  level: Level;

  /** One sentence a smart 15-year-old gets on first read. */
  oneLiner: string;
  /** Two or three sentences on why anyone should care. */
  whyItMatters: string;
  /** Slang terms only. `null` on the core track. */
  whyItWentViral: string | null;

  /** Slugs that must be unlocked first. A wrong graph breaks the unlock system. */
  prerequisites: string[];
  /** Slugs, for the graph page. */
  related: string[];

  sources: Source[];
  lesson: LessonBlock[];
  tryIt: TryIt;
  /** 3 to 5 questions: one recall, the rest application. */
  quiz: QuizQuestion[];

  status: Status;
}
