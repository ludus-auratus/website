import Image from "next/image";

import { FooterSocialMedia } from "./FooterSocialMedia";

export function FooterBrand() {
  return (
    <div className="lg:col-span-2">
      <div className="mb-4">
        <Image src="/images/ludus/logo-texto.svg" width={132} height={41} alt="Logo da Ludus" />
      </div>

      <p className="text-muted-foreground mb-4 max-w-sm text-sm">
        A principal plataforma para desenvolvedores e jogadores de jogos indie brasileiros. Conectando talentos,
        fomentando a criatividade e celebrando a vibrante cultura gamer brasileira.
      </p>

      <FooterSocialMedia />
    </div>
  );
}
