export interface Actor {
  id: string;
  nome: string;
  personagem: string;
  foto: string;
}

export interface Sessao {
  id: string;
  cinema: string;
  endereco: string;
  tipo: string;
  formato: string;
  horarios: string[];
}

export interface Movie {
  id: string;
  data: string;
  title: string;
  banner: string;
  sinopse: string;
  diretor: string;
  escritor: string;
  lancamento: string;
  genero: string;
  duracao: number;
  classificacao: string;
  trailer?: string;
  idiomas: string[];
  atores: Actor[];
  sessoes: Sessao[];
}
