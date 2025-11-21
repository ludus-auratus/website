"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";

import { RegisterForm } from "@/components/forms/RegisterForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Register() {
  const t = useTranslations("Auth");

  return (
    <div className="relative h-auto w-full max-w-2xl p-4">
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

          <CardTitle className="font-ludus-pixelify-sans text-foreground text-3xl">{t("register.title")}</CardTitle>

          <CardDescription className="text-muted-foreground text-lg">{t("register.description")}</CardDescription>
        </CardHeader>

        <CardContent>
          <RegisterForm />

          <div className="pt-4 text-center">
            <p className="text-muted-foreground">
              {t("register.has_account")}{" "}
              <Button asChild variant="link" className="text-primary h-auto p-0 hover:underline">
                <Link href="/login">{t("register.login_link")}</Link>
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
