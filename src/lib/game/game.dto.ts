import { env } from "@/config/env";

import {
  BackendGame,
  BackendMediaType,
  BackendReview,
  BackendTagType,
  Game,
  GameLanguage,
  GameListItem,
  GameMedia,
  GameMediaType,
  GameReview,
} from "./game.type";
import { GameClassification, GameClassifications } from "./game.utils";

export const mapBackendGameToFrontend = (backendGame: BackendGame): Game => {
  return {
    id: backendGame.id,
    name: backendGame.titulo,
    price: backendGame.preco,
    tags: {
      genders: backendGame.tags.filter((t) => t.tipo === BackendTagType.Genre).map((t) => t.nome),
      features: backendGame.tags.filter((t) => t.tipo === BackendTagType.Feature).map((t) => t.nome),
      platforms: backendGame.tags.filter((t) => t.tipo === BackendTagType.Platform).map((t) => t.nome),
      accessibility: backendGame.tags.filter((t) => t.tipo === BackendTagType.Accessibility).map((t) => t.nome),
    },
    classification: mapBackendClassificationToFrontend(backendGame.classificacaoEtaria),
    studio: backendGame.nomeDesenvolvedor,
    publisher: backendGame.nomeDesenvolvedor,
    supportedLanguages: backendGame.traducoes.map((t) => mapTranslationToGameLanguage(t)),
    icon: `${env.BASE_URL}${backendGame.urlIcone}`,
    banner: `${env.BASE_URL}${backendGame.urlBanner}`,
    gallery: backendGame.midias.map((m) => mapBackendMediaToFrontend(m)),
    description: backendGame.descricao,
    releaseDate: new Date(backendGame.dataLancamento),
    publishingDate: new Date(backendGame.dataPublicacao),
    rating: backendGame.percentualAprovacao,
    additionalInfo: backendGame.adicional,
    version: backendGame.versao,
    developerId: backendGame.idDesenvolvedor,
    socialMedia: backendGame.redesSociais.map((s) => ({
      platform: s.plataforma,
      url: s.url,
    })),
    statistics: {
      revenue: backendGame.estatistica.receitaPublicacao,
      downloads: backendGame.estatistica.quantidadeDownload,
      views: backendGame.estatistica.quantidadeVisualizacao,
    },
  };
};

export const mapBackendGameToListItem = (backendGame: BackendGame): GameListItem => {
  return {
    id: backendGame.id,
    name: backendGame.titulo,
    price: backendGame.preco,
    icon: `${env.BASE_URL}${backendGame.urlIcone}`,
    banner: `${env.BASE_URL}${backendGame.urlBanner}`,
    studio: backendGame.nomeDesenvolvedor,
    rating: backendGame.percentualAprovacao,
    developerId: backendGame.idDesenvolvedor,
    tags: {
      genders: backendGame.tags.filter((t) => t.tipo === BackendTagType.Genre).map((t) => t.nome),
      features: backendGame.tags.filter((t) => t.tipo === BackendTagType.Feature).map((t) => t.nome),
      platforms: backendGame.tags.filter((t) => t.tipo === BackendTagType.Platform).map((t) => t.nome),
      accessibility: backendGame.tags.filter((t) => t.tipo === BackendTagType.Accessibility).map((t) => t.nome),
    },
  };
};

const mapBackendClassificationToFrontend = (classification: number): GameClassification => {
  switch (classification) {
    case 0:
      return GameClassifications.C0;
    case 1:
      return GameClassifications.C10;
    case 2:
      return GameClassifications.C12;
    case 3:
      return GameClassifications.C14;
    case 4:
      return GameClassifications.C16;
    case 5:
      return GameClassifications.C18;
    default:
      return GameClassifications.UNDEFINED;
  }
};

const mapBackendMediaToFrontend = (media: BackendGame["midias"][0]): GameMedia => {
  const type: GameMediaType = media.tipo === BackendMediaType.Video ? "video" : "image";

  return {
    type,
    title: media.titulo,
    src: type == "video" ? media.url : `${env.BASE_URL}${media.url}`,
  };
};

const mapTranslationToGameLanguage = (translation: BackendGame["traducoes"][0]): GameLanguage => {
  return {
    name: translation.idioma,
    interface: translation.temInterface,
    audio: translation.temAudio,
    subtitles: translation.temLegenda,
  };
};

const mapBackendReviewToFrontend = (review: BackendReview): GameReview => {
  return {
    nickname: review.apelido,
    avatar: review.imagemPerfil ? `${env.API_BASE_URL}${review.imagemPerfil}` : null,
    recommended: review.aprovado,
    comment: review.comentario,
    date: new Date(review.data),
  };
};
