"use server";

import { importDirectoryFiles, writeFile } from "../utils/files.utils";

export async function getPoliciesFromTranslations(language: string) {
  const found = importDirectoryFiles("/messages", JSON.parse, (files) => files.filter((f) => f.startsWith(language)));
  if (found.length === 0) return null;
  return found[0];
}

export async function setPolicyToTranslation(language: string, policyPath: string, content: string) {
  const policies = await getPoliciesFromTranslations(language);

  const policyNamespace = policyPath
    .split(".")
    .filter((segment) => segment.length > 0)
    .reduce((acc, segment) => acc[segment], policies["Policies"] ?? {});
  policyNamespace.__content__ = content;

  writeFile(`/messages/${language}.json`, JSON.stringify(policies, null, 2));
  return policies;
}
