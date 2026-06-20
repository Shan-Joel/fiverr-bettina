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
      src="/logo.png"
      alt="Ärztliche Privatpraxis Bettina Wittmann — Ästhetik & Lasermedizin"
      width={180}
      height={0}
      sizes="100vw"
      style={{ width: '180px', height: 'auto' }}
      priority={priority}
      className={className}
    />
  );
}
