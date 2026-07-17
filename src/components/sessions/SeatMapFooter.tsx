'use client';

import { SeatMapFooterProps } from '@/src/types/session-types';
import { User, MapPin, Calendar, Clock } from 'lucide-react';

export function SeatMapFooter({ session, selectedCount, onConfirm }: SeatMapFooterProps) {
  return (
    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-800 pt-6">
      <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold tracking-wider text-neutral-300">
        <span className="flex items-center gap-2 bg-[#222] px-3 py-1.5 rounded-md uppercase">
          <User size={14} className="text-neutral-400" /> {session.movieTitle}
        </span>
        <span className="flex items-center gap-2 bg-[#222] px-3 py-1.5 rounded-md uppercase">
          <MapPin size={14} className="text-neutral-400" /> {session.city}
        </span>
        <span className="flex items-center gap-2 bg-[#222] px-3 py-1.5 rounded-md uppercase">
          <Calendar size={14} className="text-neutral-400" /> {session.date}
        </span>
        <span className="flex items-center gap-2 bg-[#222] px-3 py-1.5 rounded-md uppercase">
          <Clock size={14} className="text-neutral-400" /> {session.time}, {session.audio}
        </span>
      </div>

      <button
        type="button"
        onClick={onConfirm}
        disabled={selectedCount === 0}
        className="w-full sm:w-auto rounded-lg bg-red-600 px-6 py-2.5 text-xs font-bold text-white uppercase tracking-wider transition-colors hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-neutral-800 disabled:text-neutral-500"
      >
        Continuar
      </button>
    </div>
  );
}