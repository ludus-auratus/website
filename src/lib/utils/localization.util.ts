import { readdirSync } from "fs";
import path from "path";

const dirPath = path.join(process.cwd(), "/messages");
const supportedLanguages = readdirSync(dirPath)
  .filter((file) => file.endsWith(".json"))
  .map((file) => file.split(".")[0]);

export function getSupportedLanguages() {
  return supportedLanguages;
}
