import Container from "@/components/Container";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <Container>
      <div className="flex flex-col items-center gap-6 py-32 text-center">
        <p className="eyebrow text-sage">Error 404</p>
        <h1 className="text-5xl sm:text-6xl">Page not found</h1>
        <p className="max-w-md text-lg text-stone">
          The page you are looking for doesn&rsquo;t exist or has moved.
        </p>
        <Button href="/" variant="outline">
          Back to home
        </Button>
      </div>
    </Container>
  );
}
