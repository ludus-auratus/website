import { LuSparkle, LuStar } from "react-icons/lu";

import { Footer } from "@/components/layout/Footer";
import {
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionIcon,
  SectionRoot as Section,
  SectionTitle,
  SectionTitleText,
} from "@/components/layout/Section";
import { GameCard } from "@/components/pages/game/GameCard";
import { HeroBanner } from "@/components/pages/home/HeroBanner";

export default function Home() {
  const games = [
    {
      id: 1,
      title: "Hellbrella",
      image: "hellbrella.jpg",
      price: 20.5,
    },
    {
      id: 2,
      title: "Hellbrella",
      image: "hellbrella.jpg",
      price: 20.5,
    },
    {
      id: 3,
      title: "Hellbrella",
      image: "hellbrella.jpg",
      price: 20.5,
    },
    {
      id: 4,
      title: "Hellbrella",
      image: "hellbrella.jpg",
      price: 20.5,
    },
    {
      id: 5,
      title: "Hellbrella",
      image: "hellbrella.jpg",
      price: 20.5,
    },
    {
      id: 6,
      title: "Hellbrella",
      image: "hellbrella.jpg",
      price: 20.5,
    },
    {
      id: 7,
      title: "Hellbrella",
      image: "hellbrella.jpg",
      price: 20.5,
    },
    {
      id: 8,
      title: "Hellbrella",
      image: "hellbrella.jpg",
      price: 20.5,
    },
  ];

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
          {games.map((game) => (
            <GameCard key={game.id} id={game.id} title={game.title} image={game.image} price={game.price} />
          ))}
        </SectionContent>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>
            <SectionIcon icon={LuSparkle} className="text-primary" />
            <SectionTitleText text="Lançamentos Recentes" />
            <SectionIcon icon={LuSparkle} className="text-primary" />
          </SectionTitle>

          <SectionDescription>Descubra os jogos mais novos da plataforma Ludus</SectionDescription>
        </SectionHeader>

        <SectionContent className="flex flex-wrap justify-center gap-6">
          {games.map((game) => (
            <GameCard key={game.id} id={game.id} title={game.title} image={game.image} price={game.price} />
          ))}
        </SectionContent>
      </Section>

      <Footer />
    </>
  );
}
