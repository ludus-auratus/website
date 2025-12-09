"use server";

import { exportGameTemplate as exportGameTempData } from "./game.files";
import type { Game } from "./game.type";

export async function uploadGameData(filename: string, dto: Game) {
  exportGameTempData(filename, dto);
}
