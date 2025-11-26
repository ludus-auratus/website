import { BarChart3, MessageSquare, Plus } from "lucide-react";

import { Card } from "@/components/ui/card";

export default function DevDashboardActivitySection() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="border-border border-2 p-6">
        <h3 className="text-foreground font-ludus-pixelify-sans mb-4 text-lg">Atividade Recente</h3>
        <div className="space-y-4">
          <div className="border-border flex items-start gap-3 border-b pb-4">
            <div className="bg-accent mt-2 h-2 w-2 rounded-full"></div>
            <div className="flex-1">
              <p className="text-foreground text-sm">
                Nova venda de <strong>Folclore: A Lenda do Curupira</strong>
              </p>
              <p className="text-muted-foreground text-xs">Há 2 horas</p>
            </div>
          </div>
          <div className="border-border flex items-start gap-3 border-b pb-4">
            <div className="bg-primary mt-2 h-2 w-2 rounded-full"></div>
            <div className="flex-1">
              <p className="text-foreground text-sm">
                <strong>Cangaço Legends</strong> recebeu uma nova avaliação ⭐⭐⭐⭐⭐
              </p>
              <p className="text-muted-foreground text-xs">Há 5 horas</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-2 h-2 w-2 rounded-full bg-yellow-500"></div>
            <div className="flex-1">
              <p className="text-foreground text-sm">
                <strong>Amazônia: O Chamado</strong> está em processo de revisão
              </p>
              <p className="text-muted-foreground text-xs">Há 1 dia</p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="border-border border-2 p-6">
        <h3 className="text-foreground font-ludus-pixelify-sans mb-4 text-lg">Próximos Passos</h3>
        <div className="space-y-3">
          <div className="bg-accent/10 border-accent/20 flex items-center gap-3 rounded-xl border p-3">
            <div className="bg-accent/20 flex h-8 w-8 items-center justify-center rounded-lg">
              <Plus className="text-accent h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-foreground text-sm font-medium">Publique mais jogos</p>
              <p className="text-muted-foreground text-xs">Expanda seu portfólio</p>
            </div>
          </div>
          <div className="bg-primary/10 border-primary/20 flex items-center gap-3 rounded-xl border p-3">
            <div className="bg-primary/20 flex h-8 w-8 items-center justify-center rounded-lg">
              <MessageSquare className="text-primary h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-foreground text-sm font-medium">Responda reviews</p>
              <p className="text-muted-foreground text-xs">5 novos comentários</p>
            </div>
          </div>
          <div className="bg-muted/50 border-border flex items-center gap-3 rounded-xl border p-3">
            <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-lg">
              <BarChart3 className="text-foreground h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-foreground text-sm font-medium">Analise métricas</p>
              <p className="text-muted-foreground text-xs">Otimize suas vendas</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
