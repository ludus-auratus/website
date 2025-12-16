"use client";

import { useEffect, useState } from "react";

import { DevDashboard } from "@/components/pages/dev/dashboard";
import { useAuth } from "@/context/AuthContext";
import { getDevDashboardGames, getDevDashboardStatistics } from "@/lib/dev/dashboard";
import { DevDashboardGame, DevQuickStatistics, QuickGameDashboard } from "@/lib/dev/dashboard/dashboard.type";

export default function DashboardPageClient() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DevQuickStatistics | null>(null);
  const [games, setGames] = useState<DevDashboardGame[]>([]);

  useEffect(() => {
    const developerId = user?.developerId;

    if (developerId) {
      const fetchData = async () => {
        try {
          const [loadedGames, loadedStats] = await Promise.all([
            getDevDashboardGames(developerId),
            getDevDashboardStatistics(developerId),
          ]);
          setGames(loadedGames);
          setStats(loadedStats);
        } catch (error) {
          console.error("Failed to fetch dashboard data", error);
        }
      };

      fetchData();
    }
  }, [user?.developerId]);

  if (!stats) return null;

  return (
    <>
      <DevDashboard.WelcomeSection />

      <DevDashboard.StatisticsSection stats={stats} />

      <DevDashboard.GamesSection games={games} />
    </>
  );
}
