import { getTranslations } from "next-intl/server";

import DashboardPageClient from "./DashboardPageClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.dashboard" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function DashboardPage() {
  return <DashboardPageClient />;
}
