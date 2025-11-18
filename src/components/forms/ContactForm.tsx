"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
    const { id, value } = event.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log("Contato enviado:", formData);

    setIsSubmitting(true);
    redirect("/");
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-6" aria-label="Formulário de contato">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground">
            Nome *
          </Label>

          <Input
            id="name"
            type="text"
            placeholder="Seu nome completo"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground">
            Email *
          </Label>

          <Input
            id="email"
            type="email"
            placeholder="seu.email@exemplo.com"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject" className="text-foreground">
          Assunto *
        </Label>

        <Input
          id="subject"
          type="text"
          placeholder="Sobre o que você gostaria de falar?"
          value={formData.subject}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-foreground">
          Mensagem *
        </Label>

        <Textarea
          id="message"
          placeholder="Escreva sua mensagem aqui..."
          rows={6}
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-xl text-lg shadow-lg transition-all duration-200 hover:shadow-xl"
      >
        <Mail className="mr-2 h-4 w-4" />
        Enviar Mensagem
      </Button>
    </form>
  );
}
