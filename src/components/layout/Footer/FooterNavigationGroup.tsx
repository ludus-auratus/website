import Link from "next/link";

interface FooterNavigationLink {
  name: string;
  href: string;
}

interface FooterNavigationGroupProps {
  title: string;
  links: FooterNavigationLink[];
}

export function FooterNavigationGroup({ title, links }: FooterNavigationGroupProps) {
  return (
    <div>
      <h3 className="text-foreground font-ludus-pixelify-sans mb-4">{title}</h3>

      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="text-muted-foreground hover:text-primary text-sm transition-colors duration-200"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
