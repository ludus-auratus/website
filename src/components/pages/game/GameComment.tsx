import Image from "next/image";
import { Flag, ThumbsDown, ThumbsUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createPlaceholderImageUrl } from "@/lib/utils/image.utils";

export default function GameComment() {
  const data: {
    author: {
      username: string;
      avatar: string;
    };
    content: string;
    feedback: "positive" | "negative";
    publishedAt: Date;
  } = {
    author: {
      username: "username",
      avatar: createPlaceholderImageUrl(48, 48, "Avatar"),
    },
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.",
    feedback: "positive",
    publishedAt: new Date(),
  };

  const formattedDate = formatPublishDate(data.publishedAt);

  return (
    <div className="flex flex-col gap-y-2 text-white">
      <div className="relative">
        <div className="border-ludus-green-400 bg-ludus-moss-700 rounded-md border-1 px-2 py-1">
          <p className="font-ludus-pixelify-sans text-sm">{data.content}</p>
        </div>
        <span className="bg-ludus-green-400 absolute bottom-0 -z-1 size-2 translate-x-full translate-y-1/2 rotate-45" />
      </div>
      <div className="flex justify-between gap-x-2">
        <Image
          src={data.author.avatar}
          width={48}
          height={48}
          alt=""
          className="border-ludus-lime-500 size-[48px] rounded-md border-1 shadow-md shadow-black/25"
        />
        <div className="flex w-full flex-col">
          <div className="flex justify-between">
            <h5 className="font-ludus-pixelify-sans text-lg">{data.author.username}</h5>
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
          <p className="font-ludus-pixelify-sans text-xs">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
}

function formatPublishDate(date: Date) {
  return date.toLocaleString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
}
