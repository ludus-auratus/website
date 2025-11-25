import Link from "next/link";
import { useTranslations } from "next-intl";
import { Headphones, Rocket } from "lucide-react";

import {
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionRoot,
  SectionTitle,
  SectionTitleText,
} from "@/components/layout/Section";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  const t = useTranslations("Developers.CTA");
  return (
    <SectionRoot
      className="py-20"
      childClassName="from-accent/20 to-primary/20 border-accent/40 space-y-6 rounded-3xl border-2 bg-gradient-to-br text-center md:p-12"
    >
      <SectionHeader>
        <SectionTitle>
          <SectionTitleText text={t("title")} />
        </SectionTitle>
        <SectionDescription>{t("description")}</SectionDescription>
      </SectionHeader>
      <SectionContent>
        <div className="mb-2 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" variant="accent">
            <Rocket className="h-5 w-5" />
            {t("actions.profile_form")}
          </Button>
          <Button size="lg" asChild>
            <Link href="/contact">
              <Headphones className="h-5 w-5" />
              {t("actions.contact_us")}
            </Link>
          </Button>
        </div>
        <p className="text-muted-foreground text-sm">{t("footer")}</p>
      </SectionContent>
    </SectionRoot>
  );
}
