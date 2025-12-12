import z from "zod";

import { Translator } from "../utils/localization.util";

export type RegisterSchema = z.infer<ReturnType<typeof createRegisterSchema>>;

export function createRegisterSchema(translator: Translator) {
  return z
    .object({
      firstName: z.string().min(1, translator("required")),
      lastName: z.string().min(1, translator("required")),
      username: z.string().min(3, translator("min_length", { min: 3 })),
      email: z
        .string()
        .min(1, translator("required"))
        .pipe(z.email(translator("email_invalid"))),
      region: z.string().min(1, translator("required")),
      birthDate: z.coerce
        .date({
          message: translator("invalid_date"),
        })
        .refine((date) => date >= new Date("1900-01-01"), translator("invalid_date")),
      password: z.string().min(6, translator("min_length", { min: 6 })),
      confirmPassword: z.string().min(6, translator("min_length", { min: 6 })),
      agreeTerms: z.boolean().refine((val) => val === true, {
        message: translator("terms_required"),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: translator("password_mismatch"),
      path: ["confirmPassword"],
    });
}
