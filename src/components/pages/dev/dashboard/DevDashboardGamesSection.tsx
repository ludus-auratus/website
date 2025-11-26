import { Button } from "@/components/ui/button";
import { QuickGameDashboard } from "@/lib/dev/dashboard";

import DevQuickGameCard from "./DevQuickGameCard";

export default function DevDashboardGamesSection({ games }: { games: QuickGameDashboard[] }) {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-foreground font-ludus-pixelify-sans text-xl">Seus Jogos Publicados</h2>
          <p className="text-muted-foreground text-sm">{games.length} jogos no total</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Filtrar
          </Button>
          <Button variant="outline" size="sm">
            Ordenar
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {games.map((game) => (
          <DevQuickGameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
