import Image from "next/image";
import { useTranslations } from "next-intl";

import {
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionRoot,
  SectionTitle,
} from "@/components/layout/Section";

const stats = [
  { value: "50K+", label: "Jogadores Ativos" },
  { value: "500+", label: "Jogos Publicados" },
];

export default function PresentationSection() {
  const t = useTranslations("Developers.Presentation");

  const titleParts = t("title").split("/");

  return (
    <SectionRoot className="text-center" childClassName="pt-10">
      <SectionHeader className="mb-0">
        <Image src="/images/ludus/ludus-marginless.png" width={256} height={256} alt={""} className="mx-auto" />
        <SectionTitle>
          <h1 className="text-highlight font-ludus-pixelify-sans text-4xl md:text-5xl lg:text-6xl">
            {titleParts[0]}
            <br />
            <span className="text-accent">{titleParts[1]} </span>
            {titleParts[2]}
          </h1>
        </SectionTitle>
        <SectionDescription>{t("description")}</SectionDescription>
      </SectionHeader>

      <SectionContent className="mx-auto grid w-fit max-w-4xl grid-cols-2 gap-6 pt-12">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-accent font-ludus-pixelify-sans text-3xl md:text-4xl">{stat.value}</div>
            <div className="text-muted-foreground mt-1 text-sm">{stat.label}</div>
          </div>
        ))}
      </SectionContent>
    </SectionRoot>
  );
}
