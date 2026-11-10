// Usage: <QuantityStepper label="Exercise books" value={quantity} onChange={setQuantity} />
import { Minus, Plus } from "lucide-react";

interface QuantityStepperProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function QuantityStepper({
  label,
  value,
  onChange,
  min = 1,
  max = 99,
}: QuantityStepperProps) {
  return (
    <div className="inline-flex min-h-11 items-center rounded-lg border border-neutral-200 bg-white">
      <button
        type="button"
        aria-label={`Decrease ${label}`}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="grid size-11 place-items-center rounded-l-lg text-neutral-700 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-45"
      >
        <Minus aria-hidden="true" size={18} />
      </button>
      <output aria-label={`${label} quantity`} aria-live="polite" className="min-w-10 text-center font-semibold tabular-nums">
        {value}
      </output>
      <button
        type="button"
        aria-label={`Increase ${label}`}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="grid size-11 place-items-center rounded-r-lg text-neutral-700 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-45"
      >
        <Plus aria-hidden="true" size={18} />
      </button>
    </div>
  );
}
