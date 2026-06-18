import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "solid" | "outline" | "light";

const styles: Record<Variant, string> = {
  solid: "bg-sage text-white hover:bg-ink",
  outline: "border border-sand-deep text-ink hover:bg-cream",
  light: "border border-white/70 text-white hover:bg-white/10",
};

/** A link styled as a call-to-action button, in the brand's quiet, squared style. */
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
  return (
    <Link
      href={href}
      className={`eyebrow inline-flex items-center justify-center px-7 py-3.5 transition-colors duration-300 ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
