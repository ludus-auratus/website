import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { VariantProps } from "class-variance-authority";
import {
  BarChart3,
  DollarSign,
  Download,
  Edit,
  ExternalLink,
  Eye,
  LucideIcon,
  MoreVertical,
  Star,
  Trash2,
  TrendingUp,
  Upload,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { PublishedGameStatus, QuickGameDashboard } from "@/lib/dev/dashboard";
import { cn } from "@/lib/utils/shadcn";

const gameStatusMap: Record<PublishedGameStatus, string> = {
  published: "Published",
  unpublished: "Unpublished",
  draft: "Draft",
  revision: "Revision",
};

export default async function DevQuickGameCard({
  game,
  advanced = false,
}: {
  game: QuickGameDashboard;
  advanced?: boolean;
}) {
  const t = await getTranslations({ locale: "pt-BR", namespace: "DevDashboard" });

  return (
    <Card
      key={game.id}
      className="group bg-border/50 hover:border-primary border-border/60 border-b-border/30 border-t-border border-2 p-4 transition-all duration-300"
    >
      <div className="flex flex-col items-start gap-5 md:flex-row">
        <div className="relative mx-auto md:mx-0">
          <div className="bg-muted border-border aspect-square w-32 overflow-hidden rounded-md border-2">
            <Image src={game.cover} alt={game.title} className="h-full w-full object-cover" width={256} height={256} />
          </div>
          <Badge
            className={cn(
              "absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
              game.status === "published"
                ? "bg-highlight text-highlight-foreground"
                : game.status === "revision"
                  ? "bg-accent text-accent-foreground"
                  : "bg-primary text-background",
            )}
          >
            {t(`game_status.${game.status}`)}
          </Badge>
        </div>

        <div className="w-full space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex flex-col items-center gap-2 md:flex-row">
                <h3 className="text-foreground font-ludus-pixelify-sans text-xl">{game.title}</h3>
                <div className="mr-auto mb-2 flex gap-2 md:mb-0">
                  {advanced &&
                    game.platforms.map((platform) => (
                      <Badge key={platform} variant={"outline"} className="border-highlight text-highlight">
                        {platform}
                      </Badge>
                    ))}
                </div>
              </div>
              <p className="text-muted-foreground text-sm">
                {advanced && (
                  <span>
                    Versão {game.version}
                    <span> • </span>
                  </span>
                )}
                <span>Última atualização: </span>
                <span>
                  {game.lastUpdate.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })}
                </span>
                {advanced && game.status === "published" && game.publishedDate && (
                  <>
                    <span> • </span>
                    <span>
                      <span>Publicado em: </span>
                      <span>
                        {game.publishedDate.toLocaleString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                    </span>
                  </>
                )}
              </p>
            </div>

            {!advanced && <OptionsMenu />}
          </div>

          {!advanced || game.status === "published" ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <StatisticMiniCard
                icon={DollarSign}
                label="Receita"
                value={`R$ ${game.revenue.toLocaleString("pt-BR")}`}
              />
              <StatisticMiniCard icon={Download} label="Downloads" value={game.downloads.toLocaleString("pt-BR")} />
              <StatisticMiniCard icon={Eye} label="Visualizações" value={game.revenue.toLocaleString("pt-BR")} />
              <StatisticMiniCard icon={Star} label="Avaliação" value={game.rating.toFixed(1)} />
            </div>
          ) : game.status === "revision" ? (
            <div className="flex gap-3 rounded-xl border-2 border-yellow-500/20 bg-yellow-500/10 p-2.5">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-yellow-500/20">
                <Upload className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="flex-1">
                <div className="items-baseline gap-2">
                  <p className="text-foreground text-sm font-medium text-nowrap">
                    Jogo em processo de revisão
                    <span className="text-muted-foreground top-0 mt-2 text-xs text-nowrap"> (Progresso: 65%)</span>
                  </p>
                </div>
                <p className="text-muted-foreground mb-1 text-xs">
                  Nossa equipe está analisando seu jogo. Você receberá uma resposta em até 48 horas.
                </p>
                <Progress value={65} className="h-1" />
              </div>
            </div>
          ) : game.status === "draft" ? (
            <div className="border-border/50 bg-background/50 flex gap-3 rounded-xl border-2 p-2.5">
              <div className="bg-border/50 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg">
                <Edit className="text-muted-foreground h-6 w-6" />
              </div>
              <div className="flex flex-1 flex-col justify-center">
                <p className="text-foreground text-sm font-medium text-nowrap">Rascunho não publicado</p>
                <p className="text-muted-foreground mb-1 text-xs">
                  Complete as informações e envie para revisão quando estiver pronto.
                </p>
              </div>
            </div>
          ) : null}

          <div className="flex gap-2 pt-2">
            {!advanced ? (
              <>
                <ActionButton icon={TrendingUp} text="Detalhes" />
                {game.status === "published" && <ActionButton icon={Edit} text="Editar" />}
              </>
            ) : game.status === "published" ? (
              <>
                <ActionButton icon={Upload} text="Atualizar" />
                <ActionButton icon={Edit} text="Editar" />
                <ActionButton icon={ExternalLink} text="Ver na Loja" href={`/game/${game.id}`} />
                <ActionButton icon={BarChart3} text="Análises" disabled />
              </>
            ) : game.status === "revision" ? (
              <>
                <ActionButton icon={Edit} text="Editar" />
              </>
            ) : (
              <>
                <ActionButton icon={Upload} text="Solicitar Revisão" variants="accent" />
                <ActionButton icon={Edit} text="Editar" />
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

function ActionButton({
  icon,
  text,
  href,
  disabled = false,
  variants = "outline",
}: {
  icon: LucideIcon;
  text: string;
  href?: string;
  disabled?: boolean;
  variants?: "outline" | "ghost" | "link" | "default" | "destructive" | "secondary" | "accent";
}) {
  const Icon = icon;
  return (
    <Button size="sm" variant={variants} className="flex-grow md:flex-none" asChild={!!href} disabled={disabled}>
      {href ? (
        <Link href="#">
          <Icon className="h-4 w-4" />
          <span>{text}</span>
        </Link>
      ) : (
        <>
          <Icon className="h-4 w-4" />
          <span>{text}</span>
        </>
      )}
    </Button>
  );
}

function OptionsMenu() {
  return (
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
        <DropdownMenuItem disabled>
          <BarChart3 className="mr-2 h-4 w-4" />
          Análises
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function StatisticMiniCard({ icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  const Icon = icon;
  return (
    <div className="bg-background/50 border-border/50 rounded-lg border-2 p-3">
      <div className="mb-1 flex items-center gap-2">
        <Icon className="text-accent h-4 w-4" />
        <span className="text-muted-foreground text-xs">{label}</span>
      </div>
      <p className="text-foreground font-medium">{value}</p>
    </div>
  );
}
