import { Component } from "solid-js";
import SideviewRoom from "./components/SideviewRoom";
import Debug from "./components/Debug";
import LogDisplay from "./components/LogDisplay";
import SplitPanel from "./components/SplitPanel";
import { createLog } from "./core/log";
import { type GameCtx } from "./core/game";
import { createFox } from "./gameObjects/fox";

const Roc: Component = () => {
  const { log, observer } = createLog();

  const gameCtx: GameCtx = {
    log: log,
  };

  const fox = createFox();

  return (
    <div class="app-root">
      <SplitPanel type="v" percent={25}>
        <SideviewRoom />
        <SplitPanel type="h" percent={25}>
          <Debug gameCtx={gameCtx} fox={fox} />
          <LogDisplay log={observer} />
        </SplitPanel>
      </SplitPanel>
    </div>
  );
};

export default Roc;
