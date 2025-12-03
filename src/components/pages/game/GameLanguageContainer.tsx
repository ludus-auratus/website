import { GameLanguage } from "@/lib/game";

import { GameInfoAccordion } from "./GameInfoAccordion";

export function GameLanguageContainer({ languages }: { languages: GameLanguage[] }) {
  return (
    <GameInfoAccordion title="language">
      <table className="w-full">
        <thead className="border-primary border-b-1">
          <tr>
            <th>Idioma</th>
            <th>Nível</th>
          </tr>
        </thead>
        <tbody>
          {languages.map(({ name, level }, index) => (
            <tr key={index}>
              <td className="px-2">{name}</td>
              <td className="text-center">{level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </GameInfoAccordion>
  );
}
