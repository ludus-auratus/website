export type CompanyPolicyType = "article" | "section";

export interface CompanyPolicy {
  type: CompanyPolicyType;
  key: string;
  nodes?: CompanyPolicy[];
}

export interface PolicyNavigationMap {
  structure: CompanyPolicy[];
}

export interface PolicyEditorContextData {
  policyPath: string;
  setPolicyPath: (path: string) => void;
}

export interface PolicyTranslation {
  __title__: string;
  __content__: string;
  [key: string]: string | PolicyTranslation;
}
