import Container from "@/components/Container";
import Button from "@/components/Button";
import { getOptions } from "@/lib/wp";

export default async function NotFound() {
  const options = await getOptions();
  const l = options.labels ?? {};

  return (
    <Container>
      <div className="flex flex-col items-center gap-6 py-32 text-center">
        <p className="eyebrow text-sage">{l.notfound_eyebrow || "Error 404"}</p>
        <h1 className="text-5xl sm:text-6xl">{l.notfound_heading || "Page not found"}</h1>
        <p className="max-w-md text-lg text-stone">
          {l.notfound_text ||
            "The page you are looking for doesn’t exist or has moved."}
        </p>
        <Button href="/" variant="outline">
          {l.notfound_button || "Back to home"}
        </Button>
      </div>
    </Container>
  );
}
