import { ElementType } from "react";

import { Card, CardContent } from "@/components/ui/card";

interface GameJamFeatureCardProps {
  icon: ElementType;
  title: string;
  description: string;
}

export function GameJamFeatureCard({ icon: Icon, title, description }: GameJamFeatureCardProps) {
  return (
    <Card className="group bg-card/50 border-border hover:border-primary/60 hover:shadow-primary/10 border backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
      <CardContent className="p-6 text-center">
        <div className="bg-primary/10 group-hover:bg-primary/20 mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl transition-colors">
          <Icon className="text-primary h-8 w-8" />
        </div>

        <h3 className="font-ludus-pixelify-sans mb-2 text-lg text-white">{title}</h3>

        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
    </Card>
  );
}
