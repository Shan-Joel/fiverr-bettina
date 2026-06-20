import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "solid" | "outline" | "light";

const styles: Record<Variant, string> = {
  solid: "bg-sage text-white hover:bg-deep",
  outline: "border border-sand-deep text-ink hover:bg-cream",
  light: "border border-white/70 text-white hover:bg-white/10",
};

/**
 * A link styled as a call-to-action button. External URLs (http...) open in a
 * new tab; internal paths use the Next.js router.
 */
export default function Button({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const classes = `eyebrow inline-flex items-center justify-center px-7 py-3.5 transition-colors duration-300 ${styles[variant]} ${className}`;
  const isExternal = /^https?:\/\//.test(href);

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
