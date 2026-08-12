export type PaymentMethod = "credit" | "debit" | "pix";

export interface Ticket {
  id: string;
  description: string;
  seatNumber: string;
  type: "INTEIRA" | "MEIA";
  price: number;
}

export interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface PurchaseSummary {
  _id: string;

  movie: string;
  session: string;
  room: string;
  seats: string[];
  tickets: Ticket[];
  products: Product[];
  discount: number;
  total: number;
}
