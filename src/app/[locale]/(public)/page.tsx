import { LuSparkle, LuStar } from "react-icons/lu";

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
  return (
    <>
      <HeroBanner />

      <Section className="from-secondary/30 to-background bg-gradient-to-b">
        <SectionHeader>
          <SectionTitle>
            <SectionIcon icon={LuStar} />
            <SectionTitleText text="Em Destaque" />
            <SectionIcon icon={LuStar} />
          </SectionTitle>

          <SectionDescription>Jogos selecionados cuidadosamente pela equipe Ludus e pela comunidade</SectionDescription>
        </SectionHeader>

        <SectionContent className="flex flex-wrap justify-center gap-6">
          {games.slice(0, 4).map((game) => (
            <GameCard key={game.id} id={game.id} title={game.title} image={game.image} price={game.price} />
          ))}
        </SectionContent>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>
            <SectionIcon icon={LuSparkle} className="text-primary fill-current" />
            <SectionTitleText text="Lançamentos Recentes" />
            <SectionIcon icon={LuSparkle} className="text-primary fill-current" />
          </SectionTitle>

          <SectionDescription>Descubra os jogos mais novos da plataforma Ludus</SectionDescription>
        </SectionHeader>

        <SectionContent className="flex flex-wrap justify-center gap-6">
          {games.map((game) => (
            <GameCard key={game.id} id={game.id} title={game.title} image={game.image} price={game.price} />
          ))}
        </SectionContent>
      </Section>

      <GameJamSection />
    </>
  );
}
