"use client";

import { Calendar, Camera, Eye, EyeOff, Globe, Mail, MapPin, Phone, Shield, Trash2, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useUserSettings } from "@/context/UserSettingsContext";

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

export function UserSettingsProfileTab({ tabId }: { tabId: string }) {
  const { ui, tabs } = useUserSettings();
  const { profile: profileData, setProfile: setProfileData } = tabs;
  const { showPassword, setShowPassword } = ui;
  return (
    <TabsContent value={tabId} className="space-y-6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Profile Picture Section */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="font-ludus-pixelify-sans flex items-center space-x-2 text-lg">
              <Camera className="text-primary h-5 w-5" />
              <span>Foto do Perfil</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src="" alt="Profile picture" />
                <AvatarFallback className="bg-primary text-primary-foreground font-ludus-pixelify-sans text-2xl">
                  JS
                </AvatarFallback>
              </Avatar>
              <div className="w-full space-y-2">
                <Button variant="outline" className="w-full">
                  <Camera className="mr-2 h-4 w-4" />
                  Alterar Foto
                </Button>
                <Button variant="outline" className="text-destructive hover:text-destructive w-full">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remover Foto
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-ludus-pixelify-sans flex items-center space-x-2 text-lg">
              <User className="text-primary h-5 w-5" />
              <span>Informações Pessoais</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="">
                  Nome Completo
                </Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) => {
                    setProfileData({ ...profileData, name: e.target.value });
                  }}
                  className=""
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username" className="">
                  Nome de Usuário
                </Label>
                <Input
                  id="username"
                  value={profileData.username}
                  onChange={(e) => {
                    setProfileData({ ...profileData, username: e.target.value });
                  }}
                  className=""
                  placeholder="@"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>E-mail</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => {
                    setProfileData({ ...profileData, email: e.target.value });
                  }}
                  className=""
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Telefone</span>
                </Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => {
                    setProfileData({ ...profileData, phone: e.target.value });
                  }}
                  className=""
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="">
                Biografia
              </Label>
              <Textarea
                id="bio"
                value={profileData.bio}
                onChange={(e) => {
                  setProfileData({ ...profileData, bio: e.target.value });
                }}
                className="min-h-20"
                placeholder="Conte um pouco sobre você..."
              />
              <p className="text-muted-foreground text-xs">{profileData.bio.length}/500 caracteres</p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="birthDate" className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Data de Nascimento</span>
                </Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={profileData.birthDate.toISOString().split("T")[0]}
                  onChange={(e) => {
                    setProfileData({ ...profileData, birthDate: new Date(e.target.value) });
                  }}
                  className=""
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Section */}
      <Card>
        <CardHeader>
          <CardTitle className="font-ludus-pixelify-sans flex items-center space-x-2 text-lg">
            <Shield className="text-primary h-5 w-5" />
            <span>Segurança da Conta</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="">
                Senha Atual
              </Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPassword ? "text" : "password"}
                  className="pr-10"
                  placeholder="••••••••"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="text-muted-foreground h-4 w-4" />
                  ) : (
                    <Eye className="text-muted-foreground h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="">
                Nova Senha
              </Label>
              <Input id="newPassword" type="password" className="" placeholder="••••••••" />
            </div>
          </div>
          <Button variant="outline" className="">
            Alterar Senha
          </Button>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
