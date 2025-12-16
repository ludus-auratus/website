import { redirect } from "next/navigation";

import { UserSettingsHeader } from "@/components/pages/profile/settings/UserSettingsHeader";
import { UserSettingsTabs } from "@/components/pages/profile/settings/UserSettingsTabs";
import { UserSettingsProvider } from "@/context/UserSettingsContext";

interface SettingsPageProps {
  onBack: () => void;
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}

const brazilianStates = [
  "Acre",
  "Alagoas",
  "Amapá",
  "Amazonas",
  "Bahia",
  "Ceará",
  "Distrito Federal",
  "Espírito Santo",
  "Goiás",
  "Maranhão",
  "Mato Grosso",
  "Mato Grosso do Sul",
  "Minas Gerais",
  "Pará",
  "Paraíba",
  "Paraná",
  "Pernambuco",
  "Piauí",
  "Rio de Janeiro",
  "Rio Grande do Norte",
  "Rio Grande do Sul",
  "Rondônia",
  "Roraima",
  "Santa Catarina",
  "São Paulo",
  "Sergipe",
  "Tocantins",
];

export default function SettingsPage({ onBack, isDark, setIsDark }: SettingsPageProps) {
  redirect("/");
  // return (
  //   <UserSettingsProvider>
  //     <div className="bg-background min-h-screen">
  //       <UserSettingsHeader />

  //       <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
  //         <UserSettingsTabs />
  //       </div>
  //     </div>
  //   </UserSettingsProvider>
  // );
}
