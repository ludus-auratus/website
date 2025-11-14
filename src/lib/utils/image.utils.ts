export function createPlaceholderImageUrl(w: number, h: number, text?: string) {
  const url = new URL(`${w}x${h}.png`, "https://placehold.co");
  if (text) url.searchParams.set("text", text);
  return url.toString();
}
