import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

interface GameCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
}

export function GameCard({ title, price, image, id }: GameCardProps) {
  const formattedPrice = useMemo(
    () =>
      price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
    [price],
  );

  return (
    <article className="bg-card text-card-foreground border-border hover:border-primary/80 max-w-72 min-w-64 flex-1 rounded-2xl border shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link
        href={`/game/${id}`}
        className="focus-visible:ring-primary block rounded-2xl outline-none focus-visible:ring-2"
      >
        <figure className="relative h-60 w-full overflow-hidden rounded-2xl">
          <Image src={`/images/games/${image}`} alt={`Capa do jogo ${title}`} fill className="object-cover" />
        </figure>

        <div className="flex flex-col gap-1 p-4">
          <h3 className="text-ludus-yellow-400 font-ludus-pixelify-sans text-lg font-semibold">{title}</h3>
          <p className="font-semibold">{formattedPrice}</p>
        </div>
      </Link>
    </article>
  );
}
