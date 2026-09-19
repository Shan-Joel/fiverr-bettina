/**
 * An elegant multi-layered wave transition used at the bottom of the homepage,
 * bridging the cream CTA section into the sage-green footer.
 *
 * Mirrors the brand waveform image: a sand (back) wave and a sage (front) wave
 * overlap to create a fluid, layered coastal feel.
 */
export default function FooterWave() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none -mb-px leading-none"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block h-20 w-full sm:h-28 lg:h-36"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Back wave — sand tone */}
        <path
          d="M0 60 C240 10 480 100 720 55 C960 8 1200 90 1440 40 L1440 120 L0 120 Z"
          fill="#f0dbc6"
          opacity="0.9"
        />
        {/* Thin highlight line between the two waves */}
        <path
          d="M0 72 C240 26 480 108 720 68 C960 26 1200 100 1440 55"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.5"
          opacity="0.55"
        />
        {/* Front wave — sage tone (matches footer bg) */}
        <path
          d="M0 88 C200 50 420 115 700 80 C980 44 1220 105 1440 68 L1440 120 L0 120 Z"
          fill="#aac4bc"
        />
      </svg>
    </div>
  );
}
