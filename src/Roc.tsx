import { Component, onMount, onCleanup } from "solid-js";
import { Ticker } from "pixi.js";
import { loadGame } from "../gameData/load";
import { GameCtxProvider } from "@roc/core/game";

const Roc: Component = () => {
  const gameCtx = loadGame();

  const ticker = new Ticker();
  ticker.maxFPS = 60;

  ticker.add(() => {
    const avatar = gameCtx.avatar.get();
    if (avatar) {
      const newPosition = avatar.processInput(
        gameCtx,
        gameCtx.room.get().avatarPosition,
      );
      gameCtx.room.get().avatarPosition = newPosition;
    }
  });

  ticker.start();

  return (
    <GameCtxProvider value={gameCtx}>
      <div class="app-root">{gameCtx.layout.get() ?? "no layout!"}</div>
    </GameCtxProvider>
  );
};

export default Roc;
