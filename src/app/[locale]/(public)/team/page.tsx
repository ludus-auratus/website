import { getTranslations } from "next-intl/server";

import {
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionRoot,
  SectionTitle,
  SectionTitleText,
} from "@/components/layout/Section";
import { TeamCarousel } from "@/components/pages/team/TeamCarousel";
import { TeamTabs } from "@/components/pages/team/TeamTabs";
import { TeamProvider } from "@/context/TeamContext";
import { MemberData } from "@/lib/utils/team.utils";

const team: MemberData[] = [
  {
    name: "Nicole Gregorio",
    roles: ["product_owner"],
    alt: "",
    src: "nicole",
    description: "",
  },
  { name: "Kayque Silva", roles: ["scrum_master"], alt: "", src: "kayque", description: "" },
  { name: "Gustavo Michel", roles: ["data_base", "backend"], alt: "", src: "gustavo", description: "" },
  { name: "Matheus Caldas", roles: ["financial", "fullstack"], alt: "", src: "matheus", description: "" },
  { name: "Mizael Santos", roles: ["marketing", "fullstack"], alt: "", src: "mizael", description: "" },
  { name: "Pedro Alves", roles: ["fullstack"], alt: "", src: "pedro", description: "" },
  { name: "Raquel Queiroz", roles: ["ui_ux", "fullstack"], alt: "", src: "raquel", description: "" },
  { name: "Ludus", roles: ["artificial_intelligence"], alt: "", src: "ludus", description: "" },
];

export default async function TeamPage() {
  const t = await getTranslations("Team");

  return (
    <TeamProvider>
      <SectionRoot>
        <SectionHeader>
          <SectionTitle>
            <SectionTitleText text={t("title")} />
          </SectionTitle>
          <SectionDescription>{t("description")}</SectionDescription>
        </SectionHeader>
        <SectionContent>
          <TeamCarousel team={team} />
        </SectionContent>
      </SectionRoot>
      <SectionRoot>
        <SectionContent>
          <TeamTabs team={team} />
        </SectionContent>
      </SectionRoot>
    </TeamProvider>
  );
}
