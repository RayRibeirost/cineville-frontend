"use server";

import { revalidatePath } from "next/cache";
import { apiRequest } from "@/src/lib/api";
import {
  ActionResult,
  MovieLanguage,
  ProductCategory,
  ProductSize,
  RoomType,
} from "@/src/types/admin";
import { TicketType } from "@/src/types/ticket";

/** Valores de OrderStatus no backend (português). */
export type OrderStatus =
  | "pedido_realizado"
  | "pagamento_pendente"
  | "pagamento_aprovado"
  | "pagamento_recusado"
  | "pedido_cancelado"
  | "expirado"
  | "reembolso_solicitado"
  | "reembolso_aprovado"
  | "reembolso_recusado";

export interface OrderSeatItem {
  seatNumber: string;
  type: TicketType;
  /** Em centavos. */
  pricePaid: number;
}

export interface OrderProductItem {
  id: string;
  name: string;
  category?: ProductCategory;
  size?: ProductSize;
  imageUrl?: string;
  quantity: number;
  /** Preço unitário em centavos. */
  unitPrice: number;
  /** Total da linha em centavos (unitário × quantidade). */
  pricePaid: number;
}

export interface Order {
  id: string;
  status: OrderStatus;
  createdAt: string;

  seats: OrderSeatItem[];
  products: OrderProductItem[];
  /** Ingressos efetivamente emitidos (só existem após o pagamento aprovado). */
  ticketsCount: number;

  /** Todos em centavos. */
  subtotal: number;
  discount: number;
  total: number;
  ticketsTotal: number;
  productsTotal: number;

  paymentApproved: boolean;
  ticketAvailable: boolean;

  movieTitle?: string;
  movieBanner?: string;
  roomName?: string;
  roomType?: RoomType;
  language?: MovieLanguage;
  /** "DD/MM/AAAA HH:MM" */
  sessionDateTime?: string;
  cinemaName?: string;

  user?: { id: string; name: string; email: string };
}

export interface OrdersPage {
  items: Order[];
  total: number;
  page: number;
  limit: number;
}

/*
 * Formatos reais devolvidos por `GET /orders` e `GET /orders/:id`.
 *
 * O backend popula usuário, sessão (com cinema e filme dentro), ingressos e
 * `products.product`. Tratar `products[].product` como id era o motivo de a
 * bomboniere não aparecer no pedido: o nome existia, mas o frontend procurava
 * por uma string onde já havia um objeto.
 */
interface RawCinema {
  _id: string;
  name: string;
  city?: string;
}

interface RawMovie {
  _id: string;
  title: string;
  banner?: string;
}

interface RawSession {
  _id: string;
  movieTitle: string;
  roomName: string;
  roomType?: RoomType;
  language?: MovieLanguage;
  dateTime: string;
  price: number;
  cinemaId?: RawCinema | string;
  movieId?: RawMovie | string;
}

interface RawProduct {
  _id: string;
  name: string;
  category?: ProductCategory;
  size?: ProductSize;
  /** Preço unitário em centavos. */
  price?: number;
  imageUrl?: string;
}

interface RawOrder {
  _id: string;
  user?: { _id: string; name?: string; surname?: string; email?: string } | string;
  session?: RawSession | string;
  seats?: OrderSeatItem[];
  tickets?: unknown[];
  products?: {
    product?: RawProduct | string;
    quantity: number;
    /** Total da linha em centavos. */
    pricePaid: number;
  }[];
  subtotalAmount: number;
  discountAmount: number;
  totalAmount: number;
  status: OrderStatus;
  paymentApproved: boolean;
  ticketGeneratedAt?: string;
  createdAt: string;
}

/** Envelope de `GET /orders` — `{ items, total, page, limit }`, sem `data`. */
interface RawOrdersPage {
  items?: RawOrder[];
  total?: number;
  page?: number;
  limit?: number;
}

function isObject<T>(value: T | string | undefined): value is T {
  return typeof value === "object" && value !== null;
}

