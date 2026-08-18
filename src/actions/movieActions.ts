"use server";

import type {
  BackendCinemaForMovies,
  BackendMovie,
  BackendMovieDetails,
  CinemaSessionGroup,
  MovieDetailsResult,
  ShowtimeOption,
} from "../types/movie-types";

import { buildAuthHeaders } from "./http";
import { parseBrDate } from "../utils/date";

/** dateTime chega do backend como "DD/MM/AAAA HH:MM". */
function splitDateTime(dateTime: string): { date: string; time: string } {
  const [date = "", time = ""] = dateTime.split(" ");
  return { date, time };
}

export async function getAllMovies(): Promise<
  | { success: true; data: (BackendMovie & { _id: string })[] }
  | { success: false; error: string }
> {
  try {
    const headers = await buildAuthHeaders();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies`, {
      headers,
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Erro ao buscar filmes:", res.status);

      return {
        success: false,
        error: "Erro ao buscar a lista de filmes.",
      };
    }

    const json = await res.json();

    return {
      success: true,
      data: json.data ?? json,
    };
  } catch (error) {
    console.error("getAllMovies:", error);

    return {
      success: false,
      error: "Erro na requisição dos filmes.",
    };
  }
}

export async function getMovieWithSessions(
  movieId: string,
): Promise<
  | { success: true; data: MovieDetailsResult }
  | { success: false; error: string }
> {
  try {
    const headers = await buildAuthHeaders();

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      console.error("NEXT_PUBLIC_API_URL não está configurada.");

  const { data } = (await res.json()) as { data: BackendMovieDetails };

  const uniqueCinemaIds = Array.from(
    new Set(data.sessions.map((s) => s.cinemaId)),
  );

  const cinemaEntries = await Promise.all(
    uniqueCinemaIds.map(async (cinemaId) => {
      const cinemaRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cinemas/${cinemaId}`,
        { headers, cache: "no-store" },
      );
      const cinema = cinemaRes.ok
        ? ((await cinemaRes.json()).data as BackendCinemaForMovies)
        : null;
      return [cinemaId, cinema] as const;
    }),
  );

  const cinemaMap = new Map(cinemaEntries);
  const groupsMap = new Map<string, CinemaSessionGroup>();

  data.sessions.forEach((session) => {
    const cinema = cinemaMap.get(session.cinemaId);
    const key = `${session.cinemaId}-${session.roomType}-${session.language}`;

    const { date, time } = splitDateTime(session.dateTime);

    const showtime: ShowtimeOption = {
      sessionId: session._id,
      date,
      time,
    };

    const data = response.data as BackendMovieDetails;

    if (!data?.movie) {
      console.error("Resposta da API não possui movie:", data);

      return {
        success: false,
        error: "Dados do filme inválidos.",
      };
    }

    const sessions = data.sessions ?? [];

    const uniqueCinemaIds = Array.from(
      new Set(sessions.map((session) => session.cinemaId)),
    );

    const cinemaEntries = await Promise.all(
      uniqueCinemaIds.map(async (cinemaId) => {
        try {
          const cinemaRes = await fetch(`${apiUrl}/cinemas/${cinemaId}`, {
            headers,
            cache: "no-store",
          });

          if (!cinemaRes.ok) {
            console.error(
              `Erro ao buscar cinema ${cinemaId}:`,
              cinemaRes.status,
            );

            return [cinemaId, null] as const;
          }

          const cinemaResponse = await cinemaRes.json();

          const cinema = cinemaResponse.data as BackendCinemaForMovies;

          return [cinemaId, cinema] as const;
        } catch (error) {
          console.error(`Erro ao buscar cinema ${cinemaId}:`, error);

          return [cinemaId, null] as const;
        }
      }),
    );

    const cinemaMap = new Map(cinemaEntries);

    const groupsMap = new Map<string, CinemaSessionGroup>();

    sessions.forEach((session) => {
      const cinema = cinemaMap.get(session.cinemaId);

      const key = `${session.cinemaId}-${session.roomType}-${session.language}`;

      const showtime: ShowtimeOption = {
        sessionId: session._id,
        time: extractTime(session.dateTime),
      };

      const existing = groupsMap.get(key);

      if (existing) {
        existing.showtimes.push(showtime);
        return;
      }

      groupsMap.set(key, {
        key,
        cinemaName: cinema?.name ?? "Cinema",
        address: cinema ? `${cinema.address} - ${cinema.city}` : "",
        roomType: session.roomType,
        language: session.language,
        showtimes: [showtime],
      });
    });
  });

  const groups = Array.from(groupsMap.values()).map((group) => ({
    ...group,
    showtimes: [...group.showtimes].sort(
      (a, b) =>
        parseBrDate(a.date).getTime() - parseBrDate(b.date).getTime() ||
        a.time.localeCompare(b.time),
    ),
  }));

  const dates = Array.from(
    new Set(data.sessions.map((s) => splitDateTime(s.dateTime).date)),
  )
    .filter(Boolean)
    .sort((a, b) => parseBrDate(a).getTime() - parseBrDate(b).getTime());

  return {
    success: true,
    data: {
      movie: {
        title: data.movie.title,
        banner: data.movie.banner,
        synopsis: data.movie.synopsis,
        director: data.movie.author,
        releaseDate: data.movie.releaseDate,
      },
      cast: data.movie.cast,
      groups,
      dates,
    },
  };
}
