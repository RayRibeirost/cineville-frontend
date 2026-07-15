"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import MovieCard from "./MovieCard";
import HeadingContent from "@/src/components/ui/HeadingContent";
import { Movie } from "@/src/types/movieTypes";

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
}

export default function MovieCarousel({ title, movies }: MovieCarouselProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <HeadingContent title={title} />

      <Swiper
        modules={[Autoplay]}
        loop
        speed={700}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        spaceBetween={16}
        slidesPerView={1.2}
        breakpoints={{
          480: {
            slidesPerView: 1.5,
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 18,
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
