type Props = {
  title: string;
  content: string[];
};

export default function GameTagContainer(props: Props) {
  const { title, content } = props;
  return (
    <div className="text-white">
      <h4 className="font-ludus-pixelify-sans text-sm text-shadow-black/25 text-shadow-sm">{title}</h4>
      <div className="border-ludus-green-600 flex flex-wrap gap-2 rounded-md border-1 p-2 shadow-md shadow-black/25">
        {content.map((tag, index) => {
          const key = `game-tag-${index}`;
          return (
            <span key={key} className="bg-ludus-green-600 font-ludus-pixelify-sans rounded-sm px-1 text-sm">
              {tag}
            </span>
          );
        })}
      </div>
    </div>
  );
}
