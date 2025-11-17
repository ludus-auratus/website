type Props = {
  content: string[];
};

export default function GameTagDisplay(props: Props) {
  const { content } = props;

  return (
    <div className="flex flex-wrap gap-2 rounded-md shadow-black/25">
      {content.map((tag, index) => {
        const key = `game-tag-${index}`;
        return (
          <span key={key} className="bg-ludus-green-700 font-ludus-pixelify-sans rounded-sm px-1 text-sm shadow-md">
            {tag}
          </span>
        );
      })}
    </div>
  );
}
