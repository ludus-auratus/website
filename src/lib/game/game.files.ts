import { importDirectoryFiles, writeFile } from "../utils/files.utils";

import { Game } from "./game.type";

export function importGameFiles() {
  return importDirectoryFiles<Game>("/src/assets/data/games", (json) => JSON.parse(json));
}

export async function exportGameTemplate(filename: string, dto: Game) {
  writeFile(`/src/assets/data/games/${filename}.json`, JSON.stringify(dto, null, 2));
}
