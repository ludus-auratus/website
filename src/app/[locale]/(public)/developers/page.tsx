import { getTranslations } from "next-intl/server";

import { DevelopersComponents } from "@/components/pages/developers";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.developers" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function DevelopersPage() {
  return (
    <div className="bg-background min-h-screen">
      <DevelopersComponents.Presentation />

      <DevelopersComponents.Benefits />

      <DevelopersComponents.HowItWorks />

      <DevelopersComponents.CTA />

      <DevelopersComponents.FAQ />
    </div>
  );
}
