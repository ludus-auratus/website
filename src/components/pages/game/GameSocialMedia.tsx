import { IconType } from "react-icons/lib";

import { GradientColorDescription, GradientSocialMedia } from "./GradientSocialMedia";
import { SolidColorDescription, SolidSocialMedia } from "./SolidSocialMedia";

export type SocialMediaID = "discord" | "facebook" | "instagram" | "x" | "youtube";
export interface SocialMedia {
  id: SocialMediaID;
  icon: IconType;
  color: SolidColorDescription | GradientColorDescription;
}

export function GameSocialMedia({ media, href, disabled }: { media: SocialMedia; href: string; disabled?: boolean }) {
  switch (media.color.type) {
    case "gradient":
      return <GradientSocialMedia href={href} icon={media.icon} color={media.color} disabled={disabled} />;
    case "solid":
      return <SolidSocialMedia href={href} icon={media.icon} color={media.color} disabled={disabled} />;
  }
}
