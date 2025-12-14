import { RespostaDto } from "../common.dto";

export interface ItemPedidoDto {
  jogoId: number;
  jogoNome: string;
  urlIconeJogo: string;
  precoUnitario: number;
}

export interface RetornoPedidoDto {
  id: string;
  data: string;
  status: "Pendente" | "Pago" | "Cancelado" | "Concluido";
  usuarioId: number;
  itens: ItemPedidoDto[];
  total: number;
}

export type GetOrdersResponse = RespostaDto<RetornoPedidoDto[]>;
