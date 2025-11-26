export type PublishedGameStatus = "published" | "unpublished" | "draft" | "revision";

export interface QuickGameDashboard {
  id: number;
  title: string;
  cover: string;
  status: PublishedGameStatus;
  revenue: number;
  downloads: number;
  views: number;
  rating: number;
  lastUpdate: Date;
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
  change: string;
}
