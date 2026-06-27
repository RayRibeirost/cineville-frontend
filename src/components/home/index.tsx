"use client";

import clsx from "clsx";
import Header from "../layout/Header";
import Hero from "./Hero";
import MovieCarousel from "../layout/Carousel/MovieCarousel";
import PromoCandy from "./PromoCandy";
import Footer from "../layout/Footer/Footer";
export default function HomePage() {
  return (
    <>
      <div
        className={clsx(
          "flex flex-col items-center justify-center min-h-screen w-full  p-4",
          "bg-[url('/assets/img-hero.png')] bg-cover bg-center",
        )}
      >
        <Header />
        <main className="flex flex-col  min-h-screen w-full  p-4">
          <Hero />
        </main>
      </div>
      <div className="bg-deep-black flex flex-col items-center justify-center ">
        <MovieCarousel title="Em Cartazes" />
        <MovieCarousel title="Lançamentos" />
        <PromoCandy />
        <Footer />
      </div>
    </>
  );
}
