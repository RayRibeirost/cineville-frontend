"use client";

import { useMemo, useState } from "react";
import { PaymentMethod } from "../../types/payments";
import InputForm from "../ui/InputForm";
import { masks } from "@/src/utils/masks";
interface Props {
  method: PaymentMethod;
  total: number;
}

interface Errors {
  holder?: string;
  number?: string;
  expiry?: string;
  cvv?: string;
}

export default function CreditCardForm({ method, total }: Props) {
  const [holder, setHolder] = useState("");
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [installments, setInstallments] = useState("1");

  const [errors, setErrors] = useState<Errors>({});

  const showInstallments = method === "credit" && total > 100;

  const installmentOptions = useMemo(() => {
    const options = [];

    for (let i = 1; i <= 12; i++) {
      const value = total / i;

      const interest = i <= 4 ? 0 : total * (0.01 * (i - 4));

      options.push({
        value: i,
        total: total + interest,
        installment: (total + interest) / i,
      });
    }

    return options;
  }, [total]);

  function formatCard(value: string) {
    return value
      .replace(/\D/g, "")
      .slice(0, 19)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  }

  function formatExpiry(value: string) {
    return value
      .replace(/\D/g, "")
      .slice(0, 4)
      .replace(/(\d{2})(\d)/, "$1/$2");
  }

  function validate() {
    const e: Errors = {};

    if (!holder.trim()) e.holder = "O nome do titular é obrigatório";

    const digits = number.replace(/\D/g, "");

    if (!digits) e.number = "O número do cartão é obrigatório";
    else if (digits.length < 13 || digits.length > 19)
      e.number = "Número inválido.";

    if (!expiry) e.expiry = "A data de validade é obrigatória";

    if (!cvv) e.cvv = "O CVV é obrigatório";
    else if (cvv.length < 3 || cvv.length > 4) e.cvv = "CVV inválido.";

    setErrors(e);

    return Object.keys(e).length === 0;
  }

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-6 text-xl font-semibold">Dados do Cartão</h2>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm">Nome do Titular</label>

          <InputForm
            value={holder}
            onBlur={validate}
            onChange={(e) => setHolder(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none focus:border-red-500"
          />

          {errors.holder && (
            <p className="mt-1 text-sm text-red-500">{errors.holder}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm">Número do Cartão</label>

          <InputForm
            value={number}
            onBlur={validate}
            onChange={(e) => setNumber(formatCard(e.target.value))}
            placeholder="0000 0000 0000 0000"
            {...masks.cardNumber}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none focus:border-red-500"
          />

          {errors.number && (
            <p className="mt-1 text-sm text-red-500">{errors.number}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm">Validade</label>

            <InputForm
              value={expiry}
              onBlur={validate}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              placeholder="MM/AA"
              {...masks.cardExpiry}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none focus:border-red-500"
            />

            {errors.expiry && (
              <p className="mt-1 text-sm text-red-500">{errors.expiry}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm">CVV</label>

            <InputForm
              value={cvv}
              onBlur={validate}
              onChange={(e) =>
                setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
              }
              {...masks.cardCvv}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none focus:border-red-500"
            />

            {errors.cvv && (
              <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>
            )}
          </div>
        </div>

        {showInstallments && (
          <div>
            <label className="mb-2 block text-sm">Parcelamento</label>

            <select
              value={installments}
              onChange={(e) => setInstallments(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3"
            >
              {installmentOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.value}x de R$ {option.installment.toFixed(2)}{" "}
                  {option.value <= 4 ? "sem juros" : "com juros"}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </section>
  );
}
