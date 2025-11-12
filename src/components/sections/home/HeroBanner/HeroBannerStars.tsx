import { LuStar } from "react-icons/lu";

interface HeroBannerStarsProps {
  rating: number;
}

export function HeroBannerStars({ rating }: HeroBannerStarsProps) {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <LuStar
            key={i}
            className={`h-5 w-5 ${
              i < Math.floor(rating) ? "text-ludus-yellow-400 fill-current" : "text-muted-foreground"
            }`}
          />
        ))}
      </div>

      <span className="text-muted-foreground text-sm">{rating}/5.0</span>
    </div>
  );
}
