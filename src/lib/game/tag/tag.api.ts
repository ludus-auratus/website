import { ApiResponse, Tag } from "../game.type";

interface ApiTag {
  idTag: number;
  tipo: number;
  nome: string;
}

export async function fetchTags(): Promise<Tag[]> {
  const resposta = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tag`, {
    next: { revalidate: 60 },
  });
  const body = (await resposta.json()) as ApiResponse<ApiTag[]>;

  if (!resposta.ok || !body.sucesso) {
    throw new Error(body.mensagem || "Erro ao buscar tags");
  }

  const typeMap: Record<number, Tag["type"]> = {
    0: "genre",
    2: "platform",
    1: "feature",
    3: "accessibility",
  };

  const mappedTags: Tag[] = body.dados.map((tag: ApiTag) => ({
    id: tag.idTag.toString(),
    type: typeMap[tag.tipo] || "genre",
    name: tag.nome,
  }));

  return mappedTags;
}
