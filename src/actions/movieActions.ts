import { Movie } from "@/src/types/movieTypes";

export async function getMovies(): Promise<Movie[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar filmes");
    }

    const data = await response.json();
    console.log(data);
    return data["data"] as Movie[];
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    return [];
  }
}
