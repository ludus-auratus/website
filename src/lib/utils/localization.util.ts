import { readdirSync } from "fs";

const supportedLanguages = readdirSync("messages")
  .filter((file) => file.endsWith(".json"))
  .map((file) => file.split(".")[0]);

export function getSupportedLanguages() {
  return supportedLanguages;
}
