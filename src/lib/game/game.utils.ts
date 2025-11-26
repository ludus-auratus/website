export const GameClassifications = {
  C0: classify(0),
  C10: classify(10),
  C12: classify(12),
  C14: classify(14),
  C16: classify(16),
  C18: classify(18),
} as const;

export type GameClassification = (typeof GameClassifications)[keyof typeof GameClassifications];

export function classify(value: number) {
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
  };
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
