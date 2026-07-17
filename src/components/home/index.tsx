import clsx from "clsx";
import Header from "@/src/components/layout/Header";
import Hero from "@/src/components/home/Hero";
import MovieCarousel from "@/src/components/layout/Carousel/MovieCarousel";
import PromoCandy from "@/src/components/home/PromoCandy";
import Footer from "@/src/components/layout/Footer/Footer";
import { getAllMovies } from "@/src/actions/movieActions";

export default async function HomePage() {
  const result = await getAllMovies();
  const movies = result.success ? result.data : [];
import Header from "../layout/Header";
import Hero from "./Hero";
import MovieCarousel from "../layout/Carousel/MovieCarousel";
import PromoCandy from "./PromoCandy";
import Footer from "../layout/Footer/Footer";
import { useEffect } from "react";
import { useState } from "react";
import { getMovies } from "@/src/actions/movieActions";
import { Movie } from "@/src/types/movieTypes";

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function loadMovies() {
      const data = await getMovies();
      setMovies(data);
    }

    loadMovies();
  }, []);

  return (
    <>
      <div
        className={clsx(
          "flex flex-col items-center justify-center min-h-screen w-full p-4",
          "bg-[url('/assets/img-hero.png')] bg-cover bg-center",
        )}
      >
        <Header />
        <main className="flex flex-col min-h-screen w-full p-4">
          <Hero />
        </main>
      </div>
      <div className="bg-deep-black flex flex-col items-center justify-center">
        <MovieCarousel title="Filmes em Cartaz" movies={movies} />
      <div className="bg-deep-black flex flex-col items-center justify-center ">
        <MovieCarousel title="Em Cartazes" movies={movies} />

        <MovieCarousel title="Lançamentos" movies={movies} />
        <PromoCandy />
        <Footer />
      </div>
    </>
  );
}
