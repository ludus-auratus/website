"use client";

import { GameCard } from "@/components/game/GameCard";
import { GameCardLibrary } from "@/components/game/GameCardLibrary";
import { GameCardLibrarySkeleton } from "@/components/game/GameCardLibrarySkeleton";
import { GameCardSkeleton } from "@/components/game/GameCardSkeleton";
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { FavoriteGame, LibraryGame } from "@/context/AuthContext";
import { GameListItem } from "@/lib/game";

interface GameListProps {
  games: (GameListItem | LibraryGame | FavoriteGame)[];
  variant?: "store" | "library" | "wishlist";
  isLoading?: boolean;
}

export function GameList({ games, variant = "store", isLoading = false }: GameListProps) {
  if (isLoading) {
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
            <CarouselContent className={`-ml-0 ${variant === "store" ? "gap-4" : "gap-2"}`}>
              {Array.from({ length: 4 }).map((_, index) =>
                variant === "library" ? <GameCardLibrarySkeleton key={index} /> : <GameCardSkeleton key={index} />,
              )}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="grid-auto-fill hidden justify-center gap-6 sm:grid">
          {Array.from({ length: 8 }).map((_, index) =>
            variant === "library" ? <GameCardLibrarySkeleton key={index} /> : <GameCardSkeleton key={index} />,
          )}
        </div>
      </>
    );
  }

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
          <CarouselContent className={`-ml-0 ${variant === "store" ? "gap-4" : "gap-2"}`}>
            {games.map((game) =>
              variant === "library" ? (
                <GameCardLibrary key={game.id} id={game.id} name={game.name} icon={game.icon} />
              ) : (
                <GameCard
                  key={game.id}
                  id={game.id}
                  name={game.name}
                  price={(game as GameListItem).price}
                  icon={game.icon}
                  rating={game.rating}
                  studio={(game as GameListItem).studio}
                />
              ),
            )}
          </CarouselContent>

          <div className="hidden sm:block">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>

      <div className="grid-auto-fill hidden justify-center gap-6 sm:grid">
        {games.map((game) =>
          variant === "library" ? (
            <GameCardLibrary key={game.id} id={game.id} name={game.name} icon={game.icon} />
          ) : (
            <GameCard
              key={game.id}
              id={game.id}
              name={game.name}
              price={(game as GameListItem).price}
              icon={game.icon}
              rating={game.rating}
              studio={(game as GameListItem).studio}
            />
          ),
        )}
      </div>
    </>
  );
}
