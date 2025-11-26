import { DollarSign, Download, Eye, Users } from "lucide-react";

import { DevComponents } from "@/components/pages/dev";
import { DevDashboard } from "@/components/pages/dev/dashboard";
import { getDevDashboardGames } from "@/lib/dev/dashboard";

type StatTrend = "up" | "down";

const stats = [
  {
    icon: DollarSign,
    stat: {
      label: "Receita do Mês",
      value: "R$ 12.450,00",
      change: "+23%",
      trend: "up" as StatTrend,
    },
  },
  {
    icon: Download,
    stat: {
      label: "Downloads",
      value: "3.842",
      change: "+18%",
      trend: "up" as StatTrend,
    },
  },
  {
    icon: Eye,
    stat: {
      label: "Visualizações",
      value: "24.531",
      change: "+12%",
      trend: "up" as StatTrend,
    },
  },
  {
    icon: Users,
    stat: {
      label: "Jogadores Ativos",
      value: "1.256",
      change: "+8%",
      trend: "up" as StatTrend,
    },
  },
];

export default async function Page() {
  const games = await getDevDashboardGames(0);

  return (
    <DevComponents.Wrapper
      section={{ id: "dashboard", message: "Olá, seja bem-vindo de volta! 👋" }}
      childClassName="px-20 py-10 space-y-10"
    >
      <DevDashboard.WelcomeSection />

      <DevDashboard.StatisticsSection stats={stats} />

      <DevDashboard.GamesSection games={games} />

      <DevDashboard.ActivitySection />
    </DevComponents.Wrapper>
  );
}
