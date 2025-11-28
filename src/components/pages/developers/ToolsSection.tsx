import { Award, Book, DollarSign, Globe, Heart, Users, Zap } from "lucide-react";

import {
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionRoot,
  SectionTitle,
  SectionTitleText,
} from "@/components/layout/Section";
import { Card } from "@/components/ui/card";

const features = [
  // { icon: BarChart3, label: "Dashboard Analytics" },
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
    <SectionRoot>
      <SectionHeader>
        <SectionTitle>
          <SectionTitleText type="highlight" text="Recursos Inclusos" />
        </SectionTitle>
        <SectionDescription>Tudo que você precisa para gerenciar e crescer seu negócio de jogos</SectionDescription>
      </SectionHeader>

      <SectionContent className="mx-auto grid w-fit grid-cols-2 gap-4 md:grid-cols-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card
              key={index}
              className="border-accent/10 border-x-accent/30 border-t-accent/75 hover:border-accent group border-2 p-6 text-center transition-all duration-300"
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
      </SectionContent>
    </SectionRoot>
  );
}
