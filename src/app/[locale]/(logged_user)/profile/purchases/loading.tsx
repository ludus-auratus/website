import { PurchaseCardSkeleton } from "@/components/game/PurchaseCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function PurchasesLoading() {
  return (
    <div className="space-y-6">
      <div className="xs:flex-row xs:justify-between flex flex-col items-center justify-center gap-2">
        {/* Title Skeleton */}
        <Skeleton className="h-8 w-48 sm:h-9" />

        {/* Total Spent Skeleton */}
        <div className="flex flex-col items-end gap-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-7 w-32" />
        </div>
      </div>

      <div className="grid gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <PurchaseCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
