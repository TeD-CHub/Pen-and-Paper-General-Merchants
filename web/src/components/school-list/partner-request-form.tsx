"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function PartnerRequestForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-card sm:p-6">
      <div>
        <h2 className="font-heading text-2xl font-extrabold text-neutral-900">Start a conversation</h2>
        <p className="mt-2 text-sm leading-6 text-neutral-700">
          Share your school’s needs. This sample form is not connected and will not send or store your details.
        </p>
      </div>
      <Input id="partner-school" name="school" label="School or organisation" required maxLength={120} />
      <Input id="partner-contact-name" name="contactName" label="Your name" autoComplete="name" required maxLength={100} />
      <Input id="partner-email" name="email" label="Email address" type="email" autoComplete="email" required />
      <Input id="partner-phone" name="phone" label="Phone number (optional)" type="tel" autoComplete="tel" />
      <Textarea id="partner-needs" name="needs" label="What would you like to discuss?" rows={4} maxLength={1000} />
      <Button type="submit">Send partnership enquiry</Button>
      {submitted ? (
        <p role="status" className="text-sm font-semibold text-success">
          Thank you for your interest. This demo did not send or save your enquiry.
        </p>
      ) : null}
    </form>
  );
}
