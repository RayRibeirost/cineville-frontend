'use client';

import { useEffect, useState, useTransition } from 'react';
import { SessionInfo } from '@/src/types/session-types';
import { useSeatSelection } from '@/src/hooks/useSeatSelection';
import { SeatMapHeader } from './SeatMapHeader';
import { SeatMapSidebar } from './SeatMapSidebar';
import { SeatMapFooter } from './SeatMapFooter';
import { SeatGrid } from './SeatMapGrid';
import { SeatRow } from '@/src/utils/seat-rows';
import { createTickets, getSessionDetails } from '@/src/actions/sessionActions';

export default function SeatMapModal({
  isOpen,
  onClose,
  sessionId,
}: {
  isOpen: boolean;
  onClose: () => void;
  sessionId: string;
}) {
  const { selectedSeats, selectedCount, toggleSeat } = useSeatSelection();
  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);
  const [seatRows, setSeatRows] = useState<SeatRow[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [purchaseError, setPurchaseError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    getSessionDetails(sessionId).then((result) => {
      console.log('RESULTADO:', result);
      if (!result.success) {
        setLoadError(result.error);
        return;
      }
      setSessionInfo(result.sessionInfo);
      setSeatRows(result.seatRows);
    });

    return () => {
      setSessionInfo(null);
      setSeatRows([]);
      setLoadError(null);
      setPurchaseError(null);
    };
  }, [isOpen, sessionId]);

  const totalSeatsCount = seatRows.reduce(
    (total, { seats }) => total + seats.filter((s) => s !== null).length,
    0,
  );

  function handleConfirm() {
    setPurchaseError(null);
    startTransition(async () => {
      const { results, allSucceeded } = await createTickets(
        sessionId,
        Array.from(selectedSeats),
      );

      if (!allSucceeded) {
        const failed = results.filter((r) => !r.success);
        setPurchaseError(
          `Não foi possível reservar: ${failed.map((f) => f.seatNumber).join(', ')}. Tente novamente.`,
        );
        return;
      }

      onClose();
    });
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-240 max-h-[90vh] overflow-hidden rounded-2xl bg-[#181818] p-6 text-white shadow-2xl border border-neutral-800"
        onClick={(e) => e.stopPropagation()}
      >
        <SeatMapHeader onClose={onClose} />

        {loadError && (
          <p className="text-center text-sm text-red-500 py-8">{loadError}</p>
        )}

        {!loadError && !sessionInfo && (
          <p className="text-center text-sm text-neutral-400 py-8">Carregando sessão...</p>
        )}

        {sessionInfo && (
          <>
            <div className="flex flex-col gap-8 lg:flex-row items-start justify-between">
              <SeatGrid
                seatRows={seatRows}
                selectedSeats={selectedSeats}
                toggleSeat={toggleSeat}
                screenType={sessionInfo.screenType}
                room={sessionInfo.room}
              />

              <SeatMapSidebar
                totalSeatsCount={totalSeatsCount}
                selectedCount={selectedCount}
              />
            </div>

            {purchaseError && (
              <p className="text-center text-sm text-red-500 mt-4">{purchaseError}</p>
            )}

            <SeatMapFooter
              session={sessionInfo}
              selectedCount={selectedCount}
              onConfirm={handleConfirm}
            />
          </>
        )}
      </div>
    </div>
  );
}