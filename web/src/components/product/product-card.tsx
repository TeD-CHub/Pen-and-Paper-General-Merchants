import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-card">
      <div className="relative aspect-[4/3] bg-neutral-50">
        <Image
          src={product.image}
          alt={`Placeholder image for sample ${product.name}`}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          className="object-cover"
        />
        <span className="absolute left-3 top-3">
          <Badge tone="accent">SAMPLE</Badge>
        </span>
      </div>
      <div className="space-y-3 p-4">
        <div className="flex flex-wrap gap-2">
          <Badge tone="primary">{product.curriculum}</Badge>
          <Badge>{product.grade}</Badge>
        </div>
        <h3 className="min-h-12 font-heading text-base font-bold leading-6 text-neutral-900">
          {product.name}
        </h3>
        <p className="text-sm text-neutral-500">
          Publisher: {product.publisher}
        </p>
        <div className="flex items-end justify-between gap-3 border-t border-neutral-100 pt-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Sample price
            </p>
            <p className="font-heading text-lg font-extrabold text-primary">
              KES {product.priceKsh.toLocaleString("en-KE")}
            </p>
          </div>
          <p className="text-right text-sm font-semibold text-success">
            Sample stock
          </p>
        </div>
      </div>
    </article>
  );
}
