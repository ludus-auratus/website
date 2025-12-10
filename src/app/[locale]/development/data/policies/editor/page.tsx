import { PolicyEditor } from "@/components/pages/policies/PolicyEditor";
import { getSupportedLanguages } from "@/lib/utils/localization.util";

export default function PoliciesEditorPage() {
  const supportedLanguages = getSupportedLanguages();

  return <PolicyEditor supportedLanguages={supportedLanguages} />;
}
