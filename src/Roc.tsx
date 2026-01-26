import { Component, onMount, onCleanup, createSignal, Show } from "solid-js";
import { Ticker } from "pixi.js";
import { loadGame } from "../gameData/load";
import { GameCtxProvider, type GameCtx } from "@roc/core/game";

const Roc: Component = () => {
  const [gameCtx, setGameCtx] = createSignal<GameCtx | null>(null);

  onMount(async () => {
    const ctx = await loadGame();
    setGameCtx(ctx);

    const ticker = new Ticker();
    ticker.maxFPS = 60;

    ticker.add(() => {
      ctx.task.update();
      const avatar = ctx.avatar.get();
      if (avatar) {
        const newPosition = avatar.processInput(
          ctx,
          ctx.room.get().avatarPosition,
        );
        ctx.room.get().avatarPosition = newPosition;
      }
    });

    ticker.start();

    onCleanup(() => {
      ticker.stop();
      ticker.destroy();
    });
  });

  return (
    <Show when={gameCtx()} fallback={<div class="app-root">Loading...</div>}>
      {(ctx) => (
        <GameCtxProvider value={ctx()}>
          <div class="app-root">{ctx().layout.get() ?? "no layout!"}</div>
        </GameCtxProvider>
      )}
    </Show>
  );
};

export default Roc;
