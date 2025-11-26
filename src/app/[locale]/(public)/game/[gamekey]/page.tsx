import Image from "next/image";

import { Game } from "@/components/pages/game";
import { getGameDataById } from "@/lib/game";

export default async function Page({ params }: { params: { gamekey: number } }) {
  const { gamekey } = params;
  const data = await getGameDataById(gamekey);

  return (
    <div className="relative w-full">
      <div className="absolute inset-0 h-72">
        <Image
          src={data.banner}
          alt={`Banner do jogo ${data.name}`}
          width={600}
          height={900}
          className="h-full w-full object-cover object-center"
        />
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
            <Game.CartActions game={data} />
            <Game.Comments />
          </aside>
        </div>
      </div>
    </div>
  );
}
