import { use } from "react";
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
import GameJamSection from "@/components/pages/home/GameJamSection";
import { HeroBanner } from "@/components/pages/home/HeroBanner";
import { getAllGames } from "@/lib/game";

export default function Home() {
  const t = useTranslations("Home");
  const games = use(getAllGames());

  const featuredGames = games.slice(0, 4);
  const releaseGames = games.slice(4, 12);

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

        <SectionContent>
          <GameList games={featuredGames} />
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

        <SectionContent>
          <GameList games={releaseGames} />
        </SectionContent>
      </Section>
      <GameJamSection />
    </>
  );
}
