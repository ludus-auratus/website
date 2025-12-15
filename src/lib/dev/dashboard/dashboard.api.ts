import game1 from "@/assets/data/dev/dashboard/game1.json";
import game2 from "@/assets/data/dev/dashboard/game2.json";
import game3 from "@/assets/data/dev/dashboard/game3.json";
import { env } from "@/config/env";
import { RespostaDto } from "@/lib/common.dto";

import { DevQuickStatisticsDTO, GameDashboardDTO } from "./dashboard.dto";
import { DevQuickStatistics, DevQuickStatisticsBackend, QuickGameDashboard } from "./dashboard.type";

const API_URL = `${env.API_BASE_URL}/jogo`;

export async function getDevDashboardStatistics(developerId: number): Promise<DevQuickStatistics> {
  const dto = await requestDevDashboardStatistics(developerId);

  return {
    revenue: {
      label: "Receita",
      trend: dto.revenue.change > 0 ? "up" : "down",
      change: dto.revenue.change === null ? null : `${(dto.revenue.change * 100).toFixed(1)}%`,
      value: `R$ ${dto.revenue.value.toFixed(2).replace(".", ",")}`,
    },
    downloads: {
      label: "Downloads",
      trend: dto.downloads.change > 0 ? "up" : "down",
      change: dto.revenue.change === null ? null : `${(dto.downloads.change * 100).toFixed(1)}%`,
      value: dto.downloads.value.toLocaleString("pt-BR"),
    },
    views: {
      label: "Visualizações",
      trend: dto.views.change > 0 ? "up" : "down",
      change: dto.revenue.change === null ? null : `${(dto.views.change * 100).toFixed(1)}%`,
      value: dto.views.value.toLocaleString("pt-BR"),
    },
    rating: {
      label: "Avaliação",
      trend: dto.rating.change > 0 ? "up" : "down",
      change: dto.revenue.change === null ? null : `${(dto.rating.change * 100).toFixed(1)}%`,
      value: dto.rating.value.toLocaleString("pt-BR"),
    },
  };
}

export async function requestDevDashboardStatistics(developerId: number): Promise<DevQuickStatisticsDTO> {
  const response = await fetch(`${API_URL}/dashboard/${developerId}`, { next: { revalidate: 30 } });

  if (!response.ok) {
    throw new Error(`Erro ao buscar dashboard: ${response.statusText}`);
  }

  const data = (await response.json()) as RespostaDto<DevQuickStatisticsBackend>;

  if (!data.sucesso) {
    throw new Error(data.mensagem || "Erro ao carregar biblioteca.");
  }

  console.log(data.dados);

  return {
    revenue: {
      value: data.dados.totalReceita ?? 0,
      change: data.dados.crescimentoReceita,
    },
    downloads: {
      value: data.dados.totalDownloads ?? 0,
      change: data.dados.crescimentoDownloads,
    },
    views: {
      value: data.dados.totalVisualizacoes ?? 0,
      change: data.dados.crescimentoVisualizacoes,
    },
    rating: {
      value: data.dados.totalAvaliacoes ?? 0,
      change: data.dados.crescimentoAvaliacoes,
    },
  };
}

export async function getDevDashboardGames(userId: number): Promise<QuickGameDashboard[]> {
  const dto = await requestDevDashboardGames(userId);

  return dto.map((game) => ({
    ...game,
    lastUpdate: new Date(game.lastUpdate),
    publishedDate: game.publishedDate ? new Date(game.publishedDate) : null,
  }));
}

export async function requestDevDashboardGames(userId: number): Promise<GameDashboardDTO[]> {
  return [game1 as GameDashboardDTO, game2 as GameDashboardDTO, game3 as GameDashboardDTO];
}
