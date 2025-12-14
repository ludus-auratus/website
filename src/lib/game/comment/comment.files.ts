import { importDirectoryFiles } from "@/lib/utils/files.utils";

import { GameCommentDTO } from "./comment.dto";

export function importGameCommentFiles() {
  return importDirectoryFiles<GameCommentDTO>(
    "/src/assets/data/comments",
    (json) => JSON.parse(json),
    (files) => files.filter((f) => f.endsWith(".json")),
  );
}
