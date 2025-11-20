import Link from "next/link";
import { useTranslations } from "next-intl";

interface FooterNavigationLink {
  name: string;
  href: string;
}

interface FooterNavigationGroupProps {
  title: string;
  links: FooterNavigationLink[];
}

export function FooterNavigationGroup({ title, links }: FooterNavigationGroupProps) {
  const t = useTranslations(`Footer.navigation.${title}`);

  return (
    <div>
      <h3 className="text-foreground font-ludus-pixelify-sans mb-4">{t(`_`)}</h3>

      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="text-muted-foreground hover:text-primary text-sm transition-colors duration-200"
            >
              {t(`${link.name}`)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
