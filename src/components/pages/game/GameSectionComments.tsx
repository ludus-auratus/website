import { Button } from "@/components/ui/button";

import GameComment from "./GameComment";

export default function GameSectionComments() {
  return (
    <div className="flex flex-col gap-y-4">
      <GameComment />
      <GameComment />
      <GameComment />
      <Button variant="default" hoverAnimation="scale-down" className="font-ludus-pixelify-sans mx-auto w-fit">
        Ver Mais
      </Button>
    </div>
  );
}
