"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { CartContextData, CartItem } from "@/lib/cart/cart.type";

const CartContext = createContext<CartContextData | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("games-cart");

    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Erro ao carregar carrinho:", error);
      }
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("games-cart", JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addToCart = (game: Omit<CartItem, "quantity">): boolean => {
    const existingItem = items.find((item) => item.id === game.id);

    if (existingItem) {
      return false;
    }

    // Adiciona o jogo com quantidade fixa de 1
    setItems((currentItems) => [...currentItems, { ...game, quantity: 1 }]);
    return true;
  };

  const removeFromCart = (gameId: number) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== gameId));
  };

  const isInCart = (gameId: number): boolean => {
    return items.some((item) => item.id === gameId);
  };

  const clearCart = () => {
    setItems([]);
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  const getGamesCount = () => {
    return items.length;
  };

  const value: CartContextData = {
    items,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    getGamesCount,
    isInCart,
  };

  return <CartContext value={value}>{children}</CartContext>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }

  return context;
}
