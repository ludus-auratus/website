"use client";

import { Headphones, Rocket } from "lucide-react";

import { DevelopersComponents } from "@/components/pages/developers";
import { Button } from "@/components/ui/button";

interface DevelopersPageProps {
  onBack: () => void;
  onStartClick?: () => void;
  onDocsClick?: () => void;
}

export default function DevelopersPage({ onBack, onStartClick, onDocsClick }: DevelopersPageProps) {
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto space-y-16 px-4 py-8 md:space-y-24 md:py-12">
        <DevelopersComponents.Presentation />

        <DevelopersComponents.Benefits />

        <DevelopersComponents.HowItWords />

        {/* Recursos e Ferramentas */}
        <DevelopersComponents.Tools />

        {/* FAQ */}
        <DevelopersComponents.FAQ />

        {/* CTA Final */}
        <section className="from-accent/20 to-primary/20 border-accent space-y-6 rounded-3xl border-2 bg-gradient-to-br p-8 text-center md:p-12">
          <div className="space-y-4">
            <h2 className="text-primary font-ludus-pixelify-sans text-3xl md:text-4xl">Pronto Para Começar?</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Junte-se a centenas de desenvolvedores brasileiros que já estão publicando e vendendo seus jogos na Ludus
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
              onClick={onStartClick}
            >
              <Rocket className="h-5 w-5" />
              Criar Conta de Desenvolvedor
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <Headphones className="h-5 w-5" />
              Falar com Suporte
            </Button>
          </div>
          <p className="text-muted-foreground text-sm">
            Sem taxas de inscrição • Comece a vender em 48h • Suporte em português
          </p>
        </section>
      </div>
    </div>
  );
}
