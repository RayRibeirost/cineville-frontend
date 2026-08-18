import QRCode from "qrcode";

/**
 * Gera a imagem do QR Code do ingresso.
 *
 * O conteúdo codificado NÃO é montado aqui: quem emite é o backend
 * (`TicketCodeService`), que assina o número do ingresso com HMAC e guarda o
 * texto no campo `qrCode`. O frontend só rasteriza esse texto — um payload
 * montado no cliente não teria a assinatura e seria recusado na portaria.
 *
 * Data URL (e não SVG) porque o ingresso vira PDF pelo html2pdf.js, que
 * rasteriza a tela com html2canvas: `<img src="data:image/png">` é o formato
 * que atravessa esse caminho sem depender de requisição externa.
 */
export async function generateQrCode(content: string): Promise<string> {
  return QRCode.toDataURL(content, {
    errorCorrectionLevel: "M",
    margin: 1,
    width: 320,
    color: {
      dark: "#000000",
      light: "#ffffff",
    },
  });
}
