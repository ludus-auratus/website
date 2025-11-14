"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { HeroBannerSlide } from "./HeroBannerSlide";

interface HeroBannerCarouselProps {
  items: Array<{
    id: number;
    title: string;
    studio: string;
    rating: number;
    description: string;
    image: string;
  }>;
}

export function HeroBannerCarousel({ items }: HeroBannerCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const plugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <div className="relative w-full">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.play()}
        opts={{ align: "start", loop: true }}
      >
        <CarouselContent>
          {items.map((item) => (
            <CarouselItem key={item.id} className="basis-full">
              <HeroBannerSlide {...item} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute top-1/2 left-4 -translate-y-1/2 transform" />
        <CarouselNext className="absolute top-1/2 right-4 -translate-y-1/2 transform" />
      </Carousel>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform space-x-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`h-2 w-2 rounded-full transition-colors ${current === index ? "bg-primary" : "bg-white/50"}`}
            aria-label={`Ir para o slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
