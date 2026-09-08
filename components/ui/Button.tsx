import Link from "next/link";
import type { ReactNode } from "react";

/**
 * docs/DESIGN.md §7.3.
 *
 * Every variant is 2px border, zero radius, no shadow, `text-label` type, and
 * enumerated transitions — never `transition: all` (§8). Focus is not handled
 * here: §2.6 is one global rule in `app/globals.css`, and no component
 * overrides it.
 *
 * `disabled` never uses opacity (§2.6) — it is an explicit token swap.
 */
export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2.5 border-2 border-solid no-underline whitespace-nowrap cursor-pointer transition-[background-color,border-color,color,text-decoration-color] duration-80 ease-linear";

const SIZE: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-label",
  md: "h-12 px-5 text-label",
  /* §7.3 sizes an `lg` button at 15px / 700 / +0.12em / uppercase, which no
     §3.3 step expresses — `text-sm` is 15px but 400 and untracked. So the
     label step carries weight, tracking and case, and only the size is
     overridden. See the report note on this gap. */
  lg: "h-15 px-8 text-label text-[0.9375rem]",
};

const VARIANT: Record<ButtonVariant, string> = {
  primary:
    "bg-acid border-acid text-ink-inverse hover:bg-surface hover:text-acid active:bg-acid-dim active:border-acid-dim active:text-ink-inverse",
  secondary:
    "bg-transparent border-line text-ink hover:bg-acid-wash hover:border-acid hover:text-acid active:bg-acid-deep active:border-acid active:text-acid",
  ghost:
    "bg-transparent border-transparent text-ink-muted underline decoration-1 decoration-line underline-offset-4 hover:text-acid hover:decoration-acid active:text-acid-dim active:decoration-acid-dim",
  danger:
    "bg-transparent border-ink text-ink hover:bg-ink hover:text-ink-inverse active:bg-line-strong active:border-line-strong active:text-ink-inverse",
};

/* §2.6 disabled: explicit token swap, no opacity, no hover response. */
const DISABLED =
  "disabled:cursor-not-allowed disabled:bg-surface-raised disabled:border-line-soft disabled:text-line disabled:no-underline disabled:transition-none disabled:hover:bg-surface-raised disabled:hover:border-line-soft disabled:hover:text-line";

function classes(
  variant: ButtonVariant,
  size: ButtonSize,
  className: string,
): string {
  return [BASE, SIZE[size], VARIANT[variant], className]
    .filter(Boolean)
    .join(" ");
}

interface ButtonLinkProps {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({
  href,
  variant = "secondary",
  size = "md",
  className = "",
  children,
}: ButtonLinkProps) {
  return (
    <Link href={href} className={classes(variant, size, className)}>
      {children}
    </Link>
  );
}

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
  children: ReactNode;
}

export function Button({
  variant = "secondary",
  size = "md",
  className = "",
  disabled = false,
  children,
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`${classes(variant, size, className)} ${DISABLED}`}
    >
      {children}
    </button>
  );
}
