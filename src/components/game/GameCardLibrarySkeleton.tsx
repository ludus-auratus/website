import { Skeleton } from "@/components/ui/skeleton";

export function GameCardLibrarySkeleton() {
  return (
    <article className="bg-card text-card-foreground border-accent/20 relative mx-auto flex h-fit max-w-[264px] min-w-[264px] flex-col rounded-2xl border shadow-lg backdrop-blur-sm sm:w-full sm:max-w-full">
      <div className="flex h-full flex-col rounded-2xl">
        <div className="relative aspect-square w-full overflow-hidden rounded-t-2xl">
          <Skeleton className="bg-primary/10 h-full w-full" />
        </div>

        <div className="flex flex-grow flex-col gap-2 p-4">
          <div className="flex min-h-[56px] flex-col gap-1">
            <Skeleton className="bg-primary/10 h-6 w-full" />
            <Skeleton className="bg-primary/10 h-6 w-2/3" />
          </div>

          <Skeleton className="bg-primary/10 h-10 w-full rounded-md" />
        </div>
      </div>
    </article>
  );
}
