/**
 * docs/DESIGN.md §3.4.
 *
 * `3alemny` lowercase, `text-h3` in mono, -0.02em, followed by a
 * 0.55em x 1.05em acid block that blinks (§8). The `3` is a numeral in the
 * source string — it is Arabizi, not a stylised glyph. Never set in the
 * display face, never in caps.
 *
 * Under `prefers-reduced-motion` the block renders solid and permanently
 * visible (§8) — the global 1ms override alone would leave it stuck on
 * whichever frame it stopped at.
 */
export function Wordmark() {
  return (
    <span className="text-h3 tracking-[-0.02em] text-ink">
      3alemny
      <span
        aria-hidden="true"
        className="ml-1 inline-block h-[1.05em] w-[0.55em] animate-caret bg-acid motion-reduce:animate-none motion-reduce:opacity-100"
      />
    </span>
  );
}
