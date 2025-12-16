export type PublishedGameStatus = "published" | "unpublished" | "draft" | "revision";

export type QuickGameDashboard = DevDashboardGame;
export interface DevQuickStatistics {
  revenue: DevQuickStat;
  downloads: DevQuickStat;
  views: DevQuickStat;
  rating: DevQuickStat;
}

export type DevQuickStatTrend = "up" | "down";

export interface DevQuickStat {
  label: string;
  value: string;
  trend: DevQuickStatTrend;
  change: string | null;
}

export interface DevQuickStatisticsBackend {
  totalVisualizacoes: number;
  totalDownloads: number;
  totalAvaliacoes: number;
  totalJogos: number;
  totalReceita: number;
  crescimentoVisualizacoes: number;
  crescimentoDownloads: number;
  crescimentoReceita: number;
  crescimentoAvaliacoes: number;
}

export type JogoStatusTipo = "Rascunho" | "Publicado" | "EmAvaliacao" | "Suspenso";
export interface QuickGameDashboardBackend {
  Id: number;
  Nome: string;
  Versao: string;
  UrlIcone: string;
  Status: JogoStatusTipo;
  Receita: number;
  Downloads: number;
  Visualizacoes: number;
  Avaliacoes: number;
  DataPublicacao: Date | null;
  DataLancamento: Date | null;
}

export interface DevDashboardGame {
  id: number;
  titulo: string;
  urlIcone: string;
  versao: string;
  percentualAprovacao: number;
  dataLancamento: string;
  dataPublicacao: string | null;
  receitaPublicacao: number;
  estatistica: {
    receitaPublicacao: number;
    quantidadeDownload: number;
    quantidadeVisualizacao: number;
  };
}
