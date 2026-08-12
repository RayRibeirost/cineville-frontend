"use client";

import { useState } from "react";

import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import RedeemOutlinedIcon from "@mui/icons-material/RedeemOutlined";
import StarsOutlinedIcon from "@mui/icons-material/StarsOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

interface Reward {
  id: number;
  name: string;
  description: string;
  points: number;
  image: string;
}

interface PointHistory {
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

const rewards: Reward[] = [
  {
    id: 1,
    name: "Standard 2D Ticket",
    description: "Qualquer tratamento padrão, a qualquer momento.",
    points: 500,
    image: "/images/rewards/standard-ticket.jpg",
  },
  {
    id: 2,
    name: "IMAX Experience",
    description: "Faça um upgrade para a experiência IMAX completa.",
    points: 800,
    image: "/images/rewards/imax.jpg",
  },
  {
    id: 3,
    name: "Large Popcorn",
    description: "Pipoca grande, recém-preparada.",
    points: 300,
    image: "/images/rewards/popcorn.jpg",
  },
  {
    id: 4,
    name: "Movie Combo",
    description: "1 Pipoca Grande + 2 Refrigerantes Grandes.",
    points: 600,
    image: "/images/rewards/movie-combo.jpg",
  },
];

const history: PointHistory[] = [
  {
    id: 1,
    date: "12/08/2026 20:45",
    type: "Crédito",
    origin: "Compra de ingressos - Party Two (IMAX)",
    points: 240,
    status: "Confirmado",
  },
  {
    id: 2,
    date: "12/08/2026 20:45",
    type: "Crédito",
    origin: "Compra na bomboniere",
    points: 75,
    status: "Confirmado",
  },
  {
    id: 3,
    date: "11/08/2026 18:30",
    type: "Resgate",
    origin: "Resgate de recompensa - Large Popcorn",
    points: -300,
    status: "Resgatado",
  },
  {
    id: 4,
    date: "05/08/2026 10:12",
    type: "Crédito",
    origin: "Campanha de Aniversário",
    points: 50,
    status: "Confirmado",
  },
  {
    id: 5,
    date: "01/08/2026 09:00",
    type: "Crédito",
    origin: "Cadastro no ClubVille",
    points: 200,
    status: "Confirmado",
  },
  {
    id: 6,
    date: "20/07/2026 16:22",
    type: "Expiração",
    origin: "Pontos expirados",
    points: -120,
    status: "Expirado",
  },
];

export default function PointsPage() {
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const totalPoints = 1450;
  const nextLevel = 2000;

  const progress = Math.min((totalPoints / nextLevel) * 100, 100);

  function handleRedeemPoints() {
    document.getElementById("rewards")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <div className="mx-auto w-full max-w-[1500px] px-4 py-6 md:px-6 lg:px-8">
        {/* =========================================================
            TÍTULO
        ========================================================= */}

        <div className="mb-5">
          <h1 className="text-xl font-semibold text-white md:text-2xl">
            Programa de Pontos ClubVille
          </h1>

          <p className="mt-1 text-xs text-zinc-400">
            Acumule pontos, aproveite benefícios e viva experiências incríveis.
          </p>
        </div>

        {/* =========================================================
            CARD PRINCIPAL
        ========================================================= */}

        <section className="rounded-md border border-[#b89b00] bg-[#111] shadow-[0_0_25px_rgba(255,193,7,0.05)]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr_0.7fr]">
            {/* Usuário */}

            <div className="border-b border-zinc-800 p-5 lg:border-b-0 lg:border-r">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#e5bd22]">
                Gold Member
              </span>

              <div className="mt-2">
                <h2 className="text-xl font-bold">Olá, Kaynan Teixeira!</h2>

                <p className="mt-1 text-xs text-zinc-400">
                  kaynan.teixeira@email.com
                </p>
              </div>

              <div className="mt-4 inline-flex items-center gap-2 rounded border border-[#806900] bg-[#302800] px-3 py-1.5">
                <StarsOutlinedIcon sx={{ fontSize: 15, color: "#e5bd22" }} />

                <span className="text-[10px] font-semibold text-[#e5bd22]">
                  GOLD MEMBER
                </span>
              </div>

              <p className="mt-5 text-[11px] text-zinc-400">
                Faltam{" "}
                <strong className="text-white">
                  {nextLevel - totalPoints} pontos
                </strong>{" "}
                para Platinum.
              </p>

              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-zinc-800">
                <div
                  className="h-full rounded-full bg-[#e5bd22]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="mt-1 flex justify-between text-[9px] text-zinc-500">
                <span>{totalPoints.toLocaleString("pt-BR")} pts</span>

                <span>{nextLevel.toLocaleString("pt-BR")} pts</span>
              </div>
            </div>

            {/* Saldo */}

            <div className="flex flex-col items-center justify-center border-b border-zinc-800 p-5 text-center lg:border-b-0 lg:border-r">
              <span className="text-[10px] uppercase text-zinc-400">
                Seu saldo total
              </span>

              <div className="mt-1 flex items-center gap-2">
                <strong className="text-4xl font-bold text-[#e5bd22]">
                  {totalPoints.toLocaleString("pt-BR")}
                </strong>

                <InfoOutlinedIcon sx={{ fontSize: 15, color: "#71717a" }} />
              </div>

              <span className="text-sm text-[#e5bd22]">Points</span>

              <button
                type="button"
                onClick={handleRedeemPoints}
                className="mt-4 flex w-full max-w-[230px] items-center justify-center gap-2 rounded bg-[#e50914] px-4 py-2.5 text-[11px] font-bold uppercase transition hover:bg-[#ff1723]"
              >
                <RedeemOutlinedIcon sx={{ fontSize: 17 }} />
                Resgatar pontos
              </button>
            </div>

            {/* Expiração */}

            <div className="p-5">
              <div className="rounded border border-zinc-700 bg-[#151515] p-4">
                <div className="flex items-start gap-3">
                  <AccessTimeOutlinedIcon
                    sx={{ fontSize: 22, color: "#e5bd22" }}
                  />

                  <div>
                    <p className="text-[10px] uppercase text-zinc-400">
                      Pontos a expirar
                    </p>

                    <strong className="text-lg text-[#e5bd22]">200 pts</strong>

                    <p className="mt-1 text-[10px] text-zinc-400">
                      Expiram em 30 dias
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-3 rounded border border-zinc-700 bg-[#151515] p-3">
                <p className="text-[9px] text-zinc-500">Próximo nível</p>

                <p className="mt-1 text-xs font-semibold text-[#e5bd22]">
                  PLATINUM
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            CONTEÚDO
        ========================================================= */}

        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_280px]">
          {/* =======================================================
              COLUNA PRINCIPAL
          ======================================================= */}

          <div className="space-y-4">
            {/* Campanha */}

            <section className="rounded-md border border-[#e50914] bg-[#111] p-4">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-sm font-semibold">
                  <CampaignOutlinedIcon
                    sx={{ fontSize: 17, color: "#e50914" }}
                  />
                  Campanha de Aniversário CINEVILLE
                </h2>

                <span className="rounded bg-[#e50914] px-2 py-1 text-[8px] font-bold">
                  ATIVA
                </span>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-4 text-[9px] sm:grid-cols-3">
                <div>
                  <p className="text-zinc-500">PERÍODO</p>

                  <p className="mt-1 text-white">10/08 a 11/09/2026</p>
                </div>

                <div>
                  <p className="text-zinc-500">BENEFÍCIOS</p>

                  <p className="mt-1 font-semibold text-[#e5bd22]">
                    1 ingresso grátis + 4 pontos
                  </p>
                </div>

                <div>
                  <p className="text-zinc-500">REGRA</p>

                  <p className="mt-1 text-zinc-300">Aplicado automaticamente</p>
                </div>
              </div>
            </section>

            {/* Cinema */}

            <section id="rewards">
              <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <ConfirmationNumberOutlinedIcon
                  sx={{ fontSize: 17, color: "#e50914" }}
                />
                Cinema Tickets
              </h2>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {rewards.slice(0, 2).map((reward) => (
                  <RewardCard
                    key={reward.id}
                    reward={reward}
                    onRedeem={() => setSelectedReward(reward)}
                  />
                ))}
              </div>
            </section>

            {/* Concessões */}

            <section>
              <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <LocalOfferOutlinedIcon
                  sx={{ fontSize: 17, color: "#e50914" }}
                />
                Concessões
              </h2>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {rewards.slice(2).map((reward) => (
                  <RewardCard
                    key={reward.id}
                    reward={reward}
                    onRedeem={() => setSelectedReward(reward)}
                  />
                ))}
              </div>
            </section>

            {/* =====================================================
                HISTÓRICO
            ===================================================== */}
          </div>

          {/* =======================================================
              SIDEBAR
          ======================================================= */}

          <aside className="space-y-4">
            {/* Como ganhar */}

            <section className="rounded-md border border-zinc-800 bg-[#111] p-4">
              <h2 className="flex items-center gap-2 text-sm font-semibold">
                <StarsOutlinedIcon sx={{ fontSize: 18, color: "#e5bd22" }} />
                Como acumular pontos
              </h2>

              <div className="mt-4 space-y-4">
                <PointRule
                  text="Ganhe 10 pontos a cada R$ 5 gasto em ingressos."
                  points="+10 pts"
                />

                <PointRule
                  text="Ganhe 5 pontos a cada R$ 5 gasto na bomboniere."
                  points="+5 pts"
                />

                <PointRule
                  text="Ganhe 100 pontos no seu aniversário."
                  points="+100 pts"
                />

                <PointRule
                  text="Ganhe pontos extras em campanhas e promoções."
                  points="Extra"
                />

                <PointRule
                  text="Indique amigos e ganhe 200 pontos."
                  points="+200 pts"
                />
              </div>
            </section>

            {/* Regras */}

            <section className="rounded-md border border-zinc-800 bg-[#111] p-4">
              <h2 className="flex items-center gap-2 text-sm font-semibold">
                <EmojiEventsOutlinedIcon
                  sx={{ fontSize: 18, color: "#e5bd22" }}
                />
                Regras do programa
              </h2>

              <ul className="mt-4 space-y-3 text-[10px] leading-relaxed text-zinc-400">
                <li>✓ Os pontos são acumulados nas compras realizadas.</li>

                <li>✓ Os pontos possuem validade de 12 meses.</li>

                <li>✓ Pontos vencidos são automaticamente expirados.</li>

                <li>✓ O resgate depende da disponibilidade da recompensa.</li>

                <li>✓ Cancelamentos podem gerar estorno dos pontos.</li>
              </ul>

              <button
                type="button"
                className="mt-4 text-[10px] font-semibold text-[#e50914]"
              >
                Consultar regulamento completo
              </button>
            </section>

            {/* Atividade */}

            <section className="rounded-md border border-zinc-800 bg-[#111] p-4">
              <h2 className="flex items-center gap-2 text-sm font-semibold">
                <HistoryOutlinedIcon sx={{ fontSize: 18, color: "#e50914" }} />
                Atividade Recente
              </h2>

              <div className="mt-4 space-y-3">
                {history.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="border-b border-zinc-800 pb-3 last:border-0"
                  >
                    <p className="text-[9px] text-zinc-300">{item.origin}</p>

                    <div className="mt-1 flex justify-between">
                      <span className="text-[8px] text-zinc-500">
                        {item.date}
                      </span>

                      <span
                        className={
                          item.points >= 0
                            ? "text-[9px] text-green-500"
                            : "text-[9px] text-red-500"
                        }
                      >
                        {item.points >= 0 ? "+" : ""}
                        {item.points} pts
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setShowHistory(true)}
                className="mt-4 w-full rounded border border-zinc-800 py-2 text-[8px] text-zinc-400 transition hover:border-zinc-600 hover:text-white"
              >
                VER TODO O HISTÓRICO
              </button>
            </section>
          </aside>
        </div>
      </div>

      {/* =========================================================
          MODAL DE RESGATE
      ========================================================= */}

      {selectedReward && (
        <RedeemModal
          reward={selectedReward}
          currentPoints={totalPoints}
          onClose={() => setSelectedReward(null)}
        />
      )}

      {/* =========================================================
          MODAL HISTÓRICO
      ========================================================= */}

      {showHistory && (
        <HistoryModal history={history} onClose={() => setShowHistory(false)} />
      )}
    </main>
  );
}

