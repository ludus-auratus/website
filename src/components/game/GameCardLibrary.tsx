import { useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, Loader2, Star } from "lucide-react";
import { toast } from "sonner";

import { Button } from "../ui/button";

interface GameCardLibraryProps {
  id: number;
  name: string;
  icon: string;
  rating: number;
}

export function GameCardLibrary({ name, icon, id, rating }: GameCardLibraryProps) {
  const [isPending, startTransition] = useTransition();

  function handleDownload(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Download conclusão!", {
        description: "O jogo foi baixado com sucesso!",
      });
    });
  }

  return (
    <article className="hover:border-accent/60 hover:shadow-accent/10 bg-card text-card-foreground border-accent/20 relative mx-auto flex h-fit max-w-[264px] min-w-[264px] flex-col rounded-2xl border shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-full sm:max-w-full">
      <Link
        aria-label={`Ver detalhes do jogo ${name}`}
        href={`/game/${id}`}
        className="focus-visible:ring-highlight flex h-full flex-col rounded-2xl transition-all duration-300 outline-none focus-visible:-translate-y-1 focus-visible:ring-2"
      >
        <figure className="relative aspect-square w-full overflow-hidden rounded-t-2xl">
          <Image
            src={icon}
            alt={`Capa do jogo ${name}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw,
                  (max-width: 768px) 50vw,
                  (max-width: 1024px) 33vw,
                  25vw"
          />
        </figure>

        <div className="flex flex-grow flex-col gap-2 p-4">
          <h3 className="font-ludus-pixelify-sans line-clamp-2 min-h-[56] text-lg font-semibold break-words">{name}</h3>

          <Button variant="accent" className="z-10 w-full" onClick={handleDownload} disabled={isPending}>
            {isPending ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <>
                <Download />
                Download
              </>
            )}
          </Button>
        </div>
      </Link>
    </article>
  );
}
