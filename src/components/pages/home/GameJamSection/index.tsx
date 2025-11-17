import { LuClock, LuSparkles, LuTrophy, LuUsers } from "react-icons/lu";

import {
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionIcon,
  SectionRoot as Section,
  SectionTitle,
  SectionTitleText,
} from "@/components/layout/Section";

import { GameJamComingSoon } from "./GameJamComingSoon";
import { GameJamFeatureCard } from "./GameJamFeatureCard";

export default function GameJamSection() {
  const features = [
    {
      icon: LuTrophy,
      title: "Competições Criativas",
      description: "Participe de desafios temáticos com foco em cultura brasileira",
    },
    {
      icon: LuUsers,
      title: "Comunidade Ativa",
      description: "Conecte-se com outros desenvolvedores indies brasileiros",
    },
    {
      icon: LuClock,
      title: "Eventos Regulares",
      description: "Novas game jams lançadas mensalmente com prêmios exclusivos",
    },
    {
      icon: LuSparkles,
      title: "Visibilidade Garantida",
      description: "Jogos criados em jams recebem destaque especial na plataforma",
    },
  ];

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>
          <SectionIcon icon={LuTrophy} />
          <SectionTitleText text="Game Jam" />
          <SectionIcon icon={LuTrophy} />
        </SectionTitle>

        <SectionDescription>
          Participe de competições criativas, desenvolva jogos em tempo limitado e conecte-se com a comunidade indie
          brasileira.
          <span className="mt-2 block text-[var(--ludus-orange)]">
            Esta funcionalidade está em desenvolvimento e em breve estará disponível!
          </span>
        </SectionDescription>

        <SectionContent>
          <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <GameJamFeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>

          <GameJamComingSoon />
        </SectionContent>
      </SectionHeader>
    </Section>
  );
}
