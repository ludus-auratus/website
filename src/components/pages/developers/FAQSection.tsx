import { useTranslations } from "next-intl";

import {
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionRoot,
  SectionTitle,
  SectionTitleText,
} from "@/components/layout/Section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  "approval_time",
  "platform_exclusivity",
  "acceptable_games",
  "cnpj_requirement",
  "marketing_help",
  "update_publishing",
];

export default function FaqSection() {
  const t = useTranslations("Developers.FAQ");
  return (
    <SectionRoot>
      <SectionHeader>
        <SectionTitle>
          <SectionTitleText type="highlight" text={t("title")} />
        </SectionTitle>
        <SectionDescription>{t("description")}</SectionDescription>
      </SectionHeader>
      <SectionContent className="mx-auto max-w-4xl space-y-8">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((question_id, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-border data-[state=open]:border-highlight rounded-2xl border-2 px-6 transition-colors"
            >
              <AccordionTrigger className="py-4 text-left hover:cursor-pointer hover:no-underline">
                <span className="text-foreground">{t(`questions.${question_id}.question`)}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6">
                {t(`questions.${question_id}.answer`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SectionContent>
    </SectionRoot>
  );
}
