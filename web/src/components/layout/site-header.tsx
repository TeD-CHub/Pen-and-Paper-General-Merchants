import Link from "next/link";
import { BookOpen, ShoppingBag } from "lucide-react";
import { CartCount } from "@/components/cart/cart-count";

export function SiteHeader() {
  return (
    <header className="border-b border-primary-dark bg-primary text-white">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-h-11 items-center gap-2 rounded-md text-white"
          aria-label="Pen and Paper home"
        >
          <BookOpen aria-hidden="true" size={26} strokeWidth={2.25} />
          <span className="font-heading text-lg font-extrabold tracking-tight">
            Pen and Paper
          </span>
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-3 sm:gap-6">
          <Link
            href="#shop-by-category"
            className="min-h-11 rounded-md px-2 py-2 text-sm font-semibold text-white hover:text-lilac-100 sm:text-base"
          >
            Shop
          </Link>
          <Link
            href="/school-lists"
            className="inline-flex min-h-11 items-center rounded-md px-2 py-2 text-sm font-semibold text-white hover:text-lilac-100 sm:text-base"
          >
            School lists
          </Link>
          <Link
            href="/cart"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-accent px-3 py-2 text-sm font-bold text-accent-contrast hover:bg-accent-hover sm:px-4 sm:text-base"
          >
            <ShoppingBag aria-hidden="true" size={18} />
            <span>Cart</span>
            <CartCount />
          </Link>
        </nav>
      </div>
    </header>
  );
}
