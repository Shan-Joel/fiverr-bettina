/** The practice wordmark — the logo wave + sparkle with the practice name. */
export default function Logo({
  className = "",
  tone = "ink",
  line1 = "Ärztliche Privatpraxis",
  line2 = "Ästhetik & Lasermedizin",
}: {
  className?: string;
  tone?: "ink" | "light";
  line1?: string;
  line2?: string;
}) {
  const textColor = tone === "light" ? "#ffffff" : "#7e8c86";
  const subColor = tone === "light" ? "rgba(255,255,255,0.7)" : "#caa987";
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <svg width="58" height="24" viewBox="0 0 120 48" aria-hidden="true">
        <path
          d="M6 30 C30 14 46 40 70 30 C92 21 104 26 116 16"
          fill="none"
          stroke="#aac4bc"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
        <path
          d="M8 36 C32 22 48 44 72 35 C94 27 106 31 114 23"
          fill="none"
          stroke="#f0dbc6"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M88 8 l2.2 7.2 7.2 2.2 -7.2 2.2 -2.2 7.2 -2.2 -7.2 -7.2 -2.2 7.2 -2.2 z"
          fill="#e7c9a8"
        />
      </svg>
      <span className="leading-tight">
        <span
          className="eyebrow block"
          style={{ color: textColor, letterSpacing: "0.18em" }}
        >
          {line1}
        </span>
        <span
          className="block"
          style={{
            color: subColor,
            fontSize: "0.6rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
          }}
        >
          {line2}
        </span>
      </span>
    </span>
  );
}
