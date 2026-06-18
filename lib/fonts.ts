import { Cormorant_Garamond, EB_Garamond } from "next/font/google";

/** Display / heading face — an elegant high-contrast Garamond. */
export const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

/** Body face — a readable Garamond for running text. */
export const body = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});
