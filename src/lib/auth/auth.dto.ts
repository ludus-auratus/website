export interface RegisterDTO {
  NomeCompleto: string;
  NomeExibicao: string;
  DataNascimento: Date;
  Email: string;
  Telefone?: string;
  Senha: string;
  ConsentimentoLGPD: boolean;
}

export interface LoginDTO {
  Email: string;
  Senha: string;
}

export interface UserDTO {
  id: number;
  nomeExibicao: string;
  email: string;
  senha: string;
  imagem?: string;
  desenvolvedor: boolean;
}
