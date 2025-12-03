import { use } from "react";

import { getGameTopComments } from "@/actions";
import { Button } from "@/components/ui/button";

import GameComment from "./GameComment";

export default function GameSectionComments({ gameKey }: { gameKey: number }) {
  const comments = use(getGameTopComments(gameKey));

  return (
    <div className="flex flex-col gap-y-4 md:w-96">
      {comments.slice(0, 3).map((comment, index) => (
        <GameComment key={index} comment={comment} />
      ))}
      <Button variant="default" hoverAnimation="scale-down" className="font-ludus-pixelify-sans mx-auto w-fit">
        Ver Mais
      </Button>
    </div>
  );
}
