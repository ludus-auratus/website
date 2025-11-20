import { useTranslations } from "next-intl";
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
  const t = useTranslations("GameJamSection");
  const tFeatures = useTranslations("GameJamSection.features");

  const features = [
    {
      icon: Trophy,
      titleKey: "creative_competitions",
    },
    {
      icon: Users,
      titleKey: "active_community",
    },
    {
      icon: Clock,
      titleKey: "regular_events",
    },
    {
      icon: Sparkles,
      titleKey: "guaranteed_visibility",
    },
  ];

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>
          <SectionIcon icon={Trophy} />
          <SectionTitleText text={t("title")} />
          <SectionIcon icon={Trophy} />
        </SectionTitle>

        <SectionDescription>
          {t("description")}
          <span className="mt-2 block text-[var(--ludus-orange)]">{t("coming_soon_message")}</span>
        </SectionDescription>
      </SectionHeader>

      <SectionContent>
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <GameJamFeatureCard
              key={index}
              icon={feature.icon}
              title={tFeatures(`${feature.titleKey}.title`)}
              description={tFeatures(`${feature.titleKey}.description`)}
            />
          ))}
        </div>

        <GameJamComingSoon />
      </SectionContent>
    </Section>
  );
}
