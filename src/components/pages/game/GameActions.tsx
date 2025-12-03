"use client";

import { useAuth } from "@/context/AuthContext";
import { Game } from "@/lib/game";

import { GameCartAction } from "./GameCartAction";
import { GameDownloadAction } from "./GameDownloadAction";

type Props = {
  game: Game;
};

export function GameActions({ game }: Props) {
  const { isGameInLibrary } = useAuth();

  if (isGameInLibrary(game.id)) {
    return <GameDownloadAction />;
  }

  return <GameCartAction game={game} />;
}
