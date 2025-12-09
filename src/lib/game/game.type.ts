import { GameClassification } from "./game.utils";

export interface Game {
  id: number;
  name: string;
  price: number;
  tags: {
    genders: GameTag[];
    features: GameTag[];
    accessibility: GameTag[];
    platforms: GameTag[];
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
  rating: number;
  additionalInfo: string | null;
  version: string;
  developerId: number;
  socialMedia: GameSocialMedia[];
  statistics: GameStatistics;
}

export interface GameListItem {
  id: number;
  name: string;
  price: number;
  tags: {
    genders: GameTag[];
    features: GameTag[];
    accessibility: GameTag[];
    platforms: GameTag[];
  };
  studio: string;
  icon: string;
  banner: string;
  rating: number;
  developerId: number;
}

export type GameTagCategories = Game["tags"];

export type GameTag = string;

export interface GameLanguage {
  name: string;
  interface: boolean;
  audio: boolean;
  subtitles: boolean;
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

export interface Tag {
  id: string;
  type: "genre" | "feature" | "platform" | "accessibility";
  name: string;
}

export interface Language {
  id: string;
  name: string;
  nativeName?: string;
}

export interface LanguageSupport {
  languageId: string;
  interface: boolean;
  subtitles: boolean;
  voiceover: boolean;
}

export interface ApiResponse<T = unknown> {
  dados: T;
  mensagem: string;
  sucesso: boolean;
}

export interface GameReview {
  nickname: string;
  avatar: string | null;
  recommended: boolean;
  comment: string;
  date: Date;
}

export interface GameSocialMedia {
  platform: number;
  url: string;
}

export interface GameStatistics {
  revenue: number;
  downloads: number;
  views: number;
}

export interface BackendGame {
  id: number;
  titulo: string;
  descricao: string;
  adicional: string | null;
  preco: number;
  percentualAprovacao: number;
  urlIcone: string;
  urlBanner: string;
  versao: string;
  classificacaoEtaria: number;
  idDesenvolvedor: number;
  dataLancamento: string;
  dataPublicacao: string;
  midias: BackendMedia[];
  tags: BackendTag[];
  traducoes: BackendTranslation[];
  redesSociais: BackendSocialMedia[];
  estatistica: BackendStatistics;
  nomeDesenvolvedor: string;
}

export interface BackendMedia {
  tipo: number;
  titulo: string;
  url: string;
}

export interface BackendTag {
  tipo: number;
  nome: string;
}

export interface BackendTranslation {
  idioma: string;
  localidade: string;
  temLegenda: boolean;
  temAudio: boolean;
  temInterface: boolean;
}

export interface BackendSocialMedia {
  plataforma: number;
  url: string;
}

export interface BackendReview {
  apelido: string;
  imagemPerfil: string | null;
  aprovado: boolean;
  comentario: string;
  data: string;
}

export interface BackendStatistics {
  receitaPublicacao: number;
  quantidadeDownload: number;
  quantidadeVisualizacao: number;
}

export enum BackendTagType {
  Genre = 0,
  Feature = 1,
  Platform = 2,
  Accessibility = 3,
}

export enum BackendMediaType {
  Image = 0,
  Video = 1,
}
