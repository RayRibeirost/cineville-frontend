import Link from "next/link";
import HeadingContent from "@/src/components/ui/HeadingContent";
import HomeBomboniereCard from "./HomeBomboniereCard";
import PromoCandy from "./PromoCandy";
import { getBomboniereCatalog } from "@/src/actions/catalogActions";
import { getServerUser } from "@/src/lib/auth";
import { PRODUCT_CATEGORIES, CatalogProduct } from "@/src/types/admin";

/** Quantos produtos a Home mostra antes de mandar para o catálogo completo. */
const HOME_PRODUCTS_LIMIT = 8;

/**
 * Bomboniere na Home, com os produtos reais cadastrados no backend.
 *
 * Intercala as categorias para que a vitrine não fique só de combos quando uma
 * categoria tem muito mais itens que as outras.
 */
function pickHighlights(
  catalog: Partial<Record<string, CatalogProduct[]>>,
): CatalogProduct[] {
  const queues = PRODUCT_CATEGORIES.map((category) => [
    ...(catalog[category] ?? []),
  ]);

  const highlights: CatalogProduct[] = [];

  while (
    highlights.length < HOME_PRODUCTS_LIMIT &&
    queues.some((queue) => queue.length)
  ) {
    for (const queue of queues) {
      const product = queue.shift();

      if (product) highlights.push(product);

      if (highlights.length === HOME_PRODUCTS_LIMIT) break;
    }
  }

  return highlights;
}

export default async function HomeBomboniere() {
  const user = await getServerUser();

  // `GET /products/availables` exige token no backend; sem login não há o que
  // buscar, então mostramos o convite em vez de um erro.
  const result = user ? await getBomboniereCatalog() : null;
  const catalog = result?.success ? result.data : undefined;

  // Destaque: primeiro combo disponível. Sem combos cadastrados, a Home
  // simplesmente não mostra o banner — em vez de inventar uma oferta.
  const featured = catalog?.COMBOS?.find(
    (product) => product.isAvailable && product.quantity > 0,
  );

  const highlights = catalog
    ? pickHighlights(catalog).filter((product) => product._id !== featured?._id)
    : [];

  return (
    <section
      id="bomboniere"
      className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <HeadingContent title="Bomboniere" />

        <Link
          href="/bomboniere"
          className="text-sm font-bold text-grayScale-400 transition-colors hover:text-red-cinema"
        >
          Ver todos
        </Link>
      </div>

      <p className="mt-4 max-w-2xl text-sm text-grayScale-400">
        Separe a pipoca antes de escolher a poltrona: o que você marcar aqui já
        aparece no carrinho quando finalizar a compra do ingresso.
      </p>

      {!user ? (
        <div className="mt-8 rounded-xl border border-grayScale-600 bg-gray-surface px-6 py-12 text-center">
          <p className="text-sm text-grayScale-400">
            Entre na sua conta para ver os produtos disponíveis na bomboniere.
          </p>

          <Link
            href="/login"
            className="mt-5 inline-flex items-center justify-center rounded-md bg-button-primary px-5 py-2.5 text-sm font-bold text-white transition-all hover:scale-105"
          >
            Entrar
          </Link>
        </div>
      ) : result && !result.success ? (
        <p className="mt-8 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {result.error}
        </p>
      ) : !highlights.length && !featured ? (
        <p className="mt-8 rounded-xl border border-grayScale-600 bg-gray-surface px-6 py-12 text-center text-sm text-grayScale-400">
          Nenhum produto disponível no momento.
        </p>
      ) : (
        <>
          {featured && <PromoCandy product={featured} />}

          {!!highlights.length && (
            <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {highlights.map((product) => (
                <HomeBomboniereCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
