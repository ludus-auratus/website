import { GameInfoAccordion } from "./GameInfoAccordion";

export function GameAdditionalInfo({ content }: { content: string | null }) {
  return (
    <GameInfoAccordion disabled={content === null} id="additional_info" title="additional_info">
      {content}
    </GameInfoAccordion>
  );
}
