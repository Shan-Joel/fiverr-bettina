"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "./Container";
import Logo from "./Logo";

interface NavTreatment {
  slug: string;
  title: string;
}

export default function Header({
  treatments,
  logoLine1,
  logoLine2,
}: {
  treatments: NavTreatment[];
  logoLine1?: string;
  logoLine2?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-sand/70 bg-white/90 backdrop-blur-sm">
      <Container>
        <div className="flex items-center justify-between py-4">
          <Link href="/" aria-label="Home" onClick={() => setOpen(false)}>
            <Logo line1={logoLine1} line2={logoLine2} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-9 md:flex">
            <div className="group relative">
              <button className="eyebrow text-stone transition-colors hover:text-sage">
                Treatments
              </button>
              <div className="invisible absolute left-1/2 top-full w-56 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <div className="border border-sand bg-white py-2 shadow-sm">
                  {treatments.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/treatments/${t.slug}`}
                      className="block px-5 py-2.5 font-[family-name:var(--font-display)] text-lg text-ink transition-colors hover:bg-cream"
                    >
                      {t.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/about" className="eyebrow text-stone transition-colors hover:text-sage">
              About
            </Link>
            <Link href="/contact" className="eyebrow text-stone transition-colors hover:text-sage">
              Contact
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="flex h-10 w-10 items-center justify-center md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="text-2xl text-ink">{open ? "✕" : "≡"}</span>
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-sand bg-white md:hidden">
          <Container>
            <div className="flex flex-col py-4">
              <span className="eyebrow py-2 text-sage">Treatments</span>
              {treatments.map((t) => (
                <Link
                  key={t.slug}
                  href={`/treatments/${t.slug}`}
                  className="py-2 pl-4 font-[family-name:var(--font-display)] text-xl text-ink"
                  onClick={() => setOpen(false)}
                >
                  {t.title}
                </Link>
              ))}
              <Link
                href="/about"
                className="border-t border-sand/60 py-3 font-[family-name:var(--font-display)] text-xl text-ink"
                onClick={() => setOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="py-3 font-[family-name:var(--font-display)] text-xl text-ink"
                onClick={() => setOpen(false)}
              >
                Contact
              </Link>
            </div>
          </Container>
        </nav>
      )}
    </header>
  );
}
