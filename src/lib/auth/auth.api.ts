import { Session, User } from "next-auth";

import { env } from "@/config/env";

import { RespostaDto } from "../common.dto";

import { LoginDTO, RegisterDTO, UserDTO } from "./auth.dto";

const API_URL = `${env.API_BASE_URL}/usuarios`;

export async function registerUser(dto: RegisterDTO) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dto),
  });

  if (!response.ok) {
    throw new Error(`Erro ao cadastrar usuário: ${response.statusText}`);
  }

  const data = (await response.json()) as RespostaDto<void>;

  if (!data.sucesso) {
    throw new Error(data.mensagem || "Erro ao cadastrar usuário.");
  }
}

export async function loginUser(dto: LoginDTO): Promise<UserDTO | null> {
  /// @WIP: Requisição real
  return dto.Senha === "123456"
    ? {
        id: 1,
        nomeExibicao: "Matheus Caldas",
        email: dto.Email,
        senha: dto.Senha,
        imagem: undefined,
        desenvolvedor: true,
      }
    : null;
}

export interface DetailedSession extends Session {
  user: Session["user"] & {
    isDeveloper: boolean;
  };
}

export type DetailedUser = User & {
  isDeveloper: boolean;
};
