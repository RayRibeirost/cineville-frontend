import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="assets/logo.svg"
      alt="Cineville"
      width={120}
      height={40}
      priority
    />
  );
}
