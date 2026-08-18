/**
 * Seções do dashboard. `ready: false` marca o que ainda não foi ligado
 * ao backend — a navegação e os cards usam isso para não abrir tela vazia.
 */
export interface AdminSection {
  href: string;
  label: string;
  description: string;
  ready: boolean;
}

export const ADMIN_SECTIONS: AdminSection[] = [
  {
    href: "/admin/movies",
    label: "Filmes",
    description: "Cadastrar, editar e remover filmes em cartaz.",
    ready: true,
  },
  {
    href: "/admin/cinemas",
    label: "Cinemas",
    description: "Unidades, endereços e os filmes em cartaz de cada cinema.",
    ready: true,
  },
  {
    href: "/admin/sessions",
    label: "Sessões",
    description: "Horários, idioma, tipo de sala e preço do ingresso.",
    ready: true,
  },
  {
    href: "/admin/products",
    label: "Produtos",
    description: "Itens da bomboniere, preços e disponibilidade.",
    ready: true,
  },
  {
    href: "/admin/stock",
    label: "Estoque",
    description: "Quantidade disponível de cada produto.",
    ready: true,
  },
  {
    href: "/admin/orders",
    label: "Pedidos",
    description: "Todos os pedidos, com usuário, itens e valores.",
    ready: true,
  },
  {
    href: "/admin/tickets",
    label: "Ingressos",
    description: "Ingressos emitidos por usuário, sessão e assento.",
    ready: true,
  },
];
