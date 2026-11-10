import Image from "next/image";
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
import { CategoryShowcase } from "@/components/home/category-showcase";
import { NewsletterSignup } from "@/components/home/newsletter-signup";
import { QuoteRequest } from "@/components/home/quote-request";
import { SchoolListFinder } from "@/components/home/school-list-finder";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { getBlogPosts, getCategories, getProducts, getSchoolLists, getSchools } from "@/lib/api";

const steps = [
  {
    number: "01",
    title: "Choose what you need",
    description:
      "Browse the catalogue or check your school’s book list. If you’re unsure, our team is happy to help.",
    icon: BookOpen,
  },
  {
    number: "02",
    title: "Pay with M-Pesa",
    description:
      "Choose M-Pesa at checkout and follow the payment prompt when placing your order.",
    icon: PencilRuler,
  },
  {
    number: "03",
    title: "Get your order delivered",
    description:
      "We deliver across Kenya. Delivery options and charges may vary by destination and order.",
    icon: Truck,
  },
];

const reasons = [
  {
    title: "Personal service",
    description:
      "Need help finding a title or understanding a list? Our team is happy to help.",
    icon: HeartHandshake,
  },
  {
    title: "Clear product details",
    description:
      "We aim to show useful book details like curriculum, grade, and publisher. Confirm editions and availability before ordering.",
    icon: BadgeCheck,
  },
  {
    title: "Countrywide delivery",
    description:
      "We deliver across Kenya; delivery times and charges may vary by destination.",
    icon: MapPinned,
  },
];

