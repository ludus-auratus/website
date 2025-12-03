import { GameActions } from "./GameActions";
import GameHeader from "./GameHeader";
import GameSectionComments from "./GameSectionComments";
import GameSectionDescription from "./GameSectionDescription";
import GameSectionGallery from "./GameSectionGallery";
import GameSectionInfo from "./GameSectionInfo";
import { GameSectionSocial } from "./GameSectionSocial";

export const Game = {
  Actions: GameActions,
  Header: GameHeader,
  Gallery: GameSectionGallery,
  Description: GameSectionDescription,
  //   News: GameSectionNews,
  //   Suggestions: GameSectionSuggestion,
  Info: GameSectionInfo,
  Comments: GameSectionComments,
  Social: GameSectionSocial,
};
