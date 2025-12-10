"use server";

import { importDirectoryFiles, writeFile } from "../utils/files.utils";

import { CompanyPolicy, CompanyPolicyType, PolicyNavigationMap, PolicyTranslation } from "./policies.type";

function updatePoliciesTranslation(language: string, upodatedTranslation: object) {
  writeFile(`/messages/${language}.json`, JSON.stringify(upodatedTranslation, null, 2));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractPolicyNamespace(policies: any, policyPath: string) {
  return policyPath
    .split(".")
    .filter((segment) => segment.length > 0)
    .reduce((acc, segment) => acc[segment], policies["Policies"] ?? {});
}

function generatePolicyMap(policies: Record<string, PolicyTranslation>) {
  const map: PolicyNavigationMap = {
    structure: [],
  };

  const recursivePolicyMapper = (id: string, policy: PolicyTranslation): CompanyPolicy => {
    const childrenKeys = Object.keys(policy).filter((k) => !["__title__", "__content__"].includes(k));
    const type: CompanyPolicyType = childrenKeys.length > 0 ? "section" : "article";
    const nodes =
      childrenKeys.length > 0
        ? childrenKeys.map((key) => recursivePolicyMapper(key, policy[key] as PolicyTranslation))
        : undefined;

    return { type, key: id, nodes };
  };

  Object.keys(policies).forEach((key) => {
    map.structure.push(recursivePolicyMapper(key, policies[key]));
  });

  writeFile(`src/assets/data/policies/map.json`, JSON.stringify(map, null, 2));
}

export async function getPoliciesFromTranslations(language: string) {
  const found = importDirectoryFiles("/messages", JSON.parse, (files) => files.filter((f) => f.startsWith(language)));
  if (found.length === 0) return null;
  return found[0];
}

export async function setPolicyToTranslation(language: string, policyPath: string, title: string, content: string) {
  const policies = await getPoliciesFromTranslations(language);

  const policyNamespace = extractPolicyNamespace(policies, policyPath);
  policyNamespace.__title__ = title;
  policyNamespace.__content__ = content;

  updatePoliciesTranslation(language, policies);

  return policies;
}

export async function addPolicyToTranslation(language: string, policyPath: string, title?: string) {
  const policies = await getPoliciesFromTranslations(language);

  const splittedPath = policyPath.split(".");
  const parentPath = policyPath.split(".").slice(0, -1).join(".");
  const lastSegment = splittedPath[splittedPath.length - 1].replaceAll(" ", "_");

  const parentNamespace = extractPolicyNamespace(policies, parentPath);
  parentNamespace[lastSegment] = { __title__: !title || title.length === 0 ? "Untitled" : title, __content__: "" };

  updatePoliciesTranslation(language, policies);
  generatePolicyMap(policies["Policies"]["map"]);
  return policies;
}

export async function removePolicyFromTranslation(language: string, policyPath: string) {
  const policies = await getPoliciesFromTranslations(language);

  const splittedPath = policyPath.split(".");
  const parentPath = policyPath.split(".").slice(0, -1).join(".");
  const lastSegment = splittedPath[splittedPath.length - 1];

  const parentNamespace = extractPolicyNamespace(policies, parentPath);
  delete parentNamespace[lastSegment];

  updatePoliciesTranslation(language, policies);
  generatePolicyMap(policies["Policies"]["map"]);
  return policies;
}
