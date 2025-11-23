import { Component } from "solid-js";
import { type GameCtx } from "../core/game";
import { type GameObject } from "../core/game";

interface DebugP {
  gameCtx: GameCtx;
  fox: GameObject;
}

const Debug: Component<DebugP> = (props) => {
  const onApproach = async () => {
    await props.fox.onPlayerApproach!(props.gameCtx);
  };

  const onInteract = async () => {
    await props.fox.onPlayerInteract!(props.gameCtx);
  };

  return (
    <div class="panel" style={{ gap: "8px" }}>
      <div>Debug</div>
      <button onClick={onApproach}>Approach Fox</button>
      <button onClick={onInteract}>Interact with Fox</button>
      <button onClick={() => props.gameCtx.log.clear()}>Clear Log</button>
    </div>
  );
};

export default Debug;
