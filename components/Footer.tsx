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
  const l = options.labels ?? {};

  return (
    <footer className="bg-sage text-pine">
      <Container>
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" aria-label="Home">
                <span className="inline-block rounded-md bg-white/65 px-4 py-3">
              <Logo className="h-14 w-auto" />
            </span>
            </Link>
            {options.footer_text && (
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-pine/80">
                {options.footer_text}
              </p>
            )}
          </div>

          <div>
            <p className="eyebrow mb-4 text-pine">{l.footer_treatments || "Treatments"}</p>
            <ul className="space-y-2.5">
              {treatments.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/treatments/${t.slug}`}
                    className="text-sm text-pine/90 transition-colors hover:text-pine"
                  >
                    {t.title.rendered}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4 text-pine">{l.footer_contact || "Contact"}</p>
            <address className="space-y-2.5 text-sm not-italic text-pine/90">
              {options.address && (
                <p className="whitespace-pre-line">{options.address}</p>
              )}
              {options.phone_1 && (
                <p>
                  <a href={`tel:${options.phone_1.replace(/[^+\d]/g, "")}`} className="hover:text-pine">
                    {options.phone_1}
                  </a>
                </p>
              )}
              {options.phone_2 && (
                <p>
                  <a href={`tel:${options.phone_2.replace(/[^+\d]/g, "")}`} className="hover:text-pine">
                    {options.phone_2}
                  </a>
                </p>
              )}
              {options.email && (
                <p>
                  <a href={`mailto:${options.email}`} className="hover:text-pine">
                    {options.email}
                  </a>
                </p>
              )}
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-pine/20 py-6 text-xs text-pine/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {options.practice_name || "Ärztliche Privatpraxis Bettina Wittmann"}
          </p>
          <div className="flex gap-6">
            <Link href="/imprint" className="hover:text-pine">
              {l.footer_imprint || "Imprint"}
            </Link>
            <Link href="/privacy" className="hover:text-pine">
              {l.footer_privacy || "Privacy"}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
