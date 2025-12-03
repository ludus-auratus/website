import { Game } from "@/lib/game";

import { GameInfoAccordion } from "./GameInfoAccordion";

export function GameAdditionalInfo({ game }: { game: Game }) {
  return <GameInfoAccordion title="additional_info">no info, não grave, pfv</GameInfoAccordion>;
}
