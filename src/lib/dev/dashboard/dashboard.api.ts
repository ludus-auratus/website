import game1 from "@/assets/data/dev/dashboard/game1.json";
import game2 from "@/assets/data/dev/dashboard/game2.json";
import game3 from "@/assets/data/dev/dashboard/game3.json";

import { GameDashboardDTO } from "./dashboard.dto";
import { QuickGameDashboard } from "./dashboard.type";

export async function getDevDashboardGames(userId: number): Promise<QuickGameDashboard[]> {
  const dto = await requestDevDashboardGames(userId);

  return dto.map((game) => ({ ...game, lastUpdate: new Date(game.lastUpdate) }));
}

export async function requestDevDashboardGames(userId: number): Promise<GameDashboardDTO[]> {
  return [game1 as GameDashboardDTO, game2 as GameDashboardDTO, game3 as GameDashboardDTO];
}
