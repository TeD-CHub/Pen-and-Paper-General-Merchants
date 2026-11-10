// Usage: <Skeleton className="h-5 w-32" /> or <ProductCardSkeleton />
import clsx from "clsx";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      className={clsx("block animate-pulse rounded-md bg-neutral-200 motion-reduce:animate-none", className)}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div aria-hidden="true" className="space-y-3 rounded-xl border border-neutral-200 bg-white p-4">
      <Skeleton className="aspect-[4/3] w-full" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-11 w-full" />
    </div>
  );
}
