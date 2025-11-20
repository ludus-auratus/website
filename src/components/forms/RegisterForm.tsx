"use client";

import { useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useTranslations } from "next-intl";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RegisterFormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  region: string;
  birthYear: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
  agreeNewsletter: boolean;
}

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
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    region: "",
    birthYear: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    agreeNewsletter: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;

    setFormData((prev) => ({ ...prev, [id]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log("Registro enviado:", formData);
    redirect("/");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" aria-label={t("aria_label")}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-foreground">
            {t("first_name")} *
          </Label>

          <Input
            id="firstName"
            type="text"
            placeholder={t("first_name_placeholder")}
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-foreground">
            {t("last_name")} *
          </Label>

          <Input
            id="lastName"
            type="text"
            placeholder={t("last_name_placeholder")}
            value={formData.lastName}
            onChange={handleChange}
            required
          />
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
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground">
          {t("email")} *
        </Label>

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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="region" className="text-foreground">
            {t("region")}
          </Label>

          <Select
            value={formData.region}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, region: value }))}
          >
            <SelectTrigger size="default" className="bg-input-background w-full">
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
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthYear" className="text-foreground">
            {t("birth_year")}
          </Label>

          <Input
            id="birthYear"
            type="number"
            placeholder={t("birth_year_placeholder")}
            min="1950"
            max="2010"
            value={formData.birthYear}
            onChange={handleChange}
          />
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
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
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

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-foreground">
            {t("confirm_password")} *
          </Label>

          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder={t("password_placeholder")}
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              className="pr-12"
              required
            />

            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={showConfirmPassword ? t("hide_password") : t("show_password")}
              className="absolute top-0 right-0 h-12 px-3 hover:bg-transparent"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? (
                <EyeOff className="text-muted-foreground h-4 w-4" />
              ) : (
                <Eye className="text-muted-foreground h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Checkbox
            id="agreeTerms"
            checked={formData.agreeTerms}
            onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, agreeTerms: checked as boolean }))}
            className="mt-1"
            required
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
      </div>

      <Button
        type="submit"
        disabled={!formData.agreeTerms}
        className="h-12 w-full rounded-xl text-lg shadow-lg hover:shadow-xl"
      >
        {t("submit")}
      </Button>
    </form>
  );
}
