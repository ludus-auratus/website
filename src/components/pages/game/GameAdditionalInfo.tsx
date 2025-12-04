import { Game } from "@/lib/game";

import { GameInfoAccordion } from "./GameInfoAccordion";
import GameSimpleInfo from "./GameSimpleInfo";

export function GameAdditionalInfo({ game }: { game: Game }) {
  return (
    <GameInfoAccordion title="additional_info">
      {game.additional.map((info, index) => {
        return (
          <div key={index} className="w-full">
            <GameSimpleInfo title={`additional.${info.title}`} data={info.value} />
          </div>
        );
      })}
    </GameInfoAccordion>
  );
}
