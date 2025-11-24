import { DollarSign, Globe, Headphones, Shield, TrendingUp, Users } from "lucide-react";

import { Card } from "@/components/ui/card";

const benefits = [
  {
    icon: Users,
    title: "Comunidade Engajada",
    description: "Alcance milhares de jogadores brasileiros apaixonados por jogos indies nacionais",
  },
  {
    icon: DollarSign,
    title: "Modelo Justo de Receita",
    description: "Fique com 85% da receita das vendas. Sem taxas ocultas ou surpresas",
  },
  {
    icon: TrendingUp,
    title: "Analytics Detalhado",
    description: "Acompanhe vendas, downloads, visualizações e engajamento em tempo real",
  },
  {
    icon: Globe,
    title: "Visibilidade Nacional",
    description: "Destaque para jogos brasileiros com curadoria especializada e eventos mensais",
  },
  {
    icon: Shield,
    title: "Proteção e Segurança",
    description: "Sistema de DRM opcional, proteção contra pirataria e pagamentos seguros",
  },
  {
    icon: Headphones,
    title: "Suporte Dedicado",
    description: "Equipe brasileira pronta para ajudar desenvolvedores em português",
  },
];

export default function BenefitsSection() {
  return (
    <section className="relative mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-8 lg:px-8">
      <div className="space-y-3 text-center">
        <h2 className="text-primary font-ludus-pixelify-sans text-3xl md:text-4xl">Por Que Escolher a Ludus?</h2>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          Criada por desenvolvedores brasileiros, para desenvolvedores brasileiros
        </p>
      </div>

      <div className="mx-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <Card
              key={index}
              className="border-border hover:border-accent hover:shadow-accent/20 border-2 p-6 transition-all duration-300 hover:shadow-lg"
            >
              <div className="space-y-4">
                <div className="bg-accent/10 flex h-12 w-12 items-center justify-center rounded-xl">
                  <Icon className="text-accent h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-foreground font-ludus-pixelify-sans mb-2 text-xl">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
