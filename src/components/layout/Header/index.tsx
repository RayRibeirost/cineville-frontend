import Logo from "./Logo";
import Navigation from "./Navigation";
import HeaderAuth from "./HeaderAuth";

export default function Header() {
  return (
    <header className="h-16 w-full bg-transparent ">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        <Logo />

        <Navigation />

        <HeaderAuth />
      </div>
    </header>
  );
}
