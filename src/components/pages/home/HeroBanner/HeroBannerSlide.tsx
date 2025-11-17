import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { HeroBannerStars } from "./HeroBannerStars";

interface HeroBannerSlideProps {
  id: number;
  title: string;
  studio: string;
  rating: number;
  description: string;
  image: string;
  isActive: boolean;
}

export function HeroBannerSlide({ id, title, studio, rating, description, image, isActive }: HeroBannerSlideProps) {
  return (
    <div className="relative h-[300px] w-full sm:h-[400px] md:h-[500px]" aria-hidden={!isActive}>
      <Image src={image} alt={title} width={1280} height={500} className="h-full w-full rounded-3xl object-cover" />

      <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/50 p-6">
        <div className="mx-auto flex max-w-2xl flex-col gap-3 px-6 py-8 lg:px-8">
          <h1 className="font-ludus-pixelify-sans text-3xl font-bold md:text-4xl lg:text-5xl">{title}</h1>

          <p className="text-muted-foreground text-lg">por {studio}</p>

          <HeroBannerStars rating={rating} />

          {/* <p className="text-foreground hidden max-w-lg text-base leading-relaxed md:inline-flex">{description}</p> */}

          <Button className="max-w-24 px-4" asChild>
            <Link href={`/game/${id}`} tabIndex={isActive ? 0 : -1}>
              Ver mais
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
