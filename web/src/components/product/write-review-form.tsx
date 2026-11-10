"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Rating } from "@/components/ui/rating";
import { Textarea } from "@/components/ui/textarea";

export function WriteReviewForm() {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Thank you. This sample review form is not connected to a live service.");
    event.currentTarget.reset();
    setRating(0);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-4 rounded-xl border border-neutral-200 bg-white p-4 sm:p-5">
      <div>
        <h3 className="font-heading text-lg font-bold text-neutral-900">Write a review</h3>
        <p className="mt-1 text-sm text-neutral-600">Sample form only; reviews are not submitted or saved.</p>
      </div>
      <Input id="review-name" name="name" label="Your name" autoComplete="name" required />
      <div className="grid gap-1">
        <span className="font-semibold text-neutral-900">Your rating</span>
        <Rating value={rating} onChange={setRating} label="Choose a rating" />
      </div>
      <Input id="review-title" name="title" label="Review title" required maxLength={100} />
      <Textarea id="review-body" name="body" label="Your review" required rows={4} maxLength={1000} />
      <Button type="submit" disabled={rating === 0}>Submit review</Button>
      {message ? <p role="status" className="text-sm text-neutral-700">{message}</p> : null}
    </form>
  );
}
