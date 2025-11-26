import { DevComponents } from "@/components/pages/dev";
import { DevDashboard } from "@/components/pages/dev/dashboard";
import { getDevDashboardGames, getDevDashboardStatistics } from "@/lib/dev/dashboard";

export default async function Page() {
  const games = await getDevDashboardGames(0);
  const stats = await getDevDashboardStatistics(0);

  return (
    <DevComponents.Wrapper
      section={{ id: "dashboard", message: "Olá, seja bem-vindo de volta! 👋" }}
      childClassName="px-20 py-10 space-y-10"
    >
      <DevDashboard.WelcomeSection />

      <DevDashboard.StatisticsSection stats={stats} />

      <DevDashboard.GamesSection games={games} />
    </DevComponents.Wrapper>
  );
}
