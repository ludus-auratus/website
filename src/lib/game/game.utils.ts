export const GameClassifications = {
  C0: classify(0),
  C10: classify(10),
  C12: classify(12),
  C14: classify(14),
  C16: classify(16),
  C18: classify(18),
  UNDEFINED: classify(256),
} as const;

export const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export type GameClassification = (typeof GameClassifications)[keyof typeof GameClassifications];

function classify(value: number) {
  const key = `c${value}`;
  const src = `/images/classification/${key}.png`;

  const alt = `${key}.alt`;
  const title = `${key}.title`;
  const description = `${key}.description`;

  return {
    key,
    value,
    src,
    alt,
    title,
    description,
  } as const;
}

export function getClassificationByAge(age: number): GameClassification {
  for (const key in GameClassifications) {
    const classification = GameClassifications[key as keyof typeof GameClassifications];
    if (classification.value === age) {
      return classification;
    }
  }
  return GameClassifications.UNDEFINED;
}

/**
 * Formata um valor numérico como moeda brasileira (BRL)
 * @param price - O preço a ser formatado
 * @returns String formatada no padrão brasileiro (ex: "R$ 1.234,56")
 */
export function formatPrice(price: number): string {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
