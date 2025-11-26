import {
  BarChart3,
  Edit,
  ExternalLink,
  ListOrdered,
  ListOrderedIcon,
  MoreVertical,
  Trash2,
  TrendingUp,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { QuickGameDashboard } from "@/lib/dev/dashboard";

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
          <Card key={game.id} className="border-border hover:border-accent border-2 p-6 transition-all duration-300">
            <div className="flex flex-col gap-6 md:flex-row">
              {/* Game Cover */}
              <div className="bg-muted h-32 w-full flex-shrink-0 overflow-hidden rounded-xl md:w-48">
                <img src={game.cover} alt={game.title} className="h-full w-full object-cover" />
              </div>

              {/* Game Info */}
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-2 flex items-center gap-3">
                      <h3 className="text-foreground font-ludus-pixelify-sans text-lg">{game.title}</h3>
                      <Badge
                        variant={game.status === "published" ? "default" : "secondary"}
                        className={
                          game.status === "published"
                            ? "border-green-500/20 bg-green-500/10 text-green-500"
                            : "border-yellow-500/20 bg-yellow-500/10 text-yellow-500"
                        }
                      >
                        {game.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Última atualização: {game.lastUpdate.toDateString()}
                    </p>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Ver na Loja
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Analytics
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remover
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div>
                    <p className="text-muted-foreground mb-1 text-xs">Receita</p>
                    <p className="text-foreground font-medium">{game.revenue}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1 text-xs">Downloads</p>
                    <p className="text-foreground font-medium">{game.downloads.toLocaleString("pt-BR")}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1 text-xs">Visualizações</p>
                    <p className="text-foreground font-medium">{game.views.toLocaleString("pt-BR")}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1 text-xs">Avaliação</p>
                    <p className="text-foreground font-medium">{game.rating > 0 ? `⭐ ${game.rating}` : "N/A"}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Ver Detalhes
                  </Button>
                  {game.status === "published" && (
                    <Button size="sm" variant="outline">
                      <Edit className="mr-2 h-4 w-4" />
                      Atualizar Jogo
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
