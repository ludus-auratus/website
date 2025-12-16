import { env } from "@/config/env";
import { RespostaDto } from "@/lib/common.dto";

import { DevQuickStatisticsDTO } from "./dashboard.dto";
import { DevDashboardGame, DevQuickStatistics, DevQuickStatisticsBackend } from "./dashboard.type";

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

export async function getDevDashboardGames(developerId: number): Promise<DevDashboardGame[]> {
  const games = await requestDevDashboardGames(developerId);

  return games.map((game) => ({
    ...game,
    urlIcone: `${env.BASE_URL}${game.urlIcone}`,
  }));
}

export async function requestDevDashboardGames(developerId: number): Promise<DevDashboardGame[]> {
  const response = await fetch(`${API_URL}/desenvolvedor/${developerId}`);

  if (!response.ok) {
    throw new Error(`Erro ao buscar dashboard: ${response.statusText}`);
  }

  const data = (await response.json()) as RespostaDto<DevDashboardGame[]>;

  if (!data.sucesso) {
    throw new Error(data.mensagem || "Erro ao carregar biblioteca.");
  }

  return data.dados;
}
