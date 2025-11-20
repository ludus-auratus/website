import { Trophy } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function GameJamComingSoon() {
  return (
    <Card className="from-primary/10 via-card/50 to-accent/10 border-primary/30 overflow-hidden border bg-gradient-to-br p-0 backdrop-blur-sm">
      <CardContent className="p-8 text-center md:p-12">
        <div className="mx-auto max-w-2xl">
          <div className="bg-primary/20 mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl">
            <Trophy className="text-primary h-10 w-10" />
          </div>

          <h3 className="font-ludus-pixelify-sans mb-4 text-2xl md:text-3xl">Em Breve: Sua Primeira Game Jam!</h3>

          <p className="text-muted-foreground mx-auto mb-8 max-w-xl">
            Estamos criando uma área completa para hospedar game jams. Você poderá criar jogos, votar nos seus favoritos
            e disputar prêmios incríveis!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
