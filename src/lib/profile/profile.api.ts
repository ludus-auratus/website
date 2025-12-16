import { env } from "@/config/env";
import { RespostaDto } from "@/lib/common.dto";

import { Profile, ProfileDto } from "./profile.dto";

const API_URL = `${env.API_BASE_URL}/usuarios`;

export async function getProfile(userId: number): Promise<Profile> {
  const dto = await requestProfile(userId);

  return {
    id: dto.id,
    name: dto.name,
    email: dto.email,
    avatar: dto.avatar,
    memberSince: dto.memberSince ? new Date(dto.memberSince) : new Date(),
    libraryCount: dto.libraryCount,
  };
}

export async function requestProfile(userId: number) {
  const response = await fetch(`${API_URL}/perfil/${userId}`);

  if (!response.ok) {
    throw new Error(`Erro ao buscar perfil: ${response.statusText}`);
  }

  const data = (await response.json()) as RespostaDto<ProfileDto>;

  if (!data.sucesso) {
    throw new Error(data.mensagem || "Erro ao carregar perfil.");
  }

  return data.dados;
}
