export function formatDate(date: string) {
  if (!date) return "";

  const [year, month, day] = date.split("-");

  return `${day}/${month}/${year}`;
}

/** Converte "DD/MM/AAAA" (formato de dateTime do backend) em Date local. */
export function parseBrDate(date: string): Date {
  const [day = 0, month = 0, year = 0] = date.split("/").map(Number);

  return new Date(year, month - 1, day);
}

/**
 * "DD/MM/AAAA HH:MM" (formato de `dateTime` da sessão) → Date local.
 * Retorna null quando o formato não bate, para o chamador decidir o que fazer.
 */
export function parseBrDateTime(dateTime: string): Date | null {
  const [datePart, timePart] = dateTime?.split(" ") ?? [];

  if (!datePart || !timePart) return null;

  const date = parseBrDate(datePart);
  const [hours = 0, minutes = 0] = timePart.split(":").map(Number);

  date.setHours(hours, minutes, 0, 0);

  return Number.isNaN(date.getTime()) ? null : date;
}

/** Date → "DD/MM/AAAA HH:MM", o mesmo formato que o backend usa. */
export function formatBrDateTime(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, "0");

  return (
    `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}` +
    ` ${pad(date.getHours())}:${pad(date.getMinutes())}`
  );
}

/** Data de hoje em "DD/MM/AAAA", para comparar com o dateTime do backend. */
export function todayBrDate(): string {
  const now = new Date();

  return [
    String(now.getDate()).padStart(2, "0"),
    String(now.getMonth() + 1).padStart(2, "0"),
    now.getFullYear(),
  ].join("/");
}

/** "AAAA-MM-DD" (input type="date") → "DD/MM/AAAA" (formato do backend). */
export function isoToBrDate(value: string): string {
  if (!value) return "";

  const [year, month, day] = value.split("-");

  return `${day}/${month}/${year}`;
}

/** "DD/MM/AAAA" → "AAAA-MM-DD", para preencher input type="date". */
export function brToIsoDate(value: string): string {
  if (!value) return "";

  const [day, month, year] = value.split("/");

  return `${year}-${month}-${day}`;
}

/** Rótulo curto do chip de dia: "Hoje", "Amanhã" ou "Seg 18/08". */
export function formatDayLabel(date: string): string {
  const today = todayBrDate();

  if (date === today) return "Hoje";

  const parsed = parseBrDate(date);
  const tomorrow = parseBrDate(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (parsed.getTime() === tomorrow.getTime()) return "Amanhã";

  const weekday = parsed
    .toLocaleDateString("pt-BR", { weekday: "short" })
    .replace(".", "");

  const [day, month] = date.split("/");

  return `${weekday.charAt(0).toUpperCase()}${weekday.slice(1)} ${day}/${month}`;
}
