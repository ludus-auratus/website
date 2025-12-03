import { PublishedGameStatus } from "./dashboard.type";

export interface GameDashboardDTO {
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
  lastUpdate: string;
  publishedDate: string | null;
  platforms: string[];
}

export interface DevQuickStatisticsDTO {
  revenue: DevQuickStatDTO;
  downloads: DevQuickStatDTO;
  views: DevQuickStatDTO;
  rating: DevQuickStatDTO;
}

interface DevQuickStatDTO {
  value: number;
  change: number;
}
