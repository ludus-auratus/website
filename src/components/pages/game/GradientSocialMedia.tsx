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
    <SocialMediaWrapper href={href} className={color.id === "instagram" ? "bg-gradient-to-tr" : ""} disabled={disabled}>
      <div className="bg-background/20 rounded-[5px] p-[3px]">
        <Icon className={cn("h-7 w-7", disabled ? "text-muted-foreground" : "text-white")} />
      </div>
    </SocialMediaWrapper>
  );
}
