import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { Game } from "@/components/pages/game";
import { getGameDataById, incrementGameViews } from "@/lib/game";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; gamekey: number }> }) {
  const { gamekey, locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.game_not_found" });

  try {
    const data = await getGameDataById(Number(gamekey));
    return {
      title: `${data.name} | Ludus`,
      description: data.description.substring(0, 160),
    };
  } catch {
    return {
      title: t("title"),
      description: t("description"),
    };
  }
}

export default async function GamePage({ params }: { params: Promise<{ gamekey: number }> }) {
  const { gamekey } = await params;
  let data;

  try {
    data = await getGameDataById(gamekey);
  } catch {
    notFound();
  }

  incrementGameViews(gamekey).catch((err) => console.error(err));

  if (data.statistics) {
    data.statistics.views++;
  }

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
