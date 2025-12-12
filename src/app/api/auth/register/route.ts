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
    nomeCompleto: `${data.firstName} ${data.lastName}`,
    nomeExibicao: data.username,
    consentimentoLGPD: data.agreeTerms,
    dataNascimento: data.birthDate,
    email: data.email,
    senha: hash("sha256", data.password),
  };

  await registerUser(dto);

  return createSucessResponse("ok");
}
