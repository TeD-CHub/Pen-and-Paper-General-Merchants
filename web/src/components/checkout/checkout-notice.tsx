import { Info } from "lucide-react";

export function CheckoutNotice() {
  return (
    <p className="flex items-start gap-2 rounded-lg bg-primary-light p-4 text-base text-primary-dark">
      <Info aria-hidden="true" className="mt-0.5 shrink-0" size={20} />
      <span>
        Checkout and M-Pesa payment are not connected in this frontend sample.
      </span>
    </p>
  );
}
