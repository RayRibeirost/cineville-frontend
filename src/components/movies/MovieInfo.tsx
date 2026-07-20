interface MovieInfoProps {
  synopsis: string;
  director: string;
  releaseDate: string;
}

export default function MovieInfo({
  synopsis,
  director,
  releaseDate,
}: MovieInfoProps) {
  return (
    <section className="flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <h2 className="text-3xl font-black mb-4">Sinopse</h2>
        <p className="text-grayScale-400 leading-relaxed max-w-3/4">
          {synopsis}
        </p>
      </div>

      <div className="w-full md:w-72 bg-gray-surface rounded-xl p-6 flex flex-col gap-4 h-fit">
        <h3 className="text-lg font-bold mb-2">Movie Info</h3>
        <div className="flex justify-between border-b border-grayScale-600 pb-3">
          <span className="text-grayScale-400 text-sm">Diretor</span>
          <span className="font-semibold text-sm">{director}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-grayScale-400 text-sm">Lançamento</span>
          <span className="font-semibold text-sm">{releaseDate}</span>
        </div>
      </div>
    </section>
  );
}