/* ===============================================================
   REWARD CARD
================================================================ */

function RewardCard({
  reward,
  onRedeem,
}: {
  reward: Reward;
  onRedeem: () => void;
}) {
  return (
    <article className="overflow-hidden rounded-md border border-zinc-800 bg-[#111]">
      <div className="h-[135px] overflow-hidden bg-zinc-900">
        <img
          src={reward.image}
          alt={reward.name}
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />
      </div>

      <div className="p-3">
        <h3 className="text-sm font-medium">{reward.name}</h3>

        <p className="mt-1 min-h-[30px] text-[9px] text-zinc-500">
          {reward.description}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <strong className="text-[10px] text-[#e5bd22]">
            {reward.points} pts
          </strong>

          <button
            type="button"
            onClick={onRedeem}
            className="rounded bg-[#e50914] px-3 py-1.5 text-[8px] font-bold uppercase transition hover:bg-[#ff1723]"
          >
            Resgatar
          </button>
        </div>
      </div>
    </article>
  );
}

/* ===============================================================
   POINT RULE
================================================================ */

function PointRule({ text, points }: { text: string; points: string }) {
  return (
    <div className="flex gap-3">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#806900] bg-[#211c00]">
        <StarsOutlinedIcon sx={{ fontSize: 13, color: "#e5bd22" }} />
      </div>

      <div className="flex-1">
        <p className="text-[9px] leading-relaxed text-zinc-300">{text}</p>

        <span className="text-[9px] font-bold text-[#e5bd22]">{points}</span>
      </div>
    </div>
  );
}

