import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SchoolDirectory } from "@/components/school-list/school-directory";
import { getSchoolLists, getSchools } from "@/lib/api";

export const metadata: Metadata = {
  title: "School book lists | Pen and Paper",
  description: "Find a sample school book list by school name and grade.",
};

export default async function SchoolListsPage() {
  const [schools, schoolLists] = await Promise.all([getSchools(), getSchoolLists()]);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-wide text-primary">A simpler school run</p>
          <h1 className="mt-2 font-heading text-3xl font-extrabold text-neutral-900 sm:text-4xl">
            Find your school book list
          </h1>
          <p className="mt-3 text-lg leading-7 text-neutral-700">
            Choose a school, pick a grade, check the items you need, and add them together.
          </p>
          <p className="mt-2 text-sm text-neutral-600">
            The directory and book lists are sample content for demonstration, not official school requirements.
          </p>
        </div>
        <SchoolDirectory schools={schools} schoolLists={schoolLists} />
      </main>
    </>
  );
}
