import { useTranslations } from "next-intl";
import { DollarSign, Globe, Headphones, TrendingUp, Users } from "lucide-react";

import {
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionRoot,
  SectionTitle,
  SectionTitleText,
} from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const benefits = [
  {
    wip: false,
    icon: Users,
  },
  {
    wip: false,
    icon: DollarSign,
  },
  {
    wip: false,
    icon: Globe,
  },
  {
    wip: false,
    icon: Headphones,
  },
  {
    wip: false,
    icon: Globe,
  },
  {
    wip: true,
    icon: TrendingUp,
  },
];

export default function BenefitsSection() {
  const t = useTranslations("Developers.Benefits");
  return (
    <SectionRoot>
      <SectionHeader>
        <SectionTitle>
          <SectionTitleText text={t("title")} type="highlight" />
        </SectionTitle>
        <SectionDescription>{t("description")}</SectionDescription>
      </SectionHeader>

      <SectionContent className="grid-auto-fill-300 grid gap-6">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <Card
              key={index}
              className="border-accent/10 border-t-accent/75 border-x-accent/30 hover:border-accent border-2 p-6 transition-all duration-300 hover:shadow-md"
            >
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div className="bg-accent/10 flex h-12 w-12 items-center justify-center rounded-xl">
                    <Icon className="text-accent h-6 w-6" />
                  </div>
                  {benefit.wip ? (
                    <Badge variant="accent" className="h-fit px-4 py-1">
                      {t("wip")}
                    </Badge>
                  ) : null}
                </div>
                <div>
                  <h3 className="text-foreground font-ludus-pixelify-sans mb-2 text-xl">{t(`items.${index}.title`)}</h3>
                  <p className="text-muted-foreground text-sm">{t(`items.${index}.description`)}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </SectionContent>
    </SectionRoot>
  );
}
