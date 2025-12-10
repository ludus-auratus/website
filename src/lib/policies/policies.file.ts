import { PolicyNavigationMap } from "./policies.type";

export async function getPoliciesNavigationMap(): Promise<PolicyNavigationMap> {
  return (await import("@/assets/data/policies/map.json")) as PolicyNavigationMap;
}
