"use client";

import { useState } from "react";
import { Controller, Resolver, useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ApiResponseBody } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";

const brazilianStates = [
  "Acre",
  "Alagoas",
  "Amapá",
  "Amazonas",
  "Bahia",
  "Ceará",
  "Distrito Federal",
  "Espírito Santo",
  "Goiás",
  "Maranhão",
  "Mato Grosso",
  "Mato Grosso do Sul",
  "Minas Gerais",
  "Pará",
  "Paraíba",
  "Paraná",
  "Pernambuco",
  "Piauí",
  "Rio de Janeiro",
  "Rio Grande do Norte",
  "Rio Grande do Sul",
  "Rondônia",
  "Roraima",
  "Santa Catarina",
  "São Paulo",
  "Sergipe",
  "Tocantins",
];

export function RegisterForm() {
  const t = useTranslations("Auth.forms.register");
  const tValidation = useTranslations("Validation");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const queryParams = useSearchParams();
  const router = useRouter();

  const registerSchema = z
    .object({
      firstName: z.string().min(1, tValidation("required")),
      lastName: z.string().min(1, tValidation("required")),
      username: z.string().min(3, tValidation("min_length", { min: 3 })),
      email: z
        .string()
        .min(1, tValidation("required"))
        .pipe(z.email(tValidation("email_invalid"))),
      region: z.string().min(1, tValidation("required")),
      birthDate: z.coerce
        .date({
          message: tValidation("invalid_date"),
        })
        .refine((date) => date >= new Date("1900-01-01"), tValidation("invalid_date")),
      password: z.string().min(6, tValidation("min_length", { min: 6 })),
      confirmPassword: z.string().min(6, tValidation("min_length", { min: 6 })),
      agreeTerms: z.boolean().refine((val) => val === true, {
        message: tValidation("terms_required"),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: tValidation("password_mismatch"),
      path: ["confirmPassword"],
    });

  type RegisterFormData = z.infer<typeof registerSchema>;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema) as Resolver<RegisterFormData>,
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      region: "",
      birthDate: undefined,
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });

  const agreeTerms = watch("agreeTerms");

  async function onSubmit(data: RegisterFormData) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Registro enviado:", data);

      const res = await fetch("/api/auth/register", {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        method: "POST",
      });

      const resBody: ApiResponseBody = await res.json();
      if (!resBody.success) {
        console.log(resBody.error);
        throw resBody.error;
      }

      toast.success(t("success_title"));

      const callback = queryParams.get("callbackUrl") ?? "/";
      signIn("credentials", { callbackUrl: callback, email: data.email, password: data.password });
    } catch (error) {
      console.error("Erro no registro:", error);
      toast.error(t("error_title"), {
        description: t("error_description"),
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" aria-label={t("aria_label")} noValidate>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-foreground">
            {t("first_name")} *
          </Label>

          <Input
            id="firstName"
            type="text"
            placeholder={t("first_name_placeholder")}
            {...register("firstName")}
            aria-invalid={!!errors.firstName}
            disabled={isSubmitting}
          />
          {errors.firstName && <p className="text-destructive text-sm">{errors.firstName.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-foreground">
            {t("last_name")} *
          </Label>

          <Input
            id="lastName"
            type="text"
            placeholder={t("last_name_placeholder")}
            {...register("lastName")}
            aria-invalid={!!errors.lastName}
            disabled={isSubmitting}
          />
          {errors.lastName && <p className="text-destructive text-sm">{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="username" className="text-foreground">
          {t("username")} *
        </Label>

        <Input
          id="username"
          type="text"
          placeholder={t("username_placeholder")}
          {...register("username")}
          aria-invalid={!!errors.username}
          disabled={isSubmitting}
        />
        {errors.username && <p className="text-destructive text-sm">{errors.username.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground">
          {t("email")} *
        </Label>

        <Input
          id="email"
          type="email"
          placeholder={t("email_placeholder")}
          {...register("email")}
          autoComplete="email"
          aria-invalid={!!errors.email}
          disabled={isSubmitting}
        />
        {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="region" className="text-foreground">
            {t("region")} *
          </Label>

          <Controller
            control={control}
            name="region"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                <SelectTrigger size="default" aria-invalid={!!errors.region} className="bg-input-background w-full">
                  <SelectValue placeholder={t("region_placeholder")} />
                </SelectTrigger>

                <SelectContent>
                  {brazilianStates.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.region && <p className="text-destructive text-sm">{errors.region.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthDate" className="text-foreground">
            {t("birth_date")} *
          </Label>

          <Input
            id="birthDate"
            type="date"
            className="input-date"
            placeholder={t("birth_date_placeholder")}
            {...register("birthDate")}
            max={new Date().toISOString().split("T")[0]}
            aria-invalid={!!errors.birthDate}
            disabled={isSubmitting}
          />
          {errors.birthDate && <p className="text-destructive text-sm">{errors.birthDate.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="password" className="text-foreground">
            {t("password")} *
          </Label>

          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder={t("password_placeholder")}
              {...register("password")}
              autoComplete="new-password"
              className="pr-12"
              aria-invalid={!!errors.password}
              disabled={isSubmitting}
            />

            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={showPassword ? t("hide_password") : t("show_password")}
              className="absolute top-0 right-0 h-12 px-3 hover:bg-transparent"
              onClick={() => setShowPassword((prev) => !prev)}
              disabled={isSubmitting}
            >
              {showPassword ? (
                <EyeOff className="text-muted-foreground h-4 w-4" />
              ) : (
                <Eye className="text-muted-foreground h-4 w-4" />
              )}
            </Button>
          </div>
          {errors.password && <p className="text-destructive text-sm">{errors.password.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-foreground">
            {t("confirm_password")} *
          </Label>

          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder={t("password_placeholder")}
              {...register("confirmPassword")}
              autoComplete="new-password"
              className="pr-12"
              aria-invalid={!!errors.confirmPassword}
              disabled={isSubmitting}
            />

            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={showConfirmPassword ? t("hide_password") : t("show_password")}
              className="absolute top-0 right-0 h-12 px-3 hover:bg-transparent"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              disabled={isSubmitting}
            >
              {showConfirmPassword ? (
                <EyeOff className="text-muted-foreground h-4 w-4" />
              ) : (
                <Eye className="text-muted-foreground h-4 w-4" />
              )}
            </Button>
          </div>
          {errors.confirmPassword && <p className="text-destructive text-sm">{errors.confirmPassword.message}</p>}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Controller
            control={control}
            name="agreeTerms"
            render={({ field }) => (
              <Checkbox
                id="agreeTerms"
                checked={field.value}
                onCheckedChange={field.onChange}
                className="mt-1"
                disabled={isSubmitting}
              />
            )}
          />

          <Label htmlFor="agreeTerms" className="text-foreground block text-sm leading-relaxed">
            {t("agree_terms")}{" "}
            <Link href="/" className="text-primary hover:underline">
              {t("terms_of_use")}
            </Link>{" "}
            {t("and")}{" "}
            <Link href="/" className="text-primary hover:underline">
              {t("privacy_policy")}
            </Link>{" "}
            {t("of_ludus")} *
          </Label>
        </div>
        {errors.agreeTerms && <p className="text-destructive text-sm">{errors.agreeTerms.message}</p>}
      </div>

      <Button
        type="submit"
        disabled={!agreeTerms || isSubmitting}
        className="h-12 w-full rounded-xl text-lg shadow-lg hover:shadow-xl"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            {t("submit")}...
          </>
        ) : (
          t("submit")
        )}
      </Button>
    </form>
  );
}
