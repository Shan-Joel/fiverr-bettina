import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getOptions, getPageBySlug } from "@/lib/wp";
import { buildMetadata, medicalBusinessLd } from "@/lib/seo";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import ContactBlock from "@/components/ContactBlock";
import JsonLd from "@/components/JsonLd";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("contact");
  return buildMetadata({
    title: page?.acf_data.seo_title || "Contact",
    description: page?.acf_data.seo_description || page?.acf_data.intro,
    path: "/contact",
  });
}

export default async function ContactPage() {
  const [page, options] = await Promise.all([
    getPageBySlug("contact"),
    getOptions(),
  ]);
  if (!page) notFound();

  const portrait = page.acf_data.page_image;
  const mapQuery = encodeURIComponent(
    `${options.practice_name}, ${(options.address || "").replace(/\n+/g, ", ")}`,
  );
  const mapEmbed = `https://www.google.com/maps?q=${mapQuery}&z=15&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
  const l = options.labels ?? {};

  return (
    <>
      <JsonLd data={medicalBusinessLd(options)} />
      <PageHeader
        eyebrow={l.contact_page_eyebrow || "Contact"}
        title={page.title.rendered}
        intro={page.acf_data.intro}
      />

      <Section background="white">
        <div className="grid gap-12 lg:grid-cols-[7fr_4fr] lg:gap-16">
          <div>
            {page.content.rendered && (
              <div
                className="prose-wp mb-10 max-w-2xl text-lg"
                // Page content authored in the WordPress editor (trusted CMS content).
                dangerouslySetInnerHTML={{ __html: page.content.rendered }}
              />
            )}
            <div className="border-t border-sand pt-10">
              <ContactBlock options={options} />
            </div>
          </div>

          {portrait && (
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[260px] overflow-hidden bg-cream lg:mx-0">
              <Image
                src={portrait.url}
                alt={portrait.alt || "Dr. Bettina Wittmann"}
                fill
                sizes="(max-width: 1024px) 60vw, 260px"
                className="object-cover object-top"
              />
            </div>
          )}
        </div>
      </Section>

      {/* Location map */}
      <Section background="cream">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <p className="eyebrow text-sage">{l.map_eyebrow || "Find us"}</p>
            <h2 className="mt-2 text-3xl sm:text-4xl">{l.map_heading || "Our location"}</h2>
          </div>
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow text-sage transition-colors hover:text-ink"
          >
            {l.map_link || "Open in Google Maps →"}
          </a>
        </div>
        <div className="overflow-hidden border border-sand">
          <iframe
            title="Practice location on Google Maps"
            src={mapEmbed}
            width="100%"
            height="360"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[320px] w-full sm:h-[360px]"
          />
        </div>
      </Section>
    </>
  );
}
