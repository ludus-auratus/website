import { importDirectoryFiles, writeFile } from "../utils/files.utils";

import { GameDTO } from "./game.dto";

export function importGameFiles() {
  return importDirectoryFiles<GameDTO>("/src/assets/data/games", (json) => JSON.parse(json));
}

export async function exportGameTemplate(filename: string, dto: GameDTO) {
  writeFile(`/src/assets/data/games/${filename}.json`, JSON.stringify(dto, null, 2));
}
