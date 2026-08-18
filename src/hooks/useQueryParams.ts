"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";

/**
 * Estado de listagem (página, filtro, busca) na URL.
 *
 * Fica na URL de propósito: é o que permite a página buscar apenas os 10
 * registros daquela página no servidor e, ao mesmo tempo, manter filtro e
 * pesquisa ao trocar de página, voltar pelo histórico ou recarregar a tela.
 *
 * `isPending` acompanha a navegação para as listagens mostrarem carregamento
 * durante a troca de página.
 */
export function useQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const buildUrl = useCallback(
    (changes: Record<string, string | number | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(changes)) {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      }

      const query = params.toString();

      return query ? `${pathname}?${query}` : pathname;
    },
    [pathname, searchParams],
  );

  /**
   * Navega para a mesma tela com os parâmetros alterados.
   *
   * Quem chama decide o que acontece com `page`: um filtro novo passa
   * `page: null` (volta para a primeira), a paginação passa o número da página.
   */
  const update = useCallback(
    (changes: Record<string, string | number | null>) => {
      startTransition(() => {
        router.push(buildUrl(changes), { scroll: false });
      });
    },
    [buildUrl, router],
  );

  return { searchParams, buildUrl, update, isPending };
}
