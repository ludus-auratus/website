"use client";

import { LuArrowLeft } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { RegisterForm } from "@/components/forms/RegisterForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="relative h-auto w-full max-w-2xl p-4">
      <Button
        variant="ghost"
        onClick={() => {
          if (window.history.length > 1) router.back();
          else router.push("/");
        }}
        className="text-muted-foreground hover:text-foreground absolute -top-12 left-0 flex items-center gap-2 hover:bg-transparent"
      >
        <LuArrowLeft className="h-4 w-4" />
        <span>Voltar à página anterior</span>
      </Button>

      <Card className="border-border bg-card/95 gap-3 shadow-2xl backdrop-blur-sm">
        <CardHeader className="pb-6 text-center">
          <div className="mb-4 flex justify-center">
            <Image src="/images/ludus/logo-texto.svg" width={132} height={41} alt="Logo da Ludus" priority />
          </div>

          <CardTitle className="font-ludus-pixelify-sans text-foreground text-3xl">Junte-se ao Ludus!</CardTitle>

          <CardDescription className="text-muted-foreground text-lg">
            Crie sua conta e descubra os melhores jogos indies brasileiros
          </CardDescription>
        </CardHeader>

        <CardContent>
          <RegisterForm />

          <div className="pt-4 text-center">
            <p className="text-muted-foreground">
              Já tem uma conta?{" "}
              <Button asChild variant="link" className="text-primary h-auto p-0 hover:underline">
                <Link href="/login">Faça login</Link>
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
