"use client";

import { useTranslations } from "next-intl";

import { GameList } from "@/components/game/GameList";
import { Skeleton } from "@/components/ui/skeleton";

interface ProfilePageSkeletonProps {
  titleKey: "wishlist.title" | "library.title";
  variant: "store" | "library";
}

export function ProfilePageSkeleton({ titleKey, variant }: ProfilePageSkeletonProps) {
  const t = useTranslations("Profile");

  return (
    <div className="space-y-6">
      <div className="xs:flex-row xs:justify-between flex flex-col items-center justify-center gap-2">
        <h2 className="text-foreground font-ludus-pixelify-sans xs:block text-2xl font-bold">{t(titleKey)}</h2>

        <div className="xs:flex-none xs:ml-auto relative flex-1">
          <Skeleton className="h-10 w-full min-w-[200px] rounded-md" />
        </div>
      </div>

      <GameList games={[]} variant={variant} isLoading={true} />
    </div>
  );
}
