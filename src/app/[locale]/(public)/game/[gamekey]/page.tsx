import Image from "next/image";

import { Game } from "@/components/pages/game";
import { getGameDataById } from "@/lib/game";

// type GameData = {
//   key: string;
//   name: string;
//   info: GameInfomation;
//   sections: {
//     gallery: GameMidia[];
//     description: GameDescription;
//   };
//   categories: string[];
//   resources: string[];
//   languages: string[];
// };

// props: PageProps<"/[locale]/game/[gamekey]">
export default async function Page() {
  const data = await getGameDataById();

  return (
    <div>
      <div className="bg-ludus-moss-800 z-0 flex w-full">
        <div className="z-5 mx-4 mt-20 mb-8 flex h-fit w-full flex-col justify-between gap-y-4 md:mx-10 md:flex-row md:gap-x-8 lg:mx-32 lg:gap-x-10">
          <main className="flex w-full flex-col gap-y-4">
            <Game.Header name={data.name} studio={data.studio} icon={data.icon} />
            <Game.Gallery gallery={data.gallery} />
            <Game.Description descrition={data.description} />
          </main>
          <aside className="flex flex-col gap-y-4">
            <Game.Info data={data} />
            <Game.Comments />
          </aside>
        </div>
        <div className="absolute z-1 w-full">
          <div className="to-ludus-moss-800 z-1 h-72 w-full bg-gradient-to-b from-black/35 from-80%">
            <Image
              width={600}
              height={900}
              src={data.banner}
              alt=""
              className="relative -z-1 h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
