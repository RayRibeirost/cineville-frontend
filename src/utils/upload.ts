/**
 * Limites de upload de imagem.
 *
 * `MAX_IMAGE_BYTES` espelha `IMAGE_UPLOAD_LIMITS.MAX_FILE_SIZE_BYTES` do
 * backend: o multer recusa qualquer arquivo acima disso.
 *
 * `MAX_UPLOAD_BYTES` é o teto do corpo de uma Server Action e por isso é
 * consumido pelo `next.config.ts` (`serverActions.bodySizeLimit`). O padrão do
 * Next é 1 MB, o que estoura já no primeiro banner e devolve um 413 sem
 * mensagem aproveitável — o cadastro de filme manda banner + uma foto por ator
 * na mesma requisição.
 */
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
export const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;

function toMb(bytes: number): string {
  return `${Math.round(bytes / (1024 * 1024))} MB`;
}

/**
 * Confere os arquivos antes de gastar o upload.
 *
 * Devolve a mensagem de erro ou `null` quando tudo cabe. Vale checar no
 * cliente porque os dois estouros acontecem longe do usuário: o do arquivo
 * único vira erro do multer no backend, e o do total vira 413 do Next antes de
 * a Server Action sequer rodar.
 */
export function validateImageUpload(
  files: (File | null | undefined)[],
): string | null {
  const present = files.filter((file): file is File => !!file && file.size > 0);

  const tooBig = present.find((file) => file.size > MAX_IMAGE_BYTES);

  if (tooBig) {
    return `A imagem "${tooBig.name}" tem ${toMb(tooBig.size)}. O limite é ${toMb(MAX_IMAGE_BYTES)} por arquivo.`;
  }

  const total = present.reduce((sum, file) => sum + file.size, 0);

  if (total > MAX_UPLOAD_BYTES) {
    return `As imagens somam ${toMb(total)} e o envio aceita no máximo ${toMb(MAX_UPLOAD_BYTES)}. Reduza o tamanho dos arquivos ou cadastre menos atores por vez.`;
  }

  return null;
}
