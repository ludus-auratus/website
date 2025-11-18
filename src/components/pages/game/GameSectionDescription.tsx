import Markdown from "react-markdown";
import { useTranslations } from "next-intl";

import GameSection from "./GameSection";

type Props = {
  descrition: string;
};

export default function GameSectionDescription(props: Props) {
  const t = useTranslations("Game");

  const { descrition } = props;
  return (
    <GameSection bordered="onlyX">
      <h3 className="font-ludus-pixelify-sans border-ludus-green-100 w-fit border-b-1 text-2xl text-white lg:text-3xl">
        {t("description_section")}
      </h3>
      <Markdown>{descrition}</Markdown>
    </GameSection>
  );
}
