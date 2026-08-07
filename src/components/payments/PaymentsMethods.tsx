"use client";

import { CreditCard, Landmark, QrCode } from "lucide-react";
import { PaymentMethod } from "../../types/payments";

interface PaymentMethodsProps {
  value: PaymentMethod | null;
  onChange: (value: PaymentMethod) => void;
}

const methods = [
  {
    value: "credit",
    title: "Cartão de Crédito",
    subtitle: "Pague em até 12x",
    icon: CreditCard,
  },
  {
    value: "debit",
    title: "Cartão de Débito",
    subtitle: "Pagamento imediato",
    icon: Landmark,
  },
  {
    value: "pix",
    title: "PIX",
    subtitle: "Aprovação instantânea",
    icon: QrCode,
  },
] satisfies {
  value: PaymentMethod;
  title: string;
  subtitle: string;
  icon: React.ElementType;
}[];

export default function PaymentMethods({
  value,
  onChange,
}: PaymentMethodsProps) {
  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-6 text-xl font-semibold">Forma de Pagamento</h2>

      <div className="space-y-4">
        {methods.map((method) => {
          const Icon = method.icon;
          const selected = value === method.value;

          return (
            <button
              key={method.value}
              type="button"
              onClick={() => onChange(method.value)}
              className={`
                w-full rounded-xl border p-4 transition-all
                flex items-center justify-between
                ${
                  selected
                    ? "border-red-500 bg-red-500/10"
                    : "border-zinc-700 hover:border-red-500"
                }
              `}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`
                    rounded-lg p-3
                    ${
                      selected
                        ? "bg-red-500 text-white"
                        : "bg-zinc-800 text-zinc-300"
                    }
                  `}
                >
                  <Icon size={22} />
                </div>

                <div className="text-left">
                  <h3 className="font-medium">{method.title}</h3>

                  <p className="text-sm text-zinc-400">{method.subtitle}</p>
                </div>
              </div>

              <div
                className={`
                  h-5 w-5 rounded-full border-2 flex items-center justify-center
                  ${selected ? "border-red-500" : "border-zinc-500"}
                `}
              >
                {selected && (
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
