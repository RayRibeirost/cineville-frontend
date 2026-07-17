"use server";

import { cookies } from "next/headers";
import { buildSeatLayout, SeatRow } from "@/src/utils/seat-rows";
import { BackendCinema, BackendSession, SessionInfo } from "@/src/types/session-types";
import { buildAuthHeaders } from "./http";

const MONTHS = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

function parseSessionDateTime(
  dateTime: string,
): { day: string; month: string; time: string } | null {
  const [datePart, timePart] = dateTime.split(" ");
  if (!datePart || !timePart) return null;

  const [day, month] = datePart.split("/");
  if (!day || !month) return null;

  return { day, month, time: timePart };
}

export async function getSessionDetails(sessionId: string): Promise<
  | {
      success: true;
      sessionInfo: SessionInfo;
      seatRows: SeatRow[];
      price: number;
    }
  | { success: false; error: string }
> {
  const headers = await buildAuthHeaders();

  const sessionRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/sessions/${sessionId}`,
    { method: "GET", headers, cache: "no-store" },
  );
  if (!sessionRes.ok) {
    return { success: false, error: "Sessão não encontrada." };
  }

  const { data: session } = (await sessionRes.json()) as {
    data: BackendSession;
  };

  const cinemaRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/cinemas/${session.cinemaId}`,
    { headers, cache: "no-store" },
  );

  const cinema = cinemaRes.ok
    ? ((await cinemaRes.json()).data as BackendCinema)
    : undefined;

  const parsedDate = parseSessionDateTime(session.dateTime);
  if (!parsedDate) {
    return { success: false, error: "Data da sessão em formato inválido." };
  }

  const monthIndex = Number(parsedDate.month) - 1;
  const monthLabel = MONTHS[monthIndex] ?? parsedDate.month;

  return {
    success: true,
    sessionInfo: {
      movieTitle: session.movieTitle,
      city: cinema?.city ?? "",
      date: `${parsedDate.day} ${monthLabel}`,
      time: parsedDate.time.replace(":", "h"),
      audio: session.roomType,
      room: session.roomName,
      screenType: `Tela - ${session.roomType}`,
    },
    seatRows: buildSeatLayout(session.seats),
    price: session.price,
  };
}

interface TicketResult {
  seatNumber: string;
  success: boolean;
  error?: string;
}

export async function createTickets(
  sessionId: string,
  seatNumbers: string[],
): Promise<{ results: TicketResult[]; allSucceeded: boolean }> {
  const token = (await cookies()).get("auth_token")?.value;

  if (!token) {
    const results: TicketResult[] = seatNumbers.map((seatNumber) => ({
      seatNumber,
      success: false,
      error: "Usuário não autenticado.",
    }));
    return { results, allSucceeded: false };
  }

  const results: TicketResult[] = await Promise.all(
    seatNumbers.map(async (seatNumber): Promise<TicketResult> => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ sessionId, seatNumber, type: "FULL" }),
        });

        const json = await res.json();

        if (!res.ok) {
          return {
            seatNumber,
            success: false,
            error:
              typeof json?.message === "string"
                ? json.message
                : "Erro ao comprar ingresso.",
          };
        }

        return { seatNumber, success: true };
      } catch {
        return {
          seatNumber,
          success: false,
          error: "Erro ao comprar ingresso.",
        };
      }
    }),
  );

  return { results, allSucceeded: results.every((r) => r.success) };
}
