import { useTranslations } from "next-intl";
import { Sparkle, Star } from "lucide-react";

import games from "@/assets/data/games.json";
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

export default function Home() {
  const t = useTranslations("Home");

  return (
    <>
      <HeroBanner />

      <Section className="from-muted/30 to-background bg-gradient-to-b">
        <SectionHeader>
          <SectionTitle>
            <SectionIcon icon={Star} />
            <SectionTitleText text={t("featured.title")} />
            <SectionIcon icon={Star} />
          </SectionTitle>

          <SectionDescription>{t("featured.description")}</SectionDescription>
        </SectionHeader>

        <SectionContent className="flex flex-wrap justify-center gap-6">
          {games.slice(0, 4).map((game) => (
            <GameCard key={game.id} id={game.id} name={game.name} icon={game.icon} price={game.price} />
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

        <SectionContent className="flex flex-wrap justify-center gap-6">
          {games.map((game) => (
            <GameCard key={game.id} id={game.id} name={game.name} icon={game.icon} price={game.price} />
          ))}
        </SectionContent>
      </Section>

      <GameJamSection />
    </>
  );
}
