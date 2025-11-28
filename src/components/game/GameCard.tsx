import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import { formatPrice } from "@/lib/game/game.utils";

interface GameCardProps {
  id: number;
  name: string;
  price: number;
  icon: string;
  rating: number;
}

export function GameCard({ name, price, icon, id, rating }: GameCardProps) {
  return (
    <article className="bg-card text-card-foreground border-border hover:border-primary/60 relative flex h-fit flex-col rounded-2xl border shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link
        aria-label={`Ver detalhes do jogo ${name}`}
        href={`/game/${id}`}
        className="focus-visible:ring-highlight flex h-full flex-col rounded-2xl transition-all duration-300 outline-none focus-visible:-translate-y-1 focus-visible:ring-2"
      >
        <div className="bg-background/90 absolute top-3 right-3 z-10 flex items-center space-x-1 rounded-full px-3 py-1 backdrop-blur-sm">
          {rating > 0 ? (
            <>
              <Star className="text-accent h-4 w-4 fill-current" />
              <span>{rating}</span>
            </>
          ) : (
            <Star className="text-muted-foreground h-5 w-5 fill-current" />
          )}
        </div>

        <figure className="relative h-60 w-full flex-shrink-0 overflow-hidden rounded-t-2xl">
          <Image src={icon} alt={`Capa do jogo ${name}`} fill className="h-full w-full object-cover" />
        </figure>

        <div className="flex flex-grow flex-col gap-1 p-4">
          <h3 className="text-ludus-yellow-400 font-ludus-pixelify-sans line-clamp-2 min-h-[56] text-lg font-semibold break-words">
            {name}
          </h3>
          <p className="mt-auto font-semibold">{formatPrice(price)}</p>
        </div>
      </Link>
    </article>
  );
}
