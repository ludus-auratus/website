import { IconType } from "react-icons/lib";
import Link from "next/link";

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
    <Link href={href} className={`${color.bg} rounded-[7px] p-[3px] shadow-md shadow-black/25`}>
      <div className="bg-background rounded-[5px] p-[3px]">
        <Icon className={`h-7 w-7 ${color.stroke}`} />
      </div>
    </Link>
  );
}
