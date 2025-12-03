import { IconType } from "react-icons/lib";

import { GradientColorDescription, GradientSocialMedia } from "./GradientSocialMedia";
import { SolidColorDescription, SolidSocialMedia } from "./SolidSocialMedia";

export type SocialMediaID = "discord" | "instagram" | "tiktok" | "twitter" | "youtube";
export interface SocialMedia {
  id: SocialMediaID;
  icon: IconType;
  color: SolidColorDescription | GradientColorDescription;
}

export function GameSocialMedia({ media, href }: { media: SocialMedia; href: string }) {
  switch (media.color.type) {
    case "gradient":
      return <GradientSocialMedia href={href} icon={media.icon} color={media.color} />;
    case "solid":
      return <SolidSocialMedia href={href} icon={media.icon} color={media.color} />;
  }
}
