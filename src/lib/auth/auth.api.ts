import { Session, User } from "next-auth";

import { LoginDTO, RegisterDTO, UserDTO } from "./auth.dto";

export async function registerUser(dto: RegisterDTO) {
  return null;
}

export async function loginUser(dto: LoginDTO): Promise<UserDTO | null> {
  return dto.senha === "123456"
    ? { id: 1, nomeExibicao: "Matheus Caldas", email: dto.email, senha: dto.senha, imagem: undefined }
    : null;
}

export interface DetailedSession extends Session {
  user: Session["user"] & {};
}

export type DetailedUser = User;
