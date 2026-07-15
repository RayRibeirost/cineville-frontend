import Image from "next/image";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer/Footer";
import { getMovieDetailsById } from "@/src/actions/movieDetailsActions";

interface MoviePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const movieDetails = await getMovieDetailsById(id);

  if (!movieDetails) {
    return (
      <div className="min-h-screen bg-deep-black flex flex-col">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-grayScale-400 text-lg">Filme não encontrado.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-deep-black text-grayScale-200">
        {/* Banner */}
        <section
          className="relative mt-16 h-[68vh] w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${movieDetails.banner})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-deep-black" />
        </section>

        <div className="mx-auto flex max-w-7xl flex-col gap-16 px-5 py-12 sm:px-6">
          {/* Informações */}
          <section className="grid gap-10 lg:grid-cols-[2fr_320px]">
            <article>
              <h2 className="mb-4 text-3xl font-black">Sinopse</h2>

              <p className="leading-8 text-grayScale-400">
                {movieDetails.sinopse}
              </p>
            </article>

            <aside className="rounded-xl bg-gray-surface p-6">
              <h3 className="mb-5 text-xl font-bold">Movie Info</h3>

              <div className="space-y-5">
                <div className="flex justify-between border-b border-grayScale-600 pb-3">
                  <span className="text-grayScale-400">Diretor</span>
                  <span>{movieDetails.diretor}</span>
                </div>

                <div className="flex justify-between border-b border-grayScale-600 pb-3">
                  <span className="text-grayScale-400">Escritor</span>
                  <span>{movieDetails.escritor}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-grayScale-400">Lançamento</span>
                  <span>{movieDetails.lancamento}</span>
                </div>
              </div>
            </aside>
          </section>

          {/* Elenco */}
          {movieDetails.atores.length > 0 && (
            <section>
              <h2 className="mb-8 text-3xl font-black">Elenco</h2>

              <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
                {movieDetails.atores.map((ator) => (
                  <article key={ator.id} className="group">
                    <div className="relative aspect-square overflow-hidden rounded-xl">
                      <Image
                        src={ator.foto}
                        alt={ator.nome}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <h4 className="mt-3 text-center font-semibold">
                      {ator.nome}
                    </h4>

                    <p className="text-center text-sm text-grayScale-400">
                      {ator.personagem}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Sessões */}
          {movieDetails.sessoes.length > 0 && (
            <section>
              <h2 className="mb-8 text-3xl font-black">Escolha seu Cinema</h2>

              <div className="grid gap-6 lg:grid-cols-2">
                {movieDetails.sessoes.map((sessao) => (
                  <article
                    key={sessao.id}
                    className="rounded-xl border border-grayScale-600 bg-gray-surface p-6 transition hover:border-red-cinema"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="font-bold">{sessao.cinema}</h3>

                      <span className="rounded border border-red-cinema px-3 py-1 text-xs text-red-cinema">
                        {sessao.formato}
                      </span>
                    </div>

                    <p className="mb-3 text-sm text-grayScale-400">
                      📍 {sessao.endereco}
                    </p>

                    <p className="mb-4 font-semibold">{sessao.tipo}</p>

                    <div className="flex flex-wrap gap-2">
                      {sessao.horarios.map((horario) => (
                        <button
                          key={horario}
                          className="rounded bg-grayScale-600 px-3 py-2 text-sm transition hover:bg-red-cinema"
                        >
                          {horario}
                        </button>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
