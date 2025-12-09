import { useTranslations } from "next-intl";

import { GameLanguage } from "@/lib/game";

import { GameInfoAccordion } from "./GameInfoAccordion";

export function GameLanguageContainer({ languages }: { languages: GameLanguage[] }) {
  const t = useTranslations("Game.info");
  return (
    <GameInfoAccordion id="language" title="language">
      <table className="w-full">
        <thead className="border-primary border-b-1">
          <tr>
            <th className="pb-2 text-left font-normal">{t("language_support.language")}</th>
            <th className="pb-2 font-normal">{t("language_support.interface")}</th>
            <th className="pb-2 font-normal">{t("language_support.audio")}</th>
            <th className="pb-2 font-normal">{t("language_support.subtitles")}</th>
          </tr>
        </thead>
        <tbody>
          {languages.map(({ name, interface: hasInterface, audio, subtitles }, index) => (
            <tr key={index}>
              <td className="py-2">{name}</td>
              <td className="py-2 text-center">{hasInterface ? "✓" : "✕"}</td>
              <td className="py-2 text-center">{audio ? "✓" : "✕"}</td>
              <td className="py-2 text-center">{subtitles ? "✓" : "✕"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </GameInfoAccordion>
  );
}
