import { AiOutlineDiscord, AiOutlineFacebook, AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";

import { GameSocialMedia as GameSocialMediaType } from "@/lib/game";

import { GameSocialMedia, SocialMedia, SocialMediaID } from "./GameSocialMedia";

const socialMedia: SocialMedia[] = [
  { id: "discord", icon: AiOutlineDiscord, color: { type: "solid", bg: "bg-[#7289DA]", stroke: "text-[#7289DA]" } },
  { id: "facebook", icon: AiOutlineFacebook, color: { type: "solid", bg: "bg-[#1877F2]", stroke: "text-[#1877F2]" } },
  {
    id: "x",
    icon: FaXTwitter,
    color: { type: "solid", bg: "bg-[#000000]", stroke: "text-[#000000]" },
  },
  { id: "youtube", icon: AiOutlineYoutube, color: { type: "solid", bg: "bg-[#FF0000]", stroke: "text-[#FF0000]" } },
  {
    id: "instagram",
    icon: AiOutlineInstagram,

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

const platformMap: Record<number, SocialMediaID> = {
  0: "facebook",
  1: "instagram",
  2: "x",
  3: "discord",
  4: "youtube",
};

export function GameSectionSocial({ list }: { list: GameSocialMediaType[] }) {
  return (
    <div className="flex justify-around">
      {Object.entries(platformMap).map(([key, id]) => {
        const platformIndex = Number(key);
        const userSocialMedia = list.find((item) => item.platform === platformIndex);
        const sm = socialMedia.find((sm) => sm.id === id);

        if (!sm) return null;

        if (userSocialMedia) {
          return <GameSocialMedia key={id} href={userSocialMedia.url} media={sm} />;
        }

        return <GameSocialMedia key={id} href="" media={sm} disabled />;
      })}
    </div>
  );
}
