"use client";

// Usage: <Rating value={4} /> or <Rating value={rating} onChange={setRating} />
import { useRef, useState, type KeyboardEvent } from "react";
import { Star } from "lucide-react";

interface RatingProps {
  value: number;
  max?: number;
  onChange?: (value: number) => void;
  label?: string;
}

export function Rating({ value, max = 5, onChange, label = "Rating" }: RatingProps) {
  const [focusedValue, setFocusedValue] = useState(value);
  const starRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const interactive = Boolean(onChange);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, star: number) {
    if (!onChange) return;
    let nextValue: number | undefined;
    if (event.key === "ArrowRight" || event.key === "ArrowUp") nextValue = Math.min(max, star + 1);
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") nextValue = Math.max(1, star - 1);
    if (nextValue === undefined) return;
    event.preventDefault();
    setFocusedValue(nextValue);
    onChange(nextValue);
    starRefs.current[nextValue - 1]?.focus();
  }

  return (
    <div
      role={interactive ? "radiogroup" : "img"}
      aria-label={interactive ? label : `${value} out of ${max} stars`}
      className="inline-flex items-center gap-1"
    >
      {Array.from({ length: max }, (_, index) => {
        const star = index + 1;
        const filled = star <= (interactive ? focusedValue : value);
        return interactive ? (
          <button
            key={star}
            ref={(element) => { starRefs.current[index] = element; }}
            type="button"
            role="radio"
            aria-checked={value === star}
            aria-label={`${star} ${star === 1 ? "star" : "stars"}`}
            tabIndex={value === star || (value === 0 && star === 1) ? 0 : -1}
            onClick={() => { setFocusedValue(star); onChange?.(star); }}
            onKeyDown={(event) => handleKeyDown(event, star)}
            onFocus={() => setFocusedValue(star)}
            onBlur={() => setFocusedValue(value)}
            className="grid size-11 place-items-center rounded-md text-gold-700"
          >
            <Star aria-hidden="true" size={20} fill={filled ? "currentColor" : "none"} />
          </button>
        ) : (
          <Star
            key={star}
            aria-hidden="true"
            size={18}
            className={filled ? "text-gold-700" : "text-neutral-200"}
            fill={filled ? "currentColor" : "none"}
          />
        );
      })}
    </div>
  );
}
