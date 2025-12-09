"use client";

import { useEffect, useRef } from "react";
import Markdown from "react-markdown";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useTeam } from "@/context/TeamContext";
import { MemberData } from "@/lib/utils/team.utils";

export function TeamTabs({ team }: { team: MemberData[] }) {
  const t = useTranslations("Team");
  const { selected } = useTeam();

  return (
    <Tabs defaultValue={team[0].src} value={team[selected].src}>
      {team.map((member, index) => (
        <TabsContent key={index} value={member.src}>
          <div className="flex flex-col gap-8 md:flex-row">
            <Image
              src={`/images/ludus/team/card/${member.src}.jpg`}
              alt=""
              width={160}
              height={160}
              className="mx-auto w-64 rounded-lg md:mx-0"
            />
            <div className="flex flex-col">
              <h2 className="text-center text-2xl font-bold md:text-left">{member.name}</h2>
              <p className="text-accent w-full text-center md:text-left">
                {member.roles.map((role) => t(`roles.${role}`)).join(" / ")}
              </p>
            </div>
            <div>
              <Markdown>{member.description}</Markdown>
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
