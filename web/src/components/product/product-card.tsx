import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-card">
      <Link
        href={`/product/${product.slug}`}
        aria-label={`View ${product.name}`}
        className="relative block aspect-[4/3] bg-neutral-50 focus-visible:z-10"
      >
        <Image
          src={product.image}
          alt={`Placeholder image for sample ${product.name}`}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          className="object-cover"
        />
        <span className="absolute left-3 top-3">
          <Badge tone="accent">CBC</Badge>
        </span>
      </Link>
      <div className="space-y-3 p-4">
        <div className="flex flex-wrap gap-2">
          <Badge tone="primary">{product.curriculum}</Badge>
          <Badge>{product.grade}</Badge>
        </div>
        <h3 className="min-h-12 font-heading text-base font-bold leading-6 text-neutral-900">
          <Link
            href={`/product/${product.slug}`}
            className="rounded-sm underline-offset-2 hover:text-primary hover:underline focus-visible:outline-none"
          >
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-neutral-500">
          Publisher: {product.publisher}
        </p>
        <div className="flex items-end justify-between gap-3 border-t border-purple-50 pt-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Price
            </p>
            <p className="font-heading text-lg font-extrabold text-primary">
              KES {product.priceKsh.toLocaleString("en-KE")}
            </p>
          </div>
          <p className="text-right text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
            In stock
          </p>
        </div>
      </div>
    </article>
  );
}
