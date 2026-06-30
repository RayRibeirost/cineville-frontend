"use client";

import { useRegisterForm } from "@/src/hooks/useRegisterForm";
import { LoginPops } from "@/src/types";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { SuccessModal } from "@/src/components/ui/SuccessModal";
import { useRouter } from "next/navigation";
import Link from "next/link";
const EyeIcon = ({ visible }: { visible: boolean }) => {
  const Icon = visible ? FiEye : FiEyeOff;
  return (
    <Icon
      size={20}
      style={{ color: "#a3a3a3" }}
      className={`transition-opacity ${visible ? "opacity-100" : "opacity-60"}`}
    />
  );
};

const Field = ({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-semibold uppercase tracking-widest text-grayScale-400">
      {label}
    </label>
    {children}
    {error && (
      <span className="text-red-cinema text-xs font-semibold">{error}</span>
    )}
  </div>
);

const inputClass = (hasError?: string) =>
  `w-full px-4 py-3 rounded-lg bg-gray-surface border text-grayScale-200 placeholder-grayScale-500 text-sm focus:outline-none focus:ring-2 focus:ring-red-cinema transition-all ${
    hasError ? "border-red-cinema" : "border-grayScale-600"
  }`;

export default function Register({ isLogin, setIsLogin }: LoginPops) {
  const router = useRouter();

  const {
    formAction,
    isPending,
    getError,
    getValue,
    getChecked,
    handleChange,
    handleSubmit,
    state,
    showPassword,
    togglePassword,
    showConfirmPassword,
    toggleConfirmPassword,
    showSuccessModal,
    handleCloseModal,
  } = useRegisterForm(setIsLogin);

  if (isLogin) return null;

  return (
    <>
      <form
        action={formAction}
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-4"
      >
        {/* Nome + Sobrenome */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="Nome" error={getError("name")}>
            <input
              id="name"
              name="name"
              type="text"
              maxLength={50}
              autoComplete="given-name"
              placeholder="João"
              value={getValue("name")}
              onChange={handleChange}
              className={inputClass(getError("name"))}
            />
          </Field>
          <Field label="Sobrenome" error={getError("surname")}>
            <input
              id="surname"
              name="surname"
              type="text"
              maxLength={50}
              autoComplete="family-name"
              placeholder="Silva"
              value={getValue("surname")}
              onChange={handleChange}
              className={inputClass(getError("surname"))}
            />
          </Field>
        </div>

        {/* Email + CPF */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="E-mail" error={getError("email")}>
            <input
              id="email"
              name="email"
              type="email"
              maxLength={50}
              autoComplete="email"
              placeholder="seu@email.com"
              value={getValue("email")}
              onChange={handleChange}
              className={inputClass(getError("email"))}
            />
          </Field>
          <Field label="CPF" error={getError("cpf")}>
            <input
              id="cpf"
              name="cpf"
              type="text"
              maxLength={14}
              placeholder="000.000.000-00"
              value={getValue("cpf")}
              onChange={handleChange}
              className={inputClass(getError("cpf"))}
            />
          </Field>
        </div>

        {/* Data de Nascimento + Telefone */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="Data de Nascimento" error={getError("birthDate")}>
            <input
              id="birthDate"
              name="birthDate"
              type="date"
              value={getValue("birthDate")}
              onChange={handleChange}
              className={
                inputClass(getError("birthDate")) + " text-grayScale-400"
              }
            />
          </Field>
          <Field label="Telefone" error={getError("phone")}>
            <input
              id="phone"
              name="phone"
              type="text"
              maxLength={15}
              placeholder="(84)99999-9999"
              value={getValue("phone")}
              onChange={handleChange}
              className={inputClass(getError("phone"))}
            />
          </Field>
        </div>

        {/* CEP + Gênero */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="CEP" error={getError("cep")}>
            <input
              id="cep"
              name="cep"
              type="text"
              maxLength={9}
              placeholder="00000-000"
              value={getValue("cep")}
              onChange={handleChange}
              className={inputClass(getError("cep"))}
            />
          </Field>
          <Field label="Gênero" error={getError("gender")}>
            <select
              id="gender"
              name="gender"
              className="w-full px-4 py-3 rounded-lg bg-gray-surface border border-grayScale-600 text-grayScale-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-cinema transition-all"
            >
              <option value="">Selecione</option>
              <option value="MASCULINO">Masculino</option>
              <option value="FEMININO">Feminino</option>
              <option value="OUTRO">Outro</option>
              <option value="PREFIRO_NAO_INFORMAR">Prefiro não informar</option>
            </select>
          </Field>
        </div>

        {/* Endereço + Número */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <Field label="Endereço" error={getError("address")}>
              <input
                id="address"
                name="address"
                type="text"
                placeholder="Rua das Flores"
                value={getValue("address")}
                onChange={handleChange}
                className={inputClass(getError("address"))}
              />
            </Field>
          </div>
          <Field label="Número" error={getError("number")}>
            <input
              id="number"
              name="number"
              type="text"
              placeholder="123"
              value={getValue("number")}
              onChange={handleChange}
              className={inputClass(getError("number"))}
            />
          </Field>
        </div>

        {/* Bairro + Cidade + Estado */}
        <div className="grid grid-cols-3 gap-4">
          <Field label="Bairro" error={getError("neighborhood")}>
            <input
              id="neighborhood"
              name="neighborhood"
              type="text"
              placeholder="Centro"
              value={getValue("neighborhood")}
              onChange={handleChange}
              className={inputClass(getError("neighborhood"))}
            />
          </Field>
          <Field label="Cidade" error={getError("city")}>
            <input
              id="city"
              name="city"
              type="text"
              placeholder="Natal"
              value={getValue("city")}
              onChange={handleChange}
              className={inputClass(getError("city"))}
            />
          </Field>
          <Field label="Estado" error={getError("state")}>
            <input
              id="state"
              name="state"
              type="text"
              maxLength={2}
              placeholder="RN"
              value={getValue("state")}
              onChange={handleChange}
              className={inputClass(getError("state"))}
            />
          </Field>
        </div>

        {/* Complemento */}
        <Field label="Complemento (opcional)" error={getError("complement")}>
          <input
            id="complement"
            name="complement"
            type="text"
            placeholder="Apto 101"
            value={getValue("complement")}
            onChange={handleChange}
            className={inputClass(getError("complement"))}
          />
        </Field>

        {/* Senha + Confirmar Senha */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="Senha" error={getError("password")}>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                maxLength={20}
                placeholder="********"
                value={getValue("password")}
                onChange={handleChange}
                className={inputClass(getError("password"))}
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-3 cursor-pointer hover:opacity-80"
              >
                <EyeIcon visible={showPassword} />
              </button>
            </div>
            <p className="text-grayScale-500 text-xs mt-1">
              Mín. 6 caracteres, maiúscula, minúscula, número e especial.
            </p>
          </Field>
          <Field label="Confirmar Senha" error={getError("confirmPassword")}>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                maxLength={20}
                placeholder="********"
                value={getValue("confirmPassword")}
                onChange={handleChange}
                className={inputClass(getError("confirmPassword"))}
              />
              <button
                type="button"
                onClick={toggleConfirmPassword}
                className="absolute right-3 top-3 cursor-pointer hover:opacity-80"
              >
                <EyeIcon visible={showConfirmPassword} />
              </button>
            </div>
          </Field>
        </div>

        {/* Termos + Privacidade */}
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex items-center gap-2">
            <input
              id="termsAccepted"
              name="termsAccepted"
              type="checkbox"
              checked={getChecked("termsAccepted")}
              onChange={handleChange}
              value="on"
              className=" w-4 h-4 accent-red-cinema"
            />
            <label
              htmlFor="termsAccepted"
              className="text-grayScale-400 text-xs leading-snug"
            >
              Eu aceito os{" "}
              <Link
                href="/pdfs/termos-de-uso.pdf"
                target="_blank"
                className="text-red-cinema underline font-bold"
              >
                Termos de Uso
              </Link>{" "}
              e a{" "}
              <Link
                href="/pdfs/politica-de-privacidade.pdf"
                target="_blank"
                className="text-red-cinema underline font-bold"
              >
                Política de Privacidade
              </Link>
            </label>
            {getError("termsAccepted") && (
              <span className="text-red-cinema text-xs font-semibold">
                {getError("termsAccepted")}
              </span>
            )}
          </div>
        </div>

        {/* Botão */}
        <button
          type="submit"
          disabled={isPending}
          className={`w-full py-3 mt-2 rounded-lg font-black text-sm uppercase tracking-widest transition-all ${
            isPending
              ? "bg-grayScale-600 cursor-not-allowed text-grayScale-500"
              : "bg-button-primary hover:bg-button-primary-hover text-grayScale-200 cursor-pointer"
          }`}
        >
          {isPending ? "Cadastrando..." : "Criar Conta"}
        </button>

        {/* Erro do servidor */}
        {state.message && !state.success && (
          <p className="text-red-cinema text-xs text-center font-semibold mt-2">
            {state.message}
          </p>
        )}

        {/* Link pro login */}
        <p className="text-center text-grayScale-400 text-sm mt-2">
          Já possui uma conta?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-red-cinema font-bold cursor-pointer hover:underline"
          >
            Entrar agora
          </span>
        </p>
      </form>

      <SuccessModal
        isOpen={showSuccessModal}
        message={state.message || "Cadastro realizado com sucesso!"}
        onClose={handleCloseModal}
      />
    </>
  );
}
