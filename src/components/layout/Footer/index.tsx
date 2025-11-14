import { FooterBottom } from "./FooterBottom";
import { FooterBrand } from "./FooterBrand";
import { FooterContent } from "./FooterContent";
import { FooterNavigationGroup } from "./FooterNavigationGroup";
import { FooterRoot } from "./FooterRoot";
import { FooterSeparator } from "./FooterSeparator";

const footerLinks = {
  sobre: [
    { name: "Sobre nós", href: "#" },
    { name: "Nossa Missão", href: "#" },
    { name: "Desenvolvedores", href: "#" },
  ],
  suporte: [
    { name: "Centro de Ajuda", href: "#" },
    { name: "Contato", href: "#" },
    { name: "FAQ", href: "#" },
  ],
  legal: [
    { name: "Termos de Uso", href: "#" },
    { name: "Privacidade", href: "#" },
    { name: "Cookies", href: "#" },
  ],
};

export function Footer() {
  return (
    <FooterRoot>
      <FooterContent>
        <FooterBrand />

        <FooterNavigationGroup title="Sobre" links={footerLinks.sobre} />
        <FooterNavigationGroup title="Suporte" links={footerLinks.suporte} />
        <FooterNavigationGroup title="Legal" links={footerLinks.legal} />
      </FooterContent>

      <FooterSeparator />

      <FooterBottom />
    </FooterRoot>
  );
}
