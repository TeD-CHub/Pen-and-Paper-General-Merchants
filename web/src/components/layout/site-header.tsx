import Link from "next/link";
import { BookOpen, ShoppingBag } from "lucide-react";
import { CartCount } from "@/components/cart/cart-count";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-purple-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-h-11 items-center gap-2.5 text-purple-950 transition-opacity hover:opacity-90"
          aria-label="Pen and Paper home"
        >
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-white shadow-sm">
            <BookOpen aria-hidden="true" size={20} strokeWidth={2.25} />
          </div>
          <span className="font-heading text-xl font-extrabold tracking-tight text-purple-950">
            Pen &amp; Paper
          </span>
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-2 sm:gap-6">
          <Link
            href="#shop-by-category"
            className="min-h-11 rounded-md px-3 py-2 text-sm font-semibold text-neutral-700 hover:text-primary transition-colors sm:text-base"
          >
            Catalogue
          </Link>
          <Link
            href="/school-lists"
            className="inline-flex min-h-11 items-center rounded-md px-3 py-2 text-sm font-semibold text-neutral-700 hover:text-primary transition-colors sm:text-base"
          >
            School Lists
          </Link>
          <Link
            href="/cart"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-primary-hover transition-all sm:text-base"
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
