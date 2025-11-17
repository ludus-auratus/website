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
    <div className="group relative rounded-md bg-black shadow-md shadow-black/50">
      <iframe
        id="player"
        itemType="text/html"
        src={`https://youtube.com/embed/${src}?autoplay=1`}
        className="border-ludus-green-700 aspect-video w-full rounded-md border-1"
        title={title}
      ></iframe>

      <div className="pointer-events-none absolute top-0 left-0 flex h-full w-full flex-col justify-between opacity-100 transition-all group-hover:opacity-0">
        <header className="border-ludus-green-700 rounded-t-md border-1 border-b-0 px-4 py-1 backdrop-blur-sm transition-all md:py-3">
          <h4 className="font-ludus-poppins overflow-clip text-nowrap text-white md:text-xl">{title}</h4>
        </header>
        {/* <footer className="border-ludus-green-700 flex justify-between rounded-b-md border-1 border-t-0 bg-black/50 px-4 py-1 text-white backdrop-blur-sm md:py-3 md:text-[2em]">
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
        </footer> */}
      </div>
    </div>
  );
}
