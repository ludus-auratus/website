"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import router from "next/router";

interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

interface PurchaseItem {
  id: number;
  name: string;
  icon: string;
  price: number;
  rating: number;
}

interface Purchase {
  orderId: string;
  userId: number;
  createdAt: Date;
  status: "paid" | "processing" | "completed";
  items: PurchaseItem[];
  total: number;
}

interface LibraryGame {
  id: number;
  name: string;
  icon: string;
  rating: number;
  purchaseDate: Date;
  orderId: string;
}

interface FavoriteGame {
  id: number;
  name: string;
  icon: string;
  price: number;
  rating: number;
  studio: string;
  addedAt: Date;
}

interface AuthContextData {
  user: User;
  purchases: Purchase[];
  library: LibraryGame[];
  favorites: FavoriteGame[];
  isAuthenticated: () => boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  addPurchase: (purchase: Omit<Purchase, "userId" | "orderId" | "createdAt">) => {
    success: boolean;
    orderId?: string;
    message?: string;
  };
  getPurchaseById: (orderId: string) => Purchase | undefined;
  updatePurchaseStatus: (orderId: string, status: Purchase["status"]) => void;
  isGameInLibrary: (gameId: number) => boolean;
  getLibraryGames: () => LibraryGame[];
  addFavorite: (game: Omit<FavoriteGame, "addedAt">) => void;
  removeFavorite: (gameId: number) => void;
  isFavorite: (gameId: number) => boolean;
}

