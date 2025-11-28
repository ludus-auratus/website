"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";

interface LoginFormData {
  email: string;
  password: string;
}

export function LoginForm() {
  const t = useTranslations("Auth.forms.login");
  const router = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState<LoginFormData>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;

    setFormData((prev) => ({ ...prev, [id]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    startTransition(async () => {
      try {
        const success = await login(formData.email, formData.password);

        if (success) {
          toast.success("Login realizado com sucesso!", {
            description: "Você será redirecionado em instantes.",
          });

          router.push("/");
          router.refresh();
        } else {
          toast.error("Erro ao fazer login", {
            description: "Email ou senha incorretos. Tente novamente.",
          });
        }
      } catch (error) {
        console.error("Erro no login:", error);
        toast.error("Erro inesperado", {
          description: "Ocorreu um erro ao processar seu login. Tente novamente.",
        });
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" aria-label={t("aria_label")}>
      <div className="space-y-2">
        <Label htmlFor="email">{t("email")}</Label>

        <Input
          id="email"
          type="email"
          placeholder={t("email_placeholder")}
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          disabled={isPending}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">{t("password")}</Label>

        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder={t("password_placeholder")}
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            className="pr-12"
            disabled={isPending}
            required
          />

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={showPassword ? t("hide_password") : t("show_password")}
            className="absolute top-0 right-0 h-12 px-3 hover:bg-transparent"
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={isPending}
          >
            {showPassword ? (
              <EyeOff className="text-muted-foreground h-4 w-4" />
            ) : (
              <Eye className="text-muted-foreground h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button type="button" variant="link" className="text-primary h-auto p-0 text-sm" disabled={isPending}>
          {t("forgot_password")}
        </Button>
      </div>

      <Button
        type="submit"
        className="h-12 w-full rounded-xl text-lg shadow-lg transition-all duration-200 hover:shadow-xl"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Entrando...
          </>
        ) : (
          t("submit")
        )}
      </Button>
    </form>
  );
}
