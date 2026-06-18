import Image from "next/image";
import type { WpImage } from "@/lib/types";

/** A simple two-up image gallery for treatment pages. */
export default function Gallery({ images }: { images: WpImage[] }) {
  if (!images.length) return null;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {images.map((img) => (
        <div
          key={img.id}
          className="relative aspect-[4/3] overflow-hidden bg-cream"
        >
          <Image
            src={img.url}
            alt={img.alt || ""}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
