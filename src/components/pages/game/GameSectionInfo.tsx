import Image from "next/image";
import { Star } from "lucide-react";

import { Game } from "@/lib/game";

import { GameActions } from "./GameActions";
import { GameAdditionalInfo } from "./GameAdditionalInfo";
import GameClassificationDisplay from "./GameClassificationDisplay";
import { GameLanguageContainer } from "./GameLanguageContainer";
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
          <GameSimpleInfo title="rating" data={data.rating ? data.rating.toString() : "Não avaliado"} icon={Star} />
          <GameSimpleInfo title="release_date" data={releaseDate.toLocaleDateString()} />
          <GameSimpleInfo title="developer" data={studio} />
          <GameSimpleInfo title="publisher" data={publisher} />
          <GameActions game={data} />
          <GameTagContainer title="gender_tags" content={genderTags} opened />
          <GameTagContainer title="resource_tags" content={resourceTags} opened />
          <GameTagContainer title="acessibility_tags" content={[]} opened />
          <GameLanguageContainer languages={data.supportedLanguages} />
          <GameAdditionalInfo game={data} />
        </div>
      </GameSection>
    </div>
  );
}
