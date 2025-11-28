import { readdirSync, readFileSync } from "fs";
import path from "path";

type FileSelector = (fileNames: string[]) => string[];
type FileProcessor<T> = (fileContent: string) => T;

export function importDirectoryFiles<T>(directory: string, processor: FileProcessor<T>, selector?: FileSelector): T[] {
  selector ??= (fn) => fn;

  const absolutePath = path.join(process.cwd(), directory);
  const fileNames = readdirSync(absolutePath);

  return selector(fileNames).map((fileName) => {
    const filePath = path.join(absolutePath, fileName);
    try {
      return processor(readFileSync(filePath, "utf-8"));
    } catch (e) {
      console.error(e);
      throw new Error(`Failed to read file ${filePath}`);
    }
  });
}
