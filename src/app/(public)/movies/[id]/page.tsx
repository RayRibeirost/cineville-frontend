"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer/Footer";

const filmes: Record<string, {
    title: string;
    banner: string;
    sinopse: string;
    diretor: string;
    escritor: string;
    lancamento: string;
    atores: { nome: string; personagem: string; foto: string }[];
}> = {
    "1": {
        title: "Eco do Amanhã",
        banner: "/assets/img-hero.png",
        sinopse: "Em um futuro distante, um explorador solitário recebe um misterioso sinal vindo de um planeta esquecido. Ao investigar sua origem, ele descobre um segredo capaz de mudar o destino da humanidade para sempre.",
        diretor: "Fulano",
        escritor: "Beltrano",
        lancamento: "xx/xx/xx",
        atores: [
            { nome: "Fulano de tal", personagem: "Personagem", foto: "/assets/img-hero.png" },
            { nome: "Fulano de tal", personagem: "Personagem", foto: "/assets/movie-Reinos-esquecidos.png" },
            { nome: "Fulano de tal", personagem: "Personagem", foto: "/assets/img-hero.png" },
            { nome: "Fulano de tal", personagem: "Personagem", foto: "/assets/movie-Reinos-esquecidos.png" },
        ],
    },
    "2": {
        title: "Reinos Esquecidos",
        banner: "/assets/Reino.png",
        sinopse: "Um jovem guerreiro descobre que seu reino foi apagado da história por forças sobrenaturais. Em uma jornada épica, ele busca restaurar a memória de seu povo e enfrentar o mal que os condenou ao esquecimento.",
        diretor: "Ciclano",
        escritor: "Deltrano",
        lancamento: "xx/xx/xx",
        atores: [
            { nome: "Fulano de tal", personagem: "Personagem", foto: "/assets/img-hero.png" },
            { nome: "Fulano de tal", personagem: "Personagem", foto: "/assets/movie-Reinos-esquecidos.png" },
            { nome: "Fulano de tal", personagem: "Personagem", foto: "/assets/img-hero.png" },
            { nome: "Fulano de tal", personagem: "Personagem", foto: "/assets/movie-Reinos-esquecidos.png" },
        ],
    },
};

const sessoes = [
    { id: 1, cinema: "CINEVILLE SÃO PAULO", endereco: "Endereço - São Paulo", tipo: "Legendado", formato: "3D", horarios: ["17:30", "18:30", "21:30"] },
    { id: 2, cinema: "CINEVILLE SÃO PAULO", endereco: "Endereço - São Paulo", tipo: "Dublado", formato: "3D", horarios: ["17:30", "18:30", "21:30"] },
    { id: 3, cinema: "CINEVILLE SÃO PAULO", endereco: "Endereço - São Paulo", tipo: "Legendado", formato: "IMAX", horarios: ["17:30", "18:30", "21:30"] },
    { id: 4, cinema: "CINEVILLE SÃO PAULO", endereco: "Endereço - São Paulo", tipo: "Dublado", formato: "4D", horarios: ["17:30", "18:30", "21:30"] },
];

export default function MoviePage() {
    const { id } = useParams<{ id: string }>();
    const movie = filmes[id];

    if (!movie) {
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
        <div className="bg-deep-black text-grayScale-200 min-h-screen">

            <Header />

            <div
                className="relative w-full h-[68vh] bg-cover bg-center mt-16"
                style={{ backgroundImage: `url('${movie.banner}')` }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-deep-black" />
            </div>

            {/* Conteúdo principal */}
            <div className="mx-auto max-w-7xl px-5 sm:px-6 py-12 flex flex-col gap-16">

                <section className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                        <h2 className="text-3xl font-black mb-4">Sinopse</h2>
                        <p className="text-grayScale-400 leading-relaxed text-sm">
                            {movie.sinopse}
                        </p>
                    </div>

                    <div className="w-full md:w-72 bg-gray-surface rounded-xl p-6 flex flex-col gap-4 h-fit">
                        <h3 className="text-lg font-bold mb-2">Movie Info</h3>
                        <div className="flex justify-between border-b border-grayScale-600 pb-3">
                            <span className="text-grayScale-400 text-sm">Diretor</span>
                            <span className="font-semibold text-sm">{movie.diretor}</span>
                        </div>
                        <div className="flex justify-between border-b border-grayScale-600 pb-3">
                            <span className="text-grayScale-400 text-sm">Escritor</span>
                            <span className="font-semibold text-sm">{movie.escritor}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-grayScale-400 text-sm">Lançamento</span>
                            <span className="font-semibold text-sm">{movie.lancamento}</span>
                        </div>
                    </div>
                </section>

                {/* Atores */}
                <section>
                    <h2 className="text-3xl font-black mb-8">Atores</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        {movie.atores.map((ator, index) => (
                            <div key={index} className="flex flex-col items-center gap-2">
                                <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                                    <Image src={ator.foto} alt={ator.nome} fill className="object-cover" />
                                </div>
                                <p className="font-bold text-sm text-center">{ator.nome}</p>
                                <p className="text-grayScale-400 text-xs text-center">{ator.personagem}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Escolha seu Cinema */}
                <section>
                    <h2 className="text-3xl font-black mb-8">Escolha seu Cinema</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {sessoes.map((sessao) => (
                            <div
                                key={sessao.id}
                                className="bg-gray-surface rounded-xl p-6 flex flex-col gap-4 border border-grayScale-600 hover:border-red-cinema transition-all cursor-pointer"
                            >
                                <div className="flex items-center justify-between">
                                    <h4 className="font-black text-sm">{sessao.cinema}</h4>
                                    <span className="text-xs border border-red-cinema text-red-cinema px-2 py-1 rounded">
                                        {sessao.formato}
                                    </span>
                                </div>
                                <p className="text-grayScale-400 text-xs flex items-center gap-1">
                                    <span>📍</span> {sessao.endereco}
                                </p>
                                <p className="font-bold text-sm">{sessao.tipo}</p>
                                <div className="flex gap-2 flex-wrap">
                                    {sessao.horarios.map((horario) => (
                                        <button
                                            key={horario}
                                            className="px-3 py-1 rounded bg-grayScale-600 hover:bg-red-cinema text-xs font-semibold transition-all cursor-pointer"
                                        >
                                            {horario}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>

            <Footer />
        </div>
    );
}