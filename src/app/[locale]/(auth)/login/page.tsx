"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { LoginForm } from "@/components/forms/LoginForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="relative w-full max-w-md">
      <Button
        variant="ghost"
        onClick={() => {
          if (window.history.length > 1) router.back();
          else router.push("/");
        }}
        className="text-muted-foreground hover:text-foreground absolute -top-12 left-0 flex items-center gap-2 hover:bg-transparent"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Voltar à página anterior</span>
      </Button>

      <Card className="border-border bg-card/95 gap-3 shadow-2xl backdrop-blur-sm">
        <CardHeader className="pb-6 text-center">
          <div className="mb-4 flex justify-center">
            <Image src="/images/ludus/logo-texto.svg" width={132} height={41} alt="Logo da Ludus" priority />
          </div>

          <CardTitle className="text-foreground font-ludus-pixelify-sans text-3xl">Bem-vindo de volta!</CardTitle>

          <CardDescription className="text-muted-foreground text-lg">Entre na sua conta Ludus</CardDescription>
        </CardHeader>

        <CardContent>
          <LoginForm />

          <div className="pt-4 text-center">
            <p className="text-muted-foreground">
              Não tem uma conta?{" "}
              <Button asChild variant="link" className="text-primary h-auto p-0 hover:underline">
                <Link href="/register">Registre-se gratuitamente</Link>
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>

      <footer className="mt-6 text-center">
        <p className="text-muted-foreground text-sm">🎮 Celebrando a cultura gamer brasileira</p>
      </footer>
    </div>
  );
}
