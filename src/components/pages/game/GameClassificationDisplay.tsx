import Image from "next/image";
import { useTranslations } from "next-intl";

import { GameClassification } from "@/lib/game";

type Props = {
  classification: GameClassification;
};

export default function GameClassificationDisplay(props: Props) {
  const t = useTranslations("Game.classification");
  const { classification } = props;

  return (
    <div className="game-classification flex items-center gap-x-2">
      <Image src={classification.src} width={120} height={120} alt={classification.alt} className="size-14" />
      <div className="my-auto flex flex-col text-shadow-black/25 text-shadow-sm">
        <h5 className="text-ludus-green-600 font-ludus-pixelify-sans text-lg">
          {t("prefix")}: {t(classification.title)}
        </h5>
        <p className="font-ludus-poppins text-xs text-white">{t(classification.description)}</p>
      </div>
    </div>
  );
}
