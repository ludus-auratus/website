"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";

import { LoginForm } from "@/components/forms/LoginForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Login() {
  const t = useTranslations("Auth");

  return (
    <div className="relative w-full max-w-md">
      <Button
        asChild
        variant="ghost"
        className="text-muted-foreground hover:text-foreground absolute -top-12 left-0 flex items-center gap-2 hover:bg-transparent"
      >
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          <span>{t("back_button")}</span>
        </Link>
      </Button>

      <Card className="border-border bg-card/95 gap-3 shadow-2xl backdrop-blur-sm">
        <CardHeader className="pb-6 text-center">
          <div className="mb-4 flex justify-center">
            <Image src="/images/ludus/logo-texto.svg" width={132} height={41} alt="Logo da Ludus" priority />
          </div>

          <CardTitle className="text-foreground font-ludus-pixelify-sans text-3xl">{t("login.title")}</CardTitle>

          <CardDescription className="text-muted-foreground text-lg">{t("login.description")}</CardDescription>
        </CardHeader>

        <CardContent>
          <LoginForm />

          <div className="pt-4 text-center">
            <p className="text-muted-foreground">
              {t("login.no_account")}{" "}
              <Button asChild variant="link" className="text-primary h-auto p-0 hover:underline">
                <Link href="/register">{t("login.register_link")}</Link>
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>

      <footer className="mt-6 text-center">
        <p className="text-muted-foreground text-sm">{t("footer_message")}</p>
      </footer>
    </div>
  );
}
