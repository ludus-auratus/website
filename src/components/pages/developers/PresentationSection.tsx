import Image from "next/image";

const stats = [
  { value: "50K+", label: "Jogadores Ativos" },
  { value: "500+", label: "Jogos Publicados" },
  { value: "R$ 2M+", label: "Pagos aos Devs" },
  { value: "4.8★", label: "Avaliação Média" },
];

export default function PresentationSection() {
  return (
    <section className="relative mx-auto w-full max-w-7xl px-4 py-8 text-center sm:px-8 lg:px-8">
      <Image src="/images/ludus/ludus-marginless.png" width={256} height={256} alt={""} className="mx-auto" />

      <h1 className="text-primary font-ludus-pixelify-sans text-4xl md:text-5xl lg:text-6xl">
        Publique Seus Jogos na
        <br />
        <span className="text-accent">Maior Plataforma Indie</span> do Brasil
      </h1>
      <p className="text-muted-foreground font-ludus-poppins mx-auto max-w-2xl text-lg">
        Alcance milhares de jogadores brasileiros, receba pagamentos justos e conte com ferramentas profissionais para
        gerenciar suas vendas.
      </p>

      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 pt-12 md:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-accent font-ludus-pixelify-sans text-3xl md:text-4xl">{stat.value}</div>
            <div className="text-muted-foreground mt-1 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
