import { GameClassification } from "./game.utils";

export interface Game {
  name: string;
  tags: {
    genders: GameTag[];
    resources: GameTag[];
  };
  classification: GameClassification;
  studio: string;
  publisher: string;
  supportedLanguages: GameLanguage[];
  icon: string;
  banner: string;
  gallery: GameMidia[];
  description: string;
  releaseDate: Date;
  publishingDate: Date;
}

export type GameTagCategories = Game["tags"];

export type GameTag = string;

export interface GameLanguage {
  name: string;
  level: number;
}

export type GameMidiaType = "image" | "video";

export interface GameMidia {
  type: GameMidiaType;
  title: string;
  src: string;
  alt?: string;
}

export type GameImage = GameMidia & {
  type: "image";
};

export type GameVideo = GameMidia & {
  type: "video";
};
