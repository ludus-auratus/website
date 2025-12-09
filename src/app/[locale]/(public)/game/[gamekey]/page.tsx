import Image from "next/image";

import { Game } from "@/components/pages/game";
import { getGameDataById, incrementGameViews } from "@/lib/game";

export async function generateMetadata({ params }: { params: Promise<{ gamekey: number }> }) {
  const { gamekey } = await params;
  const data = await getGameDataById(Number(gamekey));

  return {
    title: `${data.name} | Ludus`,
    description: data.description.substring(0, 160),
  };
}

export default async function GamePage({ params }: { params: Promise<{ gamekey: number }> }) {
  const { gamekey } = await params;
  const data = await getGameDataById(gamekey);
  incrementGameViews(gamekey).catch((err) => console.error(err));

  if (data.statistics) {
    data.statistics.views++;
  }

  console.log(data.statistics.views);

  return (
    <div className="relative w-full">
      <div className="absolute inset-0 h-[300px] w-full">
        <Image src={data.banner} alt={`Banner do jogo ${data.name}`} fill className="object-cover object-center" />
        <div className="to-ludus-moss-800 absolute inset-0 bg-gradient-to-b from-black/35 from-80%" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-8 sm:px-6 lg:px-8">
        <div className="flex w-full flex-col gap-8 md:flex-row">
          <main className="flex w-full flex-col gap-y-4">
            <Game.Header name={data.name} studio={data.studio} icon={data.icon} />
            <Game.Gallery gallery={data.gallery} />
            <Game.Description description={data.description} />
          </main>

          <aside className="flex flex-col gap-y-4">
            <Game.Info data={data} />
            <Game.Social list={data.socialMedia} />
            <Game.Comments gameKey={gamekey} />
          </aside>
        </div>
      </div>
    </div>
  );
}
