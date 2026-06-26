"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

import Logo from "./Logo";
import Navigation from "./Navigation";
import HeaderAuth from "./HeaderAuth";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 z-50 h-16 w-full transition-all duration-300",
        scrolled
          ? "bg-gray-surface backdrop-blur-md shadow-lg"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        <Logo />

        <Navigation />

        <HeaderAuth />
      </div>
    </header>
  );
}
