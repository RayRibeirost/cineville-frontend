import Logo from "@/src/components/ui/Logo";
import Image from "next/image";

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  wide?: boolean;
}

export default function AuthLayout({ title, children, wide, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex bg-deep-black">
      {/* Lado esquerdo */}
      <div className="relative hidden lg:block w-1/2">
        <Image
          src="/assets/backlogin.png"
          alt="Background"
          fill
          className="object-cover object-left"
          priority
        />
      </div>

      <div className="flex flex-1 items-center justify-center px-8">
        <div className={`w-full ${wide ? "max-w-3xl" : "max-w-md"} bg-deep-black rounded-xl p-8 shadow-md`}>
          <Logo className="mx-auto mb-6" />

          <h2 className="text-2xl text-center font-bold text-white">{title}</h2>

          <p className="mt-2 mb-8 text-center text-gray-300">
            {subtitle ?? "Entre para explorar os lançamentos do momento."}
          </p>

          {children}
        </div>
      </div>
    </div>
  );
}
