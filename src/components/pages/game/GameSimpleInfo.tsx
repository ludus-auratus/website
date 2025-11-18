import { useTranslations } from "next-intl";

type Props = {
  title: string;
  data: string;
};

export default function GameSimpleInfo(props: Props) {
  const t = useTranslations("Game.info");
  const { title, data } = props;
  return (
    <div className="game-info font-ludus-pixelify-sans flex justify-between text-shadow-black/25 text-shadow-sm">
      <h5 className="text-white">{t(title)}</h5>
      <p className="text-ludus-green-600">{data}</p>
    </div>
  );
}
