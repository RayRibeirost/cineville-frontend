'use client';

import { SeatGridProps } from '@/src/types/session-types';
import { Seat } from './Seat';

export function SeatGrid({
  seatRows,
  selectedSeats,
  toggleSeat,
  screenType,
  room,
}: SeatGridProps) {
  return (
    <div className="flex-1 w-full">
      <p className="mb-4 text-center text-xs font-bold tracking-widest text-neutral-300">
        {screenType.toUpperCase()} / {room.toUpperCase()}
      </p>

      <div className="flex flex-col gap-[clamp(2px,0.5vh,8px)] overflow-x-auto pb-2">
        {seatRows.map(({ row, seats }) => {
          if (row === 'F') {
            return <div key="row-F" className="h-4" />;
          }

          return (
            <div
              key={row}
              className="flex items-center justify-center gap-4 min-w-135"
            >
              <span className="w-5 text-sm font-semibold text-neutral-400 text-center">
                {row}
              </span>

              <div className="flex gap-1">
                {seats.map((seat, index) => {
                  if (!seat) {
                    return <div key={`${row}-${index}`} className="h-11 w-9" />;
                  }

                  const displayType = seat.isOccupied ? 'indisponivel' : seat.type;
                  const isSelected = selectedSeats.has(seat.seatNumber);

                  return (
                    <Seat
                      key={seat.seatNumber}
                      type={displayType}
                      isSelected={isSelected}
                      onClick={() => toggleSeat(seat.seatNumber, displayType)}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}