import { IconType } from "react-icons/lib";
import Link from "next/link";

import { cn } from "@/lib/utils/shadcn";

import { GradientIcon } from "./GradientIcon";

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
}: {
  icon: IconType;
  href: string;
  color: GradientColorDescription;
}) {
  const Icon = icon;
  return (
    <Link
      href={href}
      className={cn(
        `rounded-[7px] bg-linear-to-b bg-gradient-to-b from-[#405DE6] p-[3px] shadow-md shadow-black/25`,
        `${color.gradient!.stops[0].tailwind}`,
        `${color.gradient!.stops[1].tailwind}`,
        `${color.gradient!.stops[2].tailwind}`,
      )}
    >
      <div className="bg-background rounded-[5px] p-[3px]">
        <GradientIcon gradientId={color.id!} gradient={color.gradient!}>
          <Icon className="h-7 w-7 stroke-[inherit]" />
        </GradientIcon>
      </div>
    </Link>
  );
}
