import Image from "next/image";

export default function QRCode() {
  return (
    <Image src="/assets/qrcode.png" width={90} height={90} alt="QR Code" />
  );
}
