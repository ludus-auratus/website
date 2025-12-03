import { LuDisc, LuInstagram, LuMusic2, LuTwitter, LuYoutube } from "react-icons/lu";

import { GameSocialMedia, SocialMedia, SocialMediaID } from "./GameSocialMedia";

const socialMedia: SocialMedia[] = [
  { id: "discord", icon: LuDisc, color: { type: "solid", bg: "bg-[#7289DA]", stroke: "stroke-[#7289DA]" } },
  { id: "tiktok", icon: LuMusic2, color: { type: "solid", bg: "bg-[#FFFFFF]", stroke: "stroke-[#FFFFFF]" } },
  { id: "twitter", icon: LuTwitter, color: { type: "solid", bg: "bg-[#1DA1F2]", stroke: "stroke-[#1DA1F2]" } },
  { id: "youtube", icon: LuYoutube, color: { type: "solid", bg: "bg-[#FF0000]", stroke: "stroke-[#FF0000]" } },
  {
    id: "instagram",
    icon: LuInstagram,

    color: {
      type: "gradient",
      id: "instagram",
      gradient: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 1,
        stops: [
          { color: "#405DE6", offset: "0%", tailwind: "from-[#405DE6]" },
          { color: "#C13584", offset: "75%", tailwind: "via-[#C13584]" },
          { color: "#FCAF45", offset: "100%", tailwind: "to-[#FCAF45]" },
        ],
      },
    },
  },
];

interface SocialMediaListItem {
  id: SocialMediaID;
  href: string;
}

export function GameSectionSocial({ list }: { list: SocialMediaListItem[] }) {
  return (
    <div className="flex justify-center gap-2">
      {list.map(({ id, href }, index) => {
        const sm = socialMedia.find((sm) => sm.id === id);
        if (sm === undefined) return <p key={index}>a</p>;
        return <GameSocialMedia key={index} href={href} media={sm} />;
      })}
    </div>
  );
}
