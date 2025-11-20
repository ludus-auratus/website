"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { useTranslations } from "next-intl";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginFormData {
  email: string;
  password: string;
}

export function LoginForm() {
  const t = useTranslations("Auth.forms.login");
  const [formData, setFormData] = useState<LoginFormData>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;

    setFormData((prev) => ({ ...prev, [id]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log("Login enviado:", formData);
    redirect("/");
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
            required
          />

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={showPassword ? t("hide_password") : t("show_password")}
            className="absolute top-0 right-0 h-12 px-3 hover:bg-transparent"
            onClick={() => setShowPassword((prev) => !prev)}
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
        <Button type="button" variant="link" className="text-primary h-auto p-0 text-sm">
          {t("forgot_password")}
        </Button>
      </div>

      <Button
        type="submit"
        className="h-12 w-full rounded-xl text-lg shadow-lg transition-all duration-200 hover:shadow-xl"
      >
        {t("submit")}
      </Button>
    </form>
  );
}
