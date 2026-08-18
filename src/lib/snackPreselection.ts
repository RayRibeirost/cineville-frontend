/**
 * Pré-seleção da bomboniere feita fora do fluxo de compra (na Home, por
 * exemplo).
 *
 * Por que não é um pedido de verdade: no backend, `POST /orders` exige
 * `sessionId` e assentos — não existe pedido só de bomboniere. Então o que a
 * Home guarda é uma intenção de compra, que o modal da bomboniere carrega já
 * preenchida quando o usuário escolhe a sessão. O pedido continua sendo criado
 * num lugar só, em `PATCH /orders/:id/products`.
 *
 * Fica no localStorage porque precisa sobreviver à navegação entre a Home e a
 * página do filme, que são páginas diferentes.
 */

export interface SnackPreselectionItem {
  productId: string;
  quantity: number;
}

const STORAGE_KEY = "smallville:bomboniere-preselecao";

/** Evento disparado a cada alteração, para os steppers da tela se sincronizarem. */
export const SNACK_PRESELECTION_EVENT = "smallville:bomboniere-preselecao";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function readSnackPreselection(): SnackPreselectionItem[] {
  if (!isBrowser()) return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item): item is SnackPreselectionItem =>
        !!item &&
        typeof item === "object" &&
        typeof (item as SnackPreselectionItem).productId === "string" &&
        typeof (item as SnackPreselectionItem).quantity === "number" &&
        (item as SnackPreselectionItem).quantity > 0,
    );
  } catch {
    // Storage corrompido ou bloqueado pelo navegador: seguimos sem pré-seleção.
    return [];
  }
}

function write(items: SnackPreselectionItem[]): void {
  if (!isBrowser()) return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event(SNACK_PRESELECTION_EVENT));
  } catch {
    // Modo privado / storage cheio: a pré-seleção é um atalho, não pode
    // derrubar a tela.
  }
}

/** Define a quantidade de um produto. Zero (ou menos) remove o item. */
export function setSnackQuantity(productId: string, quantity: number): void {
  const items = readSnackPreselection().filter(
    (item) => item.productId !== productId,
  );

  if (quantity > 0) {
    items.push({ productId, quantity });
  }

  write(items);
}

export function getSnackQuantity(productId: string): number {
  return (
    readSnackPreselection().find((item) => item.productId === productId)
      ?.quantity ?? 0
  );
}

/**
 * Assinatura para `useSyncExternalStore`: avisa a tela sempre que a
 * pré-seleção muda, inclusive quando a mudança veio de outro card.
 */
export function subscribeToSnackPreselection(onChange: () => void): () => void {
  if (!isBrowser()) return () => {};

  window.addEventListener(SNACK_PRESELECTION_EVENT, onChange);

  return () => window.removeEventListener(SNACK_PRESELECTION_EVENT, onChange);
}

export function clearSnackPreselection(): void {
  if (!isBrowser()) return;

  try {
    window.localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event(SNACK_PRESELECTION_EVENT));
  } catch {
    // Idem: falha de storage não interrompe a compra.
  }
}
