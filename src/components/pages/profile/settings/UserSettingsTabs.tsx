import React, { ForwardRefExoticComponent, use } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { Code, User } from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { UserSettingsDeveloperTab } from "./tabs/UserSettingsDeveloperTab";
import { UserSettingsPreferences } from "./tabs/UserSettingsPreferences";
import { UserSettingsProfileTab } from "./tabs/UserSettingsProfileTab";

interface TabData {
  id: string;
  icon: ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
  component: ({ tabId }: { tabId: string }) => React.JSX.Element;
  language?: {
    allow?: string[];
    block?: string[];
  };
}

const tabs: TabData[] = [
  {
    id: "profile",
    icon: User,
    component: UserSettingsProfileTab,
  },
  // {
  //   id: "developer",
  //   icon: Code,
  //   component: UserSettingsDeveloperTab,
  //   language: {
  //     allow: ["pt-BR"],
  //     block: ["en-US"],
  //   },
  // },
  // {
  //   id: "preferences",
  //   icon: Tag,
  //   component: UserSettingsPreferences,
  // },
  // {
  //   id: "privacy",
  //   icon: Shield,
  //   component: UserSettingsPrivacyTab,
  // },
  // {
  //   id: "appearance",
  //   icon: Palette,
  //   component: UserSettingsAppearenceTab,
  // },
  // {
  //   id: "notifications",
  //   icon: Bell,
  //   component: UserSettingsNotificationsTab,
  // },
];

export function UserSettingsTabs() {
  const t = use(getTranslations("UserSettings"));
  const locale = use(getLocale());
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="mb-8 flex w-full">
        {tabs
          .filter((tab) => {
            if (tab.language) {
              return (
                (tab.language.allow ? tab.language.allow.includes(locale) : true) &&
                (tab.language.block ? !tab.language.block.includes(locale) : true)
              );
            }
            return true;
          })
          .map((tab, index) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger key={index} value={tab.id} className="flex items-center space-x-2">
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{t(`tabs.${tab.id}`)}</span>
              </TabsTrigger>
            );
          })}
      </TabsList>

      {tabs.map((tab, index) => {
        const Component = tab.component;
        return <Component key={index} tabId={tab.id} />;
      })}
    </Tabs>
  );
}
