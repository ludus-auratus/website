import Link from "next/link";
import { LayoutDashboard, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function DevDashboardWelcomeSection() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="from-primary/10 to-accent/10 border-primary/20 border-2 bg-gradient-to-br p-6 text-center md:text-left lg:col-span-2">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="space-y-2">
            <h2 className="text-foreground font-ludus-pixelify-sans text-2xl">Bem-vindo ao seu Portal! 🎮</h2>
            <p className="text-muted-foreground max-w-lg">
              Gerencie seus jogos, acompanhe estatísticas em tempo real e conecte-se com milhares de jogadores
              brasileiros.
            </p>
          </div>
          <div className="bg-primary/20 mx-auto flex h-32 w-32 items-center justify-center rounded-2xl md:mx-0">
            <LayoutDashboard className="text-primary h-16 w-16" />
          </div>
        </div>
      </Card>

      <Card className="from-accent/20 to-accent/5 border-accent hover:shadow-accent/20 group cursor-pointer border-2 bg-gradient-to-br p-6 transition-all duration-300 hover:shadow-lg">
        <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
          <div className="bg-accent/20 flex h-16 w-16 items-center justify-center rounded-2xl transition-transform group-hover:scale-110">
            <Plus className="text-accent h-8 w-8" />
          </div>
          <div>
            <h3 className="text-foreground font-ludus-pixelify-sans mb-2 text-xl">Publicar Novo Jogo</h3>
            <p className="text-muted-foreground text-sm">Lance seu próximo sucesso indie</p>
          </div>
          <Button variant="accent" className="w-full" asChild>
            <Link href="/dev/publish">
              <Plus className="h-4 w-4" />
              Começar
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
