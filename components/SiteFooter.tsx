import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/Wordmark";
import { FOOTER_NAV } from "@/lib/nav";

/**
 * docs/DESIGN.md §9.1 — 1px `--color-line` top border, 64px padding-y, three
 * columns at `md`, one below.
 *
 * `RESET PROGRESS` is rendered disabled. §7.3 says a `danger` button always
 * opens a confirm step, and there is no progress to reset and no confirm step
 * to open until the progress system exists. §7.3's `danger` table has no
 * disabled row, so the disabled treatment is §2.6's generic one — explicit
 * token swap, never `opacity`.
 *
 * Links use the `link--quiet` variant (§7.6), which keeps the footer from
 * becoming a wall of acid.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 md:px-8 xl:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <Wordmark />
            <p className="mt-4 text-sm text-ink-muted">
              {"<FOOTER_TAGLINE · ONE LINE · 64 CHARACTERS MAX>"}
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-col">
              {FOOTER_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-sm text-ink-muted decoration-1 underline-offset-4 transition-[color,text-decoration-color] duration-80 ease-linear hover:text-ink hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col items-start gap-4">
            <Button variant="danger" size="md" disabled>
              RESET PROGRESS
            </Button>
            <p className="text-micro text-ink-muted">
              PROGRESS LIVES IN LOCALSTORAGE. NOTHING LEAVES YOUR BROWSER.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
