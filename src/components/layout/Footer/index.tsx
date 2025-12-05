import { FooterBottom } from "./FooterBottom";
import { FooterBrand } from "./FooterBrand";
import { FooterContent } from "./FooterContent";
import { FooterNavigationGroup } from "./FooterNavigationGroup";
import { FooterRoot } from "./FooterRoot";
import { FooterSeparator } from "./FooterSeparator";

type FooterLink = { name: string; href: string };

const footerLinks: Record<string, FooterLink[]> = {
  about: [
    { name: "about_us", href: "/about-us" },
    { name: "developers", href: "/about-us#developers" },
  ],
  support: [
    { name: "contact", href: "#" },
    { name: "faq", href: "#" },
  ],
  legal: [
    { name: "terms_of_use", href: "#" },
    { name: "privacy", href: "#" },
  ],
};

export function Footer() {
  return (
    <FooterRoot>
      <FooterContent>
        <FooterBrand />

        {Object.keys(footerLinks).map((key, index) => {
          return <FooterNavigationGroup key={`nav-group-${index}`} title={key} links={footerLinks[key]} />;
        })}
      </FooterContent>

      <FooterSeparator />

      <FooterBottom />
    </FooterRoot>
  );
}
