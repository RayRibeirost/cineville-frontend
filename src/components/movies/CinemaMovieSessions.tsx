import { MovieDetailsResult } from '@/src/types/movie-types';

interface CinemaSessionsProps {
  groups: MovieDetailsResult['groups'];
  onSelectSession: (id: string) => void;
}

export default function CinemaMovieSessions({ groups, onSelectSession }: CinemaSessionsProps) {
  return (
    <section>
      <h2 className="text-3xl font-black mb-8">Escolha seu Cinema</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {groups.map((group) => (
          <div
            key={group.key}
            className="bg-gray-surface rounded-xl p-6 flex flex-col gap-4 border border-grayScale-600 hover:border-red-cinema transition-all"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-black text-sm">{group.cinemaName}</h4>
              <span className="text-xs border border-red-cinema text-red-cinema px-2 py-1 rounded">
                {group.roomType}
              </span>
            </div>
            <p className="text-grayScale-400 text-xs flex items-center gap-1">
              {group.address}
            </p>
            <p className="font-bold text-sm">{group.language}</p>
            <div className="flex gap-2 flex-wrap">
              {group.showtimes.map((showtime) => (
                <button
                  key={showtime.sessionId}
                  onClick={() => onSelectSession(showtime.sessionId)}
                  className="px-3 py-1 rounded bg-grayScale-600 hover:bg-red-cinema text-xs font-semibold transition-all cursor-pointer"
                >
                  {showtime.time}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}