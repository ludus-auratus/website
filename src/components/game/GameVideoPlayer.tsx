import { GameVideo } from "@/lib/game";

type Props = {
  video?: GameVideo;
};

const defaultVideo: GameVideo = {
  type: "video",
  src: "https://www.youtube.com/embed/Hjl6usm5WCo?si=cB3-BcUbRj_ObfFi",
  title: "Trailer",
};

export default function GameVideoPlayer(props: Props) {
  const { src, title } = props.video ?? defaultVideo;

  return (
    <div className="relative overflow-clip shadow-md shadow-black/50">
      <iframe id="player" itemType="text/html" src={src} className="aspect-video w-full rounded-md"></iframe>
      <div className="border-ludus-green-100 absolute top-0 left-0 flex h-full w-full flex-col justify-between overflow-clip rounded-md border-1">
        <header className="bg-black/50 px-4 py-1 backdrop-blur-sm md:py-3">
          <h4 className="font-ludus-poppins overflow-clip text-nowrap text-white md:text-xl">{title}</h4>
        </header>
        <footer className="flex justify-between bg-black/50 px-4 py-1 text-white backdrop-blur-sm md:py-3 md:text-[2em]">
          <div className="flex gap-x-2 md:gap-x-4">
            <button>
              <i className="bi bi-play"></i>
            </button>
            <button>
              <i className="bi bi-volume-up"></i>
            </button>
          </div>
          <div className="flex gap-x-2 md:gap-x-4">
            <button>
              <i className="bi bi-gear"></i>
            </button>
            <button>
              <i className="bi bi-arrows-fullscreen"></i>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
