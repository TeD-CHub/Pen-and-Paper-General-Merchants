"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="newsletter"
      aria-labelledby="newsletter-heading"
      className="grid gap-6 rounded-xl border border-neutral-200 bg-white p-6 sm:p-8 lg:grid-cols-[1fr_0.9fr] lg:items-center"
    >
      <div>
        <span className="grid size-11 place-items-center rounded-lg bg-primary-light text-primary">
          <Mail aria-hidden="true" size={22} />
        </span>
        <h2
          id="newsletter-heading"
          className="mt-4 font-heading text-2xl font-extrabold text-neutral-900 sm:text-3xl"
        >
          School updates, straight to your inbox
        </h2>
        <p className="mt-2 max-w-xl text-base leading-7 text-neutral-700">
          Sign up for helpful school-shopping reminders and new-arrival notes. How often we’ll write: [PLACEHOLDER].
        </p>
      </div>
      <div>
        {submitted ? (
          <div
            role="status"
            aria-live="polite"
            className="rounded-lg border border-neutral-200 bg-secondary p-5"
          >
            <CheckCircle2 aria-hidden="true" size={25} className="text-success" />
            <p className="mt-2 font-heading text-lg font-extrabold">Asante!</p>
            <p className="mt-1 text-neutral-700">
              This demo saved no details and did not send your email. Newsletter signup will be connected later.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              id="newsletter-email"
              label="Email address"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="border-neutral-300 bg-white text-neutral-900"
            />
            <Button type="submit" className="w-full">
              Sign me up
            </Button>
            <p className="text-sm text-neutral-600">
              Demo only. Your email won’t be stored or sent.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
