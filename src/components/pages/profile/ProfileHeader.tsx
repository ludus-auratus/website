"use client";

import { useSession } from "next-auth/react";
import { useFormatter, useTranslations } from "next-intl";
import { Calendar, Code2, Edit, Library, MapPin } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { getUserAbbreviation } from "@/lib/auth";

export function ProfileHeader() {
  const t = useTranslations("Profile");
  const format = useFormatter();
  const { library } = useAuth();

  const { data } = useSession();
  const { user } = data!;

  const userAbbreviation = getUserAbbreviation(user!.name!);

  return (
    <div className="mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-start space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-6">
            <Avatar className="h-20 w-20 self-center">
              <AvatarImage src={user!.image!} />
              <AvatarFallback className="bg-primary text-primary-foreground font-ludus-pixelify-sans text-2xl">
                {userAbbreviation}
              </AvatarFallback>
            </Avatar>

            <div className="w-full flex-1 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-6 flex-1">
                  <h1 className="font-ludus-pixelify-sans text-2xl font-bold">{user?.name}</h1>
                  <p className="text-muted-foreground">{user?.email}</p>

                  <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {t("header.member_since", {
                        date: format.dateTime(new Date("2025-11-26"), {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        }),
                      })}
                    </div>

                    <div className="flex flex-row gap-4">
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" />
                        Brasil
                      </div>

                      <div className="flex items-center">
                        <Library className="mr-1 h-4 w-4" />
                        {t("header.games_count", { count: library.length })}
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
