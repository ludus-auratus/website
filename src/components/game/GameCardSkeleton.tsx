import { Skeleton } from "@/components/ui/skeleton";

export function GameCardSkeleton() {
  return (
    <article className="bg-card text-card-foreground border-border relative mx-auto flex h-full max-w-[264px] min-w-[264px] flex-col rounded-2xl border shadow-lg backdrop-blur-sm sm:w-full sm:max-w-full">
      <div className="flex h-full flex-col rounded-2xl">
        <div className="bg-background/90 absolute top-3 right-3 z-10 flex items-center space-x-1 rounded-full px-3 py-1 backdrop-blur-sm">
          <Skeleton className="bg-primary/10 h-5 w-5 rounded-full" />
        </div>

        <div className="relative aspect-square w-full overflow-hidden rounded-t-2xl">
          <Skeleton className="bg-primary/10 h-full w-full" />
        </div>

        <div className="flex min-h-[108px] flex-grow flex-col gap-1 p-4">
          <div className="min-h-[76px] flex-1 space-y-2">
            <Skeleton className="bg-primary/10 h-6 w-3/4" />
            <Skeleton className="bg-primary/10 h-4 w-1/2" />
          </div>

          <div className="flex items-center justify-between gap-2">
            <Skeleton className="bg-primary/10 h-10 w-full flex-1 rounded-md" />
            <Skeleton className="bg-primary/10 h-10 w-10 rounded-md" />
          </div>
        </div>
      </div>
    </article>
  );
}
