import { getTranslations } from "next-intl/server";
import { hash } from "crypto";

import { createErrorResponse, createSucessResponse, validateJsonContentType } from "@/lib/api/api.utils";
import { registerUser } from "@/lib/auth";
import { RegisterDTO } from "@/lib/auth/auth.dto";
import { createRegisterSchema } from "@/lib/auth/auth.zod";

export async function POST(req: Request) {
  const contentValidation = validateJsonContentType(req);
  if (contentValidation) return contentValidation;

  const registerSchema = createRegisterSchema(await getTranslations("Auth.forms.register"));
  const body = await req.json();
  const bodyValidation = registerSchema.safeParse(body);
  if (!bodyValidation.success) return createErrorResponse(400, JSON.stringify(bodyValidation.error.issues));

  const { data } = bodyValidation;

  const dto: RegisterDTO = {
    NomeCompleto: data.fullName,
    NomeExibicao: data.username,
    Email: data.email,
    Senha: data.password,
    Telefone: data.phoneNumber,
    DataNascimento: data.birthDate,
    ConsentimentoLGPD: data.agreeTerms,
  };

  try {
    await registerUser(dto);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    return createErrorResponse(500, errorMessage);
  }

  return createSucessResponse("ok");
}
