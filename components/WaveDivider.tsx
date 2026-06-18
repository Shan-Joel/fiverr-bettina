/**
 * The signature wave from the practice logo, used as a section divider.
 * `fill` should match the colour of the section that follows below it.
 */
export default function WaveDivider({
  fill = "#f5ede4",
  flip = false,
  className = "",
}: {
  fill?: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none -mb-px leading-none ${className}`}
      style={{ transform: flip ? "scaleY(-1)" : undefined }}
    >
      <svg
        viewBox="0 0 1200 70"
        preserveAspectRatio="none"
        className="block h-10 w-full sm:h-14"
      >
        <path
          d="M0 38 C200 6 360 60 600 38 C840 14 1000 46 1200 20 L1200 70 L0 70 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
