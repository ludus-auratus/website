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
