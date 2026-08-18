import Header from "@/src/components/layout/Header";
import Hero from "@/src/components/home/Hero";
import MovieCarousel from "@/src/components/layout/Carousel/MovieCarousel";
import HomeBomboniere from "@/src/components/home/HomeBomboniere";
import Footer from "@/src/components/layout/Footer/Footer";
import {
  getNowPlayingMovies,
  getUpcomingReleases,
} from "@/src/actions/catalogActions";
import { clsx } from "clsx";

export default async function HomePage() {
  // Duas listas diferentes: "Em Cartaz" olha a grade de sessões, "Lançamentos"
  // olha a data de estreia. Antes as duas seções recebiam a mesma lista de
  // filmes, então mostravam exatamente o mesmo conteúdo.
  const [nowPlaying, releases] = await Promise.all([
    getNowPlayingMovies(),
    getUpcomingReleases(),
  ]);

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
        title="Em Cartaz"
        seeAllHref="/em-cartaz"
        movies={nowPlaying.success ? nowPlaying.data : []}
        emptyMessage={
          nowPlaying.success
            ? "Nenhum filme com sessões abertas no momento."
            : nowPlaying.error
        }
      />

      <MovieCarousel
        idSection="Lancamentos"
        title="Lançamentos"
        seeAllHref="/lancamentos"
        movies={releases.success ? releases.data : []}
        emptyMessage={
          releases.success
            ? "Nenhum lançamento cadastrado no momento."
            : releases.error
        }
      />

      <HomeBomboniere />

      <Footer />
    </>
  );
}
