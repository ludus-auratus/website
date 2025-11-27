import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface GameCardPurchaseProps {
  id: number;
  name: string;
  icon: string;
  price: number;
}

export function GameCardPurchase({ name, icon, price }: GameCardPurchaseProps) {
  return (
    <Card className="border-border p-0">
      <CardContent className="p-4">
        <div className="xs:flex-row flex flex-col flex-wrap items-center gap-4">
          <figure className="xs:w-28 relative h-28 w-full flex-shrink-0 self-center overflow-hidden rounded-xl">
            <Image
              src={icon}
              alt={name}
              width={100}
              height={100}
              className="h-full w-full object-cover object-center"
            />
          </figure>

          <div className="min-w-0 flex-1 self-start">
            <h3 className="text-foreground font-ludus-pixelify-sans truncate font-bold">{name}</h3>
            <p className="text-muted-foreground text-sm">Comprado em {new Date().toLocaleDateString("pt-BR")}</p>
            <div className="mt-2 flex items-center space-x-3">
              <span className="text-primary font-bold">R$ {price.toFixed(2)}</span>
            </div>
          </div>

          <div className="xs:w-auto flex w-full flex-col space-y-2">
            <Button variant="outline" className="xs:w-auto w-full" size="sm">
              Ver Detalhes
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
