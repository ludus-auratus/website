import { getSupportedLanguages } from "@/lib/utils/localization.util";

export async function GET() {
  const supported = getSupportedLanguages();
  return Response.json({ supported });
}
