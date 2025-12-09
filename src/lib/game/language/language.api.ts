import { env } from "@/config/env";

import { ApiResponse, Language } from "../game.type";

interface ApiLanguage {
  idIdioma: number;
  nome: string;
  locale: string;
}

export async function fetchLanguages(): Promise<Language[]> {
  const resposta = await fetch(`${env.API_BASE_URL}/idioma`, {
    next: { revalidate: 60 },
  });
  const body = (await resposta.json()) as ApiResponse<ApiLanguage[]>;

  if (!resposta.ok || !body.sucesso) {
    throw new Error(body.mensagem || "Erro ao buscar idiomas");
  }

  const mappedLanguages: Language[] = body.dados.map((lang: ApiLanguage) => ({
    id: lang.idIdioma.toString(),
    name: lang.nome,
    locale: lang.locale,
  }));

  return mappedLanguages;
}
