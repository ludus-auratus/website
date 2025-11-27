import { Calendar, Code2, Edit, Library, MapPin } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function ProfileHeader() {
  return (
    <div className="mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-start space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-6">
            <Avatar className="h-20 w-20 self-center sm:self-start">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-primary-foreground font-ludus-pixelify-sans text-2xl">
                JN
              </AvatarFallback>
            </Avatar>

            <div className="w-full flex-1 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-6 flex-1">
                  <h1 className="font-ludus-pixelify-sans text-2xl font-bold">Jogador Número 1</h1>
                  <p className="text-muted-foreground">jogadornumero1@ludus.com</p>

                  <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      Membro desde {new Date("2025-11-26").toLocaleDateString("pt-BR")}
                    </div>

                    <div className="flex flex-row gap-4">
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" />
                        {"Brasil"}
                      </div>

                      <div className="flex items-center">
                        <Library className="mr-1 h-4 w-4" />
                        10 jogos
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button variant="outline" className="mt-2 sm:mt-0">
                    <Edit className="mr-2 h-4 w-4" />
                    Editar Perfil
                  </Button>

                  <Button variant="outline" className="mt-2 sm:mt-0">
                    <Code2 className="mr-2 h-4 w-4" />
                    Painel Dev
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
