"use client";

import Link from "next/link";
import { useState } from "react";
import { BookOpen, Menu, ShoppingBag, X } from "lucide-react";
import { CartCount } from "@/components/cart/cart-count";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-20 border-b border-neutral-200 bg-white text-neutral-900">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-2 px-3 sm:gap-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-h-11 items-center gap-2 rounded-md text-primary"
          aria-label="Pen and Paper home"
        >
          <BookOpen aria-hidden="true" size={24} strokeWidth={2.25} />
          <span className="whitespace-nowrap font-heading text-base font-extrabold tracking-tight sm:text-lg">
            Pen and Paper
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-3 sm:flex sm:gap-6">
          <Link
            href="/#shop-by-category"
            className="min-h-11 rounded-md px-2 py-2 text-sm font-semibold text-neutral-700 hover:text-primary sm:text-base"
          >
            Shop
          </Link>
          <Link
            href="/school-lists"
            className="inline-flex min-h-11 items-center rounded-md px-2 py-2 text-sm font-semibold text-neutral-700 hover:text-primary sm:text-base"
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

        <div className="flex shrink-0 items-center gap-1 sm:hidden">
          <Link
            href="/cart"
            aria-label="Cart, current item count shown"
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1 rounded-lg bg-accent px-2 text-sm font-bold text-accent-contrast hover:bg-accent-hover"
          >
            <ShoppingBag aria-hidden="true" size={18} />
            <CartCount />
          </Link>
          <button
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-main-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-neutral-200 text-neutral-800 hover:bg-secondary"
          >
            {menuOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          id="mobile-main-navigation"
          aria-label="Mobile navigation"
          className="absolute inset-x-0 top-full border-b border-neutral-200 bg-white px-3 py-2 shadow-card sm:hidden"
        >
          <Link
            href="/#shop-by-category"
            onClick={() => setMenuOpen(false)}
            className="flex min-h-11 items-center rounded-md px-3 font-semibold text-neutral-800 hover:bg-secondary"
          >
            Shop
          </Link>
          <Link
            href="/school-lists"
            onClick={() => setMenuOpen(false)}
            className="flex min-h-11 items-center rounded-md px-3 font-semibold text-neutral-800 hover:bg-secondary"
          >
            School lists
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
