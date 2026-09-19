import Image from "next/image";
import Link from "next/link";
import { getOptions, getTreatments, getPageBySlug } from "@/lib/wp";
import { medicalBusinessLd } from "@/lib/seo";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Container from "@/components/Container";
import TreatmentCard from "@/components/TreatmentCard";
import WaveDivider from "@/components/WaveDivider";
import Button from "@/components/Button";
import JsonLd from "@/components/JsonLd";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [options, treatments, about] = await Promise.all([
    getOptions(),
    getTreatments(),
    getPageBySlug("about"),
  ]);
  const portrait = about?.acf_data.page_image;

  return (
    <>
      <JsonLd data={medicalBusinessLd(options)} />

      <Hero options={options} />

      {/* Philosophy / intro — waveform art via .section-waveform in globals.css */}
      <Section background="white" className="text-center section-waveform">
        {options.philosophy_eyebrow && (
          <p className="eyebrow text-sage">{options.philosophy_eyebrow}</p>
        )}
        <p className="mx-auto mt-6 max-w-3xl text-2xl leading-relaxed text-ink sm:text-[1.7rem]">
          {options.philosophy_text ||
            "Refined, natural-looking results — delivered with medical precision and genuine care, in a calm and discreet private setting."}
        </p>
      </Section>

      <WaveDivider fill="#f5ede4" />

      {/* Treatments */}
      <Section id="treatments" background="cream">
        <div className="mb-14 text-center">
          {options.treatments_eyebrow && (
            <p className="eyebrow text-sage">{options.treatments_eyebrow}</p>
          )}
          <h2 className="mt-3 text-4xl sm:text-5xl">
            {options.treatments_heading || "Three signature treatments"}
          </h2>
        </div>
        <div className="grid gap-7 md:grid-cols-3">
          {treatments.map((t) => (
            <TreatmentCard
              key={t.slug}
              treatment={t}
              learnMore={options.labels?.learn_more}
            />
          ))}
        </div>
      </Section>

      <WaveDivider fill="#ffffff" />

      {/* About teaser */}
      <Section background="white">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/5] max-w-md overflow-hidden bg-cream">
            {portrait ? (
              <Image
                src={portrait.url}
                alt={portrait.alt || "Dr. Bettina Wittmann"}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            ) : null}
          </div>
          <div>
            {options.about_eyebrow && (
              <p className="eyebrow text-sage">{options.about_eyebrow}</p>
            )}
            <h2 className="mt-3 text-4xl sm:text-5xl">
              {options.about_heading || "In experienced, attentive hands"}
            </h2>
            {about?.acf_data.intro && (
              <p className="mt-6 max-w-md text-lg leading-relaxed text-stone">
                {about.acf_data.intro}
              </p>
            )}
            <div className="mt-8">
              <Button href="/about" variant="outline">
                {options.about_cta_label || "About the practice"}
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Contact CTA */}
      <section className="bg-cream">
        <Container>
          <div className="flex flex-col items-center gap-7 py-20 text-center">
            <h2 className="max-w-2xl text-4xl text-ink sm:text-5xl">
              {options.cta_heading || "Ready to talk about your treatment?"}
            </h2>
            <p className="max-w-xl text-lg text-stone">
              {options.cta_text ||
                "Arrange a personal, no-obligation consultation. We look forward to hearing from you."}
            </p>
            <Button href={options.booking_url || "/contact"} variant="solid">
              {options.hero_cta_label || "Book a consultation"}
            </Button>
            {options.email && (
              <Link
                href={`mailto:${options.email}`}
                className="text-sm text-stone underline-offset-4 hover:text-ink hover:underline"
              >
                {options.email}
              </Link>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
