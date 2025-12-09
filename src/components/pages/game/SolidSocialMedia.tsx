import { IconType } from "react-icons/lib";

import { cn } from "@/lib/utils/shadcn";

import { SocialMediaWrapper } from "./SocialMediaWrapper";

export interface SolidColorDescription {
  type: "solid";
  bg: string;
  stroke: string;
}

export function SolidSocialMedia({
  icon,
  color,
  href,
  disabled,
}: {
  icon: IconType;
  color: SolidColorDescription;
  href: string;
  disabled?: boolean;
}) {
  const Icon = icon;
  return (
    <SocialMediaWrapper href={href} className={color.bg} disabled={disabled}>
      <div className="bg-background rounded-[5px] p-[3px]">
        <Icon className={cn("h-7 w-7", disabled ? "text-muted-foreground" : color.stroke)} />
      </div>
    </SocialMediaWrapper>
  );
}