function toOrder(raw: RawOrder): Order {
  const session = isObject<RawSession>(raw.session) ? raw.session : undefined;
  const movie = session && isObject<RawMovie>(session.movieId)
    ? session.movieId
    : undefined;
  const cinema = session && isObject<RawCinema>(session.cinemaId)
    ? session.cinemaId
    : undefined;

  const products: OrderProductItem[] = (raw.products ?? []).flatMap((item) => {
    const product = isObject<RawProduct>(item.product)
      ? item.product
      : undefined;

    // Produto não populado só acontece se o registro tiver sido removido do
    // catálogo; nesse caso ainda mostramos quantidade e valor pagos, que são
    // dados do próprio pedido.
    return [
      {
        id: product?._id ?? (typeof item.product === "string" ? item.product : ""),
        name: product?.name ?? "Produto indisponível",
        category: product?.category,
        size: product?.size,
        imageUrl: product?.imageUrl,
        quantity: item.quantity,
        unitPrice: product?.price ?? Math.round(item.pricePaid / item.quantity),
        pricePaid: item.pricePaid,
      },
    ];
  });

  const seats = raw.seats ?? [];

  const ticketsTotal = seats.reduce((acc, seat) => acc + seat.pricePaid, 0);
  const productsTotal = products.reduce(
    (acc, product) => acc + product.pricePaid,
    0,
  );

  const rawUser = raw.user;

  return {
    id: raw._id,
    status: raw.status,
    createdAt: raw.createdAt,

    seats,
    products,
    ticketsCount: raw.tickets?.length ?? 0,

    subtotal: raw.subtotalAmount ?? 0,
    discount: raw.discountAmount ?? 0,
    total: raw.totalAmount ?? 0,
    ticketsTotal,
    productsTotal,

    paymentApproved: !!raw.paymentApproved,
    ticketAvailable: !!raw.ticketGeneratedAt && (raw.tickets?.length ?? 0) > 0,

    movieTitle: movie?.title ?? session?.movieTitle,
    movieBanner: movie?.banner,
    roomName: session?.roomName,
    roomType: session?.roomType,
    language: session?.language,
    sessionDateTime: session?.dateTime,
    cinemaName: cinema?.name,

    user: isObject(rawUser)
      ? {
          id: rawUser._id,
          name: [rawUser.name, rawUser.surname].filter(Boolean).join(" "),
          email: rawUser.email ?? "",
        }
      : undefined,
  };
}

/**
 * Listagem de pedidos.
 *
 * `GET /orders` é sensível ao papel no backend: usuário comum recebe apenas
 * os próprios pedidos, administrador recebe todos. A rota já devolve tudo
 * populado, então uma requisição basta — não há busca por pedido nem por
 * produto.
 */
async function loadOrders(
  page: number,
  limit: number,
  status?: OrderStatus,
): Promise<ActionResult<OrdersPage>> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (status) params.set("status", status);

  const result = await apiRequest<RawOrdersPage>(`/orders?${params}`, {
    fallbackError: "Não foi possível carregar os pedidos.",
  });

  if (!result.success) return result;

  const raw = result.data;
  const items = (raw?.items ?? []).map(toOrder);

  return {
    success: true,
    data: {
      items,
      total: raw?.total ?? items.length,
      page: raw?.page ?? page,
      limit: raw?.limit ?? limit,
    },
  };
}

/** Pedidos do usuário logado. */
export async function getMyOrders(
  page = 1,
  limit = 10,
  status?: OrderStatus,
): Promise<ActionResult<OrdersPage>> {
  return loadOrders(page, limit, status);
}

/**
 * Aprova o pagamento pendente de um pedido — só administrador.
 *
 * Existe porque o gateway é mockado: um PIX simulado fica pendente para
 * sempre, já que ninguém escaneia o QR Code de mentira. A rota
 * (`POST /payments/orders/:id/mock-approve`) some junto com o mock.
 *
 * O backend pode aprovar o pagamento e ainda assim não conseguir entregar o
 * pedido — assento vendido nesse meio-tempo, estoque acabado — e nesse caso
 * ele reverte o pagamento para recusado em vez de estourar. Por isso o status
 * devolvido é conferido aqui: sem isso a tela diria "aprovado" para um pedido
 * que terminou recusado.
 */
export async function approveOrderPayment(
  orderId: string,
): Promise<ActionResult<null>> {
  const result = await apiRequest<{ status?: string; failureReason?: string }>(
    `/payments/orders/${orderId}/mock-approve`,
    {
      method: "POST",
      fallbackError: "Não foi possível aprovar o pagamento.",
    },
  );

  if (!result.success) return result;

  if (result.data?.status === "REFUSED") {
    return {
      success: false,
      error:
        result.data.failureReason ??
        "O pagamento foi aprovado, mas o pedido não pôde ser finalizado.",
    };
  }

  revalidatePath("/admin/orders");
  revalidatePath("/admin/tickets");
  revalidatePath("/meus-pedidos");

  return { success: true, data: null };
}

/**
 * Todos os pedidos do sistema — visão de administrador.
 *
 * Mesma rota de `getMyOrders`: quem define o alcance é o papel no token, e
 * essa decisão pertence ao backend. Aqui o nome existe só para deixar a
 * intenção da tela explícita.
 */
export async function getAllOrders(
  page = 1,
  limit = 20,
  status?: OrderStatus,
): Promise<ActionResult<OrdersPage>> {
  return loadOrders(page, limit, status);
}

/** Detalhe de um pedido. A autorização é aplicada pelo backend. */
export async function getMyOrder(
  orderId: string,
): Promise<ActionResult<Order>> {
  const result = await apiRequest<RawOrder>(`/orders/${orderId}`, {
    fallbackError: "Pedido não encontrado.",
  });

  if (!result.success) return result;

  return { success: true, data: toOrder(result.data) };
}
