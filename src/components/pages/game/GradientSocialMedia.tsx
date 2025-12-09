import { IconType } from "react-icons/lib";

import { cn } from "@/lib/utils/shadcn";

import { GradientIcon } from "./GradientIcon";
import { SocialMediaWrapper } from "./SocialMediaWrapper";

export interface GradientColorDescription {
  type: "gradient";
  id: string;
  gradient: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    stops: { color: string; offset: string; tailwind: string }[];
  };
}

export function GradientSocialMedia({
  icon,
  href,
  color,
  disabled,
}: {
  icon: IconType;
  href: string;
  color: GradientColorDescription;
  disabled?: boolean;
}) {
  const Icon = icon;
  return (
    <SocialMediaWrapper
      href={href}
      className={
        color.id === "instagram"
          ? cn(
              "bg-gradient-to-b",
              color.gradient.stops[0].tailwind,
              color.gradient.stops[1].tailwind,
              color.gradient.stops[2].tailwind,
            )
          : ""
      }
      disabled={disabled}
    >
      <div className="bg-background rounded-[5px] p-[3px]">
        {disabled ? (
          <Icon className="text-muted-foreground h-7 w-7" />
        ) : (
          <GradientIcon gradientId={color.id} gradient={color.gradient}>
            <Icon className="h-7 w-7 fill-[inherit]" />
          </GradientIcon>
        )}
      </div>
    </SocialMediaWrapper>
  );
}
