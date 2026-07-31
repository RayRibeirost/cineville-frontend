"use server";

import { cookies } from "next/headers";

export interface SeatDto {
  seatNumber: string;
  type: "INTEIRA" | "MEIA";
}

export async function createOrder(sessionId: string, seats: SeatDto[]) {
  const cookieStore = await cookies();

  const token = cookieStore.get("auth_token")?.value;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sessionId,
      seats,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const error = await response.json();

    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: true,
    order: await response.json(),
  };
}
