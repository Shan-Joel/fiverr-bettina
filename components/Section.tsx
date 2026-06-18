import type { ReactNode } from "react";
import Container from "./Container";

/** A vertical content band with consistent rhythm and an optional brand background. */
export default function Section({
  children,
  className = "",
  background = "white",
  id,
}: {
  children: ReactNode;
  className?: string;
  background?: "white" | "cream" | "sand" | "sage";
  id?: string;
}) {
  const bg = {
    white: "bg-white",
    cream: "bg-cream",
    sand: "bg-sand",
    sage: "bg-sage",
  }[background];

  return (
    <section id={id} className={`${bg} py-20 sm:py-28 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
