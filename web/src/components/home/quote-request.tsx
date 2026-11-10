"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, ClipboardList, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function QuoteRequest() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      aria-labelledby="bulk-heading"
      className="overflow-hidden rounded-3xl bg-neutral-900 text-white"
    >
      <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-bold text-white">
            <ClipboardList aria-hidden="true" size={16} />
            For schools, offices & retailers
          </span>
          <h2
            id="bulk-heading"
            className="mt-4 max-w-2xl font-heading text-2xl font-extrabold sm:text-3xl"
          >
            Buying in bulk? Let’s make planning easier.
          </h2>
          <p className="mt-2 max-w-2xl leading-7 text-white">
            Tell us what you need and we can prepare a quote. Bulk pricing, minimum quantities, and turnaround: [PLACEHOLDER].
          </p>
        </div>
        <Button
          variant="secondary"
          onClick={() => {
            setOpen((current) => !current);
            setSubmitted(false);
          }}
          aria-expanded={open}
          aria-controls="quote-request-form"
          className="w-full border-accent bg-accent text-accent-contrast hover:bg-accent-hover sm:w-auto"
        >
          {open ? "Close quote form" : "Request a quote"}
          {open ? <X aria-hidden="true" size={18} /> : null}
        </Button>
      </div>
      {open ? (
        <div
          id="quote-request-form"
          className="border-t border-white/15 bg-white/5 px-6 py-6 sm:px-8"
        >
          {submitted ? (
            <div role="status" aria-live="polite" className="flex items-start gap-3">
              <CheckCircle2 aria-hidden="true" className="mt-1 shrink-0 text-teal-100" size={22} />
              <div>
                <p className="font-heading font-extrabold">Thank you for the sample enquiry.</p>
                <p className="mt-1 text-white">
                  This preview did not send or store your request. Quote contact details: [PLACEHOLDER].
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
              <Input
                id="quote-name"
                label="Your name or organization"
                required
                className="border-white bg-white text-neutral-900"
              />
              <Input
                id="quote-phone"
                label="Phone number"
                type="tel"
                autoComplete="tel"
                required
                className="border-white bg-white text-neutral-900"
              />
              <div className="sm:col-span-2">
                <Textarea
                  id="quote-items"
                  label="What items and quantities do you need?"
                  required
                  rows={3}
                  className="border-white bg-white text-neutral-900"
                />
              </div>
              <p className="text-sm text-white sm:col-span-2">
                Demo form only. Contact details and response times: [PLACEHOLDER].
              </p>
              <Button type="submit" variant="secondary" className="sm:col-span-2 sm:justify-self-start">
                Preview quote request
              </Button>
            </form>
          )}
        </div>
      ) : null}
    </section>
  );
}
