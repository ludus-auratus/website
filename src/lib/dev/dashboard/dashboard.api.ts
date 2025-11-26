import game1 from "@/assets/data/dev/dashboard/game1.json";
import game2 from "@/assets/data/dev/dashboard/game2.json";
import game3 from "@/assets/data/dev/dashboard/game3.json";

import { DevQuickStatisticsDTO, GameDashboardDTO } from "./dashboard.dto";
import { DevQuickStatistics, QuickGameDashboard } from "./dashboard.type";

export async function getDevDashboardStatistics(userId: number): Promise<DevQuickStatistics> {
  const dto = await requestDevDashboardStatistics(userId);

  return {
    revenue: {
      label: "Receita",
      trend: dto.revenue.change > 0 ? "up" : "down",
      change: `${(dto.revenue.change * 100).toFixed(1)}%`,
      value: `R$ ${dto.revenue.value.toFixed(2).replace(".", ",")}`,
    },
    downloads: {
      label: "Downloads",
      trend: dto.downloads.change > 0 ? "up" : "down",
      change: `${(dto.downloads.change * 100).toFixed(1)}%`,
      value: dto.downloads.value.toFixed(0),
    },
    views: {
      label: "Visualizações",
      trend: dto.views.change > 0 ? "up" : "down",
      change: `${(dto.views.change * 100).toFixed(1)}%`,
      value: dto.views.value.toFixed(0),
    },
    rating: {
      label: "Avaliação",
      trend: dto.rating.change > 0 ? "up" : "down",
      change: `${(dto.rating.change * 100).toFixed(1)}%`,
      value: dto.rating.value.toFixed(0),
    },
  };
}

export async function requestDevDashboardStatistics(userId: number): Promise<DevQuickStatisticsDTO> {
  return {
    revenue: {
      value: 12_450.0,
      change: 0.23,
    },
    downloads: {
      value: 3.842,
      change: 0.18,
    },
    views: {
      value: 24_531,
      change: 0.12,
    },
    rating: {
      value: 1_256,
      change: 0.08,
    },
  };
}

export async function getDevDashboardGames(userId: number): Promise<QuickGameDashboard[]> {
  const dto = await requestDevDashboardGames(userId);

  return dto.map((game) => ({ ...game, lastUpdate: new Date(game.lastUpdate) }));
}

export async function requestDevDashboardGames(userId: number): Promise<GameDashboardDTO[]> {
  return [game1 as GameDashboardDTO, game2 as GameDashboardDTO, game3 as GameDashboardDTO];
}
