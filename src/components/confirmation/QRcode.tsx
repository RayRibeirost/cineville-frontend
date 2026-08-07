import Image from "next/image";

export default function QRCode() {
  return (
    <Image src="/assets/qrcode.png" width={180} height={180} alt="QR Code" />
  );
}
