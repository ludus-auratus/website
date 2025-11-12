import { banners } from "./hero-banner.data";
import { HeroBannerCarousel } from "./HeroBannerCarousel";

export function HeroBanner() {
  return (
    <section className="relative mx-auto mt-6 w-full max-w-7xl flex-1 px-4 pt-10 pb-20 sm:px-6 lg:px-8">
      <HeroBannerCarousel items={banners} />
    </section>
  );
}
