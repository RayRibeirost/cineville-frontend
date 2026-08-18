import Image from "next/image";
import { CatalogProduct } from "@/src/types/admin";
import { formatCents } from "@/src/utils/currency";

/** Card apenas informativo: a compra acontece na reserva do ingresso. */
export default function BomboniereProductCard({
  product,
}: {
  product: CatalogProduct;
}) {
  const image = product.imageUrl || "/assets/promo-candy.png";

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-grayScale-600 bg-gray-surface transition-all duration-300 hover:-translate-y-1 hover:border-red-cinema">
      <div className="relative aspect-4/3 bg-grayScale-700">
        <Image
          src={image}
          alt={product.name}
          fill
          unoptimized={image.startsWith("http")}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="font-bold text-grayScale-200">{product.name}</h3>

        {product.size && (
          <p className="text-xs text-grayScale-400">{product.size}</p>
        )}

        <p className="mt-2 text-base font-black text-red-cinema">
          {formatCents(product.price)}
        </p>
      </div>
    </article>
  );
}
