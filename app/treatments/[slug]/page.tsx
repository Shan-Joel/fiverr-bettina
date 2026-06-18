import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTreatments, getTreatmentBySlug } from "@/lib/wp";
import {
  buildMetadata,
  medicalProcedureLd,
  faqLd,
  breadcrumbLd,
} from "@/lib/seo";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Benefits from "@/components/Benefits";
import Gallery from "@/components/Gallery";
import FaqAccordion from "@/components/FaqAccordion";
import Button from "@/components/Button";
import JsonLd from "@/components/JsonLd";

export const revalidate = 2;
export const dynamicParams = true;

export async function generateStaticParams() {
  const treatments = await getTreatments();
  return treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const treatment = await getTreatmentBySlug(slug);
  if (!treatment) return {};
  const { acf_data, title } = treatment;
  return buildMetadata({
    title: acf_data.seo_title || title.rendered,
    description: acf_data.seo_description || acf_data.teaser,
    path: `/treatments/${slug}`,
    image: acf_data.hero_image?.url ?? null,
  });
}

export default async function TreatmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const treatment = await getTreatmentBySlug(slug);
  if (!treatment) notFound();

  const { title, acf_data } = treatment;
  const hero = acf_data.hero_image;
  const benefits = acf_data.benefits ?? [];
  const faqs = acf_data.faq ?? [];
  const gallery = acf_data.gallery ?? [];
  const path = `/treatments/${slug}`;

  const structuredData: object[] = [
    medicalProcedureLd(treatment, path),
    breadcrumbLd([
      ["Home", "/"],
      [title.rendered, path],
    ]),
  ];
  if (faqs.length) structuredData.push(faqLd(faqs));

  return (
    <>
      <JsonLd data={structuredData} />

      {/* Hero */}
      <section className="relative">
        {hero ? (
          <div className="relative h-[42vh] min-h-[320px] w-full overflow-hidden bg-cream">
            <Image
              src={hero.url}
              alt={hero.alt || title.rendered}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#232926e6] via-[#23292659] to-transparent" />
            <div className="absolute inset-0 flex items-end">
              <Container>
                <div className="pb-10 [text-shadow:0_2px_16px_rgba(0,0,0,0.6)]">
                  <p className="eyebrow mb-3 text-white/90">Treatment</p>
                  <h1 className="text-4xl text-white sm:text-6xl">
                    {title.rendered}
                  </h1>
                </div>
              </Container>
            </div>
          </div>
        ) : (
          <div className="bg-cream py-24">
            <Container>
              <p className="eyebrow mb-3 text-sage">Treatment</p>
              <h1 className="text-5xl sm:text-6xl">{title.rendered}</h1>
            </Container>
          </div>
        )}
      </section>

      {/* Intro + body */}
      <Section background="white">
        <div className="mx-auto max-w-3xl">
          {acf_data.teaser && (
            <p className="mb-8 font-[family-name:var(--font-display)] text-2xl leading-snug text-ink sm:text-3xl">
              {acf_data.teaser}
            </p>
          )}
          {acf_data.body && (
            <div
              className="prose-wp text-lg"
              // Body HTML authored in the WordPress block/classic editor (trusted CMS content).
              dangerouslySetInnerHTML={{ __html: acf_data.body }}
            />
          )}
        </div>
      </Section>

      {/* Benefits */}
      {benefits.length > 0 && (
        <Section background="cream">
          <div className="mb-10 text-center">
            <p className="eyebrow text-sage">Why choose this treatment</p>
          </div>
          <Benefits benefits={benefits} />
        </Section>
      )}

      {/* Gallery */}
      {gallery.length > 0 && (
        <Section background="white">
          <Gallery images={gallery} />
        </Section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <Section background="cream">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <p className="eyebrow text-sage">Frequently asked</p>
              <h2 className="mt-3 text-4xl">Questions &amp; answers</h2>
            </div>
            <FaqAccordion faqs={faqs} />
          </div>
        </Section>
      )}

      {/* CTA */}
      <section className="bg-sage">
        <Container>
          <div className="flex flex-col items-center gap-6 py-16 text-center">
            <h2 className="max-w-xl text-3xl text-white sm:text-4xl">
              Interested in {title.rendered}?
            </h2>
            <Button href="/contact" variant="light">
              Book a consultation
            </Button>
            <Link
              href="/#treatments"
              className="text-sm text-white/80 underline-offset-4 hover:underline"
            >
              ← All treatments
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
