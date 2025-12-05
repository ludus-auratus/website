"use server";

import gameDescription from "@/assets/data/game_description.md";

import type { GameDTO, GameMediaDTO } from "./game.dto";
import { exportGameTemplate as exportGameTempData, importGameFiles } from "./game.files";
import type { Game, GameTagCategories } from "./game.type";
import { getClassificationByAge } from "./game.utils";

export async function getGameDataById(gamekey: number): Promise<Game> {
  const dto = await requestGameDataById(gamekey);

  const tags: GameTagCategories = {
    genders: dto.tags.filter((tag) => tag.category === "gender").map((tag) => tag.name),
    resources: dto.tags.filter((tag) => tag.category === "resources").map((tag) => tag.name),
  };

  return {
    id: dto.id,
    name: dto.name,
    price: dto.price,
    classification: getClassificationByAge(dto.classification),
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
    rating: dto.rating,
  };
}

export async function requestGameDataById(gamekey: number): Promise<GameDTO> {
  const catalog = importGameFiles();

  const game = catalog.find((game) => {
    return game.id == gamekey;
  });

  if (!game) {
    throw new Error("Jogo não encontrado");
  }

  return await {
    id: game.id,
    name: game.name,
    price: game.price,
    classification: game.classification,
    description: game.description,
    tags: game.tags,
    releaseDate: new Date(game.releaseDate),
    publishingDate: new Date(game.publishingDate),
    studio: game.studio,
    publisher: game.publisher,
    supportedLanguages: game.supportedLanguages,
    icon: game.icon,
    banner: game.banner,
    gallery: game.gallery as GameMediaDTO[],
    rating: game.rating,
  };
}

export async function getAllGames(): Promise<Game[]> {
  const dto = await requestAllGames();

  return dto.map((game) => {
    const tags: GameTagCategories = {
      genders: game.tags.filter((tag) => tag.category === "gender").map((tag) => tag.name),
      resources: game.tags.filter((tag) => tag.category === "resources").map((tag) => tag.name),
    };

    return {
      id: game.id,
      name: game.name,
      price: game.price,
      classification: getClassificationByAge(game.classification),
      description: game.description,
      tags,
      studio: game.studio.name,
      publisher: game.publisher.name,
      icon: game.icon,
      banner: game.banner,
      gallery: game.gallery,
      publishingDate: game.publishingDate,
      releaseDate: game.releaseDate,
      supportedLanguages: game.supportedLanguages,
      rating: game.rating,
    };
  });
}

export async function requestAllGames(): Promise<GameDTO[]> {
  const catalog = importGameFiles();

  return catalog.map((dto) => {
    return {
      id: dto.id,
      name: dto.name,
      price: dto.price,
      classification: dto.classification,
      description: gameDescription,
      tags: dto.tags,
      releaseDate: new Date(dto.releaseDate),
      publishingDate: new Date(dto.publishingDate),
      studio: dto.studio,
      publisher: dto.publisher,
      supportedLanguages: dto.supportedLanguages,
      icon: dto.icon,
      banner: dto.banner,
      gallery: dto.gallery as GameMediaDTO[],
      rating: dto.rating,
    };
  });
}

export async function uploadGameData(filename: string, dto: GameDTO) {
  exportGameTempData(filename, dto);
}
