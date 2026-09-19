import type { ReactNode, CSSProperties } from "react";
import Container from "./Container";

/** A vertical content band with consistent rhythm and an optional brand background. */
export default function Section({
  children,
  className = "",
  background = "white",
  id,
  style,
}: {
  children: ReactNode;
  className?: string;
  background?: "white" | "cream" | "sand" | "sage";
  id?: string;
  style?: CSSProperties;
}) {
  const bg = {
    white: "bg-white",
    cream: "bg-cream",
    sand: "bg-sand",
    sage: "bg-sage",
  }[background];

  return (
    <section id={id} className={`${bg} py-20 sm:py-28 ${className}`} style={style}>
      <Container>{children}</Container>
    </section>
  );
}

