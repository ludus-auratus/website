import { cookies } from "next/headers";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

type SupportedLocale = keyof typeof localizationFileMapping;

const localizationFileMapping = {
  en: "en",
  pt: "pt-BR",
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const filename = localizationFileMapping[locale as SupportedLocale];
  return {
    locale,
    messages: (await import(`../../messages/${filename}.json`)).default,
  };
});
