import Image from "next/image";
import Link from "next/link";
import type { Treatment } from "@/lib/types";

/** A treatment teaser card for the home page grid. */
export default function TreatmentCard({ treatment }: { treatment: Treatment }) {
  const { slug, title, acf_data } = treatment;
  const img = acf_data.hero_image;

  return (
    <Link
      href={`/treatments/${slug}`}
      className="group flex flex-col border border-sand/80 bg-white transition-colors duration-300 hover:border-sage"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-cream">
        {img ? (
          <Image
            src={img.url}
            alt={img.alt || title.rendered}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-[family-name:var(--font-display)] text-5xl text-sage/50">
              {title.rendered.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-7">
        <h3 className="text-2xl">{title.rendered}</h3>
        {acf_data.teaser && (
          <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-stone">
            {acf_data.teaser}
          </p>
        )}
        <span className="eyebrow mt-5 text-sage transition-colors group-hover:text-ink">
          Learn more →
        </span>
      </div>
    </Link>
  );
}
