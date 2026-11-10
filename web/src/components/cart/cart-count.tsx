"use client";

import { useSyncExternalStore } from "react";
import { useCartStore } from "@/store/cart-store";

export function CartCount() {
  const count = useSyncExternalStore(
    useCartStore.subscribe,
    () =>
      useCartStore
        .getState()
        .items.reduce((total, item) => total + item.quantity, 0),
    () => 0,
  );

  return (
    <span
      aria-label={`${count} items`}
      className="inline-flex min-w-6 justify-center rounded-full bg-accent-hover px-1.5 text-xs tabular-nums"
    >
      {count}
    </span>
  );
}
