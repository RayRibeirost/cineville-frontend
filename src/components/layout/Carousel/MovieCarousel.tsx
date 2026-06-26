"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import MovieCard from "./MovieCard";
import HeadingContent from "@/src/components/ui/HeadingContent";

export default function MovieCarousel({ title }: { title: string }) {
  return (
    <section className="mx-auto w-full max-w-7xl py-20 ">
      <HeadingContent title={title} />

      <Swiper
        modules={[Autoplay]}
        loop
        centeredSlides={false}
        speed={700}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        spaceBetween={20}
        slidesPerView={4}
        breakpoints={{
          320: {
            slidesPerView: 1.2,
          },
          640: {
            slidesPerView: 2,
          },
          900: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
      >
        <SwiperSlide key={1}>
          <MovieCard />
        </SwiperSlide>
        <SwiperSlide key={2}>
          <MovieCard />
        </SwiperSlide>
        <SwiperSlide key={3}>
          <MovieCard />
        </SwiperSlide>
        <SwiperSlide key={4}>
          <MovieCard />
        </SwiperSlide>
        <SwiperSlide key={5}>
          <MovieCard />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
