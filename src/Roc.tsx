import { Component } from "solid-js";
import { loadGame } from "../gameData/load";
import { GameCtxProvider } from "@roc/core/game";

const Roc: Component = () => {
  const gameCtx = loadGame();

  return (
    <GameCtxProvider value={gameCtx}>
      <div class="app-root">{gameCtx.layout.get() ?? "no layout!"}</div>
    </GameCtxProvider>
  );
};

export default Roc;
