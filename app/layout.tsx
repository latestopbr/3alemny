import type { Metadata } from "next";
import { Archivo_Black, JetBrains_Mono } from "next/font/google";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

/**
 * docs/DESIGN.md §3.1. Both families are self-hosted at build time by
 * next/font/google — no CDN request, no licence, no cost.
 *
 * The CSS variable names are deliberately not `--font-mono` / `--font-display`:
 * those are Tailwind theme keys, and `--font-mono: var(--font-mono)` would be
 * circular and silently resolve to nothing. `app/globals.css` maps these two
 * onto the theme keys inside `@theme inline`.
 */
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

/** Archivo Black ships weight 400 only; the import throws without `weight`. */
const archivoBlack = Archivo_Black({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "3alemny",
  description:
    "A visual, interactive site that teaches core AI terms and the ten viral AI slangs.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${archivoBlack.variable} h-full bg-surface text-ink antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/*
          §9.1 — the frame. A 1px rule at each edge of the content column,
          running the full page height at `lg` and up. Decorative only.
        */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-y-0 left-1/2 z-[1] hidden w-full max-w-[1200px] -translate-x-1/2 border-x border-line-soft lg:block"
        />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
