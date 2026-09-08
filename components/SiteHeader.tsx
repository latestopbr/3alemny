import Link from "next/link";

import { Wordmark } from "@/components/Wordmark";
import { PRIMARY_NAV } from "@/lib/nav";

/**
 * docs/DESIGN.md §9.1 — 64px, full-bleed, sticky, z-20, opaque `--color-surface`,
 * 1px `--color-line` bottom border. No blur, no transparency.
 *
 * Two things the spec asks for that are deliberately not here yet:
 *
 *  - The current-route treatment (acid label + 2px acid underline) needs
 *    `usePathname`, which would make the whole header a client component.
 *    None of the three routes exists yet, so it is deferred rather than paid
 *    for now.
 *  - `PROGRESS 00/18` is static. Progress lives in `localStorage`, which may
 *    only be read in an effect, and there is no progress system yet. The
 *    numerals are wired when it lands.
 *
 * The mobile panel is `<details>` / `<summary>` so the header stays a Server
 * Component: no state, no effect, and the summary is keyboard-reachable and
 * announced as expandable for free.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-surface">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-5 md:px-8 xl:px-12">
        <Link href="/" className="inline-flex h-16 items-center">
          <Wordmark />
        </Link>

        <div className="flex items-center gap-6">
          <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex h-16 items-center text-label text-ink-muted transition-[color] duration-80 ease-linear hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <p className="hidden text-micro text-ink-muted sm:block">
            PROGRESS <span className="text-acid">00/18</span>
          </p>

          <details className="md:hidden">
            <summary className="flex h-11 cursor-pointer list-none items-center border-2 border-transparent text-label text-ink-muted underline decoration-line decoration-1 underline-offset-4 transition-[color,text-decoration-color] duration-80 ease-linear hover:text-acid hover:decoration-acid [&::-webkit-details-marker]:hidden">
              MENU
            </summary>
            {/* No overflow clip: three items never scroll, and §2.6 step 3
                says a clipped focus ring is a failure. */}
            <div className="fixed inset-x-0 top-16 bottom-0 z-20 bg-surface">
              <nav aria-label="Primary" className="flex flex-col">
                {PRIMARY_NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="border-b border-line-soft px-5 py-5 text-h1 text-ink transition-[color] duration-80 ease-linear hover:text-acid"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
