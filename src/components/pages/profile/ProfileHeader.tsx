"use client";

import { useEffect, useState } from "react";
import { useFormatter, useTranslations } from "next-intl";
import { Calendar, Code2, Edit, Library } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProfile } from "@/lib/profile/profile.api";
import { Profile } from "@/lib/profile/profile.dto";

export function ProfileHeader() {
  const t = useTranslations("Profile");
  const format = useFormatter();

  const userId = 1;
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getProfile(userId);

        setProfile(data);
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
      }
    }

    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <div className="mb-8">
        <Card>
          <CardContent className="h-40 p-6">
            <div className="flex animate-pulse items-center space-x-4">
              <div className="bg-muted h-20 w-20 rounded-full"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="bg-muted h-4 w-3/4 rounded"></div>
                <div className="bg-muted h-4 w-1/2 rounded"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-start space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-6">
            <Avatar className="h-20 w-20 self-center">
              <AvatarImage src={profile.avatar ?? undefined} />
              <AvatarFallback className="bg-primary text-primary-foreground font-ludus-pixelify-sans text-2xl">
                {(profile.name || "")
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .substring(0, 2)
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="w-full flex-1 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-6 flex-1">
                  <h1 className="font-ludus-pixelify-sans text-2xl font-bold">{profile.name || "Usuário"}</h1>
                  <p className="text-muted-foreground">{profile.email}</p>

                  <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {t("header.member_since", {
                        date:
                          profile.memberSince && !isNaN(profile.memberSince.getTime())
                            ? format.dateTime(profile.memberSince, {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                              })
                            : "--/--/----",
                      })}
                    </div>

                    <div className="flex flex-row gap-4">
                      <div className="flex items-center">
                        <Library className="mr-1 h-4 w-4" />
                        {t("header.games_count", { count: profile.libraryCount })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row gap-2 sm:flex-col">
                  <Button variant="outline" className="flex-1 sm:mt-0">
                    <Edit className="mr-2 h-4 w-4" />
                    {t("header.edit_profile")}
                  </Button>

                  <Button variant="outline" className="flex-1 sm:mt-0">
                    <Code2 className="mr-2 h-4 w-4" />
                    {t("header.dev_panel")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
