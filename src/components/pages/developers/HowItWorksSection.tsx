import { ChevronDown, Code, Rocket, Shield, Users } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Crie sua Conta",
    description: "Registre-se como desenvolvedor e preencha seu perfil de estúdio",
    icon: Users,
  },
  {
    number: "02",
    title: "Prepare seu Jogo",
    description: "Faça upload dos arquivos, imagens, vídeos e descrições do seu jogo",
    icon: Code,
  },
  {
    number: "03",
    title: "Revisão de Qualidade",
    description: "Nossa equipe revisa seu jogo em até 48h para garantir qualidade",
    icon: Shield,
  },
  {
    number: "04",
    title: "Publique e Venda",
    description: "Seu jogo entra no ar e você começa a receber por cada venda",
    icon: Rocket,
  },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-card border-border relative mx-auto w-full max-w-7xl space-y-8 rounded-3xl border p-8 px-4 py-8 sm:px-8 md:p-12 lg:px-8">
      <div className="space-y-3 text-center">
        <h2 className="text-primary font-ludus-pixelify-sans text-3xl md:text-4xl">Como Publicar Seu Jogo</h2>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          Em 4 passos simples, seu jogo estará disponível para milhares de jogadores
        </p>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="border-border absolute top-12 left-[89%] hidden h-0.5 w-1/3 rounded-full border-2 lg:block">
                  <div className="absolute top-1/2 right-0 translate-x-2/3 -translate-y-1/2">
                    <ChevronDown className="text-border h-12 w-12 rotate-[-90deg]" />
                  </div>
                </div>
              )}
              <div className="relative z-10 space-y-4 text-center">
                <div className="bg-accent/10 border-accent mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4">
                  <Icon className="text-accent h-10 w-10" />
                </div>
                <div className="text-accent/40 font-ludus-pixelify-sans text-4xl">{step.number}</div>
                <div>
                  <h3 className="text-foreground font-ludus-pixelify-sans mb-2 text-xl">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
