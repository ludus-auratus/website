import { useTranslations } from "next-intl";

type LinkSection = {
  title: string;
  links: RedirectLink[];
};

type RedirectLink = {
  name: string;
  href: string;
};

const footerLinks: Record<string, LinkSection> = {
  ludus: {
    title: "ludus",
    links: [
      { name: "about_us", href: "#" },
      { name: "our_mission", href: "#" },
      { name: "team", href: "#" },
    ],
  },
  help: {
    title: "help",
    links: [
      { name: "help_center", href: "#" },
      { name: "contact", href: "#" },
      { name: "faq", href: "#" },
    ],
  },
  legal: {
    title: "legal",
    links: [
      { name: "terms_of_use", href: "#" },
      { name: "privacy", href: "#" },
      { name: "cookies", href: "#" },
    ],
  },
};

const socialMediaLinks: RedirectLink[] = [
  { name: "Discord", href: "#" },
  { name: "X", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "YouTube", href: "#" },
  { name: "GitHub", href: "#" },
];

export default function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer className="font-ludus-poppins bg-ludus-moss-800 from-ludus-moss-800 to-ludus-moss-950 bg-gradient-to-b to-80% p-6 text-white">
      <div>
        <div className="flex w-full gap-x-10 md:flex-col">
          <div className="gap-x-auto flex flex-wrap justify-between gap-y-4">
            <div className="flex md:items-center lg:mb-auto lg:w-1/3">
              <div className="my-auto size-fit lg:my-0 lg:mr-auto">
                <img src="/img/logo.png" alt="" className="w-128 md:w-32 lg:w-96" />
              </div>
              <p className="text-sm opacity-60">{t("description")}</p>
            </div>
            {Object.keys(footerLinks).map((key) => {
              const { title, links } = footerLinks[key];
              return (
                <div key={key} className="w-2/5 md:w-fit">
                  <h4 className="font-ludus-pixelify-sans mb-2 text-center text-xl font-black md:text-left">
                    {t(`${title}._`)}
                  </h4>
                  <ul className="flex flex-col gap-y-2 text-center text-xs md:text-left">
                    {links.map((link) => (
                      <li key={link.name}>
                        <a href={link.href} className="opacity-60 transition-all hover:underline hover:opacity-100">
                          {t(`${title}.${link.name}`)}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="bg-ludus-lime-500 my-4 h-0.25 w-full"></div>
      <div className="flex flex-col gap-x-8 gap-y-2 text-xs md:flex-row lg:justify-between">
        <p className="text-center opacity-60">{t("copyright")}</p>
        <p className="text-ludus-lime-500 font-ludus-pixelify-sans text-center text-nowrap">
          {t("company_values_1")} <br className="lg:hidden" />
          <span className="hidden lg:inline"> - </span>
          {t("company_values_2")}
        </p>
        <div className="flex flex-col gap-x-5 md:flex-row md:justify-center">
          <p className="text-center text-nowrap opacity-60">{t("follow_us")}:</p>
          <div className="flex flex-wrap justify-center gap-x-5">
            {socialMediaLinks.map((link) => (
              <a key={link.name} href={link.href} className="opacity-60 hover:underline hover:opacity-100">
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
