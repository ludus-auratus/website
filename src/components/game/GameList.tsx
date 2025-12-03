"use client";

import { GameCard } from "@/components/game/GameCard";
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Game } from "@/lib/game";

interface GameListProps {
  games: Game[];
}

export function GameList({ games }: GameListProps) {
  return (
    <>
      <div className="block sm:hidden">
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml">
            {games.map((game) => (
              <GameCard
                key={game.id}
                id={game.id}
                name={game.name}
                price={game.price}
                icon={game.icon}
                rating={game.rating}
                studio={game.studio}
              />
            ))}
          </CarouselContent>

          <div className="hidden sm:block">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>

      <div className="grid-auto-fill hidden justify-center gap-6 sm:grid">
        {games.map((game) => (
          <GameCard
            key={game.id}
            id={game.id}
            name={game.name}
            price={game.price}
            icon={game.icon}
            rating={game.rating}
            studio={game.studio}
          />
        ))}
      </div>
    </>
  );
}
