import { z } from "zod";

export const gamePublishSchema = z.object({
  // Informações Básicas
  gameName: z.string().min(1, "Nome é obrigatório").min(3, "Nome deve ter no mínimo 3 caracteres"),
  price: z.string().optional(),
  releaseDate: z.date().optional(),
  ageRating: z.string().min(1, "Selecione uma classificação"),
  version: z
    .string()
    .min(1, "Versão é obrigatória")
    .regex(/^\d+\.\d+\.\d+$/, "Versão deve seguir o padrão X.Y.Z (ex: 1.0.0)"),
  additional: z.string().optional(),

  // Tags e Categorias
  genres: z.array(z.string()).min(1, "Selecione pelo menos um gênero"),
  features: z.array(z.string()),
  platforms: z.array(z.string()).min(1, "Selecione pelo menos uma plataforma"),
  accessibility: z.array(z.string()),

  // Idiomas
  languages: z
    .array(
      z.object({
        languageId: z.string(),
        interface: z.boolean(),
        subtitles: z.boolean(),
        voiceover: z.boolean(),
      }),
    )
    .min(1, "Selecione pelo menos um idioma")
    .refine(
      (languages) => languages.some((lang) => lang.interface),
      "Pelo menos um idioma deve ter a interface traduzida",
    )
    .refine(
      (languages) => languages.every((lang) => lang.interface || lang.subtitles || lang.voiceover),
      "Selecione pelo menos uma opção de tradução (Interface, Legenda ou Dublagem) para cada idioma selecionado",
    ),

  // Mídias
  coverImage: z
    .custom<File>((file) => file instanceof File, {
      message: "Capa do jogo é obrigatória",
    })
    .nullable()
    .refine((val) => val !== null, { message: "Capa do jogo é obrigatória" }),
  bannerImage: z
    .custom<File>((file) => file instanceof File, {
      message: "Banner do jogo é obrigatório",
    })
    .nullable()
    .refine((val) => val !== null, { message: "Banner do jogo é obrigatório" }),
  galleryImages: z
    .array(
      z.object({
        file: z.custom<File>(),
        title: z.string().min(1, "Título da imagem é obrigatório"),
      }),
    )
    .min(1, "Mínimo de 1 imagem na galeria")
    .max(5, "Máximo de 5 imagens na galeria"),
  trailer: z
    .object({
      url: z.string().optional(),
      title: z.string().optional(),
    })
    .optional()
    .superRefine((data, ctx) => {
      if (!data) return;

      if (data.url && data.url.trim() !== "") {
        if (!z.string().url().safeParse(data.url).success) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "URL inválida",
            path: ["url"],
          });
        }
        if (!data.title || data.title.trim() === "") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Título do trailer é obrigatório",
            path: ["title"],
          });
        }
      }
    }),

  // Arquivo do Jogo
  gameFile: z
    .custom<File>()
    .refine((file) => file instanceof File, "Arquivo do jogo é obrigatório")
    .refine(
      (file) => {
        if (!(file instanceof File)) return false;
        const validTypes = [
          "application/zip",
          "application/x-zip-compressed",
          "application/x-executable",
          "application/x-msdownload",
          "application/octet-stream",
        ];
        return validTypes.includes(file.type) || file.name.endsWith(".zip") || file.name.endsWith(".exe");
      },
      {
        message: "O arquivo deve ser ZIP ou executável (.exe)",
      },
    ),

  // Descrição
  description: z
    .string()
    .min(1, "Descrição é obrigatória")
    .min(100, "Descrição deve ter no mínimo 100 caracteres")
    .max(5000, "Descrição deve ter no máximo 5000 caracteres"),

  // Redes Sociais
  socialMedias: z
    .array(
      z
        .object({
          platform: z.enum(["0", "1", "2", "3", "4"]),
          url: z.string().url("URL inválida"),
        })
        .superRefine((data, ctx) => {
          const { platform, url } = data;
          if (!url) return;

          const patterns: Record<string, { regex: RegExp; message: string }> = {
            "0": { regex: /facebook\.com/, message: "A URL deve ser do Facebook" },
            "1": { regex: /instagram\.com/, message: "A URL deve ser do Instagram" },
            "2": { regex: /(twitter\.com|x\.com)/, message: "A URL deve ser do X (Twitter)" },
            "3": { regex: /(discord\.com|discord\.gg)/, message: "A URL deve ser do Discord" },
            "4": { regex: /(youtube\.com|youtu\.be)/, message: "A URL deve ser do YouTube" },
          };

          const validation = patterns[platform];
          if (validation && !validation.regex.test(url)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: validation.message,
              path: ["url"],
            });
          }
        }),
    )
    .optional()
    .refine(
      (items) => {
        if (!items) return true;
        const platforms = items.map((i) => i.platform);
        return new Set(platforms).size === platforms.length;
      },
      {
        message: "Não é permitido adicionar mais de uma rede social do mesmo tipo",
      },
    ),
});

export type GamePublishFormData = z.infer<typeof gamePublishSchema>;
