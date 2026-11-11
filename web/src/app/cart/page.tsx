import type { Metadata } from "next";
import { CartContents } from "@/components/cart/cart-contents";
import { SiteHeader } from "@/components/layout/site-header";
import { getProducts } from "@/lib/api";

export const metadata: Metadata = {
  title: "Your basket | Pen and Paper",
  description: "Review your school supplies basket and send your order enquiry to Pen and Paper on WhatsApp.",
};

export default async function CartPage() {
  const products = await getProducts();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto min-h-[60vh] max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <CartContents products={products} />
      </main>
    </>
  );
}
