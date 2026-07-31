"use client";

import { useState } from "react";
import { SeatType } from "../types/session-types";

export function useSeatSelection(initialSelected: string[] = []) {
  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(
    new Set(initialSelected),
  );

  const toggleSeat = (seatId: string, type: SeatType) => {
    if (type === "indisponivel") return;

    setSelectedSeats((prev) => {
      const next = new Set(prev);

      if (next.has(seatId)) {
        next.delete(seatId);
      } else {
        next.add(seatId);
      }

      return next;
    });
  };

  return {
    selectedSeats,
    selectedCount: selectedSeats.size,
    toggleSeat,
  };
}
