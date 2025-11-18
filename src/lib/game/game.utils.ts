export const GameClassifications = {
  C0: classify(0),
  C10: classify(10),
  C12: classify(12),
  C14: classify(14),
  C16: classify(16),
  C18: classify(18),
} as const;

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
  };
}
