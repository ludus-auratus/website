"use client";

import { useTranslations } from "next-intl";
import { Sparkle, Star } from "lucide-react";

import { GameList } from "@/components/game/GameList";
import {
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionIcon,
  SectionRoot as Section,
  SectionTitle,
  SectionTitleText,
} from "@/components/layout/Section";
import { Skeleton } from "@/components/ui/skeleton";

export function HomeSkeleton() {
  const t = useTranslations("Home");

  return (
    <>
      {/* Hero Banner Skeleton */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-8 lg:px-8">
        <div className="bg-card text-card-foreground border-border relative h-[300px] w-full flex-col rounded-3xl border shadow-lg backdrop-blur-sm sm:h-[400px] md:h-[500px]">
          <Skeleton className="bg-primary/10 h-full w-full rounded-3xl" />

          <div className="absolute inset-0 flex items-center justify-center rounded-3xl p-6">
            <div className="mx-auto flex w-full max-w-2xl flex-col gap-3 px-6 py-8 lg:px-8">
              {/* Title */}
              <Skeleton className="bg-primary/10 h-10 w-3/4 rounded-md md:h-12 lg:h-14" />

              {/* Studio */}
              <Skeleton className="bg-primary/10 h-7 w-1/3 rounded-md" />

              {/* Description */}
              <div className="hidden space-y-2 md:block">
                <Skeleton className="bg-primary/10 h-5 w-full rounded-md" />
                <Skeleton className="bg-primary/10 h-5 w-5/6 rounded-md" />
                <Skeleton className="bg-primary/10 h-5 w-4/6 rounded-md" />
              </div>

              {/* Button */}
              <Skeleton className="bg-primary/10 h-10 w-24 rounded-md" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Games Skeleton */}
      <Section>
        <SectionHeader>
          <SectionTitle>
            <SectionIcon icon={Star} />
            <SectionTitleText text={t("featured.title")} />
            <SectionIcon icon={Star} />
          </SectionTitle>

          <SectionDescription>{t("featured.description")}</SectionDescription>
        </SectionHeader>

        <SectionContent>
          {/* Featured usually has 4 items */}
          <GameList games={[]} variant="store" isLoading={true} />
        </SectionContent>
      </Section>

      {/* Recent Releases Skeleton */}
      <Section>
        <SectionHeader>
          <SectionTitle>
            <SectionIcon icon={Sparkle} className="text-primary fill-current" />
            <SectionTitleText text={t("recent_releases.title")} />
            <SectionIcon icon={Sparkle} className="text-primary fill-current" />
          </SectionTitle>

          <SectionDescription>{t("recent_releases.description")}</SectionDescription>
        </SectionHeader>

        <SectionContent>
          {/* Recent uses the same skeleton count from GameList (default is 8) */}
          <GameList games={[]} variant="store" isLoading={true} />
        </SectionContent>
      </Section>

      {/* Game Jam Section Skeleton */}
      <Section>
        <SectionHeader>
          <Skeleton className="bg-primary/10 mx-auto mb-2 h-8 w-64" />
          <Skeleton className="bg-primary/10 mx-auto h-4 w-96" />
        </SectionHeader>
        <SectionContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="bg-primary/10 h-32 w-full rounded-xl" />
            ))}
          </div>
        </SectionContent>
      </Section>
    </>
  );
}
