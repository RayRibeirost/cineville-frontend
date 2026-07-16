"use server";

import { Movie } from "@/src/types/movieTypes";

export async function getMovieDetailsById(id: string): Promise<Movie | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/movies/${id}/details`,
      {
        method: "GET",
        cache: "no-store",
      },
    );
    console.log(response);
    if (!response.ok) {
      return null;
    }

    const movie: Movie = await response.json();
    console.log(movie);
    return movie;
  } catch (error) {
    console.error("Erro ao buscar filme:", error);
    return null;
  }
}
