import { env } from "@/config/env";

import { GetOrdersResponse } from "./order.dto";
import { CreateOrderDto } from "./order.type";

const API_URL = `${env.API_BASE_URL}/pedido`;

export async function createOrder(dto: CreateOrderDto): Promise<void> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dto),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Erro ao criar pedido: ${response.statusText} - ${errorBody}`);
  }
}

export async function getOrders(usuarioId: number): Promise<GetOrdersResponse> {
  const response = await fetch(`${API_URL}/usuario/${usuarioId}`, {
    method: "GET",
    next: {
      revalidate: 0,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Erro ao buscar pedidos: ${response.statusText} - ${errorBody}`);
  }

  return response.json();
}
