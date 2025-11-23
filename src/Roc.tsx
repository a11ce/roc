import type { Component } from "solid-js";
import SideviewRoom from "./components/SideviewRoom";
import Inventory from "./components/Inventory";
import Log from "./components/Log";
import SplitPanel from "./components/SplitPanel";

const Roc: Component = () => {
  const onFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        throw new Error(`Failed to enter fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div class="app-root">
      <SplitPanel type="v" percent={25}>
        <SideviewRoom />
        <SplitPanel type="h" percent={25}>
          <Inventory />
          <Log />
        </SplitPanel>
      </SplitPanel>
    </div>
  );
};

export default Roc;
