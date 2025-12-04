import { Flag, Star, ThumbsDown, ThumbsUp } from "lucide-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { GameComment as GameCommentData } from "@/lib/game/comment";
import { AvatarFallback } from "@radix-ui/react-avatar";

export default function GameComment({ comment }: { comment: GameCommentData }) {
  const formattedDate = formatPublishDate(comment.publishedAt);

  return (
    <div className="group flex flex-col gap-y-2 text-white">
      {comment.content.length > 0 && (
        <div className="relative">
          <div className="border-ludus-green-400 bg-ludus-moss-700 rounded-md border-1 px-2 py-1">
            <p className="font-ludus-pixelify-sans text-sm">{comment.content}</p>
          </div>
          <span className="bg-ludus-green-400 absolute bottom-0 -z-1 size-2 translate-x-full translate-y-1/2 rotate-45" />
        </div>
      )}

      <div className="flex justify-between gap-x-2">
        <Avatar className="border-ludus-lime-500 bg-card size-[48px] rounded-md border-1 shadow-md shadow-black/25">
          <AvatarImage
            src={comment.author.avatar}
            alt={`Imagem de perfil de ${comment.author.username}`}
            className="object-cover object-center"
          />
          <AvatarFallback className="font-ludus-pixelify-sans mx-auto my-auto h-fit w-fit">
            {comment.author.username.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="flex w-full">
          <div className="grow justify-between">
            <h5 className="font-ludus-pixelify-sans h-8 text-lg">{comment.author.username}</h5>
            <p className="text-muted-foreground text-xs">{formattedDate}</p>
          </div>
          <div className="relative z-0 w-28">
            <div className="pointer-events-auto absolute z-1 flex items-center gap-x-1.5 opacity-100 transition-all group-hover:pointer-events-auto group-hover:opacity-100 md:pointer-events-none md:opacity-0">
              <Button variant="default" disabled hoverAnimation="scale-down" className="h-8 w-8">
                <ThumbsUp />
              </Button>
              <Button variant="secondary" disabled size="icon-sm" hoverAnimation="scale-down">
                <ThumbsDown />
              </Button>
              <Button variant="destructive" disabled size="icon-sm" hoverAnimation="scale-down">
                <Flag />
              </Button>
            </div>
            <div className="flex justify-end gap-1 opacity-0 transition-all group-hover:pointer-events-none group-hover:opacity-0 md:opacity-100">
              <Star className="fill-current" />
              {comment.rating}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatPublishDate(date: Date) {
  return date.toLocaleString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
}
