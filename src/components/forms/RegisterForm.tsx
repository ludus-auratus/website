"use client";

import { useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
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
    <form onSubmit={handleSubmit} className="space-y-6" aria-label="Formulário de registro">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-foreground">
            Nome *
          </Label>

          <Input
            id="firstName"
            type="text"
            placeholder="João"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-foreground">
            Sobrenome *
          </Label>

          <Input
            id="lastName"
            type="text"
            placeholder="Silva"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="username" className="text-foreground">
          Nome de usuário *
        </Label>

        <Input
          id="username"
          type="text"
          placeholder="gamer_brasileiro"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground">
          Email *
        </Label>

        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="region" className="text-foreground">
            Estado
          </Label>

          <Select
            value={formData.region}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, region: value }))}
          >
            <SelectTrigger size="default" className="bg-input-background w-full">
              <SelectValue placeholder="Selecione seu estado" />
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
            Ano de nascimento
          </Label>

          <Input
            id="birthYear"
            type="number"
            placeholder="1990"
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
            Senha *
          </Label>

          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
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
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
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
            Confirmar senha *
          </Label>

          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
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
              aria-label={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
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
            Eu concordo com os{" "}
            <Link href="/" className="text-primary hover:underline">
              Termos de Uso
            </Link>{" "}
            e{" "}
            <Link href="/" className="text-primary hover:underline">
              Política de Privacidade
            </Link>{" "}
            do Ludus *
          </Label>
        </div>
      </div>

      <Button
        type="submit"
        disabled={!formData.agreeTerms}
        className="h-12 w-full rounded-xl text-lg shadow-lg hover:shadow-xl"
      >
        Criar Conta
      </Button>
    </form>
  );
}