export default async function Home() {
  const [categories, products, blogPosts, schools, schoolLists] = await Promise.all([
    getCategories(),
    getProducts(),
    getBlogPosts(),
    getSchools(),
    getSchoolLists(),
  ]);

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative isolate overflow-hidden bg-primary text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-40 size-[28rem] rounded-full border-[3rem] border-white/[0.06] sm:size-[38rem]"
          />
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-20">
            <div className="relative z-10">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-bold text-white">
                <span className="size-2 rounded-full bg-white" aria-hidden="true" />
                For families, schools & more
              </p>
              <h1 className="mt-5 max-w-2xl font-heading text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
                A good school day starts with the right supplies.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-7 text-white sm:text-xl">
                From books to the little classroom essentials, let’s get them ready for the term — bila stress.
              </p>
              <p className="mt-3 text-sm text-white">
                Pen and Paper · Tassia Complex, off Fedha Road, Nairobi
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#featured-textbooks"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 font-heading font-extrabold text-accent-contrast transition-colors hover:bg-accent-hover"
                >
                  Shop Books
                  <ArrowRight aria-hidden="true" size={18} />
                </a>
                <a
                  href="#sample-school-list"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/35 bg-white/5 px-5 py-3 font-heading font-bold text-white transition-colors hover:bg-white/10"
                >
                  Find Your School List
                  <ArrowDown aria-hidden="true" size={18} />
                </a>
              </div>
              <p className="mt-3 text-sm text-white">
                Sample online catalogue · Product availability and prices are for illustration
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-lg">
              <div className="rounded-[2rem] border border-white/20 bg-white/10 p-4 shadow-raised backdrop-blur-sm sm:p-6">
                <div className="rounded-[1.5rem] bg-secondary p-5 text-neutral-900 sm:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <span className="grid size-12 place-items-center rounded-2xl bg-primary text-white">
                      <BookOpen aria-hidden="true" size={25} />
                    </span>
                    <span className="rounded-full bg-lilac-100 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-lilac-900">
                      School-ready
                    </span>
                  </div>
                  <p className="mt-6 text-sm font-bold uppercase tracking-wide text-primary">
                    One less thing to worry about
                  </p>
                  <p className="mt-2 font-heading text-2xl font-extrabold leading-tight sm:text-3xl">
                    Books, lists & everyday essentials.
                  </p>
                  <div className="mt-6 space-y-3">
                    {["Check a school list", "Find the right book", "Plan delivery"].map(
                      (item, index) => (
                        <div
                          key={item}
                          className="flex min-h-12 items-center gap-3 rounded-xl border border-neutral-200 bg-white px-3 py-2"
                        >
                          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary-light text-sm font-extrabold text-primary">
                            {index + 1}
                          </span>
                          <span className="font-semibold">{item}</span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-2 hidden items-center gap-2 rounded-xl bg-lilac-100 px-4 py-3 font-heading text-sm font-extrabold text-lilac-900 shadow-raised sm:flex">
                <PencilRuler aria-hidden="true" size={19} />
                Ready for the school run
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl space-y-14 px-4 py-10 sm:space-y-16 sm:px-6 sm:py-14 lg:space-y-20 lg:px-8">
          <ScrollReveal>
            <SchoolListFinder
              schools={schools}
              schoolLists={schoolLists}
              products={products}
            />
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-12">
              <CategoryShowcase categories={categories} products={products} />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <section aria-labelledby="how-it-works-heading">
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-sm font-bold uppercase tracking-wide text-primary">
                  Simple steps, kutoka hapa to home
                </p>
                <h2
                  id="how-it-works-heading"
                  className="mt-2 font-heading text-2xl font-extrabold text-neutral-900 sm:text-3xl"
                >
                  How it works
                </h2>
                <p className="mt-2 text-base text-neutral-700">
                  Three clear steps to get your school shopping moving.
                </p>
              </div>
              <ol className="mt-8 grid gap-4 md:grid-cols-3">
                {steps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <li
                      key={step.number}
                      className="relative rounded-2xl border border-neutral-200 bg-white p-5 shadow-card sm:p-6"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-heading text-sm font-extrabold tracking-widest text-primary">
                          STEP {step.number}
                        </span>
                        <span className="grid size-11 place-items-center rounded-xl bg-primary-light text-primary">
                          <Icon aria-hidden="true" size={22} />
                        </span>
                      </div>
                      <h3 className="mt-4 font-heading text-lg font-extrabold text-neutral-900">
                        {step.title}
                      </h3>
                      <p className="mt-2 leading-6 text-neutral-700">
                        {step.description}
                      </p>
                    </li>
                  );
                })}
              </ol>
              <p className="mt-4 text-center text-sm text-neutral-500">
                Checkout and M-Pesa payment are not connected in this sample frontend.
              </p>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <QuoteRequest />
          </ScrollReveal>

          <ScrollReveal>
            <section aria-labelledby="why-choose-heading">
              <div className="max-w-2xl">
                <p className="text-sm font-bold uppercase tracking-wide text-primary">
                  Here to make it easier
                </p>
                <h2
                  id="why-choose-heading"
                  className="mt-2 font-heading text-2xl font-extrabold text-neutral-900 sm:text-3xl"
                >
                  Why choose Pen and Paper?
                </h2>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {reasons.map((reason) => {
                  const Icon = reason.icon;
                  return (
                    <article
                      key={reason.title}
                      className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-neutral-200 sm:p-6"
                    >
                      <span className="grid size-12 place-items-center rounded-2xl bg-primary-light text-primary">
                        <Icon aria-hidden="true" size={23} />
                      </span>
                      <h3 className="mt-4 font-heading text-lg font-extrabold text-neutral-900">
                        {reason.title}
                      </h3>
                      <p className="mt-2 leading-6 text-neutral-700">
                        {reason.description}
                      </p>
                    </article>
                  );
                })}
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section id="latest-blog" aria-labelledby="blog-heading">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-primary">
                    Notes for the school journey
                  </p>
                  <h2
                    id="blog-heading"
                    className="mt-2 font-heading text-2xl font-extrabold text-neutral-900 sm:text-3xl"
                  >
                    Latest from the blog
                  </h2>
                </div>
                <p className="text-sm text-neutral-500">
                  Sample article ideas · Not published advice
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {blogPosts.slice(0, 3).map((post) => (
                  <article
                    key={post.id}
                    className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-card"
                  >
                    <div className="relative aspect-[16/9] bg-neutral-50">
                      <Image
                        src={post.image}
                        alt="School supplies and learning materials"
                        fill
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                        className="object-cover"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-lilac-100 px-3 py-1 text-xs font-extrabold text-lilac-900">
                        SAMPLE ARTICLE
                      </span>
                    </div>
                    <div className="p-5">
                      <p className="text-sm font-bold text-primary">{post.category}</p>
                      <h3 className="mt-2 font-heading text-lg font-extrabold leading-snug text-neutral-900">
                        {post.title}
                      </h3>
                      <p className="mt-2 leading-6 text-neutral-700">{post.excerpt}</p>
                      <p className="mt-4 text-sm text-neutral-500">
                        {post.readTimeMinutes} min read · Sample content
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <NewsletterSignup />
          </ScrollReveal>
        </div>
      </main>
      <footer className="border-t border-primary-dark bg-primary-dark text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-7 text-sm text-white sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>Pen and Paper · Tassia Complex, off Fedha Road, Nairobi</p>
          <p>Delivery options and charges may vary by destination and order.</p>
        </div>
      </footer>
    </>
  );
}
