"use client";

import { useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowDown, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Product, School, SchoolList } from "@/types";

interface SchoolListFinderProps {
  schools: School[];
  schoolLists: SchoolList[];
  products: Product[];
}

export function SchoolListFinder({
  schools,
  schoolLists,
  products,
}: SchoolListFinderProps) {
  const [query, setQuery] = useState("");
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const resultRef = useRef<HTMLElement>(null);
  const schoolById = useMemo(
    () => new Map(schools.map((school) => [school.id, school])),
    [schools],
  );
  const productById = useMemo(
    () => new Map(products.map((product) => [product.id, product])),
    [products],
  );
  const matches = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    if (!normalizedQuery) return [];

    return schoolLists
      .map((schoolList) => ({
        schoolList,
        school: schoolById.get(schoolList.schoolId),
      }))
      .filter(({ schoolList, school }) =>
        `${schoolList.name} ${schoolList.grade} ${school?.name ?? ""} ${school?.location ?? ""}`
          .toLocaleLowerCase()
          .includes(normalizedQuery),
      );
  }, [query, schoolById, schoolLists]);
  const selected = schoolLists.find((schoolList) => schoolList.id === selectedListId);
  const selectedSchool = selected ? schoolById.get(selected.schoolId) : undefined;

  function chooseList(id: string) {
    setSelectedListId(id);
    setQuery("");
    setActiveSuggestion(0);
    requestAnimationFrame(() => {
      resultRef.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "center",
      });
      resultRef.current?.focus({ preventScroll: true });
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (matches[activeSuggestion]) {
      chooseList(matches[activeSuggestion].schoolList.id);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" && matches.length > 0) {
      event.preventDefault();
      setActiveSuggestion((index) => (index + 1) % matches.length);
    }
    if (event.key === "ArrowUp" && matches.length > 0) {
      event.preventDefault();
      setActiveSuggestion((index) => (index - 1 + matches.length) % matches.length);
    }
    if (event.key === "Escape") {
      setQuery("");
      setActiveSuggestion(0);
    }
  }

  return (
    <section
      id="sample-school-list"
      aria-labelledby="school-list-heading"
      className="grid gap-8 rounded-3xl border border-primary/10 bg-white p-5 shadow-card sm:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start"
    >
      <div>
        <p className="text-xs font-extrabold uppercase tracking-widest text-primary">
          Fast Booklist Lookup
        </p>
        <h2
          id="school-list-heading"
          className="mt-2 font-heading text-2xl font-extrabold text-neutral-900 sm:text-3xl"
        >
          Find your school list
        </h2>
        <p className="mt-3 text-base leading-relaxed text-neutral-700">
          Search by school name, area, or grade to browse curriculum-aligned booklists.
        </p>
        <form onSubmit={handleSubmit} className="relative mt-5">
          <div className="relative">
            <Input
              id="school-list-search"
              label="School name or area"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveSuggestion(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Try a school name or Grade 2"
              autoComplete="off"
              role="combobox"
              aria-autocomplete="list"
              aria-controls="school-list-suggestions"
              aria-activedescendant={
                matches[activeSuggestion]
                  ? `school-list-option-${matches[activeSuggestion].schoolList.id}`
                  : undefined
              }
              aria-expanded={matches.length > 0}
            />
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-[2.65rem] text-neutral-500"
              size={20}
            />
          </div>
          <Button type="submit" className="mt-3 w-full">
            Find a list
          </Button>
          {query.trim() ? (
            <div
              id="school-list-suggestions"
              role="region"
              aria-label="School list suggestions"
              className="mt-2 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-raised"
            >
              {matches.length ? (
                <ul id="school-list-suggestions" role="listbox" aria-label="Matching school lists">
                  {matches.map(({ schoolList, school }, index) => (
                    <li key={schoolList.id}>
                      <div
                        id={`school-list-option-${schoolList.id}`}
                        role="option"
                        aria-selected={index === activeSuggestion}
                        onMouseEnter={() => setActiveSuggestion(index)}
                        onClick={() => chooseList(schoolList.id)}
                        onMouseDown={(event) => event.preventDefault()}
                        className={`flex min-h-12 w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-primary-light ${
                          index === activeSuggestion ? "bg-primary-light" : "bg-white"
                        }`}
                      >
                        <span className="min-w-0">
                          <span className="block truncate font-semibold text-neutral-900">
                            {school?.name ?? schoolList.name}
                          </span>
                          <span className="text-sm text-neutral-500">
                            {schoolList.grade} · {school?.location ?? "[PLACEHOLDER]"}
                          </span>
                        </span>
                        <ArrowDown aria-hidden="true" size={18} className="shrink-0 -rotate-45 text-primary" />
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="p-4 text-sm text-neutral-700" role="status">
                  No sample lists match yet. Try “Grade 2” or “Nairobi”.
                </p>
              )}
            </div>
          ) : null}
        </form>
      </div>

      <div className="min-h-56">
        {selected && selectedSchool ? (
          <section
            ref={resultRef}
            tabIndex={-1}
            aria-labelledby="selected-school-list-title"
            className="rounded-2xl bg-secondary p-5 outline-offset-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-neutral-500">
                  {selectedSchool.location} · {selected.academicYear}
                </p>
                <h3
                  id="selected-school-list-title"
                  className="mt-1 font-heading text-xl font-extrabold text-neutral-900"
                >
                  {selectedSchool.name}
                </h3>
                <p className="text-neutral-700">{selected.grade}</p>
              </div>
              <Badge tone="accent">SAMPLE LIST</Badge>
            </div>
            <ul className="mt-4 divide-y divide-neutral-200">
              {selected.items.map((item) => {
                const product = productById.get(item.productId);
                return (
                  <li
                    key={item.productId}
                    className="flex justify-between gap-4 py-3 text-base"
                  >
                    <span className="text-neutral-800">
                      {product?.name ?? "Sample textbook"}
                    </span>
                    <span className="shrink-0 font-semibold text-neutral-700">
                      × {item.quantity}
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 text-sm text-neutral-500">
              Check your official school list before buying. Titles, editions, and quantities: [PLACEHOLDER].
            </p>
            <Link
              href={`/school-lists/${selectedSchool.name.toLocaleLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}?grade=${encodeURIComponent(selected.grade)}`}
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 py-2.5 font-semibold text-white shadow-sm hover:bg-primary-hover transition-colors"
            >
              Open checklist and add items
            </Link>
          </section>
        ) : (
          <div className="flex h-full min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-primary/25 bg-primary-light/40 p-6 text-center">
            <Search aria-hidden="true" size={30} className="text-primary" />
            <p className="mt-3 font-heading font-bold text-neutral-900">
              Your list will appear here
            </p>
            <p className="mt-1 max-w-sm text-sm text-neutral-700">
              Start typing a school name, area, or grade to see sample suggestions.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
