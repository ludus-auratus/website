import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PurchaseCardSkeleton() {
  return (
    <Card className="gap-0">
      <CardHeader className="pb-3 sm:pb-4">
        <div className="flex flex-wrap items-start justify-between gap-3 sm:gap-4">
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <Skeleton className="bg-primary/10 h-10 w-10 rounded-lg sm:h-12 sm:w-12" /> {/* Icon */}
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="bg-primary/10 h-4 w-32 sm:h-5" /> {/* Order Number */}
              <Skeleton className="bg-primary/10 h-3 w-24 sm:h-4" /> {/* Date */}
            </div>
          </div>
          <Skeleton className="bg-primary/10 h-6 w-20 rounded-full" /> {/* Badge */}
        </div>
      </CardHeader>

      <CardContent className="w-full space-y-3 pt-0 sm:space-y-4">
        <div className="w-full">
          {/* Items Preview (simulating one item) */}
          <div className="w-full space-y-2">
            <div className="flex items-center gap-2.5 rounded-lg border border-transparent p-2 sm:gap-3 sm:p-2.5">
              <Skeleton className="bg-primary/10 h-9 w-9 rounded sm:h-10 sm:w-10" />
              <div className="min-w-0 flex-1">
                <Skeleton className="bg-primary/10 h-3 w-3/4 sm:h-4" />
              </div>
              <Skeleton className="bg-primary/10 h-3 w-16 sm:h-4" />
            </div>
          </div>

          {/* Expand/Collapse Button Skeleton */}
          <div className="mt-2.5 flex items-center gap-1.5">
            <Skeleton className="bg-primary/10 h-3 w-3 rounded-full" />
            <Skeleton className="bg-primary/10 h-3 w-20" />
          </div>
        </div>

        <div className="border-t pt-3 sm:pt-4">
          <div className="mb-3 flex items-center justify-between sm:mb-4">
            <Skeleton className="bg-primary/10 h-4 w-12 sm:h-5" /> {/* Total Label */}
            <Skeleton className="bg-primary/10 h-5 w-24 sm:h-6" /> {/* Total Value */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
