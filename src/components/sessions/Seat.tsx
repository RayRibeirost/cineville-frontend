'use client';

import React from 'react';
import { Accessibility } from 'lucide-react';
import { SeatProps, SeatType } from '@/src/types/session-types';


export const Seat = React.memo(({ type, isSelected, onClick }: SeatProps) => {
  const isDisabled = type === 'indisponivel';

  const baseClasses =
    'flex h-[clamp(26px,3.4vh,44px)] w-[clamp(24px,2.8vw,40px)] items-center justify-center rounded-lg text-sm font-extrabold transition-all border border-black/10 shadow-sm ';

  let stateClasses = 'bg-white text-black hover:bg-neutral-100 cursor-pointer';

  if (isDisabled) {
    stateClasses = 'bg-neutral-800 text-neutral-600 cursor-not-allowed';
  } else if (isSelected) {
    stateClasses = 'bg-zinc-500 text-white cursor-pointer';
  }

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      aria-pressed={isSelected}
      className={`${baseClasses} ${stateClasses}`}
    >
      <SeatIcon type={type} isSelected={isSelected} />
    </button>
  );
});

Seat.displayName = 'Seat';

export function SeatIcon({
  type,
  isSelected,
  className,
}: {
  type: SeatType | 'selecionado';
  isSelected?: boolean;
  className?: string;
}) {
  if (type === 'selecionado') {
    return (
      <span
        className={`inline-block rounded-lg bg-zinc-500 border border-black/10 ${className ?? 'h-11 w-9'}`}
      />
    );
  }

  if (isSelected && type === 'comum') return null;

  switch (type) {
    case 'preferencial':
      return <span className="text-[15px]">P</span>;
    case 'cadeirante':
      return <Accessibility size={18} strokeWidth={2.5}  />;
    case 'acompanhante':
      return <span className="text-[15px]">A</span>;
    case 'obesa':
      return <span className="text-[15px]">O</span>;
    case 'indisponivel':
      return <span className="text-[15px]">X</span>;
    case 'comum':
    default:
      return className ? (
        <span className={`inline-block rounded-lg bg-white border border-black/10 ${className}`} />
      ) : null;
  }
}