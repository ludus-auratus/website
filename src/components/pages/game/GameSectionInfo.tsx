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
        width={1600}
        height={900}
        className="mb-4 w-full rounded-md object-cover shadow-md shadow-black/25 md:h-[180px] lg:h-[220px]"
      />
      <GameSection background="mobileOnly" padding="none">
        <div className="flex flex-col gap-y-2">
          <GameClassificationDisplay classification={classification} />
          <GameSimpleInfo title="rating" data={data.rating ? data.rating.toString() : "Não avaliado"} />
          <GameSimpleInfo title="release_date" data={releaseDate.toLocaleDateString()} />
          <GameSimpleInfo title="developer" data={studio} />
          <GameSimpleInfo title="publisher" data={publisher} />
          <GameTagContainer title="gender_tags" content={genderTags} />
          <GameTagContainer title="resource_tags" content={resourceTags} />
        </div>
      </GameSection>
    </div>
  );
}
