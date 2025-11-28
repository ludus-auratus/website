import bannerData from "@/assets/data/hero_banner.json";

import { HeroBannerCarousel } from "./HeroBannerCarousel";

export function HeroBanner() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-8 lg:px-8">
      <HeroBannerCarousel items={bannerData} />
    </section>
  );
}
