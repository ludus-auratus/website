"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";

export function LoginForm() {
  const t = useTranslations("Auth.forms.login");
  const tValidation = useTranslations("Validation");
  const router = useRouter();
  const queryParams = useSearchParams();

  const [showPassword, setShowPassword] = useState(false);

  const loginSchema = z.object({
    email: z
      .string()
      .min(1, tValidation("required"))
      .pipe(z.email(tValidation("email_invalid"))),
    password: z.string().min(1, tValidation("required")),
  });

  type LoginFormData = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormData) {
    try {
      const { email, password } = data;
      const callback = queryParams.get("callbackUrl") ?? "/";
      const res = await signIn("credentials", { callbackUrl: callback, email, password, redirect: false });
      console.log(JSON.stringify(res, null, 2));
      if (!res?.ok) {
        const errorMessage = tValidation("email_or_password_invalid");

        setError("email", {
          type: "manual",
          message: errorMessage,
        });

        setError("password", {
          type: "manual",
          message: errorMessage,
        });

        toast.error(t("error_title"), {
          description: t("error_credentials"),
        });

        return;
      }

      toast.success(t("success_title"));
      router.replace(callback);
    } catch (error) {
      console.error("Erro no login:", error);
      toast.error(t("error_title"), {
        description: t("error_description"),
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" aria-label={t("aria_label")} noValidate>
      <div className="space-y-2">
        <Label htmlFor="email">{t("email")}</Label>

        <Input
          id="email"
          type="email"
          placeholder={t("email_placeholder")}
          {...register("email")}
          autoComplete="email"
          disabled={isSubmitting}
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">{t("password")}</Label>

        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder={t("password_placeholder")}
            {...register("password")}
            autoComplete="current-password"
            className="pr-12"
            disabled={isSubmitting}
            aria-invalid={!!errors.password}
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

      <div className="flex items-center justify-between">
        <Button type="button" variant="link" className="text-primary h-auto p-0 text-sm" disabled={isSubmitting}>
          {t("forgot_password")}
        </Button>
      </div>

      <Button
        type="submit"
        className="h-12 w-full rounded-xl text-lg shadow-lg transition-all duration-200 hover:shadow-xl"
        disabled={isSubmitting}
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
