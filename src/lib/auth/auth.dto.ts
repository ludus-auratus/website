export interface RegisterDTO {
  nomeCompleto: string;
  nomeExibicao: string;
  dataNascimento: Date;
  email: string;
  telefone?: string;
  senha: string;
  consentimentoLGPD: boolean;
}
