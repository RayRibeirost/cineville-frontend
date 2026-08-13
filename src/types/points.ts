export interface Reward {
  id: number;
  name: string;
  description: string;
  points: number;
  image: string;
}

export interface PointHistory {
  id: number;
  date: string;
  type: "Crédito" | "Débito" | "Estorno" | "Expiração" | "Resgate";
  origin: string;
  points: number;
  status:
    | "Confirmado"
    | "Pendente"
    | "Cancelado"
    | "Estornado"
    | "Expirado"
    | "Resgatado";
}
