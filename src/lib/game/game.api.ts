import gameDescription from "@/assets/data/game_description.md";

import { createPlaceholderImageUrl } from "../utils/image.utils";

import { GameDTO } from "./game.dto";
import { Game, GameTagCategories } from "./game.type";
import { GameClassifications } from "./game.utils";

export async function getGameDataById(): Promise<Game> {
  const dto = await requestGameDataById();

  const tags: GameTagCategories = {
    genders: dto.tags.filter((tag) => tag.category === "gender").map((tag) => tag.name),
    resources: dto.tags.filter((tag) => tag.category === "resources").map((tag) => tag.name),
  };

  return {
    name: dto.name,
    classification: dto.classification,
    description: dto.description,
    tags,
    studio: dto.studio.name,
    publisher: dto.publisher.name,
    icon: dto.icon,
    banner: dto.banner,
    gallery: dto.gallery,
    publishingDate: dto.publishingDate,
    releaseDate: dto.releaseDate,
    supportedLanguages: dto.supportedLanguages,
  };
}

export async function requestGameDataById(): Promise<GameDTO> {
  return await {
    name: "Enigma do Medo",
    classification: GameClassifications.C12,
    description: gameDescription,
    tags: [
      { name: "Mistério", category: "gender" },
      { name: "Investigação", category: "gender" },
      { name: "Sobrenatural", category: "gender" },
      { name: "Detetive", category: "gender" },
      { name: "Um Jogador", category: "resources" },
      { name: "Controle de Xbox", category: "resources" },
    ],
    releaseDate: new Date(2025, 9, 18),
    publishingDate: new Date(2023, 9, 18),
    studio: { name: "Icy Mountain Studios" },
    publisher: { name: "GoGo Games Interactive" },
    supportedLanguages: [
      { name: "Português (Brasil)", level: 3 },
      { name: "Inglês", level: 3 },
    ],
    icon: createPlaceholderImageUrl(128, 128, "Ícone"),
    banner: createPlaceholderImageUrl(600, 900, "Banner de Jogo"),
    gallery: [
      {
        type: "video",
        src: "https://youtube.com/embed/Hjl6usm5WCo?si=cB3-BcUbRj_ObfFi",
        title: "Enigma do Medo - Trailer Oficial",
      },
    ],
  };
}
