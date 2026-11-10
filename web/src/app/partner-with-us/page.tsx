import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, Handshake, ListChecks } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { PartnerRequestForm } from "@/components/school-list/partner-request-form";

export const metadata: Metadata = {
  title: "Partner with Pen and Paper",
  description: "Explore a school partnership with Pen and Paper.",
};

const benefits = [
  {
    icon: ListChecks,
    title: "Make book lists easier to share",
    description: "Work together to present a clear, grade-by-grade list families can review in one place.",
  },
  {
    icon: BookOpenCheck,
    title: "Help families prepare",
    description: "Give parents a simple way to check sample items and request a quote for their school needs.",
  },
  {
    icon: Handshake,
    title: "Talk through your requirements",
    description: "Discuss books, stationery, uniforms, or bulk purchasing needs before agreeing on next steps.",
  },
];

const nextSteps = [
  ["01", "Share your needs", "Tell us about your school, the grades you serve, and what you would like to discuss."],
  ["02", "We review the request", "Our team can review the details and confirm what information is needed to continue."],
  ["03", "Agree on next steps", "If there is a fit, discuss list details, availability, pricing, and delivery arrangements."],
];

export default function PartnerWithUsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <section className="grid gap-8 rounded-3xl bg-primary p-6 text-white sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wide text-white">For schools and learning communities</p>
            <h1 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">
              Let’s make school supplies simpler for families.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-7 text-white">
              Talk to us about school book lists, bulk requirements, and ways to help parents prepare for the term.
            </p>
          </div>
          <Link href="#partnership-enquiry" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 font-heading font-extrabold text-accent-contrast hover:bg-accent-hover">
            Start an enquiry <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </section>

        <section className="mt-10" aria-labelledby="partner-benefits">
          <h2 id="partner-benefits" className="font-heading text-2xl font-extrabold text-neutral-900 sm:text-3xl">
            How a partnership could help
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {benefits.map(({ icon: Icon, title, description }) => (
              <article key={title} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-card">
                <span className="grid size-12 place-items-center rounded-xl bg-primary-light text-primary">
                  <Icon aria-hidden="true" size={24} />
                </span>
                <h3 className="mt-4 font-heading text-lg font-extrabold text-neutral-900">{title}</h3>
                <p className="mt-2 leading-7 text-neutral-700">{description}</p>
              </article>
            ))}
          </div>
          <p className="mt-4 text-sm text-neutral-600">
            Partnership terms, availability, pricing, and delivery arrangements are to be discussed and confirmed.
          </p>
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.8fr)] lg:items-start">
          <div>
            <h2 className="font-heading text-2xl font-extrabold text-neutral-900 sm:text-3xl">What happens next?</h2>
            <ol className="mt-5 space-y-4">
              {nextSteps.map(([number, title, description]) => (
                <li key={number} className="flex gap-4 rounded-xl bg-secondary p-4 sm:p-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary font-heading font-extrabold text-white">{number}</span>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-neutral-900">{title}</h3>
                    <p className="mt-1 leading-7 text-neutral-700">{description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div id="partnership-enquiry">
            <PartnerRequestForm />
          </div>
        </section>
      </main>
    </>
  );
}
