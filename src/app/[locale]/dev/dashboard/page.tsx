import { DevDashboard } from "@/components/pages/dev/dashboard";
import { getDevDashboardGames, getDevDashboardStatistics } from "@/lib/dev/dashboard";

export default async function Page() {
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
