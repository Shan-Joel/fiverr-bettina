import Link from "next/link";
import Container from "./Container";
import Logo from "./Logo";
import type { SiteOptions, Treatment } from "@/lib/types";

export default function Footer({
  options,
  treatments,
}: {
  options: SiteOptions;
  treatments: Treatment[];
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white">
      <Container>
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo
              tone="light"
              line1={options.logo_line1 || undefined}
              line2={options.logo_line2 || undefined}
            />
            {options.footer_text && (
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
                {options.footer_text}
              </p>
            )}
          </div>

          <div>
            <p className="eyebrow mb-4 text-sage-soft">Treatments</p>
            <ul className="space-y-2.5">
              {treatments.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/treatments/${t.slug}`}
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {t.title.rendered}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4 text-sage-soft">Contact</p>
            <address className="space-y-2.5 text-sm not-italic text-white/80">
              {options.address && (
                <p className="whitespace-pre-line">{options.address}</p>
              )}
              {options.phone_1 && (
                <p>
                  <a href={`tel:${options.phone_1.replace(/[^+\d]/g, "")}`} className="hover:text-white">
                    {options.phone_1}
                  </a>
                </p>
              )}
              {options.phone_2 && (
                <p>
                  <a href={`tel:${options.phone_2.replace(/[^+\d]/g, "")}`} className="hover:text-white">
                    {options.phone_2}
                  </a>
                </p>
              )}
              {options.email && (
                <p>
                  <a href={`mailto:${options.email}`} className="hover:text-white">
                    {options.email}
                  </a>
                </p>
              )}
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/15 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {options.practice_name || "Ärztliche Privatpraxis Bettina Wittmann"}
          </p>
          <div className="flex gap-6">
            <Link href="/imprint" className="hover:text-white">
              Imprint
            </Link>
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
