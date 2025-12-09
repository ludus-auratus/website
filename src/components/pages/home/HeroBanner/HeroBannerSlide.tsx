import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("HeroBanner");

  return (
    <div className="relative h-[300px] w-full sm:h-[400px] md:h-[500px]" aria-hidden={!isActive}>
      <div className="relative h-[300px] w-full sm:h-[400px] md:h-[500px]">
        <Image src={image} alt={title} fill className="rounded-3xl object-cover" sizes="100vw" priority />
      </div>

      <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/50 p-6">
        <div className="mx-auto flex max-w-2xl flex-col gap-3 px-6 py-8 lg:px-8">
          <h1 className="font-ludus-pixelify-sans text-3xl font-bold md:text-4xl lg:text-5xl">{title}</h1>

          <p className="text-muted-foreground text-lg">
            {t("by")} {studio}
          </p>

          <HeroBannerStars rating={rating} />

          <p className="text-foreground hidden max-w-lg text-base leading-relaxed md:inline-flex">{description}</p>

          <Button className="max-w-24 px-4" asChild>
            <Link href={`/game/${id}`} tabIndex={isActive ? 0 : -1}>
              {t("see_more")}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
