import Image from "next/image";
import Link from "next/link";

import { formatPrice } from "@/lib/game/game.utils";

interface GameCardProps {
  id: number;
  name: string;
  price: number;
  icon: string;
}

export function GameCard({ name, price, icon, id }: GameCardProps) {
  const formattedPrice = formatPrice(price);

  return (
    <article className="bg-card text-card-foreground border-border hover:border-primary/60 max-w-72 min-w-64 flex-1 rounded-2xl border shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link
        href={`/game/${id}`}
        className="focus-visible:ring-primary block rounded-2xl outline-none focus-visible:ring-2"
      >
        <figure className="relative h-60 w-full overflow-hidden rounded-2xl">
          <Image src={icon} alt={`Capa do jogo ${name}`} fill className="object-cover" />
        </figure>

        <div className="flex flex-col gap-1 p-4">
          <h3 className="text-ludus-yellow-400 font-ludus-pixelify-sans text-lg font-semibold">{name}</h3>
          <p className="font-semibold">{formattedPrice}</p>
        </div>
      </Link>
    </article>
  );
}
