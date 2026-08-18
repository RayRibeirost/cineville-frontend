import { TicketType } from "@/src/types/ticket";

/** Rótulos exibidos para o usuário. Os valores são os do enum do backend. */
export const TICKET_TYPE_LABELS: Record<TicketType, string> = {
  INTEIRA: "Inteira",
  MEIA: "Meia-entrada",
};

export const TICKET_TYPE_OPTIONS: { value: TicketType; label: string }[] = [
  { value: "INTEIRA", label: TICKET_TYPE_LABELS.INTEIRA },
  { value: "MEIA", label: TICKET_TYPE_LABELS.MEIA },
];

/**
 * Preço do ingresso a partir do preço da sessão, em centavos.
 *
 * SERVE APENAS PARA FEEDBACK VISUAL enquanto o usuário escolhe o tipo. O valor
 * cobrado é o que o backend calcula em `OrdersService` (meia = metade do preço
 * da sessão) e devolve em `order.seats[].pricePaid` — é esse que aparece no
 * resumo da compra, no pedido e no ingresso.
 *
 * `Math.round` porque centavos são inteiros: uma sessão de R$ 35,01 tem meia
 * de R$ 17,51 na tela, e não R$ 17,505.
 */
export function ticketPriceFromSession(
  sessionPriceInCents: number | undefined,
  type: TicketType,
): number {
  const price = sessionPriceInCents ?? 0;

  return type === "MEIA" ? Math.round(price / 2) : price;
}
