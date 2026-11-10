"use client";

import { useState, type FormEvent } from "react";
import { MessageCircle, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Price } from "@/components/ui/price";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/types";

interface ProductPurchasePanelProps {
  product: Product;
}

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const [quantity, setQuantity] = useState(1);
  const [cartMessage, setCartMessage] = useState("");
  const [notifyMessage, setNotifyMessage] = useState("");
  const addItem = useCartStore((state) => state.addItem);
  const inStock = product.stockStatus !== "out-of-stock";
  const whatsappMessage = encodeURIComponent(
    `Hi Pen and Paper, I’m interested in ${product.name} (SKU: ${product.sku}). Please confirm availability and delivery options.`,
  );
  const whatsappHref = `https://wa.me/?text=${whatsappMessage}`;

  function addToCart() {
    addItem(product.id, quantity);
    setCartMessage(`${quantity} ${quantity === 1 ? "copy" : "copies"} added to your cart.`);
  }

  function handleNotifySubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotifyMessage("Thanks. This sample notification form is not connected to a live service.");
    event.currentTarget.reset();
  }

  return (
    <section aria-label="Purchase options" className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-card sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Badge status={product.stockStatus} />
        <span className="text-sm text-neutral-600">Sample listing</span>
      </div>

      <p className="mt-4 text-sm font-semibold text-neutral-600">Sample price</p>
      <Price amount={product.priceKsh} className="font-heading text-3xl font-extrabold text-primary" />
      <p className="mt-1 text-sm text-neutral-600">Sample price only; confirm before ordering.</p>

      {inStock ? (
        <div className="mt-5">
          <QuantityStepper label={product.name} value={quantity} onChange={setQuantity} />
        </div>
      ) : (
        <form onSubmit={handleNotifySubmit} className="mt-5 grid gap-3">
          <p className="font-semibold text-neutral-900">Get an email when this item is available.</p>
          <Input
            id={`notify-${product.id}`}
            name="email"
            label="Email address"
            type="email"
            autoComplete="email"
            required
          />
          <Button type="submit" variant="secondary" className="w-full">
            Notify me
          </Button>
          {notifyMessage ? (
            <p role="status" className="text-sm text-neutral-700">{notifyMessage}</p>
          ) : null}
          <p className="text-sm text-neutral-600">
            Sample form only; notification requests are not sent or stored.
          </p>
        </form>
      )}

      {inStock ? (
        <div className="mt-5 grid gap-3">
          <Button onClick={addToCart} className="w-full">
            <ShoppingCart aria-hidden="true" size={18} />
            Add to Cart
          </Button>
          {cartMessage ? <p role="status" className="text-sm font-semibold text-success">{cartMessage}</p> : null}
        </div>
      ) : null}

      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-primary px-4 py-2 font-semibold text-primary transition-colors hover:bg-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
      >
        <MessageCircle aria-hidden="true" size={18} />
        Order via WhatsApp
      </a>

      <div className="mt-5 rounded-xl bg-secondary p-4">
        <h2 className="font-heading font-bold text-neutral-900">Delivery information</h2>
        <p className="mt-2 text-sm leading-6 text-neutral-700">
          Countrywide delivery is available. Estimated delivery time: [PLACEHOLDER].
          Delivery options and charges may vary by destination and order.
        </p>
      </div>

      <div className="mt-4 border-t border-neutral-200 pt-4">
        <h2 className="font-heading font-bold text-neutral-900">Bulk pricing</h2>
        <p className="mt-1 text-sm leading-6 text-neutral-700">
          Bulk price tiers are not configured yet. Minimum quantity and tier prices: [PLACEHOLDER].
          Contact us via WhatsApp for a quote.
        </p>
      </div>

      {!inStock ? (
        <p role="status" className="sr-only">This item is out of stock. Add your email above to request a notification.</p>
      ) : null}
    </section>
  );
}

interface StickyAddToCartProps {
  product: Product;
}

export function StickyAddToCart({ product }: StickyAddToCartProps) {
  const [message, setMessage] = useState("");
  const addItem = useCartStore((state) => state.addItem);

  if (product.stockStatus === "out-of-stock") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-neutral-200 bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-raised sm:hidden">
      <div className="mx-auto flex max-w-7xl items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-neutral-700">{product.name}</p>
          <Price amount={product.priceKsh} className="font-heading font-extrabold text-primary" />
        </div>
        <Button
          onClick={() => {
            addItem(product.id);
            setMessage("Added to cart");
          }}
          aria-label={`Add ${product.name} to cart`}
          className="shrink-0"
        >
          <ShoppingCart aria-hidden="true" size={18} />
          Add to Cart
        </Button>
      </div>
      <p role="status" aria-live="polite" className="sr-only">{message}</p>
    </div>
  );
}
