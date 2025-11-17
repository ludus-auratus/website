import GameComment from "./GameComment";
import GameSection from "./GameSection";

export default function GameSectionComments() {
  return (
    <div className="flex flex-col gap-y-4">
      <GameComment />
      <GameComment />
      <GameComment />
      <div className="bg-ludus-green-400 font-ludus-pixelify-sans mx-auto w-fit rounded-md px-3 py-1 text-white">
        Ver Mais
      </div>
    </div>
  );
}
