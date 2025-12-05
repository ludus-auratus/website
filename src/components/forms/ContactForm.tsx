"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import { useTranslations } from "next-intl";
import { Loader2, Mail } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";

export function ContactForm() {
  const t = useTranslations("Contact.form");
  const tValidation = useTranslations("Validation");
  const [isPending, startTransition] = useTransition();

  const contactSchema = z.object({
    name: z.string().min(1, tValidation("required")),
    email: z.string().min(1, tValidation("required")).email(tValidation("email_invalid")),
    subject: z.string().min(1, tValidation("required")),
    message: z.string().min(1, tValidation("required")),
  });

  type ContactFormData = z.infer<typeof contactSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(data: ContactFormData) {
    console.log("Contato enviado:", data);

    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      redirect("/");
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-2xl space-y-6"
      aria-label={t("aria_label")}
      noValidate
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground">
            {t("name")} *
          </Label>

          <Input
            id="name"
            type="text"
            placeholder={t("name_placeholder")}
            {...register("name")}
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground">
            {t("email")} *
          </Label>

          <Input
            id="email"
            type="email"
            placeholder={t("email_placeholder")}
            {...register("email")}
            autoComplete="email"
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject" className="text-foreground">
          {t("subject")} *
        </Label>

        <Input
          id="subject"
          type="text"
          placeholder={t("subject_placeholder")}
          {...register("subject")}
          aria-invalid={!!errors.subject}
        />
        {errors.subject && <p className="text-destructive text-sm">{errors.subject.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-foreground">
          {t("message")} *
        </Label>

        <Textarea
          id="message"
          placeholder={t("message_placeholder")}
          rows={6}
          {...register("message")}
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="text-destructive text-sm">{errors.message.message}</p>}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="h-12 w-full rounded-xl text-lg shadow-lg transition-all duration-200 hover:shadow-xl"
      >
        {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-4 w-4" />}
        {t("submit")}
      </Button>
    </form>
  );
}
