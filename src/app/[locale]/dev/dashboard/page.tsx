import { getTranslations } from "next-intl/server";

import { DevDashboard } from "@/components/pages/dev/dashboard";
import { getDevDashboardGames, getDevDashboardStatistics } from "@/lib/dev/dashboard";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.dashboard" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function DashboardPage() {
  const games = await getDevDashboardGames(0);
  const stats = await getDevDashboardStatistics(0);

  return (
    <>
      <DevDashboard.WelcomeSection />

      <DevDashboard.StatisticsSection stats={stats} />

      <DevDashboard.GamesSection games={games} />
    </>
  );
}
