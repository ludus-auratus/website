import { use } from "react";
import { useTranslations } from "next-intl";

import { getGameTopComments } from "@/actions";
import { Button } from "@/components/ui/button";

import GameComment from "./GameComment";

export default function GameSectionComments({ gameKey }: { gameKey: number }) {
  const t = useTranslations("Game.info");
  const comments = use(getGameTopComments(gameKey));

  return (
    <div className="flex flex-col gap-y-4 md:w-96">
      <h4 className="font-ludus-pixelify-sans mt-2 text-xl text-shadow-black/25 text-shadow-sm">{t("comments")}</h4>

      {comments.slice(0, 3).map((comment, index) => (
        <GameComment key={index} comment={comment} />
      ))}

      <Button variant="default" hoverAnimation="scale-down" className="font-ludus-pixelify-sans mx-auto w-fit">
        Ver Mais
      </Button>
    </div>
  );
}
