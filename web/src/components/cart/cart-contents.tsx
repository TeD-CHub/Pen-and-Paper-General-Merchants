"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { ArrowLeft, MessageCircle, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Price, formatKes } from "@/components/ui/price";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/types";

interface CartContentsProps {
  products: Product[];
}

export function CartContents({ products }: CartContentsProps) {
  const items = useCartStore((state) => state.items);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const productById = useMemo(
    () => new Map(products.map((product) => [product.id, product])),
    [products],
  );
  const rows = items.map((item) => ({
    item,
    product: productById.get(item.productId),
  }));
  const subtotal = rows.reduce(
    (total, row) => total + (row.product?.priceKsh ?? 0) * row.item.quantity,
    0,
  );
  const hasMissingProducts = rows.some((row) => !row.product);
  const canSendOrder = rows.length > 0 && !hasMissingProducts;

  const orderMessage = [
    "Hi Pen and Paper, I’d like to check out this basket:",
    "",
    ...rows.flatMap(({ item, product }) =>
      product
        ? [
            `• ${product.name} × ${item.quantity}`,
            `  ${formatKes(product.priceKsh)} each · ${formatKes(product.priceKsh * item.quantity)} sample line total`,
          ]
        : [],
    ),
    "",
    `Sample subtotal (delivery not included): ${formatKes(subtotal)}`,
    "",
    "Please confirm current availability, final prices, delivery fee, and M-Pesa payment details.",
  ].join("\n");
  const whatsappHref = getWhatsAppUrl(orderMessage);

  if (items.length === 0) {
    return (
      <EmptyState
        title="Your basket is empty"
        description="Browse school supplies or choose items from a school list, then come back here to send your basket."
        action={
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/school-lists"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-accent px-4 py-2 font-semibold text-accent-contrast hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
            >
              Find a school list
            </Link>
            <Link
              href="/#featured-textbooks"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-primary px-4 py-2 font-semibold text-primary hover:bg-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
            >
              <ArrowLeft aria-hidden="true" size={17} />
              Browse books
            </Link>
          </div>
        }
      />
    );
  }

  return (
    <section aria-labelledby="cart-heading">
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-wide text-primary">Your order</p>
        <h1 id="cart-heading" className="mt-1 font-heading text-3xl font-extrabold text-neutral-900">
          Your basket
        </h1>
        <p className="mt-2 text-neutral-700">
          Check your items, then send the basket to us on WhatsApp to confirm your order.
        </p>
      </div>

      <ul className="divide-y divide-neutral-200 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
        {rows.map(({ item, product }) => (
          <li key={item.productId} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
            {product ? (
              <>
                <Image
                  src={product.image}
                  alt=""
                  width={72}
                  height={88}
                  className="size-[4.5rem] rounded-lg border border-neutral-200 bg-secondary object-contain p-1"
                />
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/product/${product.slug}`}
                    className="font-heading font-bold text-neutral-900 hover:text-primary"
                  >
                    {product.name}
                  </Link>
                  <p className="mt-1 text-sm text-neutral-600">
                    {product.grade} · SKU: {product.sku}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Badge status={product.stockStatus} />
                    <Price amount={product.priceKsh} className="font-semibold text-neutral-900" />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                  <QuantityStepper
                    label={product.name}
                    value={item.quantity}
                    onChange={(quantity) => setQuantity(item.productId, quantity)}
                  />
                  <p className="font-semibold text-neutral-900">
                    <span className="sr-only">Sample line total: </span>
                    <Price amount={product.priceKsh * item.quantity} />
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.productId)}
                  aria-label={`Remove ${product.name} from basket`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-lg px-3 text-sm font-semibold text-error hover:bg-error-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 sm:self-center"
                >
                  <Trash2 aria-hidden="true" size={18} />
                  <span className="sm:sr-only">Remove</span>
                </button>
              </>
            ) : (
              <div className="flex w-full items-center justify-between gap-3">
                <p className="font-semibold text-error">An item in your saved basket is no longer available.</p>
                <button
                  type="button"
                  onClick={() => removeItem(item.productId)}
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 font-semibold text-error hover:bg-error-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
                >
                  <Trash2 aria-hidden="true" size={18} />
                  Remove item
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {hasMissingProducts ? (
        <p role="alert" className="mt-4 rounded-lg bg-error-light p-4 text-error">
          Remove the unavailable saved item before sending your basket.
        </p>
      ) : null}

      <div className="mt-5 rounded-2xl bg-white p-5 shadow-card sm:ml-auto sm:max-w-md sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <span className="font-heading font-bold text-neutral-900">Sample subtotal</span>
          <Price amount={subtotal} className="font-heading text-xl font-extrabold text-primary" />
        </div>
        <p className="mt-2 text-sm leading-6 text-neutral-600">
          Sample catalogue prices only. Delivery is not included; we’ll confirm availability,
          final pricing, delivery, and M-Pesa payment details in WhatsApp.
        </p>
        {canSendOrder ? (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2 font-semibold text-accent-contrast transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
          >
            <MessageCircle aria-hidden="true" size={19} />
            Send basket to WhatsApp
          </a>
        ) : (
          <Button type="button" disabled className="mt-5 w-full">
            <MessageCircle aria-hidden="true" size={19} />
            Send basket to WhatsApp
          </Button>
        )}
      </div>
    </section>
  );
}
