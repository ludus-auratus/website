"use client";

import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginFormData {
  email: string;
  password: string;
}

export function LoginForm() {
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
    <form onSubmit={handleSubmit} className="space-y-6" aria-label="Formulário de login">
      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>

        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          className="bg-input-background border-border focus:border-primary focus:ring-primary h-12"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>

        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            className="bg-input-background border-border focus:border-primary focus:ring-primary h-12 pr-12"
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
              <LuEyeOff className="text-muted-foreground h-4 w-4" />
            ) : (
              <LuEye className="text-muted-foreground h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button type="button" variant="link" className="text-primary h-auto p-0 text-sm">
          Esqueceu a senha?
        </Button>
      </div>

      <Button
        type="submit"
        className="bg-primary text-primary-foreground h-12 w-full rounded-xl text-lg shadow-lg transition-all duration-200 hover:shadow-xl"
      >
        Entrar
      </Button>
    </form>
  );
}
