import { Button } from "@/components/ui/button";
import { GameComment as GameCommentData } from "@/lib/game";

import GameComment from "./GameComment";

export default function GameSectionComments() {
  const comment: GameCommentData = {
    author: {
      username: "username",
      avatar: "/images/ludus/logo-marginless.png",
      // createPlaceholderImageUrl(48, 48, "Avatar"),
    },
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.",
    feedback: "positive",
    publishedAt: new Date(),
  };

  return (
    <div className="flex flex-col gap-y-4">
      <GameComment comment={comment} />
      <GameComment comment={comment} />
      <GameComment comment={comment} />
      <Button variant="default" hoverAnimation="scale-down" className="font-ludus-pixelify-sans mx-auto w-fit">
        Ver Mais
      </Button>
    </div>
  );
}
