import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductImageZoom } from "@/components/product/product-image-zoom";
import { ProductPurchasePanel, StickyAddToCart } from "@/components/product/product-purchase-panel";
import { ProductCard } from "@/components/product/product-card";
import { WriteReviewForm } from "@/components/product/write-review-form";
import { SiteHeader } from "@/components/layout/site-header";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { EmptyState } from "@/components/ui/empty-state";
import { Rating } from "@/components/ui/rating";
import { Tabs } from "@/components/ui/tabs";
import { getProduct, getProducts, getReviews } from "@/lib/api";
import type { Review } from "@/types";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) return { title: "Product not found | Pen and Paper" };

  return {
    title: `${product.name} | Pen and Paper`,
    description: `${product.name}, a sample ${product.curriculum} textbook listing from Pen and Paper.`,
  };
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="rounded-xl border border-neutral-200 bg-white p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-heading font-bold text-neutral-900">{review.title}</h3>
          <p className="mt-1 text-sm text-neutral-600">{review.reviewerName} · Sample review</p>
        </div>
        <Rating value={review.rating} />
      </div>
      <p className="mt-3 leading-7 text-neutral-700">{review.body}</p>
      <time dateTime={review.date} className="mt-3 block text-sm text-neutral-600">
        {new Intl.DateTimeFormat("en-KE", { dateStyle: "long", timeZone: "UTC" }).format(
          new Date(`${review.date}T00:00:00Z`),
        )}
      </time>
    </article>
  );
}

async function ProductPageContent({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const [reviews, catalogue] = await Promise.all([
    getReviews(product.id),
    getProducts({ categoryId: product.categoryId }),
  ]);
  const relatedProducts = catalogue.filter((item) => item.id !== product.id).slice(0, 4);
  const averageRating = reviews.length
    ? reviews.reduce((total, review) => total + review.rating, 0) / reviews.length
    : 0;
  const roundedRating = Math.round(averageRating * 10) / 10;

  const tabs = [
    {
      id: "description",
      label: "Description",
      content: (
        <div className="space-y-4">
          <p className="max-w-3xl leading-7 text-neutral-700">{product.description}</p>
          <p className="text-sm text-neutral-600">
            Sample catalogue listing. Confirm the title, edition, publisher, and availability before ordering.
          </p>
        </div>
      ),
    },
    {
      id: "details",
      label: "Details",
      content: (
        <dl className="grid gap-3 sm:grid-cols-2">
          {[
            ["Curriculum", product.curriculum],
            ["Grade / level", product.grade],
            ["Subject", product.subject],
            ["Publisher", product.publisher],
            ["SKU", product.sku],
            ["Availability", product.stockStatus.replaceAll("-", " ")],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg bg-secondary px-4 py-3">
              <dt className="text-sm font-semibold text-neutral-600">{label}</dt>
              <dd className="mt-1 font-bold capitalize text-neutral-900">{value}</dd>
            </div>
          ))}
        </dl>
      ),
    },
    {
      id: "reviews",
      label: `Reviews (${reviews.length})`,
      content: (
        <div>
          <div className="mb-5 flex flex-wrap items-center gap-4 rounded-xl bg-secondary p-4">
            <Rating value={roundedRating} />
            <div>
              <p className="font-heading text-xl font-extrabold text-neutral-900">
                {reviews.length ? `${roundedRating} out of 5` : "No reviews yet"}
              </p>
              <p className="text-sm text-neutral-700">
                {reviews.length} sample {reviews.length === 1 ? "review" : "reviews"} — not verified customer feedback
              </p>
            </div>
          </div>
          {reviews.length ? (
            <div className="grid gap-3">
              {reviews.map((review) => <ReviewCard key={review.id} review={review} />)}
            </div>
          ) : (
            <EmptyState
              title="No reviews yet"
              description="Be the first to share feedback when review submissions are available."
            />
          )}
          <WriteReviewForm />
        </div>
      ),
    },
  ];

  return (
    <>
      <main className="mx-auto max-w-7xl px-4 pb-28 pt-5 sm:px-6 sm:pb-12 lg:px-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Textbooks", href: "/#featured-textbooks" },
            { label: product.name },
          ]}
        />

        <section className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(22rem,0.9fr)] lg:items-start">
          <ProductImageZoom product={product} />

          <div className="grid gap-5">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge tone="primary">{product.curriculum}</Badge>
                <Badge>{product.grade}</Badge>
                <Badge tone="accent">Sample listing</Badge>
              </div>
              <h1 className="mt-4 font-heading text-3xl font-extrabold leading-tight text-neutral-900 sm:text-4xl">
                {product.name}
              </h1>
              <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <div><dt className="inline font-semibold text-neutral-700">Publisher: </dt><dd className="inline text-neutral-700">{product.publisher}</dd></div>
                <div><dt className="inline font-semibold text-neutral-700">Grade: </dt><dd className="inline text-neutral-700">{product.grade}</dd></div>
                <div><dt className="inline font-semibold text-neutral-700">SKU: </dt><dd className="inline text-neutral-700">{product.sku}</dd></div>
              </dl>
            </div>

            <ProductPurchasePanel product={product} />
          </div>
        </section>

        <section className="mt-10" aria-label="Product information">
          <Tabs label="Product information" tabs={tabs} />
        </section>

        <section className="mt-12" aria-labelledby="related-products-heading">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 id="related-products-heading" className="font-heading text-2xl font-extrabold text-neutral-900">
                Related textbooks
              </h2>
              <p className="mt-1 text-neutral-700">More sample titles from the catalogue.</p>
            </div>
            <Link href="/#featured-textbooks" className="inline-flex min-h-11 items-center rounded-md font-semibold text-primary underline-offset-4 hover:underline">
              Browse all books
            </Link>
          </div>
          {relatedProducts.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((related) => <ProductCard key={related.id} product={related} />)}
            </div>
          ) : (
            <EmptyState title="More titles coming soon" description="There are no related sample items to show yet." />
          )}
        </section>
      </main>
      <StickyAddToCart product={product} />
    </>
  );
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <>
      <SiteHeader />
      <Suspense
        fallback={
          <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8" role="status">
            Loading product details…
          </main>
        }
      >
        <ProductPageContent params={params} />
      </Suspense>
    </>
  );
}
