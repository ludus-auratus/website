import { LuGithub, LuInstagram, LuLinkedin } from "react-icons/lu";
import Link from "next/link";

const socialLinks = [
  { name: "LinkedIn", icon: LuLinkedin, href: "https://www.linkedin.com/company/ludus-auratus" },
  { name: "Instagram", icon: LuInstagram, href: "https://www.instagram.com/ludus_proa/" },
  { name: "GitHub", icon: LuGithub, href: "https://github.com/ludus-auratus" },
];

export function FooterSocialMedia() {
  return (
    <div className="flex items-center gap-3">
      {socialLinks.map((social) => {
        const Icon = social.icon;

        return (
          <Link
            key={social.name}
            href={social.href}
            className="bg-secondary hover:bg-primary group flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-300"
            aria-label={social.name}
            target="_blank"
          >
            <Icon className="text-muted-foreground group-hover:text-primary-foreground h-4 w-4 transition-colors" />
          </Link>
        );
      })}
    </div>
  );
}
