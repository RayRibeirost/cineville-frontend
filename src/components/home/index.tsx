"use client";

import clsx from "clsx";
import Header from "../layout/Header";
import Hero from "./Hero";

export default function HomePage() {
  return (
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
  );
}
