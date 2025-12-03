import { IconType } from "react-icons/lib";
import Link from "next/link";

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
}: {
  icon: IconType;
  color: SolidColorDescription;
  href: string;
}) {
  const Icon = icon;
  return (
    <SocialMediaWrapper href={href} className={color.bg}>
      <div className="bg-background rounded-[5px] p-[3px]">
        <Icon className={`h-7 w-7 ${color.stroke}`} />
      </div>
    </SocialMediaWrapper>
  );
}
