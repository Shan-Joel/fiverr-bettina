import Image from "next/image";
import Button from "./Button";
import type { SiteOptions } from "@/lib/types";

/** The large split hero on the home page: text panel + portrait image. */
export default function Hero({ options }: { options: SiteOptions }) {
  const img = options.hero_image;

  return (
    <section className="grid items-stretch lg:grid-cols-2">
      <div className="flex flex-col justify-center bg-cream px-6 py-20 sm:px-12 lg:py-32 lg:pl-[max(2rem,calc((100vw-72rem)/2+2rem))]">
        <div className="max-w-md">
          <p
            className="eyebrow mb-6 text-sage"
            style={{ fontSize: "0.95rem", letterSpacing: "0.2em" }}
          >
            {options.hero_eyebrow || "Aesthetic & Laser Medicine"}
          </p>
          <h1 className="text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
            {options.hero_heading || "Beauty, guided by medical precision."}
          </h1>
          {options.hero_subtext && (
            <p className="mt-7 max-w-sm text-lg leading-relaxed text-stone">
              {options.hero_subtext}
            </p>
          )}
          <div className="mt-9 flex flex-wrap gap-4">
            <Button href={options.booking_url || "/contact"} variant="solid">
              {options.hero_cta_label || "Book a consultation"}
            </Button>
            <Button href="/#treatments" variant="outline">
              {options.hero_cta2_label || "Our treatments"}
            </Button>
          </div>
        </div>
      </div>

      <div className="relative min-h-[340px] bg-sand lg:min-h-[640px]">
        {img ? (
          <Image
            src={img.url}
            alt={img.alt || options.hero_heading || "Aesthetic medicine"}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-6 border border-white/70" />
        )}
      </div>
    </section>
  );
}
