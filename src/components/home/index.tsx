import Header from "@/src/components/layout/Header";
import Hero from "@/src/components/home/Hero";
import MovieCarousel from "@/src/components/layout/Carousel/MovieCarousel";
import PromoCandy from "@/src/components/home/PromoCandy";
import Footer from "@/src/components/layout/Footer/Footer";
import { getAllMovies } from "@/src/actions/movieActions";
import { clsx } from "clsx";

export default async function HomePage() {
  const result = await getAllMovies();
  const movies = result.success ? result.data : [];

  return (
    <>
      <div
        className={clsx(
          "flex flex-col  min-h-screen w-full  p-4",
          "bg-[url('/assets/img-hero.png')] bg-cover bg-center",
        )}
      >
        <Header />
        <Hero />
      </div>

      <MovieCarousel
        idSection="EmCartazes"
        title="Em Cartazes"
        movies={movies}
      />
      <MovieCarousel
        idSection="Lancamentos"
        title="Lançamentos"
        movies={movies}
      />
      <PromoCandy />

      <Footer />
    </>
  );
}
