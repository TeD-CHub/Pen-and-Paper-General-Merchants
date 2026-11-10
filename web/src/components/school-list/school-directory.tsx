"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { School, SchoolList } from "@/types";

interface SchoolDirectoryProps {
  schools: School[];
  schoolLists: SchoolList[];
}

function schoolSlug(name: string) {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function SchoolDirectory({ schools, schoolLists }: SchoolDirectoryProps) {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const listCounts = useMemo(
    () => schoolLists.reduce<Map<string, number>>((counts, list) => {
      counts.set(list.schoolId, (counts.get(list.schoolId) ?? 0) + 1);
      return counts;
    }, new Map()),
    [schoolLists],
  );
  const filteredSchools = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return [...schools]
      .filter((school) =>
        `${school.name} ${school.location}`.toLocaleLowerCase().includes(normalizedQuery),
      )
      .sort((left, right) => left.name.localeCompare(right.name));
  }, [query, schools]);
  const groupedSchools = useMemo(
    () => filteredSchools.reduce<Map<string, School[]>>((groups, school) => {
      const letter = school.name.charAt(0).toLocaleUpperCase();
      groups.set(letter, [...(groups.get(letter) ?? []), school]);
      return groups;
    }, new Map()),
    [filteredSchools],
  );

  function handleRequestSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
      <section aria-labelledby="school-directory-heading">
        <div className="max-w-2xl">
          <h2 id="school-directory-heading" className="font-heading text-2xl font-extrabold text-neutral-900">
            Browse the school directory
          </h2>
          <p className="mt-2 leading-7 text-neutral-700">
            Search by school name or town, then choose a grade to view its sample checklist.
          </p>
        </div>
        <div className="relative mt-5 max-w-xl">
          <Input
            id="school-directory-search"
            label="Search schools"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Type a school name or location"
            autoComplete="off"
          />
          <Search aria-hidden="true" size={20} className="pointer-events-none absolute right-3 top-10 text-neutral-500" />
        </div>
        <p className="mt-3 text-sm text-neutral-600" aria-live="polite">
          {filteredSchools.length} sample {filteredSchools.length === 1 ? "school" : "schools"} found
        </p>
        {groupedSchools.size ? (
          <div className="mt-5 space-y-7">
            {[...groupedSchools].map(([letter, letterSchools]) => (
              <section key={letter} aria-labelledby={`schools-${letter}`}>
                <h3 id={`schools-${letter}`} className="border-b border-neutral-200 pb-2 font-heading text-lg font-extrabold text-primary">
                  {letter}
                </h3>
                <ul className="divide-y divide-neutral-200">
                  {letterSchools.map((school) => (
                    <li key={school.id}>
                      <Link
                        href={`/school-lists/${schoolSlug(school.name)}`}
                        className="flex min-h-16 items-center justify-between gap-4 rounded-md px-3 py-3 hover:bg-primary-light focus-visible:bg-primary-light"
                      >
                        <span className="min-w-0">
                          <span className="block font-semibold text-neutral-900">{school.name}</span>
                          <span className="text-sm text-neutral-600">{school.location} · Sample school</span>
                        </span>
                        <span className="flex shrink-0 items-center gap-2 text-sm font-semibold text-primary">
                          {listCounts.get(school.id) ?? 0} grades
                          <ArrowRight aria-hidden="true" size={18} />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ) : (
          <p role="status" className="mt-6 rounded-xl border border-dashed border-neutral-300 bg-white p-5 text-neutral-700">
            No sample schools match that search. You can request that we add yours.
          </p>
        )}
        <p className="mt-6 rounded-xl bg-secondary p-4 text-sm leading-6 text-neutral-700">
          School names and book lists on this demo are sample content, not official school requirements.
          Confirm each title, edition, and quantity against your school’s current list.
        </p>
      </section>

      <aside className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-card sm:p-6">
        <h2 className="font-heading text-xl font-extrabold text-neutral-900">My school isn’t here</h2>
        <p className="mt-2 text-sm leading-6 text-neutral-700">
          Tell us which school and location to add. This sample form does not send or save requests.
        </p>
        <form onSubmit={handleRequestSubmit} className="mt-5 grid gap-4">
          <Input id="request-school-name" name="schoolName" label="School name" required maxLength={120} />
          <Input id="request-school-location" name="location" label="Town or county" required maxLength={100} />
          <Input id="request-email" name="email" label="Email address (optional)" type="email" autoComplete="email" />
          <Button type="submit" className="w-full">Request a school list</Button>
          {submitted ? (
            <p role="status" className="text-sm font-semibold text-success">
              Thanks for the suggestion. This demo hasn’t sent or stored your request.
            </p>
          ) : null}
        </form>
        <Link href="/partner-with-us" className="mt-5 inline-flex min-h-11 items-center font-semibold text-primary underline-offset-4 hover:underline">
          Represent a school? Partner with us
        </Link>
      </aside>
    </div>
  );
}
