// Usage: <Price amount={1250} /> or <Price amount={1600} originalAmount={2000} />
interface PriceProps {
  amount: number;
  originalAmount?: number;
  className?: string;
}

const kesFormatter = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  currencyDisplay: "code",
  maximumFractionDigits: 0,
});

export function formatKes(amount: number): string {
  return kesFormatter.format(amount);
}

export function Price({ amount, originalAmount, className }: PriceProps) {
  const formattedAmount = formatKes(amount);

  return (
    <span className={className}>
      <span aria-label={formattedAmount}>{formattedAmount}</span>
      {originalAmount !== undefined ? (
        <span className="ml-2 text-sm text-neutral-500">
          <span className="sr-only">Original price </span>
          <del>{formatKes(originalAmount)}</del>
        </span>
      ) : null}
    </span>
  );
}
