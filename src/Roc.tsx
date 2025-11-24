import { Component, onCleanup } from "solid-js";
import SideviewRoom from "./components/SideviewRoom";
import Debug from "./components/Debug";
import LogDisplay from "./components/LogDisplay";
import SplitPanel from "./components/SplitPanel";
import { createLog } from "./core/log";
import { createInputHandler } from "./core/input";
import { type GameCtx } from "./core/game";
import { createFox } from "./gameObjects/fox";
import { createAvatarSideview } from "./gameObjects/avatarSideview";

const Roc: Component = () => {
  const log = createLog();
  const input = createInputHandler();

  log.attachInputHandler(input);

  const fox = createFox();
  const avatar = createAvatarSideview(100);

  const gameCtx: GameCtx = {
    log,
    room: {
      avatar,
      objects: [fox],
    },
    input,
  };

  onCleanup(() => {
    input.destroy();
  });

  return (
    <div class="app-root">
      <SplitPanel type="v" percent={25}>
        <SideviewRoom ctx={gameCtx} />
        <SplitPanel type="h" percent={25}>
          <Debug ctx={gameCtx} />
          <LogDisplay ctx={gameCtx} />
        </SplitPanel>
      </SplitPanel>
    </div>
  );
};

export default Roc;
