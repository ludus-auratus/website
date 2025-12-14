export interface RespostaDto<T> {
  dados: T;
  mensagem: string;
  sucesso: boolean;
}
