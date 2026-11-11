import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  HeartHandshake,
  MapPinned,
  PencilRuler,
  Truck,
} from "lucide-react";
import { Hero3DWrapper } from "@/components/3d/hero-3d-wrapper";
import { CategoryShowcase } from "@/components/home/category-showcase";
import { SchoolListFinder } from "@/components/home/school-list-finder";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { getCategories, getProducts, getSchoolLists, getSchools } from "@/lib/api";

const steps = [
  {
    number: "01",
    title: "Find Your Books or List",
    description:
      "Search our catalogue or lookup your school’s exact booklist by grade.",
    icon: BookOpen,
  },
  {
    number: "02",
    title: "Confirm Your Basket",
    description:
      "Review your quantities, select needed items, and proceed to checkout or WhatsApp order.",
    icon: PencilRuler,
  },
  {
    number: "03",
    title: "Countrywide Delivery",
    description:
      "Fast packaging and dispatch directly to your doorstep or school across Kenya.",
    icon: Truck,
  },
];

const reasons = [
  {
    title: "Curriculum Aligned",
    description:
      "Approved CBC textbooks, set books, and revision materials from authorized educational publishers.",
    icon: BadgeCheck,
  },
  {
    title: "Retail & Bulk Savings",
    description:
      "Special discounts for wholesale school orders, bookshops, and complete classroom sets.",
    icon: HeartHandshake,
  },
  {
    title: "Reliable Kenya Delivery",
    description:
      "Prompt dispatch from our Nairobi store directly to your home or school countrywide.",
    icon: MapPinned,
  },
];

