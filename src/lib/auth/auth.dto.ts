export interface RegisterDTO {
  nomeCompleto: string;
  nomeExibicao: string;
  dataNascimento: Date;
  email: string;
  senha: string;
  consentimentoLGPD: boolean;
}

export interface LoginDTO {
  email: string;
  senha: string;
}

export interface UserDTO {
  id: number;
  nomeExibicao: string;
  email: string;
  senha: string;
  imagem?: string;
}
