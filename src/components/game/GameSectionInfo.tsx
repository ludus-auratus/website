import Image from "next/image";

import { Game } from "@/lib/game";

import GameClassificationDisplay from "./GameClassificationDisplay";
import GameSection from "./GameSection";
import GameSimpleInfo from "./GameSimpleInfo";
import GameTagContainer from "./GameTagContainer";

type Props = {
  data: Game;
};

export default function GameSectionInfo(props: Props) {
  const { data } = props;
  const { studio, publisher, classification, releaseDate, tags, banner } = data;
  const { genders: genderTags, resources: resourceTags } = tags;

  return (
    <div>
      <Image
        src={banner}
        alt=""
        width={420}
        height={220}
        className="mb-4 w-full rounded-md shadow-md shadow-black/25 md:h-[180px] lg:h-[220px]"
      />
      <GameSection background="mobileOnly" padding="none">
        <div className="flex flex-col gap-y-2">
          <GameClassificationDisplay classification={classification} />
          <GameSimpleInfo title="Avaliação" data="83%" />
          <GameSimpleInfo title="Data de Lançamento" data={releaseDate.toLocaleDateString()} />
          <GameSimpleInfo title="Desenvolvedor" data={studio} />
          <GameSimpleInfo title="Publicador" data={publisher} />
          <GameTagContainer title="Categorias" content={genderTags} />
          <GameTagContainer title="Recursos" content={resourceTags} />
        </div>
      </GameSection>
    </div>
  );
}
