import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "Quanto tempo leva para meu jogo ser aprovado?",
    answer:
      "Nosso processo de revisão leva em média 24 a 48 horas úteis. Verificamos aspectos técnicos, conteúdo e qualidade geral. Você receberá feedback detalhado caso haja algo a ajustar.",
  },
  {
    question: "Como funciona o pagamento das vendas?",
    answer:
      "Os pagamentos são processados automaticamente todo dia 15 do mês via PIX ou transferência bancária. Você recebe 85% (Free), 90% (Pro) ou 95% (Enterprise) do valor de cada venda, já descontadas as taxas de processamento.",
  },
  {
    question: "Posso publicar meu jogo em outras plataformas também?",
    answer:
      "Sim! Não exigimos exclusividade. Você é livre para publicar seu jogo onde quiser. Recomendamos apenas que mantenha seus jogos atualizados em todas as plataformas.",
  },
  {
    question: "Que tipo de jogos são aceitos na Ludus?",
    answer:
      "Aceitamos jogos indies de todos os gêneros, desde que sejam desenvolvidos por brasileiros ou contenham elementos culturais brasileiros. Priorizamos qualidade, originalidade e jogabilidade.",
  },
  {
    question: "Preciso ter um CNPJ para vender jogos?",
    answer:
      "Não necessariamente. Para desenvolvedores individuais, aceitamos CPF. Porém, para valores mais altos, recomendamos ter MEI ou CNPJ devido a questões tributárias.",
  },
  {
    question: "Vocês ajudam com marketing e divulgação?",
    answer:
      "Sim! Todos os jogos recebem divulgação básica em nossas redes sociais. Jogos de qualidade excepcional podem ser destacados na homepage e eventos especiais. Planos Pro e Enterprise têm benefícios adicionais.",
  },
  {
    question: "Posso fazer atualizações no meu jogo depois de publicado?",
    answer:
      "Sim! Você pode fazer quantas atualizações quiser, sem custo adicional. Basta fazer upload da nova versão através do painel de desenvolvedor.",
  },
  {
    question: "Como funciona o sistema de chaves (keys) para revisar e betas?",
    answer:
      "Você pode gerar chaves gratuitas ilimitadas para imprensa, influencers, beta testers e revisores. Isso não afeta sua receita e ajuda na divulgação do jogo.",
  },
];

export default function FaqSection() {
  return (
    <section className="mx-auto max-w-4xl space-y-8">
      <div className="space-y-3 text-center">
        <h2 className="text-primary font-ludus-pixelify-sans text-3xl md:text-4xl">Perguntas Frequentes</h2>
        <p className="text-muted-foreground">Tire suas dúvidas sobre como publicar na Ludus</p>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border-border data-[state=open]:border-accent rounded-2xl border-2 px-6 transition-colors"
          >
            <AccordionTrigger className="py-6 text-left hover:no-underline">
              <span className="text-foreground font-ludus-pixelify-sans">{faq.question}</span>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-6">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
