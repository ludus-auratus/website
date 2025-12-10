"use client";

import { createContext, useContext, useState } from "react";

import {
  UserSettingsContextData,
  UserSettingsDeveloperTab,
  UserSettingsNotificationsTab,
  UserSettingsPreferencesTab,
  UserSettingsPrivacyTab,
  UserSettingsProfileTab,
} from "@/lib/profile/settings";

const UserSettingsContext = createContext<UserSettingsContextData | undefined>(undefined);

export function UserSettingsProvider({ children }: { children: React.ReactNode }) {
  const [changed, setChanged] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState<UserSettingsNotificationsTab>({
    email: true,
    push: true,
    marketing: false,
    gameUpdates: true,
    jamAlerts: true,
    socialActivity: false,
  });

  const [privacy, setPrivacy] = useState<UserSettingsPrivacyTab>({
    profileVisibility: "public",
    showEmail: false,
    showGames: true,
    showAchievements: true,
    dataCollection: true,
  });

  const [preferences, setPreferences] = useState<UserSettingsPreferencesTab>({
    favoriteGenres: ["Aventura", "RPG"],
    difficulty: "Intermediário",
    language: "Português",
    autoPlay: false,
    downloadQuality: "high",
  });

  const [profile, setProfile] = useState<UserSettingsProfileTab>({
    name: "João Silva",
    username: "joao_silva_dev",
    email: "joao.silva@email.com",
    phone: "+55 (11) 99999-9999",
    bio: "Desenvolvedor indie apaixonado por jogos brasileiros com elementos culturais.",
    birthDate: new Date("1992-03-15"),
  });

  const [developer, setDeveloper] = useState<UserSettingsDeveloperTab>({
    approved: false,
    documentation: "",
  });

  const data: UserSettingsContextData = {
    changed,

    ui: {
      showPassword,
      setShowPassword,
    },

    tabs: {
      notifications,
      setNotifications: (state) => {
        setChanged(true);
        setNotifications(state);
      },

      privacy,
      setPrivacy: (state) => {
        setChanged(true);
        setPrivacy(state);
      },

      preferences,
      setPreferences: (state) => {
        setChanged(true);
        setPreferences(state);
      },

      profile,
      setProfile: (state) => {
        setChanged(true);
        setProfile(state);
      },

      developer,
      setDeveloper: (state) => {
        setChanged(true);
        setDeveloper(state);
      },
    },
  };

  return <UserSettingsContext value={data}>{children}</UserSettingsContext>;
}

export function useUserSettings() {
  const context = useContext(UserSettingsContext);

  if (context === undefined) {
    throw new Error("useUserSettings deve ser usado dentro de um UserSettingsProvider");
  }

  return context;
}
