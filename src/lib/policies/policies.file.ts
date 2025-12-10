import articleMap from "@/assets/data/policies/map.json";

import { PolicyNavigationMap } from "./policies.type";

export function getPoliciesNaviagationMap(): PolicyNavigationMap {
  return articleMap as PolicyNavigationMap;
}