/* ===============================================================
   HISTORY ROW
================================================================ */

function HistoryRow({ item }: { item: PointHistory }) {
  const typeColor: Record<PointHistory["type"], string> = {
    Crédito: "text-green-500",
    Débito: "text-red-500",
    Estorno: "text-purple-400",
    Expiração: "text-orange-400",
    Resgate: "text-blue-400",
  };

  const statusColor: Record<PointHistory["status"], string> = {
    Confirmado: "bg-green-950 text-green-400",
    Pendente: "bg-yellow-950 text-yellow-400",
    Cancelado: "bg-red-950 text-red-400",
    Estornado: "bg-purple-950 text-purple-400",
    Expirado: "bg-orange-950 text-orange-400",
    Resgatado: "bg-blue-950 text-blue-400",
  };

  return (
    <tr className="border-b border-zinc-900 text-[9px]">
      <td className="px-2 py-3 text-zinc-500">{item.date}</td>

      <td className={`px-2 py-3 font-medium ${typeColor[item.type]}`}>
        {item.type}
      </td>

      <td className="max-w-[180px] px-2 py-3 text-zinc-400">{item.origin}</td>

      <td
        className={`px-2 py-3 font-semibold ${
          item.points >= 0 ? "text-green-500" : "text-red-500"
        }`}
      >
        {item.points >= 0 ? "+" : ""}
        {item.points} pts
      </td>

      <td className="px-2 py-3">
        <span
          className={`rounded px-2 py-1 text-[8px] ${statusColor[item.status]}`}
        >
          {item.status}
        </span>
      </td>
    </tr>
  );
}

