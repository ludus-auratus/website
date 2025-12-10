export interface UserSettingsContextData {
  changed: boolean;
  ui: {
    showPassword: boolean;
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  };
  tabs: {
    notifications: {
      email: boolean;
      push: boolean;
      marketing: boolean;
      gameUpdates: boolean;
      jamAlerts: boolean;
      socialActivity: boolean;
    };
    setNotifications: React.Dispatch<React.SetStateAction<UserSettingsContextData["tabs"]["notifications"]>>;

    privacy: {
      profileVisibility: "public" | "private";
      showEmail: boolean;
      showGames: boolean;
      showAchievements: boolean;
      dataCollection: boolean;
    };
    setPrivacy: React.Dispatch<React.SetStateAction<UserSettingsContextData["tabs"]["privacy"]>>;

    preferences: {
      favoriteGenres: string[];
      difficulty: string;
      language: string;
      autoPlay: boolean;
      downloadQuality: "low" | "medium" | "high";
    };
    setPreferences: React.Dispatch<React.SetStateAction<UserSettingsContextData["tabs"]["preferences"]>>;

    profile: {
      name: string;
      username: string;
      email: string;
      phone: string;
      bio: string;
      birthDate: Date;
    };
    setProfile: React.Dispatch<React.SetStateAction<UserSettingsContextData["tabs"]["profile"]>>;

    developer: {
      approved: boolean;
      documentation: string;
    };
    setDeveloper: React.Dispatch<React.SetStateAction<UserSettingsContextData["tabs"]["developer"]>>;
  };
}

export type UserSettingsNotificationsTab = UserSettingsContextData["tabs"]["notifications"];
export type UserSettingsPrivacyTab = UserSettingsContextData["tabs"]["privacy"];
export type UserSettingsPreferencesTab = UserSettingsContextData["tabs"]["preferences"];
export type UserSettingsProfileTab = UserSettingsContextData["tabs"]["profile"];
export type UserSettingsDeveloperTab = UserSettingsContextData["tabs"]["developer"];
