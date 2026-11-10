import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SchoolListChecklist } from "@/components/school-list/school-list-checklist";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { getProducts, getSchoolBySlug, getSchoolLists, getSchools, getSchoolSlug } from "@/lib/api";

interface SchoolListPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ grade?: string }>;
}

export async function generateStaticParams() {
  const schools = await getSchools();
  return schools.map((school) => ({ slug: getSchoolSlug(school) }));
}

export async function generateMetadata({ params }: SchoolListPageProps): Promise<Metadata> {
  const { slug } = await params;
  const school = await getSchoolBySlug(slug);
  return {
    title: school ? `${school.name} sample book lists | Pen and Paper` : "School list not found | Pen and Paper",
    description: school
      ? `Browse sample grade-by-grade book lists for ${school.name}.`
      : "Find a school book list from Pen and Paper.",
  };
}

async function SchoolListPageContent({ params, searchParams }: SchoolListPageProps) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const school = await getSchoolBySlug(slug);
  if (!school) notFound();

  const [schoolLists, products] = await Promise.all([
    getSchoolLists(school.id),
    getProducts({ categoryId: "textbooks" }),
  ]);
  const productIds = new Set(products.map((product) => product.id));
  for (const list of schoolLists) {
    for (const item of list.items) {
      if (!productIds.has(item.productId)) {
        throw new Error(`School list "${list.id}" references missing product "${item.productId}".`);
      }
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-4 pb-32 pt-5 sm:px-6 sm:pb-12 lg:px-8">
      <div className="school-list-no-print">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "School lists", href: "/school-lists" },
            { label: school.name },
          ]}
        />
      </div>
      <section className="mt-4" aria-label="School book list">
        <SchoolListChecklist
          school={school}
          schoolLists={schoolLists}
          products={products}
          initialGrade={query.grade}
          slug={slug}
        />
      </section>
    </main>
  );
}

export default function SchoolListPage({ params, searchParams }: SchoolListPageProps) {
  return (
    <>
      <SiteHeader />
      <Suspense
        fallback={
          <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8" role="status">
            Loading school book list…
          </main>
        }
      >
        <SchoolListPageContent params={params} searchParams={searchParams} />
      </Suspense>
    </>
  );
}
