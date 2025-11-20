import { Clock, Sparkles, Trophy, Users } from "lucide-react";

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
      icon: Trophy,
      title: "Competições Criativas",
      description: "Participe de desafios temáticos com foco em cultura brasileira",
    },
    {
      icon: Users,
      title: "Comunidade Ativa",
      description: "Conecte-se com outros desenvolvedores indies brasileiros",
    },
    {
      icon: Clock,
      title: "Eventos Regulares",
      description: "Novas game jams lançadas mensalmente com prêmios exclusivos",
    },
    {
      icon: Sparkles,
      title: "Visibilidade Garantida",
      description: "Jogos criados em jams recebem destaque especial na plataforma",
    },
  ];

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>
          <SectionIcon icon={Trophy} />
          <SectionTitleText text="Game Jam" />
          <SectionIcon icon={Trophy} />
        </SectionTitle>

        <SectionDescription>
          Participe de competições criativas, desenvolva jogos em tempo limitado e conecte-se com a comunidade indie
          brasileira.
          <span className="mt-2 block text-[var(--ludus-orange)]">
            Esta funcionalidade está em desenvolvimento e em breve estará disponível!
          </span>
        </SectionDescription>
      </SectionHeader>

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
    </Section>
  );
}
