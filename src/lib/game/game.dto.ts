import { PublisherDTO } from "../publisher";
import { StudioDTO } from "../studio";

import { GameClassification } from "./game.utils";

export interface GameDTO {
  name: string;
  tags: GameTagDTO[];
  classification: GameClassification;
  studio: StudioDTO;
  publisher: PublisherDTO;
  supportedLanguages: GameLanguageDTO[];
  icon: string;
  banner: string;
  gallery: GameMidiaDTO[];
  description: string;
  releaseDate: Date;
  publishingDate: Date;
}

export interface GameTagDTO {
  name: string;
  category: string;
}

export interface GameLanguageDTO {
  name: string;
  level: number;
}

export type GameMidiaDTOType = "image" | "video";

export interface GameMidiaDTO {
  type: GameMidiaDTOType;
  title: string;
  src: string;
  alt?: string;
}
