export const GameClassifications = {
  C0: classify(0, "Livre", "Livre para todos os públicos"),
  C10: classify(10, "10+ anos", "Não recomendado para menores de 10 anos"),
  C12: classify(12, "12+ anos", "Não recomendado para menores de 12 anos"),
  C14: classify(14, "14+ anos", "Não recomendado para menores de 14 anos"),
  C16: classify(16, "16+ anos", "Proibido para menores de 16 anos"),
  C18: classify(18, "18+ anos", "Proibido para menores de 18 anos"),
} as const;

export type GameClassification = (typeof GameClassifications)[keyof typeof GameClassifications];

function classify(value: number, name: string, description: string, alt: string = "") {
  const key = `c${value}`;
  const src = `/img/classification/${key}.png`;

  return {
    src,
    key,
    value,
    alt,
    name,
    description,
  };
}
