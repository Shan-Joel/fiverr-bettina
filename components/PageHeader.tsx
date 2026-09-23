import Container from "./Container";

/** Simple cream header band for inner pages. */
export default function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="bg-cream py-20 sm:py-24">
      <Container>
        <div className="max-w-3xl">
          {eyebrow && <p className="eyebrow mb-3 text-sage">{eyebrow}</p>}
          <h1 className="text-5xl sm:text-6xl !text-sage">{title}</h1>
          {intro && (
            <p className="mt-6 text-xl leading-relaxed text-stone">{intro}</p>
          )}
        </div>
      </Container>
    </div>
  );
}
