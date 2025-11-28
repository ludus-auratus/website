import { use } from "react";
import { useTranslations } from "next-intl";
import { Sparkle, Star } from "lucide-react";

import { GameCard } from "@/components/game/GameCard";
import {
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionIcon,
  SectionRoot as Section,
  SectionTitle,
  SectionTitleText,
} from "@/components/layout/Section";
import GameJamSection from "@/components/pages/home/GameJamSection";
import { HeroBanner } from "@/components/pages/home/HeroBanner";
import { getAllGames } from "@/lib/game";
import { cn } from "@/lib/utils/shadcn";

export default function Home() {
  const t = useTranslations("Home");
  const games = use(getAllGames());

  const featuredGames = games.slice(0, 4);
  const releaseGames = games.slice(4, 12);

  return (
    <>
      <HeroBanner />

      <Section className="relative overflow-hidden">
        <div
          className={cn(
            "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
            "translate-y-1 [background-image:linear-gradient(to_right,#71e25650,transparent_1px),linear-gradient(to_bottom,#71e25650,transparent_1px)]",
          )}
        />
        <SectionHeader>
          <SectionTitle>
            <SectionIcon icon={Star} />
            <SectionTitleText text={t("featured.title")} />
            <SectionIcon icon={Star} />
          </SectionTitle>

          <SectionDescription>{t("featured.description")}</SectionDescription>
        </SectionHeader>

        <SectionContent className="grid-auto-fill grid justify-center gap-6">
          {featuredGames.slice(0, 4).map((game) => (
            <GameCard
              key={game.id}
              id={game.id}
              name={game.name}
              icon={game.icon}
              price={game.price}
              rating={game.rating}
            />
          ))}
        </SectionContent>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>
            <SectionIcon icon={Sparkle} className="text-primary fill-current" />
            <SectionTitleText text={t("recent_releases.title")} />
            <SectionIcon icon={Sparkle} className="text-primary fill-current" />
          </SectionTitle>

          <SectionDescription>{t("recent_releases.description")}</SectionDescription>
        </SectionHeader>

        <SectionContent className="grid-auto-fill grid justify-center gap-6">
          {releaseGames.map((game) => (
            <GameCard
              key={game.id}
              id={game.id}
              name={game.name}
              icon={game.icon}
              price={game.price}
              rating={game.rating}
            />
          ))}
        </SectionContent>
      </Section>

      <GameJamSection />
    </>
  );
}
