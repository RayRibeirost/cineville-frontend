import Link from "next/dist/client/link";

export default function HeadingContent({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between gap-4 mb-16">
      <div className="flex items-center gap-4">
        <h2 className="text-5xl font-semibold">{title}</h2>
        <div className="h-0.5 w-57 bg-linear-to-r from-red-cinema to-transparent" />
      </div>

      <Link
        href="#"
        className="text-sm hover:opacity-80 transition-all ease-in-out duration-300"
      >
        Ver Todos
      </Link>
    </div>
  );
}
