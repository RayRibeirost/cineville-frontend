"use server";

import { apiRequest } from "@/src/lib/api";
import { generateQrCode } from "@/src/lib/qrcode";
import {
  ActionResult,
  Classification,
  MovieLanguage,
  RoomType,
} from "@/src/types/admin";
import { Ticket, TicketStatus, TicketType } from "@/src/types/ticket";

/**
 * Formatos reais devolvidos pelo backend.
 *
 * `/tickets` popula `userId`, `sessionId` (com `cinemaId` e `movieId` dentro)
 * e `orderId`. Ou seja: estes campos chegam como objetos, não como ids — era
 * exatamente isso que quebrava a tela, que os tratava como string.
 */
interface RawCinema {
  _id: string;
  name: string;
  city?: string;
  state?: string;
}

interface RawMovie {
  _id: string;
  title: string;
  classification?: Classification;
  banner?: string;
  duration?: number;
}

interface RawSession {
  _id: string;
  movieTitle: string;
  roomName: string;
  roomType?: RoomType;
  language?: MovieLanguage;
  /** "DD/MM/AAAA HH:MM" */
  dateTime: string;
  price: number;
  cinemaId?: RawCinema | string;
  movieId?: RawMovie | string;
}

interface RawUser {
  _id: string;
  name?: string;
  surname?: string;
  email?: string;
}

interface RawOrderRef {
  _id: string;
  status?: string;
  totalAmount?: number;
  createdAt?: string;
  ticketPdfUrl?: string;
}

interface RawTicket {
  _id: string;
  userId?: RawUser | string;
  sessionId?: RawSession | string;
  orderId?: RawOrderRef | string;
  ticketNumber?: string;
  qrCode?: string;
  seatNumber: string;
  type: TicketType;
  status?: TicketStatus;
  /** Em centavos. */
  pricePaid: number;
  createdAt?: string;
}

/** Envelope paginado de `GET /tickets` — `{ message, items, total, page, limit }`. */
interface RawTicketsPage {
  items?: RawTicket[];
  total?: number;
  page?: number;
  limit?: number;
}

function isObject<T>(value: T | string | undefined): value is T {
  return typeof value === "object" && value !== null;
}

/**
 * As rotas de ingresso usam dois envelopes diferentes: `/tickets/my-tickets`
 * responde `{ message, data: [...] }` (e o `apiRequest` já desembrulha o
 * `data`), enquanto `/tickets` espalha a paginação no topo, sem `data`, e
 * chega aqui como o objeto inteiro. Tratar os dois num lugar só evita que a
 * tela chame `.map` num objeto — o TypeError que derrubava "Meus Ingressos".
 */
function toTicketArray(
  payload: RawTicket[] | RawTicketsPage | null | undefined,
): RawTicket[] {
  if (Array.isArray(payload)) return payload;

  return payload?.items ?? [];
}

/** Fallback só para ingressos anteriores ao campo `ticketNumber`. */
function fallbackCode(ticketId: string): string {
  return `SMV-${ticketId.slice(-8).toUpperCase()}`;
}

async function toTicket(raw: RawTicket): Promise<Ticket | null> {
  // Sem a sessão não há ingresso exibível: filme, sala e horário vêm dela.
  if (!isObject<RawSession>(raw.sessionId)) return null;

  const session = raw.sessionId;
  const movie = isObject<RawMovie>(session.movieId)
    ? session.movieId
    : undefined;
  const cinema = isObject<RawCinema>(session.cinemaId)
    ? session.cinemaId
    : undefined;
  const holder = isObject<RawUser>(raw.userId) ? raw.userId : undefined;
  const order = isObject<RawOrderRef>(raw.orderId) ? raw.orderId : undefined;

  const holderName = holder
    ? [holder.name, holder.surname].filter(Boolean).join(" ")
    : undefined;

  return {
    _id: raw._id,
    ticketNumber: raw.ticketNumber,
    code: raw.ticketNumber ?? fallbackCode(raw._id),
    type: raw.type,
    seatNumber: raw.seatNumber,
    price: raw.pricePaid ?? 0,
    purchasedAt: raw.createdAt ?? "",
    status: raw.status ?? "valido",

    qrPayload: raw.qrCode,
    qrImage: raw.qrCode ? await generateQrCode(raw.qrCode) : undefined,

    sessionId: session._id,
    sessionDateTime: session.dateTime,
    roomName: session.roomName,
    roomType: session.roomType,
    language: session.language,

    movieId: movie?._id,
    movieTitle: movie?.title ?? session.movieTitle,
    movieBanner: movie?.banner,
    classification: movie?.classification,

    cinemaName: cinema?.name,
    cinemaCity: cinema?.city,

    orderId: order?._id ?? (typeof raw.orderId === "string" ? raw.orderId : undefined),
    ticketPdfUrl: order?.ticketPdfUrl,

    holderName: holderName || undefined,
    holderEmail: holder?.email || undefined,
  };
}

/** Mais recentes primeiro — é a ordem em que o usuário espera encontrá-los. */
async function buildTickets(raw: RawTicket[]): Promise<Ticket[]> {
  const tickets = await Promise.all(raw.map(toTicket));

  return tickets
    .filter((ticket): ticket is Ticket => ticket !== null)
    .sort(
      (a, b) =>
        new Date(b.purchasedAt).getTime() - new Date(a.purchasedAt).getTime(),
    );
}

/**
 * Ingressos do usuário logado.
 *
 * `GET /tickets/my-tickets` filtra por `req.user.sub` no backend e devolve
 * sempre os ingressos do próprio usuário, mesmo para administradores.
 */
export async function getMyTickets(): Promise<ActionResult<Ticket[]>> {
  const result = await apiRequest<RawTicket[] | RawTicketsPage>(
    "/tickets/my-tickets",
    { fallbackError: "Não foi possível carregar seus ingressos." },
  );

  if (!result.success) return result;

  return { success: true, data: await buildTickets(toTicketArray(result.data)) };
}

/**
 * Listagem de ingressos conforme o papel do requisitante.
 *
 * `GET /tickets` é sensível ao papel no backend (`findAllForRequester`):
 * usuário comum recebe os próprios ingressos, administrador recebe todos.
 * A rota é paginada, então pedimos um limite alto — a tela filtra em memória.
 */
export async function getAllTickets(
  page = 1,
  limit = 100,
): Promise<ActionResult<Ticket[]>> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const result = await apiRequest<RawTicket[] | RawTicketsPage>(
    `/tickets?${params}`,
    { fallbackError: "Não foi possível carregar os ingressos." },
  );

  if (!result.success) return result;

  return { success: true, data: await buildTickets(toTicketArray(result.data)) };
}

/**
 * Ingressos emitidos para um pedido.
 *
 * Filtra a listagem do próprio usuário por `orderId` em vez de ler
 * `order.tickets`: em `/orders/:id` os ingressos vêm sem filme, cinema e
 * sessão populados, e é justamente isso que o ingresso precisa mostrar.
 * Enquanto o pagamento não é aprovado a lista volta vazia — é assim que a
 * tela de confirmação sabe que o ingresso ainda não foi emitido.
 */
export async function getTicketsForOrder(
  orderId: string,
): Promise<ActionResult<Ticket[]>> {
  const mine = await getMyTickets();

  if (!mine.success) return mine;

  return {
    success: true,
    data: mine.data.filter((ticket) => ticket.orderId === orderId),
  };
}
