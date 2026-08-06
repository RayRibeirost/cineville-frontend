"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function createPayment(
  orderId: string,
  method: "pix" | "cartao_credito" | "cartao_debito",
) {
  const token = (await cookies()).get("auth_token")?.value;
  const body = {
    orderId,
    method,
  };
  console.log(body);
  const response = await fetch(`${API_URL}/payments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderId,
      method,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
  console.log("API RESPONSE", data);
  return data;
}

export async function getPaymentStatus(paymentId: string) {
  const token = (await cookies()).get("auth_token")?.value;

  const response = await fetch(`${API_URL}/payments/${paymentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function cancelPayment(orderId: string) {
  const token = (await cookies()).get("auth_token")?.value;

  const response = await fetch(`${API_URL}/payments/orders/${orderId}/cancel`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
}
