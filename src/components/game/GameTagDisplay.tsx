import GameTagUnit from "./GameTagUnit";

type Props = {
  content: string[];
};

export default function GameTagDisplay(props: Props) {
  const { content } = props;

  return (
    <div className="flex flex-wrap gap-2 rounded-md shadow-black/25">
      {content.map((tag, index) => {
        const key = `game-tag-${index}`;
        return <GameTagUnit key={key} text={tag} />;
      })}
    </div>
  );
}