export const AuthContext = createContext<AuthContextData | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<User>({} as User);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [library, setLibrary] = useState<LibraryGame[]>([]);
  const [favorites, setFavorites] = useState<FavoriteGame[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("games-auth-user");
    const token = localStorage.getItem("games-auth-token");
    const savedPurchases = localStorage.getItem("games-user-purchases");
    const savedLibrary = localStorage.getItem("games-user-library");
    const savedFavorites = localStorage.getItem("games-user-favorites");

    if (savedUser && token) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);

        if (savedPurchases) {
          const allPurchases: Purchase[] = JSON.parse(savedPurchases);
          const userPurchases = allPurchases
            .filter((p) => p.userId === parsedUser.id)
            .map((p) => ({ ...p, createdAt: new Date(p.createdAt) }));
          setPurchases(userPurchases);
        }

        if (savedLibrary) {
          const allLibraries: Record<number, LibraryGame[]> = JSON.parse(savedLibrary);
          const userLibrary = (allLibraries[parsedUser.id] || []).map((game) => ({
            ...game,
            purchaseDate: new Date(game.purchaseDate),
          }));
          setLibrary(userLibrary);
        }

        if (savedFavorites) {
          const allFavorites: Record<number, FavoriteGame[]> = JSON.parse(savedFavorites);
          const userFavorites = (allFavorites[parsedUser.id] || []).map((game) => ({
            ...game,
            addedAt: new Date(game.addedAt),
          }));
          setFavorites(userFavorites);
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        localStorage.removeItem("games-auth-user");
        localStorage.removeItem("games-auth-token");
        localStorage.removeItem("games-user-purchases");
        localStorage.removeItem("games-user-library");
        localStorage.removeItem("games-user-favorites");
      }
    }

    setIsLoading(false);
  }, []);

  const isAuthenticated = (): boolean => {
    if (typeof window === "undefined") return false;
    const token = localStorage.getItem("games-auth-token");
    return !!token && !!user && !!user.id;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const defaultPassword = "-Hk$jR8.f6C@MyR";
      const defaultEmail = "raquel@gmail.com";

      if (email !== defaultEmail || password !== defaultPassword) {
        return false;
      }

      const mockUser: User = {
        id: 1,
        name: "Raquel Queiroz",
        email: email,
        avatar: "https://avatars.githubusercontent.com/u/199012844?v=4",
      };

      const mockToken = "mock-jwt-token-" + Date.now();

      setUser(mockUser);
      localStorage.setItem("games-auth-user", JSON.stringify(mockUser));
      localStorage.setItem("games-auth-token", mockToken);

      const savedPurchases = localStorage.getItem("games-user-purchases");
      if (savedPurchases) {
        try {
          const allPurchases: Purchase[] = JSON.parse(savedPurchases);
          const userPurchases = allPurchases
            .filter((p) => p.userId === mockUser.id)
            .map((p) => ({ ...p, createdAt: new Date(p.createdAt) }));
          setPurchases(userPurchases);
        } catch (error) {
          console.error("Erro ao carregar pedidos:", error);
        }
      }

      const savedLibrary = localStorage.getItem("games-user-library");
      if (savedLibrary) {
        try {
          const allLibraries: Record<number, LibraryGame[]> = JSON.parse(savedLibrary);
          const userLibrary = (allLibraries[mockUser.id] || []).map((game) => ({
            ...game,
            purchaseDate: new Date(game.purchaseDate),
          }));
          setLibrary(userLibrary);
        } catch (error) {
          console.error("Erro ao carregar biblioteca:", error);
        }
      }

      const savedFavorites = localStorage.getItem("games-user-favorites");
      if (savedFavorites) {
        try {
          const allFavorites: Record<number, FavoriteGame[]> = JSON.parse(savedFavorites);
          const userFavorites = (allFavorites[mockUser.id] || []).map((game) => ({
            ...game,
            addedAt: new Date(game.addedAt),
          }));
          setFavorites(userFavorites);
        } catch (error) {
          console.error("Erro ao carregar favoritos:", error);
        }
      }

      return true;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return false;
    }
  };

  const logout = () => {
    setUser({} as User);
    setPurchases([]);
    setLibrary([]);
    setFavorites([]);
    localStorage.removeItem("games-auth-user");
    localStorage.removeItem("games-auth-token");
    localStorage.removeItem("games-user-purchases");
    localStorage.removeItem("games-user-library");
    localStorage.removeItem("games-user-favorites");

    router.push("/login");
  };

  const updateUser = (userData: Partial<User>) => {
    if (!user || !user.id) return;

    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem("games-auth-user", JSON.stringify(updatedUser));
  };

  const isGameInLibrary = (gameId: number): boolean => {
    return library.some((game) => game.id === gameId);
  };

  const addPurchase = (
    purchaseData: Omit<Purchase, "userId" | "orderId" | "createdAt">,
  ): { success: boolean; orderId?: string; message?: string } => {
    if (!user || !user.id) {
      return {
        success: false,
        message: "Usuário não autenticado",
      };
    }

    const gamesAlreadyOwned = purchaseData.items.filter((item) => isGameInLibrary(item.id));

    if (gamesAlreadyOwned.length > 0) {
      const gameNames = gamesAlreadyOwned.map((g) => g.name).join(", ");
      return {
        success: false,
        message: `Você já possui ${gamesAlreadyOwned.length === 1 ? "este jogo" : "estes jogos"}: ${gameNames}`,
      };
    }

    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const purchaseDate = new Date();

    const newPurchase: Purchase = {
      ...purchaseData,
      orderId,
      userId: user.id,
      createdAt: purchaseDate,
    };

    const updatedPurchases = [...purchases, newPurchase];
    setPurchases(updatedPurchases);

    const newLibraryGames: LibraryGame[] = purchaseData.items.map((item) => ({
      id: item.id,
      name: item.name,
      icon: item.icon,
      rating: item.rating,
      purchaseDate,
      orderId,
    }));

    const updatedLibrary = [...library, ...newLibraryGames];
    setLibrary(updatedLibrary);

    try {
      const savedPurchases = localStorage.getItem("games-user-purchases");
      const allPurchases: Purchase[] = savedPurchases ? JSON.parse(savedPurchases) : [];
      allPurchases.push(newPurchase);
      localStorage.setItem("games-user-purchases", JSON.stringify(allPurchases));

      const savedLibrary = localStorage.getItem("games-user-library");
      const allLibraries: Record<number, LibraryGame[]> = savedLibrary ? JSON.parse(savedLibrary) : {};
      allLibraries[user.id] = updatedLibrary;
      localStorage.setItem("games-user-library", JSON.stringify(allLibraries));
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
    }

    return {
      success: true,
      orderId,
    };
  };

  const getPurchaseById = (orderId: string): Purchase | undefined => {
    return purchases.find((p) => p.orderId === orderId);
  };

  const updatePurchaseStatus = (orderId: string, status: Purchase["status"]) => {
    if (!user || !user.id) return;

    const updatedPurchases = purchases.map((p) => (p.orderId === orderId ? { ...p, status } : p));
    setPurchases(updatedPurchases);

    try {
      const savedPurchases = localStorage.getItem("games-user-purchases");
      if (savedPurchases) {
        const allPurchases: Purchase[] = JSON.parse(savedPurchases);
        const updatedAllPurchases = allPurchases.map((p) => (p.orderId === orderId ? { ...p, status } : p));
        localStorage.setItem("games-user-purchases", JSON.stringify(updatedAllPurchases));
      }
    } catch (error) {
      console.error("Erro ao atualizar status do pedido:", error);
    }
  };

  const getLibraryGames = (): LibraryGame[] => {
    return library;
  };

  const addFavorite = (game: Omit<FavoriteGame, "addedAt">) => {
    if (!user || !user.id) return;

    if (isFavorite(game.id)) return;

    const newFavorite: FavoriteGame = {
      ...game,
      addedAt: new Date(),
    };

    const updatedFavorites = [...favorites, newFavorite];
    setFavorites(updatedFavorites);

    try {
      const savedFavorites = localStorage.getItem("games-user-favorites");
      const allFavorites: Record<number, FavoriteGame[]> = savedFavorites ? JSON.parse(savedFavorites) : {};
      allFavorites[user.id] = updatedFavorites;
      localStorage.setItem("games-user-favorites", JSON.stringify(allFavorites));
    } catch (error) {
      console.error("Erro ao salvar favoritos:", error);
    }
  };

  const removeFavorite = (gameId: number) => {
    if (!user || !user.id) return;

    const updatedFavorites = favorites.filter((game) => game.id !== gameId);
    setFavorites(updatedFavorites);

    try {
      const savedFavorites = localStorage.getItem("games-user-favorites");
      if (savedFavorites) {
        const allFavorites: Record<number, FavoriteGame[]> = JSON.parse(savedFavorites);
        allFavorites[user.id] = updatedFavorites;
        localStorage.setItem("games-user-favorites", JSON.stringify(allFavorites));
      }
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
    }
  };

  const isFavorite = (gameId: number): boolean => {
    return favorites.some((game) => game.id === gameId);
  };

  const value: AuthContextData = {
    user,
    purchases,
    library,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser,
    addPurchase,
    getPurchaseById,
    updatePurchaseStatus,
    isGameInLibrary,
    getLibraryGames,
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
}
