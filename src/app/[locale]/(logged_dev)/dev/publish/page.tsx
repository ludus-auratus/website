import { PublishGameForm } from "@/components/forms/PublishGameForm";
import { fetchLanguages } from "@/lib/game/language/language.api";
import { fetchTags } from "@/lib/game/tag/tag.api";

export default async function Page() {
  const [tags, languages] = await Promise.all([fetchTags(), fetchLanguages()]);

  return <PublishGameForm initialTags={tags} initialLanguages={languages} />;
}
