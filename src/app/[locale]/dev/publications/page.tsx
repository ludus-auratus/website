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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

export default function DevPublicationsPage() {
  const games = [
    {
      id: 1,
      title: "Folclore: A Lenda do Curupira",
      cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=200&fit=crop",
      status: "published",
      statusLabel: "Publicado",
      version: "1.2.5",
      revenue: 8250,
      downloads: 2150,
      views: 15420,
      rating: 4.8,
      reviews: 342,
      publishedDate: "15/08/2024",
      lastUpdate: "15/12/2024",
      platform: ["Windows", "Mac", "Linux"],
    },
    {
      id: 2,
      title: "Cangaço Legends",
      cover: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=200&fit=crop",
      status: "published",
      statusLabel: "Publicado",
      version: "1.0.8",
      revenue: 4200,
      downloads: 1692,
      views: 9111,
      rating: 4.6,
      reviews: 187,
      publishedDate: "20/09/2024",
      lastUpdate: "10/12/2024",
      platform: ["Windows", "Web"],
    },
    {
      id: 3,
      title: "Amazônia: O Chamado",
      cover: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=200&fit=crop",
      status: "review",
      statusLabel: "Em Revisão",
      version: "1.0.0",
      revenue: 0,
      downloads: 0,
      views: 0,
      rating: 0,
      reviews: 0,
      publishedDate: null,
      lastUpdate: "20/12/2024",
      platform: ["Windows", "Mac"],
    },
    {
      id: 4,
      title: "Sertão Runner",
      cover: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=200&fit=crop",
      status: "draft",
      statusLabel: "Rascunho",
      version: "0.5.0",
      revenue: 0,
      downloads: 0,
      views: 0,
      rating: 0,
      reviews: 0,
      publishedDate: null,
      lastUpdate: "18/12/2024",
      platform: ["Web"],
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "review":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "draft":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <DevComponents.Wrapper section={{ id: "publications" }} childClassName="p-20">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-foreground mb-2 font-['Pixelify_Sans'] text-3xl">Publicações</h1>
            <p className="text-muted-foreground">Gerencie todos os seus jogos publicados</p>
          </div>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2" asChild>
            <Link href="/dev/publish">
              <Plus className="h-4 w-4" />
              Publicar Novo Jogo
            </Link>
          </Button>
        </div>

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

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">Todos ({games.length})</TabsTrigger>
            <TabsTrigger value="published">
              Publicados ({games.filter((g) => g.status === "published").length})
            </TabsTrigger>
            <TabsTrigger value="review">Em Revisão ({games.filter((g) => g.status === "review").length})</TabsTrigger>
            <TabsTrigger value="draft">Rascunhos ({games.filter((g) => g.status === "draft").length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {games.map((game) => (
              <Card
                key={game.id}
                className="border-border hover:border-accent border-2 p-6 transition-all duration-300"
              >
                <div className="flex flex-col gap-6 lg:flex-row">
                  {/* Game Cover */}
                  <div className="bg-muted h-36 w-full flex-shrink-0 overflow-hidden rounded-xl lg:w-64">
                    <img src={game.cover} alt={game.title} className="h-full w-full object-cover" />
                  </div>

                  {/* Game Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
                      <div className="flex-1">
                        <div className="mb-2 flex items-start gap-3">
                          <h3 className="text-foreground font-['Pixelify_Sans'] text-xl">{game.title}</h3>
                          <Badge variant="secondary" className={getStatusColor(game.status)}>
                            {game.statusLabel}
                          </Badge>
                        </div>
                        <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-sm">
                          <span>Versão {game.version}</span>
                          <span>•</span>
                          <span>Atualizado em {game.lastUpdate}</span>
                          {game.publishedDate && (
                            <>
                              <span>•</span>
                              <span>Publicado em {game.publishedDate}</span>
                            </>
                          )}
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {game.platform.map((platform) => (
                            <Badge key={platform} variant="outline" className="text-xs">
                              {platform}
                            </Badge>
                          ))}
                        </div>
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
                            Editar Jogo
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Upload className="mr-2 h-4 w-4" />
                            Atualizar Versão
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Ver na Loja
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            Histórico de Versões
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remover Publicação
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Stats */}
                    {game.status === "published" ? (
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <div className="bg-muted/50 rounded-lg p-3">
                          <div className="mb-1 flex items-center gap-2">
                            <DollarSign className="text-accent h-4 w-4" />
                            <span className="text-muted-foreground text-xs">Receita</span>
                          </div>
                          <p className="text-foreground font-medium">R$ {game.revenue.toLocaleString("pt-BR")}</p>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-3">
                          <div className="mb-1 flex items-center gap-2">
                            <Download className="text-accent h-4 w-4" />
                            <span className="text-muted-foreground text-xs">Downloads</span>
                          </div>
                          <p className="text-foreground font-medium">{game.downloads.toLocaleString("pt-BR")}</p>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-3">
                          <div className="mb-1 flex items-center gap-2">
                            <Eye className="text-accent h-4 w-4" />
                            <span className="text-muted-foreground text-xs">Visualizações</span>
                          </div>
                          <p className="text-foreground font-medium">{game.views.toLocaleString("pt-BR")}</p>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-3">
                          <div className="mb-1 flex items-center gap-2">
                            <Star className="text-accent h-4 w-4" />
                            <span className="text-muted-foreground text-xs">Avaliação</span>
                          </div>
                          <p className="text-foreground font-medium">
                            {game.rating} ({game.reviews})
                          </p>
                        </div>
                      </div>
                    ) : game.status === "review" ? (
                      <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-yellow-500/20">
                            <Upload className="h-4 w-4 text-yellow-500" />
                          </div>
                          <div className="flex-1">
                            <p className="text-foreground mb-1 text-sm font-medium">Jogo em processo de revisão</p>
                            <p className="text-muted-foreground mb-3 text-xs">
                              Nossa equipe está analisando seu jogo. Você receberá uma resposta em até 48 horas.
                            </p>
                            <Progress value={65} className="h-2" />
                            <p className="text-muted-foreground mt-2 text-xs">Progresso: 65%</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-muted/50 border-border rounded-xl border p-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-muted flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg">
                            <Edit className="text-muted-foreground h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <p className="text-foreground mb-1 text-sm font-medium">Rascunho não publicado</p>
                            <p className="text-muted-foreground text-xs">
                              Complete as informações e envie para revisão quando estiver pronto.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {game.status === "published" && (
                        <>
                          <Button size="sm" variant="outline" className="gap-2">
                            <Upload className="h-4 w-4" />
                            Atualizar
                          </Button>
                          <Button size="sm" variant="outline" className="gap-2">
                            <ExternalLink className="h-4 w-4" />
                            Ver na Loja
                          </Button>
                        </>
                      )}
                      {game.status === "draft" && (
                        <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
                          <Upload className="h-4 w-4" />
                          Enviar para Revisão
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="gap-2">
                        <Edit className="h-4 w-4" />
                        Editar
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Similar content for other tabs with filtered games */}
          <TabsContent value="published" className="space-y-4">
            {games
              .filter((g) => g.status === "published")
              .map((game) => (
                <div key={game.id} className="text-muted-foreground">
                  {/* Same card structure as above */}
                  <p>Conteúdo filtrado para jogos publicados...</p>
                </div>
              ))}
          </TabsContent>

          <TabsContent value="review" className="space-y-4">
            {games.filter((g) => g.status === "review").length > 0 ? (
              games
                .filter((g) => g.status === "review")
                .map((game) => (
                  <div key={game.id} className="text-muted-foreground">
                    {/* Same card structure as above */}
                    <p>Conteúdo filtrado para jogos em revisão...</p>
                  </div>
                ))
            ) : (
              <Card className="border-border border-2 border-dashed p-12 text-center">
                <p className="text-muted-foreground">Nenhum jogo em revisão no momento</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="draft" className="space-y-4">
            {games.filter((g) => g.status === "draft").length > 0 ? (
              games
                .filter((g) => g.status === "draft")
                .map((game) => (
                  <div key={game.id} className="text-muted-foreground">
                    {/* Same card structure as above */}
                    <p>Conteúdo filtrado para rascunhos...</p>
                  </div>
                ))
            ) : (
              <Card className="border-border border-2 border-dashed p-12 text-center">
                <p className="text-muted-foreground">Nenhum rascunho salvo</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Recent Updates */}
        <Card className="border-border border-2 p-6">
          <h3 className="text-foreground mb-4 font-['Pixelify_Sans'] text-xl">Atualizações Recentes</h3>
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
    </DevComponents.Wrapper>
  );
}