export default async function Home() {
  const [categories, products, schools, schoolLists] = await Promise.all([
    getCategories(),
    getProducts(),
    getSchools(),
    getSchoolLists(),
  ]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        {/* Modern Purple Hero Section */}
        <section className="relative isolate overflow-hidden bg-gradient-to-br from-purple-950 via-purple-900 to-primary text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-32 size-[32rem] rounded-full bg-purple-500/15 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -bottom-32 size-[28rem] rounded-full bg-purple-600/10 blur-3xl"
          />

          <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-24">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-300/30 bg-purple-500/20 px-3.5 py-1.5 text-xs font-bold tracking-wide text-purple-100 backdrop-blur-md">
                <span className="size-2 rounded-full bg-purple-300" aria-hidden="true" />
                School Supplies &amp; Books &bull; Nairobi, Kenya
              </div>

              <h1 className="mt-5 max-w-2xl font-heading text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl text-white">
                Big ideas start with the <span className="text-purple-200">right supplies.</span>
              </h1>

              <p className="mt-5 max-w-xl text-lg leading-relaxed text-purple-100/90 sm:text-xl">
                Approved CBC textbooks, durable exercise books, and everyday school essentials. Retail convenience and wholesale savings for every curious learner.
              </p>

              <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
                <a
                  href="#featured-textbooks"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-heading font-extrabold text-purple-950 shadow-md transition-all hover:bg-purple-50 hover:shadow-lg"
                >
                  Shop Catalogue
                  <ArrowRight aria-hidden="true" size={18} />
                </a>
                <a
                  href="#sample-school-list"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-heading font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
                >
                  Find Your School List
                  <ArrowDown aria-hidden="true" size={18} />
                </a>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-purple-400/20 pt-6 text-xs font-semibold text-purple-200 sm:text-sm">
                <span className="flex items-center gap-1.5">
                  <span className="text-purple-300">✓</span> CBC Curriculum Aligned
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-purple-300">✓</span> Retail &amp; Bulk Packs
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-purple-300">✓</span> Countrywide Delivery
                </span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <Hero3DWrapper />
            </div>
          </div>
        </section>

        {/* Content Flow */}
        <div className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:space-y-20 sm:px-6 sm:py-16 lg:space-y-24 lg:px-8">
          {/* School List Finder */}
          <ScrollReveal>
            <SchoolListFinder
              schools={schools}
              schoolLists={schoolLists}
              products={products}
            />
          </ScrollReveal>

          {/* Product Category Showcase */}
          <ScrollReveal>
            <CategoryShowcase categories={categories} products={products} />
          </ScrollReveal>

          {/* Simple 3-Step Process */}
          <ScrollReveal>
            <section aria-labelledby="how-it-works-heading">
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-xs font-extrabold uppercase tracking-widest text-primary">
                  Simple &bull; Convenient &bull; Stress-Free
                </p>
                <h2
                  id="how-it-works-heading"
                  className="mt-2 font-heading text-2xl font-extrabold text-neutral-900 sm:text-3xl"
                >
                  How it works
                </h2>
                <p className="mt-2 text-base text-neutral-700">
                  Three simple steps to get your learner completely equipped for the school term.
                </p>
              </div>
              <ol className="mt-10 grid gap-6 md:grid-cols-3">
                {steps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <li
                      key={step.number}
                      className="relative rounded-2xl border border-purple-100 bg-white p-6 shadow-sm transition-all hover:border-purple-300 hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-heading text-xs font-extrabold tracking-widest text-primary">
                          STEP {step.number}
                        </span>
                        <span className="grid size-11 place-items-center rounded-xl bg-purple-50 text-primary">
                          <Icon aria-hidden="true" size={22} />
                        </span>
                      </div>
                      <h3 className="mt-4 font-heading text-lg font-extrabold text-neutral-900">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                        {step.description}
                      </p>
                    </li>
                  );
                })}
              </ol>
            </section>
          </ScrollReveal>

          {/* Why Choose Us */}
          <ScrollReveal>
            <section aria-labelledby="why-choose-heading">
              <div className="max-w-2xl">
                <p className="text-xs font-extrabold uppercase tracking-widest text-primary">
                  The Pen &amp; Paper Standard
                </p>
                <h2
                  id="why-choose-heading"
                  className="mt-2 font-heading text-2xl font-extrabold text-neutral-900 sm:text-3xl"
                >
                  Why choose Pen and Paper?
                </h2>
              </div>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {reasons.map((reason) => {
                  const Icon = reason.icon;
                  return (
                    <article
                      key={reason.title}
                      className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm transition-all hover:border-purple-300 hover:shadow-md"
                    >
                      <span className="grid size-12 place-items-center rounded-2xl bg-purple-50 text-primary">
                        <Icon aria-hidden="true" size={24} />
                      </span>
                      <h3 className="mt-4 font-heading text-lg font-extrabold text-neutral-900">
                        {reason.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                        {reason.description}
                      </p>
                    </article>
                  );
                })}
              </div>
            </section>
          </ScrollReveal>
        </div>
      </main>

      {/* Cohesive Royal Purple Footer */}
      <footer className="mt-20 border-t border-purple-900 bg-purple-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-white">
                  <BookOpen size={18} />
                </div>
                <span className="font-heading text-lg font-extrabold tracking-tight">
                  Pen &amp; Paper Provisions
                </span>
              </div>
              <p className="mt-3 text-sm text-purple-200/80 leading-relaxed max-w-sm">
                Supplying schools, parents, and curious minds with quality educational books, exercise books, and stationery essentials.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-purple-200">
                Quick Navigation
              </h4>
              <ul className="mt-3 space-y-2 text-sm text-purple-200/80">
                <li>
                  <a href="#featured-textbooks" className="hover:text-white transition-colors">
                    Catalogue
                  </a>
                </li>
                <li>
                  <Link href="/school-lists" className="hover:text-white transition-colors">
                    School Lists
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="hover:text-white transition-colors">
                    My Shopping Cart
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-purple-200">
                Location &amp; Delivery
              </h4>
              <p className="mt-3 text-sm text-purple-200/80 leading-relaxed">
                Tassia Complex, off Fedha Road, Embakasi, Nairobi, Kenya.
              </p>
              <p className="mt-2 text-sm font-semibold text-purple-100">
                Countrywide parcel delivery available.
              </p>
            </div>
          </div>
          <div className="mt-10 border-t border-purple-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-purple-300/70">
            <p>&copy; 2026 Pen and Paper Provisions. All rights reserved.</p>
            <p>Made for curious learners across Kenya.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
