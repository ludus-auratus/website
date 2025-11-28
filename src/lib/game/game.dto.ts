import { PublisherDTO } from "../publisher";
import { StudioDTO } from "../studio";

export interface GameDTO {
  id: number;
  name: string;
  price: number;
  tags: GameTagDTO[];
  classification: number;
  studio: StudioDTO;
  publisher: PublisherDTO;
  supportedLanguages: GameLanguageDTO[];
  icon: string;
  banner: string;
  gallery: GameMediaDTO[];
  description: string;
  releaseDate: Date;
  publishingDate: Date;
  rating: number;
}

export interface GameTagDTO {
  name: string;
  category: string;
}

export interface GameLanguageDTO {
  name: string;
  level: number;
}

export type GameMediaDTOType = "image" | "video";

export interface GameMediaDTO {
  type: GameMediaDTOType;
  title: string;
  src: string;
  alt?: string;
}
