import { readdirSync, readFileSync, writeFileSync } from "fs";
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

export function readFile(filePath: string) {
  try {
    const absolutePath = path.join(process.cwd(), filePath);
    return readFileSync(absolutePath, "utf-8");
  } catch (e) {
    console.error(e);
    throw new Error(`Failed to read file ${filePath}`);
  }
}

export function writeFile(filePath: string, content: string) {
  try {
    const absolutePath = path.join(process.cwd(), filePath);
    writeFileSync(absolutePath, content, { flag: "" });
  } catch (e) {
    console.error(e);
    throw new Error(`Failed to write file ${filePath}`);
  }
}

export function writeBackupFile(filePath: string, content: string) {
  const backupPath = path.join("src/assets/backup", filePath);
  writeFile(backupPath, content);
}
