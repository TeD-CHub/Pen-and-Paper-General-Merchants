"use client";

import Image from "next/image";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import type { Product } from "@/types";

interface ProductImageZoomProps {
  product: Product;
}

export function ProductImageZoom({ product }: ProductImageZoomProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge photo of ${product.name}`}
        className="group relative block aspect-square w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white focus-visible:z-10"
      >
        <Image
          src={product.image}
          alt={`Sample product photo for ${product.name}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-6 transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none"
        />
        <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-sm font-semibold text-neutral-900 shadow-card">
          Tap to enlarge
        </span>
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title={`Sample photo: ${product.name}`}>
        <div className="relative aspect-square w-full">
          <Image
            src={product.image}
            alt={`Enlarged sample product photo for ${product.name}`}
            fill
            sizes="(max-width: 768px) 90vw, 40rem"
            className="object-contain"
          />
        </div>
      </Modal>
    </>
  );
}
