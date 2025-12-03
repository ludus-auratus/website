import { Flag, ThumbsDown, ThumbsUp } from "lucide-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { GameComment as GameCommentData } from "@/lib/game";
import { AvatarFallback } from "@radix-ui/react-avatar";

export default function GameComment({ comment }: { comment: GameCommentData }) {
  const formattedDate = formatPublishDate(comment.publishedAt);

  return (
    <div className="flex flex-col gap-y-2 text-white">
      <div className="relative">
        <div className="border-ludus-green-400 bg-ludus-moss-700 rounded-md border-1 px-2 py-1">
          <p className="font-ludus-pixelify-sans text-sm">{comment.content}</p>
        </div>
        <span className="bg-ludus-green-400 absolute bottom-0 -z-1 size-2 translate-x-full translate-y-1/2 rotate-45" />
      </div>
      <div className="flex justify-between gap-x-2">
        <Avatar className="border-ludus-lime-500 bg-card size-[48px] rounded-md border-1 shadow-md shadow-black/25">
          <AvatarImage src={comment.author.avatar} alt={`Imagem de perfil de ${comment.author.username}`} />
          <AvatarFallback className="font-ludus-pixelify-sans mx-auto my-auto h-fit w-fit">
            {comment.author.username.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="flex w-full flex-col">
          <div className="flex justify-between">
            <h5 className="font-ludus-pixelify-sans text-lg">{comment.author.username}</h5>
            <div className="flex items-center gap-x-1.5">
              <Button variant="default" size="icon-sm" hoverAnimation="scale-down">
                <ThumbsUp />
              </Button>
              <Button variant="secondary" size="icon-sm" hoverAnimation="scale-down">
                <ThumbsDown />
              </Button>
              <Button variant="destructive" size="icon-sm" hoverAnimation="scale-down">
                <Flag />
              </Button>
            </div>
          </div>
          <p className="text-muted-foreground text-xs">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
}

function formatPublishDate(date: Date) {
  return date.toLocaleString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
}
