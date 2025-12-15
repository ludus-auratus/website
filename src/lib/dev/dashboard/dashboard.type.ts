import { get } from "http";
import { int, set } from "zod";

export type PublishedGameStatus = "published" | "unpublished" | "draft" | "revision";

export interface QuickGameDashboard {
  id: number;
  title: string;
  version: string;
  cover: string;
  status: PublishedGameStatus;
  revenue: number;
  downloads: number;
  views: number;
  rating: number;
  reviews: number;
  lastUpdate: Date;
  publishedDate: Date | null;
  platforms: string[];
}

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
