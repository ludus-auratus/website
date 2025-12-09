import { IconType } from "react-icons/lib";
import { useTranslations } from "next-intl";

type Props = {
  title: string;
  data: string;
  icon?: IconType;
};

export default function GameSimpleInfo({ title, data, icon }: Props) {
  const t = useTranslations("Game.info");
  const Icon = icon!;
  return (
    <div className="game-info font-ludus-pixelify-sans flex justify-between text-shadow-black/25 text-shadow-sm">
      <h5 className="text-muted-foreground">{t(title)}</h5>
      <div className="flex items-center">
        {!!icon && <Icon className="mr-1 h-full fill-current" />}
        <p className="text-white">{data}</p>
      </div>
    </div>
  );
}
