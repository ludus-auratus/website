import bannerData from "@/assets/data/hero_banner.json";

import { HeroBannerCarousel } from "./HeroBannerCarousel";

export function HeroBanner() {
  return (
    <section className="relative mx-auto w-full max-w-7xl px-4 py-8 sm:px-8 md:py-12 lg:px-8">
      <HeroBannerCarousel items={bannerData} />
    </section>
  );
}
