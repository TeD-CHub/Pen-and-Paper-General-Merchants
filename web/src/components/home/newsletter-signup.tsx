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
      className="grid gap-6 rounded-3xl bg-primary p-6 text-white sm:p-8 lg:grid-cols-[1fr_0.9fr] lg:items-center"
    >
      <div>
        <span className="grid size-11 place-items-center rounded-xl bg-white/10 text-white">
          <Mail aria-hidden="true" size={22} />
        </span>
        <h2
          id="newsletter-heading"
          className="mt-4 font-heading text-2xl font-extrabold sm:text-3xl"
        >
          School updates, straight to your inbox
        </h2>
        <p className="mt-2 max-w-xl text-base leading-7 text-white">
          Sign up for helpful school-shopping reminders and new-arrival notes. How often we’ll write: [PLACEHOLDER].
        </p>
      </div>
      <div>
        {submitted ? (
          <div
            role="status"
            aria-live="polite"
            className="rounded-2xl border border-white/15 bg-white/10 p-5"
          >
            <CheckCircle2 aria-hidden="true" size={25} className="text-teal-100" />
            <p className="mt-2 font-heading text-lg font-extrabold">Asante!</p>
            <p className="mt-1 text-white">
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
              className="border-white bg-white text-neutral-900"
            />
            <Button type="submit" variant="secondary" className="w-full border-white text-primary">
              Sign me up
            </Button>
            <p className="text-sm text-white">
              Demo only. Your email won’t be stored or sent.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
