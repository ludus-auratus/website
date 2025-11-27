import Image from "next/image";
import Link from "next/link";
import { Download, Star } from "lucide-react";

import { Button } from "../ui/button";

interface GameCardLibraryProps {
  id: number;
  name: string;
  icon: string;
  rating: number;
}

export function GameCardLibrary({ name, icon, id, rating }: GameCardLibraryProps) {
  function handleDownload(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    // lógica de download / adicionar ao carrinho
    console.log("Download do jogo:", id);
  }

  return (
    <article className="bg-card text-card-foreground border-border hover:border-primary/60 relative flex h-fit flex-col overflow-hidden rounded-2xl border shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link
        href={`/game/${id}`}
        className="focus-visible:ring-primary flex h-full flex-col rounded-2xl outline-none focus-visible:ring-2"
      >
        <div className="bg-background/90 absolute top-3 right-3 z-10 flex items-center space-x-1 rounded-full px-3 py-1 backdrop-blur-sm">
          {rating > 0 ? (
            <>
              <Star className="text-accent h-4 w-4 fill-current" />
              <span>{rating}</span>
            </>
          ) : (
            <Star className="text-muted-foreground h-5 w-5 fill-current" />
          )}
        </div>

        <figure className="relative h-60 w-full flex-shrink-0">
          <Image src={icon} alt={`Capa do jogo ${name}`} fill className="object-cover" />
        </figure>

        <div className="flex flex-grow flex-col gap-2 p-4">
          <h3 className="text-ludus-yellow-400 font-ludus-pixelify-sans line-clamp-2 min-h-[56] text-lg font-semibold break-words">
            {name}
          </h3>

          <Button variant="accent" className="z-10 w-full" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </Link>
    </article>
  );
}
