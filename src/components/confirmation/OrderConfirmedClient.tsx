"use client";

import { useState } from "react";
import OrderConfirmedModal from "./OrderConfirmed";

export default function OrderConfirmedClient() {
  const [open, setOpen] = useState(true);

  return <OrderConfirmedModal isOpen={open} onClose={() => setOpen(false)} />;
}
