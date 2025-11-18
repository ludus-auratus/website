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
    id: dto.id,
    name: dto.name,
    price: dto.price,
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
    id: 1,
    name: "Enigma do Medo",
    price: 25,
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
    icon: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1507580/header_brazilian.jpg?t=1759955245",
    banner:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1507580/extras/120ffc31c8b8e810d9cbc09c2bab5117.avif?t=1759955245",
    gallery: [
      {
        type: "video",
        src: "Hjl6usm5WCo",
        title: "Enigma do Medo - Trailer Oficial",
      },
      {
        type: "image",
        src: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1507580/ss_85609218e5a521f8f0ac8ce6a37fdbc67d73034b.116x65.jpg?t=1759955245",
        title: "Imagem de Gameplay",
      },
      {
        type: "image",
        src: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1507580/ss_85609218e5a521f8f0ac8ce6a37fdbc67d73034b.116x65.jpg?t=1759955245",
        title: "Imagem de Gameplay",
      },
      {
        type: "image",
        src: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1507580/ss_85609218e5a521f8f0ac8ce6a37fdbc67d73034b.116x65.jpg?t=1759955245",
        title: "Imagem de Gameplay",
      },
      {
        type: "image",
        src: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1507580/ss_85609218e5a521f8f0ac8ce6a37fdbc67d73034b.116x65.jpg?t=1759955245",
        title: "Imagem de Gameplay",
      },
      {
        type: "image",
        src: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1507580/ss_85609218e5a521f8f0ac8ce6a37fdbc67d73034b.116x65.jpg?t=1759955245",
        title: "Imagem de Gameplay",
      },
      {
        type: "image",
        src: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1507580/ss_85609218e5a521f8f0ac8ce6a37fdbc67d73034b.116x65.jpg?t=1759955245",
        title: "Imagem de Gameplay",
      },
      {
        type: "image",
        src: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1507580/ss_85609218e5a521f8f0ac8ce6a37fdbc67d73034b.116x65.jpg?t=1759955245",
        title: "Imagem de Gameplay",
      },
    ],
  };
}
