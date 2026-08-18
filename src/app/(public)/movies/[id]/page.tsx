"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer/Footer";
import SeatMapModal from "@/src/components/sessions/SeatMapModal";
import { MovieDetailsResult } from "@/src/types/movie-types";
import { getMovieWithSessions } from "@/src/actions/movieActions";
import MovieBanner from "@/src/components/movies/MovieBanner";
import MovieInfo from "@/src/components/movies/MovieInfo";
import MovieCast from "@/src/components/movies/MovieCast";
import CinemaMovieSessions from "@/src/components/movies/CinemaMovieSessions";

export default function MoviePage() {
  const { id } = useParams<{ id: string }>();
  const [details, setDetails] = useState<MovieDetailsResult | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    getMovieWithSessions(id).then((result) => {
      if (!result.success) {
        setLoadError(result.error);
        return;
      }
      setDetails(result.data);
    });
  }, [id]);

  if (loadError || !details) {
    return (
      <div className="min-h-screen bg-deep-black flex flex-col">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-grayScale-400 text-lg">
            {loadError || "Carregando..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />

      <div className="bg-deep-black text-grayScale-200 min-h-screen">
        <MovieBanner bannerUrl={details.movie.banner} />

        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 flex flex-col gap-16">
          <MovieInfo
            synopsis={details.movie.synopsis}
            director={details.movie.director}
            releaseDate={details.movie.releaseDate}
          />

          <MovieCast cast={details.cast} />

          <CinemaMovieSessions
            groups={details.groups}
            dates={details.dates}
            onSelectSession={setSelectedSessionId}
          />
        </div>

        <Footer />

        {selectedSessionId && (
          <SeatMapModal
            isOpen={true}
            sessionId={selectedSessionId}
            onClose={() => setSelectedSessionId(null)}
          />
        )}
      </div>
    </>
  );
}
