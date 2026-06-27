import Image from "next/image";

export default function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="assets/logo.svg"
      alt="Cineville"
      width={120}
      height={40}
      priority
      className={className}
    />
  );
}
