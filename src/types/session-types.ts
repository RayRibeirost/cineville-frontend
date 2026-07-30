import { BackendSeat, SeatRow } from "../utils/seat-rows";

export type SeatType =
  | "comum"
  | "preferencial"
  | "cadeirante"
  | "acompanhante"
  | "obesa"
  | "indisponivel";

export interface SessionInfo {
  movieTitle: string;
  city: string;
  date: string;
  time: string;
  audio: string;
  room: string;
  screenType: string;
}

export interface SeatProps {
  type: SeatType;
  isSelected: boolean;
  onClick: () => void;
}

export interface SeatMapHeaderProps {
  onClose: () => void;
}

export interface SeatGridProps {
  seatRows: SeatRow[];
  selectedSeats: Set<string>;
  toggleSeat: (seatId: string, type: SeatType) => void;
  screenType: string;
  room: string;
}

export interface SeatMapSidebarProps {
  totalSeatsCount: number;
  selectedCount: number;
}

export interface SeatMapFooterProps {
  session: SessionInfo;
  selectedCount: number;
  onConfirm: () => void;
  isLoading: boolean;
}

export interface BackendSession {
  _id: string;
  cinemaId: string;
  movieId: string;
  movieTitle: string;
  roomName: string;
  roomType: string;
  dateTime: string;
  price: number;
  seats: BackendSeat[];
}

export interface BackendCinema {
  id: string;
  name: string;
  city: string;
}
