"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cva } from "class-variance-authority";

import GameTagUnit from "./GameTagUnit";

const buttonVariants = cva(" cursor-pointer size-6", {
  variants: {
    opened: {
      true: "rotate-90",
      false: "rotate-0",
    },
  },
});

const containerVariants = cva(
  "border-ludus-green-600 flex origin-top flex-wrap gap-2 rounded-md p-2 border-1 shadow-md shadow-black/25 transition-all overflow-hidden",
  {
    variants: {
      visible: {
        true: "h-fit",
        false: "h-0 py-1",
      },
    },
  },
);

type Props = {
  title: string;
  content: string[];
};

export default function GameTagContainer(props: Props) {
  const { title, content } = props;

  const t = useTranslations("Game.info");
  const [visible, setVisibility] = useState(false);

  const onVisibilityButtonClick = () => {
    setVisibility((current) => !current);
  };

  return (
    <div className="text-white">
      <div className="font-ludus-pixelify-sans flex justify-between">
        <h4 className="text-shadow-black/25 text-shadow-sm">{t(title)}</h4>
        <button className={buttonVariants({ opened: visible })} onClick={onVisibilityButtonClick}>
          {">"}
        </button>
      </div>
      <div className={containerVariants({ visible })}>
        {content.map((tag, index) => {
          const key = `game-tag-${index}`;
          return <GameTagUnit key={key} text={tag} />;
        })}
      </div>
    </div>
  );
}
