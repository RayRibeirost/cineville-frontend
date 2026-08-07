"use client";

import {
  ChangeEvent,
  FormEvent,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { RegisterUser } from "../actions/registerActions";
import { RegisterState } from "../types";
import { flatten, safeParse, InferInput } from "valibot";
import { registerSchema } from "../lib/schemas/registerSchema";
import { formatDate } from "../utils/date";
import { useRouter } from "next/navigation";
export type RegisterInput = InferInput<typeof registerSchema>;

const initialState: RegisterState<Partial<RegisterInput>> = {
  success: false,
  errors: {},
  inputs: {},
};

export function useRegisterForm(setIsLogin?: (value: boolean) => void) {
  const [state, formAction, isPending] = useActionState(
    RegisterUser,
    initialState,
  );

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();
  const prevSuccess = useRef(state.success);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPin, setShowPin] = useState(false);

  const [formValues, setFormValues] = useState<Partial<RegisterInput>>({});

  const [clientErrors, setClientErrors] = useState<
    Partial<Record<keyof RegisterInput, string[]>>
  >({});

  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {},
  );

  useEffect(() => {
    if (state.success && !prevSuccess.current) {
      const startSequenceTimer = setTimeout(() => {
        setShowSuccessModal(true);
        setFormValues({});
        setTouchedFields({});
        setClientErrors({});
      }, 0);

      const redirectTimer = setTimeout(() => {
        setShowSuccessModal(false);
        router.push("/login");
      }, 3000);

      return () => {
        clearTimeout(startSequenceTimer);
        clearTimeout(redirectTimer);
      };
    }

    prevSuccess.current = state.success;
  }, [state.success, setIsLogin, router]);

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    if (setIsLogin) setIsLogin(true);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const name = e.target.name as keyof RegisterInput;

    const valorReal =
      e.target instanceof HTMLInputElement && e.target.type === "checkbox"
        ? e.target.checked
        : e.target.value;

    setFormValues((prev) => ({
      ...prev,
      [name]: valorReal,
    }));

    setTouchedFields((prev) => ({
      ...prev,
      [name]: true,
    }));

    if (clientErrors[name]) {
      setClientErrors((prev) => {
        const novo = { ...prev };
        delete novo[name];
        return novo;
      });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const number = formData.get("number")?.toString().trim();
    const complement = formData.get("complement")?.toString().trim();
    const gender = formData.get("gender")?.toString().trim();
    console.log(Object.fromEntries(formData.entries()));
    const dataToValidate = {
      name: formData.get("name")?.toString() || "",
      surname: formData.get("surname")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      password: formData.get("password")?.toString() || "",
      confirmPassword: formData.get("confirmPassword")?.toString() || "",
      termsAccepted: formData.get("termsAccepted") !== null,
      privacyAccepted: formData.get("privacyAccepted") !== null,
      cpf: formData.get("cpf")?.toString() || "",
      birthDate: formatDate(formData.get("birthDate")?.toString() || ""),
      phone: formData.get("phone")?.toString() || "",
      cep: formData.get("cep")?.toString() || "",
      address: formData.get("address")?.toString() || "",
      number: number || undefined,
      complement: complement || undefined,
      neighborhood: formData.get("neighborhood")?.toString() || "",
      city: formData.get("city")?.toString() || "",
      state: formData.get("state")?.toString() || "",
      gender: gender || undefined,
    };

    const resultado = safeParse(registerSchema, dataToValidate);

    if (!resultado.success) {
      e.preventDefault();
      const issues = flatten(resultado.issues).nested;
      console.log(resultado.issues);
      setClientErrors(issues as Partial<Record<keyof RegisterInput, string[]>>);
    }
  };

  const getValue = (field: keyof RegisterInput): string => {
    const val = formValues[field] ?? state.inputs?.[field];
    return val !== null && val !== undefined && typeof val !== "boolean"
      ? String(val)
      : "";
  };

  const getChecked = (field: keyof RegisterInput): boolean => {
    const val = formValues[field] ?? state.inputs?.[field];
    return Boolean(val);
  };

  const getError = (field: keyof RegisterInput) => {
    const isDirty = touchedFields[field as string];
    if (clientErrors[field]) return clientErrors[field]![0];
    if (!isDirty && state.errors?.[field]) return state.errors[field]![0];
    return undefined;
  };

  const togglePassword = () => setShowPassword((p) => !p);
  const toggleConfirmPassword = () => setShowConfirmPassword((p) => !p);
  const togglePin = () => setShowPin((p) => !p);

  return {
    state,
    formAction,
    isPending,
    handleChange,
    handleSubmit,
    getValue,
    getChecked,
    getError,
    showPassword,
    togglePassword,
    showConfirmPassword,
    toggleConfirmPassword,
    showPin,
    togglePin,
    showSuccessModal,
    handleCloseModal,
  };
}
