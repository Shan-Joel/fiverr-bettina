import type { Benefit } from "@/lib/types";

/** A three-up grid of treatment benefits. */
export default function Benefits({ benefits }: { benefits: Benefit[] }) {
  if (!benefits.length) return null;
  return (
    <div className="grid gap-px overflow-hidden border border-sand/70 bg-sand/70 sm:grid-cols-3">
      {benefits.map((b, i) => (
        <div key={i} className="bg-white p-8">
          <span className="font-[family-name:var(--font-display)] text-3xl text-sage">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-3 text-xl">{b.heading}</h3>
          {b.text && (
            <p className="mt-2 text-[0.95rem] leading-relaxed text-stone">
              {b.text}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
