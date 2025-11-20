import { useTranslations } from "next-intl";

import LanguageSelector from "@/components/layout/LanguageSelector/LanguageSelector";
import { Button } from "@/components/ui/button";

export default function Page() {
  const t = useTranslations("Test");
  const variants: ("default" | "secondary" | "destructive" | "ghost" | "outline" | "link")[] = [
    "default",
    "secondary",
    "destructive",
    "ghost",
    "outline",
    "link",
  ];
  return (
    <div className="m-auto flex flex-col items-center">
      <div className="mb-10">
        <LanguageSelector />
      </div>

      <div className="flex gap-2">
        <div className="flex flex-col gap-2">
          {variants.map((v) => (
            <Button key={v} variant={v}>
              {t(`${v}`)}
            </Button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {variants.map((v) => (
            <Button key={v} variant={v} disabled>
              {t(`${v}`)}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
