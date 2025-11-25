import { useTranslations } from "next-intl";
import { ChevronDown, Code, Rocket, Shield, Users } from "lucide-react";

import {
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionRoot,
  SectionTitle,
  SectionTitleText,
} from "@/components/layout/Section";

const steps = [Users, Code, Shield, Rocket];

export default function HowItWorksSection() {
  const t = useTranslations("Developers.HowItWorks");
  return (
    <SectionRoot className="bg-ludus-moss-600/40 border-border relative">
      <SectionHeader>
        <SectionTitle>
          <SectionTitleText text={t("title")} type="highlight"></SectionTitleText>
        </SectionTitle>

        <SectionDescription>{t("description")}</SectionDescription>
      </SectionHeader>

      <SectionContent className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((stepIcon, index) => {
          const Icon = stepIcon;
          return (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="border-border absolute top-12 left-[87%] hidden h-0.5 w-1/3 rounded-full border-2 lg:block">
                  <div className="absolute top-1/2 right-0 translate-x-2/3 -translate-y-1/2">
                    <ChevronDown className="text-border h-12 w-12 rotate-[-90deg]" />
                  </div>
                </div>
              )}
              <div className="relative z-10 space-y-4 text-center">
                <div className="bg-accent/5 border-accent mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4">
                  <Icon className="text-accent h-10 w-10" />
                </div>
                <div className="text-accent/75 font-ludus-pixelify-sans text-4xl">0{index + 1}</div>
                <div>
                  <h3 className="text-foreground font-ludus-pixelify-sans mb-2 text-xl">{t(`steps.${index}.title`)}</h3>
                  <p className="text-muted-foreground text-sm">{t(`steps.${index}.description`)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </SectionContent>
    </SectionRoot>
  );
}
