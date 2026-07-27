import Header from "@/src/components/layout/Header";
import Hero from "@/src/components/home/Hero";
import MovieCarousel from "@/src/components/layout/Carousel/MovieCarousel";
import PromoCandy from "@/src/components/home/PromoCandy";
import Footer from "@/src/components/layout/Footer/Footer";
import { getAllMovies } from "@/src/actions/movieActions";

import OrderConfirmedClient from "../confirmation/OrderConfirmedClient";

export default async function HomePage() {
  const result = await getAllMovies();
  const movies = result.success ? result.data : [];

  return (
    <>
      <Header />
      <Hero />

      <MovieCarousel title="Em Cartazes" movies={movies} />
      <MovieCarousel title="Lançamentos" movies={movies} />
      <PromoCandy />

      <OrderConfirmedClient />

      <Footer />
    </>
  );
}
