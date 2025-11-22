import { GameCard } from "@/components/game/GameCard";
import { CatalogSidebar } from "@/components/pages/catalog/CatalogSidebar";

interface Game {
  id: number;
  name: string;
  icon: string;
  price: number;
}

interface CatalogGridProps {
  games: Game[];
  showFilters: boolean;
}

export function CatalogGrid({ games, showFilters }: CatalogGridProps) {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
      {showFilters && <CatalogSidebar />}

      <div
        className={`flex flex-wrap justify-center gap-6 space-y-6 ${showFilters ? "lg:col-span-3" : "lg:col-span-4"}`}
      >
        {games.map((game) => (
          <GameCard key={game.id} id={game.id} name={game.name} icon={game.icon} price={game.price} />
        ))}
      </div>
    </div>
  );
}
