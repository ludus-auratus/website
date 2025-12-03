import { SocialMediaID } from "@/components/pages/game/GameSocialMedia";

import { GameClassification } from "./game.utils";

export interface Game {
  id: number;
  name: string;
  price: number;
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
  gallery: GameMedia[];
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

export type GameMediaType = "image" | "video";

export interface GameMedia {
  type: GameMediaType;
  title: string;
  src: string;
  alt?: string;
}

export type GameImage = GameMedia & {
  type: "image";
};

export type GameVideo = GameMedia & {
  type: "video";
};

export interface GameComment {
  author: {
    username: string;
    avatar: string;
  };
  content: string;
  feedback: GameCommentFeedback;
  publishedAt: Date;
}

export type GameCommentFeedback = "positive" | "negative";
