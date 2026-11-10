import { ArrowRight, Truck } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { SchoolListSummary } from "@/components/school-list/school-list-summary";
import { SiteHeader } from "@/components/layout/site-header";
import { getProducts, getSchool, getSchoolLists } from "@/lib/api";

export default async function Home() {
  const [products, schoolLists] = await Promise.all([
    getProducts(),
    getSchoolLists(),
  ]);
  const [featuredSchoolList] = schoolLists;
  const school = featuredSchoolList
    ? await getSchool(featuredSchoolList.schoolId)
    : undefined;

  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-primary text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8 lg:py-20">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-accent">
                School shopping, made simple
              </p>
              <h1 className="mt-4 max-w-2xl font-heading text-4xl font-extrabold leading-tight sm:text-5xl">
                Find what they need for class.
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-7 text-white/90">
                Textbooks, stationery, uniforms, and more from Pen and Paper in
                Tassia, Nairobi.
              </p>
              <a
                href="#sample-products"
                className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 font-heading font-extrabold text-neutral-900 hover:bg-amber-300"
              >
                Browse sample products
                <ArrowRight aria-hidden="true" size={18} />
              </a>
              <p className="mt-3 text-sm text-white/80">
                Sample catalogue only · Prices and stock are not real
              </p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <span className="rounded-xl bg-accent p-3 text-neutral-900">
                  <Truck aria-hidden="true" size={24} />
                </span>
                <div>
                  <h2 className="font-heading text-lg font-extrabold">
                    Delivery details
                  </h2>
                  <p className="mt-2 text-base leading-6 text-white/90">
                    Countrywide delivery is listed as available. Delivery
                    times, areas, and fees: [PLACEHOLDER].
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl space-y-12 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          {featuredSchoolList && school ? (
            <SchoolListSummary
              schoolList={featuredSchoolList}
              schoolName={school.name}
              itemCount={featuredSchoolList.items.length}
            />
          ) : null}

          <section id="sample-products" aria-labelledby="sample-products-title">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-primary">
                  Preview catalogue
                </p>
                <h2
                  id="sample-products-title"
                  className="mt-1 font-heading text-2xl font-extrabold text-neutral-900 sm:text-3xl"
                >
                  Sample textbooks
                </h2>
              </div>
              <p className="text-sm text-neutral-500">
                {products.length} clearly labelled sample listings
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          <section
            id="sample-cart"
            aria-labelledby="sample-cart-title"
            className="rounded-2xl bg-secondary-dark p-5 sm:p-6"
          >
            <h2
              id="sample-cart-title"
              className="font-heading text-xl font-extrabold text-neutral-900"
            >
              Cart setup
            </h2>
            <p className="mt-2 text-base text-neutral-700">
              The cart store is ready and persists in this browser. Add-to-cart
              controls and checkout are part of the next storefront step.
            </p>
          </section>
        </div>
      </main>
      <footer className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-neutral-700 sm:px-6 lg:px-8">
          <p>Pen and Paper · Tassia Complex, off Fedha Road, Nairobi</p>
          <p className="mt-1 text-neutral-500">
            Sample frontend content. Confirm business details before launch.
          </p>
        </div>
      </footer>
    </>
  );
}
