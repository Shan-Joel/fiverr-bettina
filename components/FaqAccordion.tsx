"use client";

import { useState } from "react";
import type { Faq } from "@/lib/types";

/** An accessible FAQ accordion built from a treatment's FAQ repeater. */
export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  if (!faqs.length) return null;

  return (
    <div className="divide-y divide-sand border-y border-sand">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="font-[family-name:var(--font-display)] text-xl text-ink">
                {f.question}
              </span>
              <span className="text-2xl leading-none text-sage">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && f.answer && (
              <p className="pb-5 pr-8 leading-relaxed text-stone">{f.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
