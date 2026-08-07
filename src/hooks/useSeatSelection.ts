"use client";

import { useState } from "react";
import { SeatType } from "../types/session-types";
export interface SelectedSeat {
  seatNumber: string;
  type: "INTEIRA" | "MEIA";
}
export function useSeatSelection(initialSelected: string[] = []) {
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeat[]>(
    initialSelected.map((seat) => ({
      seatNumber: seat,
      type: "INTEIRA",
    })),
  );

  const toggleSeat = (
    seatNumber: string,
    seatType: SeatType,
    ticketType: "INTEIRA" | "MEIA" = "INTEIRA",
  ) => {
    if (seatType === "indisponivel") return;

    setSelectedSeats((prev) => {
      const exists = prev.find((seat) => seat.seatNumber === seatNumber);

      if (exists) {
        return prev.filter((seat) => seat.seatNumber !== seatNumber);
      }

      return [
        ...prev,
        {
          seatNumber,
          type: ticketType,
        },
      ];
    });
  };

  return {
    selectedSeats,
    selectedCount: selectedSeats.length,
    toggleSeat,
  };
}
