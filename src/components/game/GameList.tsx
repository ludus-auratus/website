"use client";

import { GameCard } from "@/components/game/GameCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Game } from "@/lib/game";

interface GameListProps {
  games: Game[];
}

export function GameList({ games }: GameListProps) {
  return (
    <>
      <div className="block md:hidden">
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {games.map((game) => (
              <CarouselItem key={game.id} className="basis-[85%] pl-4 sm:basis-[60%]">
                <GameCard
                  id={game.id}
                  name={game.name}
                  icon={game.icon}
                  price={game.price}
                  rating={game.rating}
                  studio={game.studio}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="hidden sm:block">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>

      <div className="grid-auto-fill hidden justify-center gap-6 md:grid">
        {games.map((game) => (
          <GameCard
            key={game.id}
            id={game.id}
            name={game.name}
            icon={game.icon}
            price={game.price}
            rating={game.rating}
            studio={game.studio}
          />
        ))}
      </div>
    </>
  );
}