/* ===============================================================
   REDEEM MODAL
================================================================ */

function RedeemModal({
  reward,
  currentPoints,
  onClose,
}: {
  reward: Reward;
  currentPoints: number;
  onClose: () => void;
}) {
  const hasEnoughPoints = currentPoints >= reward.points;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg border border-zinc-700 bg-[#111] p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Resgatar recompensa</h2>

          <button type="button" onClick={onClose} aria-label="Fechar">
            <CloseOutlinedIcon sx={{ color: "#71717a" }} />
          </button>
        </div>

        <div className="mt-5 rounded border border-zinc-800 bg-[#171717] p-4">
          <h3 className="font-semibold">{reward.name}</h3>

          <p className="mt-1 text-xs text-zinc-500">{reward.description}</p>

          <div className="mt-4 flex justify-between">
            <span className="text-xs text-zinc-500">Custo</span>

            <strong className="text-[#e5bd22]">{reward.points} pts</strong>
          </div>

          <div className="mt-2 flex justify-between">
            <span className="text-xs text-zinc-500">Seu saldo</span>

            <strong className="text-white">{currentPoints} pts</strong>
          </div>
        </div>

        {!hasEnoughPoints && (
          <p className="mt-4 rounded bg-red-950/40 p-3 text-xs text-red-400">
            Você não possui pontos suficientes para realizar este resgate.
          </p>
        )}

        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded border border-zinc-700 px-4 py-2 text-xs"
          >
            Cancelar
          </button>

          <button
            type="button"
            disabled={!hasEnoughPoints}
            className="flex-1 rounded bg-[#e50914] px-4 py-2 text-xs font-bold disabled:cursor-not-allowed disabled:opacity-40"
          >
            Confirmar resgate
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===============================================================
   HISTORY MODAL
================================================================ */

function HistoryModal({
  history,
  onClose,
}: {
  history: PointHistory[];
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="max-h-[85vh] w-full max-w-5xl overflow-hidden rounded-lg border border-zinc-700 bg-[#111]">
        <div className="flex items-center justify-between border-b border-zinc-800 p-5">
          <h2 className="flex items-center gap-2 font-semibold">
            <HistoryOutlinedIcon sx={{ color: "#e50914" }} />
            Histórico de pontos
          </h2>

          <button type="button" onClick={onClose} aria-label="Fechar">
            <CloseOutlinedIcon sx={{ color: "#71717a" }} />
          </button>
        </div>

        <div className="overflow-auto p-5">
          <table className="w-full min-w-[700px] text-left">
            <thead>
              <tr className="border-b border-zinc-800 text-[9px] uppercase text-zinc-500">
                <th className="p-3">Data</th>

                <th className="p-3">Tipo</th>

                <th className="p-3">Origem</th>

                <th className="p-3">Pontos</th>

                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {history.map((item) => (
                <HistoryRow key={item.id} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
