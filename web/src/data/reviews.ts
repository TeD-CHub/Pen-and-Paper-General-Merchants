import type { Review } from "@/types";

export const reviews: Review[] = Array.from({ length: 12 }, (_, index) => ({
  id: `sample-review-${index + 1}`,
  productId: `cbe-${(index % 9) + 1}-english`,
  reviewerName: `Sample Reviewer ${String(index + 1).padStart(2, "0")}`,
  rating: ((index % 2) + 4) as 4 | 5,
  title: "Sample review — not a real customer testimonial",
  body: "This placeholder review is for layout and development only. Replace it with a verified customer review before launch.",
  date: `2026-0${(index % 9) + 1}-15`,
  isSample: true,
}));
