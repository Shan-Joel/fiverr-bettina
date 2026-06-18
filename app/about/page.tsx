import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getOptions, getPageBySlug } from "@/lib/wp";
import { buildMetadata, medicalBusinessLd } from "@/lib/seo";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("about");
  return buildMetadata({
    title: page?.acf_data.seo_title || "About the Practice",
    description: page?.acf_data.seo_description || page?.acf_data.intro,
    path: "/about",
    image: page?.acf_data.page_image?.url ?? null,
  });
}

export default async function AboutPage() {
  const [page, options] = await Promise.all([
    getPageBySlug("about"),
    getOptions(),
  ]);
  if (!page) notFound();

  const portrait = page.acf_data.page_image;

  return (
    <>
      <JsonLd data={medicalBusinessLd(options)} />
      <PageHeader
        eyebrow="The practice"
        title={page.title.rendered}
        intro={page.acf_data.intro}
      />

      <Section background="white">
        <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
          {portrait && (
            <div className="relative aspect-[4/5] overflow-hidden bg-cream lg:sticky lg:top-28 lg:self-start">
              <Image
                src={portrait.url}
                alt={portrait.alt || "Dr. Bettina Wittmann"}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          )}
          <div
            className="prose-wp text-lg"
            // Page content authored in the WordPress editor (trusted CMS content).
            dangerouslySetInnerHTML={{ __html: page.content.rendered }}
          />
        </div>
      </Section>
    </>
  );
}
