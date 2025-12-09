"use client";

import { GameInfoAccordion } from "./GameInfoAccordion";
import GameTagUnit from "./GameTagUnit";

type Props = {
  title: string;
  content: string[];
  opened?: boolean;
};

export default function GameTagContainer(props: Props) {
  const { title, content, opened } = props;

  return (
    <GameInfoAccordion title={title} disabled={content.length === 0} opened={opened ?? false} id={title}>
      <div className="flex flex-wrap gap-2 py-1">
        {content.map((tag, index) => {
          return <GameTagUnit key={index} text={tag} />;
        })}
      </div>
    </GameInfoAccordion>
  );
}
