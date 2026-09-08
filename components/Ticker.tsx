import { TERMS, displayTitle } from "@/lib/terms";

/**
 * docs/DESIGN.md §9.2 step 2 — full-bleed, 44px, acid fill, ink-inverse
 * `text-label`, all eighteen terms separated by ` /// `, slang terms quoted.
 * The single loudest band on the site; nothing else gets a full-bleed acid fill.
 *
 * Motion (§8): one 40s linear lap, paused on hover and focus-within. The list
 * is rendered twice so a lap is exactly `translateX(-50%)` and the seam is
 * invisible.
 *
 * Accessibility (§11): the strip is `aria-hidden` — the same eighteen terms
 * exist as real links in the two-track split below. Under
 * `prefers-reduced-motion` it must not translate at all, so the animation is
 * removed outright rather than shortened, and `overflow-hidden` leaves a
 * static single row.
 */
const LINE = `${TERMS.map(displayTitle).join(" /// ")} /// `;

export function Ticker() {
  return (
    <div
      aria-hidden="true"
      className="group h-11 overflow-hidden bg-acid select-none"
    >
      <div className="flex h-11 w-max animate-ticker items-center whitespace-nowrap group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:transform-none">
        <span className="text-label text-ink-inverse">{LINE}</span>
        <span className="text-label text-ink-inverse">{LINE}</span>
      </div>
    </div>
  );
}
