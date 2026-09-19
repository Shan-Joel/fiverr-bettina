import Image from "next/image";

/** The practice logo (full lockup). Sized via `className` (e.g. `h-14 w-auto`). */
export default function Logo({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/privatpraxis-wittmann-logo-new.png"
      alt="Ärztliche Privatpraxis Bettina Wittmann — Ästhetik & Lasermedizin"
      width={502}
      height={256}
      sizes="(max-width: 768px) 120px, 160px"
      style={{ width: 'auto', height: '100%' }}
      priority={priority}
      className={className}
    />
  );
}
