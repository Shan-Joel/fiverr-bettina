import type { SiteOptions } from "@/lib/types";

/** Contact details rendered from the global site options. */
export default function ContactBlock({ options }: { options: SiteOptions }) {
  const tel = (n: string) => n.replace(/[^+\d]/g, "");
  const l = options.labels ?? {};

  return (
    <div className="grid gap-10 sm:grid-cols-2">
      <div>
        <p className="eyebrow mb-4 text-sage">{l.contact_visit || "Visit us"}</p>
        <p className="font-[family-name:var(--font-display)] text-2xl leading-snug text-ink">
          {options.practice_name || "Ärztliche Privatpraxis Bettina Wittmann"}
        </p>
        {options.address && (
          <p className="mt-3 whitespace-pre-line leading-relaxed text-stone">
            {options.address}
          </p>
        )}
      </div>
      <div>
        <p className="eyebrow mb-4 text-sage">{l.contact_touch || "Get in touch"}</p>
        <ul className="space-y-3 text-lg text-ink">
          {options.phone_1 && (
            <li>
              <a className="hover:text-sage" href={`tel:${tel(options.phone_1)}`}>
                {options.phone_1}
              </a>
            </li>
          )}
          {options.phone_2 && (
            <li>
              <a className="hover:text-sage" href={`tel:${tel(options.phone_2)}`}>
                {options.phone_2}
              </a>
            </li>
          )}
          {options.email && (
            <li>
              <a className="hover:text-sage" href={`mailto:${options.email}`}>
                {options.email}
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
