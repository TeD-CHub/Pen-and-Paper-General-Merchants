"use client";

import { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Gift,
  PencilRuler,
  Shirt,
} from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { ProductCard } from "@/components/product/product-card";
import type { Category, Product } from "@/types";

interface CategoryShowcaseProps {
  categories: Category[];
  products: Product[];
}

const categoryIcons = {
  textbooks: BookOpen,
  stationery: PencilRuler,
  uniforms: Shirt,
  gifts: Gift,
} as const;

export function CategoryShowcase({
  categories,
  products,
}: CategoryShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState(
    categories.find((category) => category.id === "textbooks")?.id ??
      categories[0]?.id ??
      "",
  );
  const carouselRef = useRef<HTMLDivElement>(null);
  const visibleProducts = products.filter(
    (product) => product.categoryId === activeCategory,
  );

  function scrollCarousel(direction: -1 | 1) {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const card = carousel.querySelector<HTMLElement>("[data-carousel-card]");
    const amount = card ? card.offsetWidth + 16 : carousel.clientWidth;
    carousel.scrollBy({
      left: amount * direction,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }

  return (
    <>
      <section id="shop-by-category" aria-labelledby="category-heading">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-wide text-primary">
            A little bit of everything for school
          </p>
          <h2
            id="category-heading"
            className="mt-2 font-heading text-2xl font-extrabold text-neutral-900 sm:text-3xl"
          >
            Shop by category
          </h2>
          <p className="mt-2 text-base text-neutral-700">
            Pick a category to see what’s in the sample catalogue.
          </p>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {categories.map((category) => {
            const Icon =
              categoryIcons[category.id as keyof typeof categoryIcons] ?? BookOpen;
            const selected = category.id === activeCategory;
            const count = products.filter(
              (product) => product.categoryId === category.id,
            ).length;

            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  setActiveCategory(category.id);
                  const reducedMotion = window.matchMedia(
                    "(prefers-reduced-motion: reduce)",
                  ).matches;
                  document
                    .getElementById("featured-textbooks")
                    ?.scrollIntoView({
                      behavior: reducedMotion ? "auto" : "smooth",
                      block: "start",
                    });
                }}
                className={`flex min-h-32 flex-col items-start justify-between rounded-lg border p-4 text-left transition-colors sm:min-h-36 sm:p-5 ${
                  selected
                    ? "border-primary bg-primary-light text-primary"
                    : "border-neutral-200 bg-white text-neutral-900 hover:border-primary/50"
                }`}
              >
                <span
                  className={`grid size-11 place-items-center rounded-xl ${
                    selected ? "bg-white text-primary" : "bg-secondary text-primary"
                  }`}
                >
                  <Icon aria-hidden="true" size={23} />
                </span>
                <span className="mt-4">
                  <span className="block font-heading font-extrabold">
                    {category.name}
                  </span>
                  <span className="text-sm text-neutral-600">
                    {count ? `${count} sample titles` : "More items coming"}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section
        id="featured-textbooks"
        aria-labelledby="featured-heading"
        className="scroll-mt-6"
      >
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-primary">
              A few picks to get started
            </p>
            <h2
              id="featured-heading"
              className="mt-2 font-heading text-2xl font-extrabold text-neutral-900 sm:text-3xl"
            >
              {activeCategory === "textbooks"
                ? "Featured textbooks"
                : `${categories.find((category) => category.id === activeCategory)?.name ?? "Featured"} picks`}
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Sample catalogue · All prices and availability are illustrative.
            </p>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              aria-label="Scroll featured products left"
              onClick={() => scrollCarousel(-1)}
              className="grid size-11 place-items-center rounded-lg border border-neutral-200 bg-white text-primary hover:bg-primary-light"
            >
              <ArrowLeft aria-hidden="true" size={19} />
            </button>
            <button
              type="button"
              aria-label="Scroll featured products right"
              onClick={() => scrollCarousel(1)}
              className="grid size-11 place-items-center rounded-lg border border-neutral-200 bg-white text-primary hover:bg-primary-light"
            >
              <ArrowRight aria-hidden="true" size={19} />
            </button>
          </div>
        </div>
        {visibleProducts.length ? (
          <div
            ref={carouselRef}
            role="region"
            aria-label="Featured sample products"
            aria-roledescription="carousel"
            tabIndex={0}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-3 focus-visible:rounded-xl"
          >
            {visibleProducts.slice(0, 8).map((product, index) => (
              <div
                key={product.id}
                data-carousel-card
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${Math.min(visibleProducts.length, 8)}`}
                className="w-[min(82vw,19rem)] shrink-0 snap-start sm:w-[calc((100%_-_1rem)/2)] lg:w-[calc((100%_-_2rem)/3)]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Sample items coming soon"
            description={`We haven’t added ${categories.find((category) => category.id === activeCategory)?.name.toLowerCase() ?? "this category"} to the sample catalogue yet. Please check back later.`}
          />
        )}
        {visibleProducts.length > 1 ? (
          <p className="mt-2 text-center text-sm text-neutral-500 sm:hidden">
            Swipe to see more
          </p>
        ) : null}
      </section>
    </>
  );
}
