import { Award, BarChart3, Book, DollarSign, Globe, Heart, Users, Zap } from "lucide-react";

import { Card } from "@/components/ui/card";

const features = [
  { icon: BarChart3, label: "Dashboard Analytics" },
  { icon: DollarSign, label: "Pagamentos Automáticos" },
  { icon: Book, label: "Documentação Completa" },
  { icon: Award, label: "Sistema de Conquistas" },
  { icon: Users, label: "Gestão de Beta Testers" },
  { icon: Zap, label: "API de Integração" },
  { icon: Globe, label: "Multi-plataforma" },
  { icon: Heart, label: "Sistema de Wishlist" },
];

export default function ToolsSection() {
  return (
    <section className="lg:px-8space-y-8 relative mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-8">
      <div className="space-y-3 text-center">
        <h2 className="text-primary font-ludus-pixelify-sans text-3xl md:text-4xl">Recursos Inclusos</h2>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          Tudo que você precisa para gerenciar e crescer seu negócio de jogos
        </p>
      </div>

      <div className="mx-auto grid w-fit grid-cols-2 gap-4 md:grid-cols-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card
              key={index}
              className="border-border hover:border-accent group border-2 p-6 text-center transition-all duration-300"
            >
              <div className="space-y-3">
                <div className="bg-accent/10 group-hover:bg-accent/20 mx-auto flex h-12 w-12 items-center justify-center rounded-xl transition-colors">
                  <Icon className="text-accent h-6 w-6" />
                </div>
                <p className="text-foreground text-sm">{feature.label}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
