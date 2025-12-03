import Link from "next/link";
import {
  Calendar,
  DollarSign,
  Download,
  Edit,
  ExternalLink,
  Eye,
  Filter,
  MoreVertical,
  Plus,
  Search,
  Star,
  Trash2,
  Upload,
} from "lucide-react";

import { DevComponents } from "@/components/pages/dev";
import DevQuickGameCard from "@/components/pages/dev/dashboard/DevQuickGameCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PublishedGameStatus, QuickGameDashboard } from "@/lib/dev/dashboard";

const games: QuickGameDashboard[] = [
  {
    id: 1,
    title: "Folclore: A Lenda do Curupira",
    cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=200&fit=crop",
    status: "published",
    version: "1.2.5",
    revenue: 8250,
    downloads: 2150,
    views: 15420,
    rating: 4.8,
    reviews: 342,
    publishedDate: new Date("15/08/2024"),
    lastUpdate: new Date("15/12/2024"),
    platforms: ["Windows", "Mac", "Linux"],
  },
  {
    id: 2,
    title: "Cangaço Legends",
    cover: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=200&fit=crop",
    status: "published",
    version: "1.0.8",
    revenue: 4200,
    downloads: 1692,
    views: 9111,
    rating: 4.6,
    reviews: 187,
    publishedDate: new Date("20/09/2024"),
    lastUpdate: new Date("10/12/2024"),
    platforms: ["Windows", "Web"],
  },
  {
    id: 3,
    title: "Amazônia: O Chamado",
    cover: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=200&fit=crop",
    status: "revision",
    version: "1.0.0",
    revenue: 0,
    downloads: 0,
    views: 0,
    rating: 0,
    reviews: 0,
    publishedDate: null,
    lastUpdate: new Date("20/12/2024"),
    platforms: ["Windows", "Mac"],
  },
  {
    id: 4,
    title: "Sertão Runner",
    cover: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=200&fit=crop",
    status: "draft",
    version: "0.5.0",
    revenue: 0,
    downloads: 0,
    views: 0,
    rating: 0,
    reviews: 0,
    publishedDate: null,
    lastUpdate: new Date("18/12/2024"),
    platforms: ["Web"],
  },
];

const updates = [
  {
    game: "Folclore: A Lenda do Curupira",
    version: "1.2.5",
    date: "15/12/2024",
    changes: "Correção de bugs, otimização de performance",
  },
  {
    game: "Cangaço Legends",
    version: "1.0.8",
    date: "10/12/2024",
    changes: "Novos níveis, melhorias visuais",
  },
];
export default function DevPublicationsPage() {
  return (
    <div className="space-y-8">
      {/* Filters & Search */}
      <Card className="border-border border-2 p-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input placeholder="Buscar jogos..." className="pl-10" />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
        </div>
      </Card>

      <ButtonGroup>
        <Button variant={"outline"}>Publicados</Button>
        <Button variant={"outline"}>Em Revisão</Button>
        <Button variant={"outline"}>Rascunhos</Button>
      </ButtonGroup>

      <div className="space-y-4">
        {games.map((game) => (
          <DevQuickGameCard key={game.id} game={game} advanced />
        ))}
      </div>

      {/* Recent Updates */}
      <Card className="border-border border-2 p-6">
        <h3 className="text-foreground font-ludus-pixelify-sans mb-4 text-xl">Atualizações Recentes</h3>
        <div className="space-y-4">
          {updates.map((update, index) => (
            <div key={index} className="border-border flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
              <div className="bg-accent/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg">
                <Upload className="text-accent h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="mb-1 flex items-start justify-between gap-4">
                  <p className="text-foreground font-medium">{update.game}</p>
                  <Badge variant="outline">{update.version}</Badge>
                </div>
                <p className="text-muted-foreground mb-1 text-sm">{update.changes}</p>
                <p className="text-muted-foreground text-xs">{update.date}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
