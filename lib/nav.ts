/**
 * The three primary destinations named in docs/DESIGN.md §9.1, plus the
 * placement quiz for the footer column. Labels are the literal words the spec
 * uses; none of these routes exist yet.
 */
export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export const PRIMARY_NAV: readonly NavItem[] = [
  { label: "LESSONS", href: "/lessons" },
  { label: "GRAPH", href: "/graph" },
  { label: "GAMES", href: "/games" },
];

export const FOOTER_NAV: readonly NavItem[] = [
  ...PRIMARY_NAV,
  { label: "PLACEMENT QUIZ", href: "/quiz" },
];
