import { Component, onCleanup } from "solid-js";
import SideviewRoom from "./components/SideviewRoom";
import Debug from "./components/Debug";
import LogDisplay from "./components/LogDisplay";
import SplitPanel from "./components/SplitPanel";
import { loadGame } from "../gameData/load";

const Roc: Component = () => {
  const gameCtx = loadGame();

  onCleanup(() => {
    gameCtx.input.destroy();
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
