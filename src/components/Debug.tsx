import { Component } from "solid-js";
import { type GameCtx } from "../core/game";

interface DebugP {
  ctx: GameCtx;
}

const Debug: Component<DebugP> = (props) => {
  const fox = () => props.ctx.room.objects[0];

  const onEnterRange = async () => {
    await fox().onPlayerEnterInteractRange!(props.ctx);
  };

  const onInteract = async () => {
    await fox().onPlayerInteract!(props.ctx);
  };

  const onToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div class="panel" style={{ gap: "8px" }}>
      <button onClick={onEnterRange}>
        approach {fox().getDisplayName(props.ctx)}
      </button>
      <button onClick={onInteract}>
        interact {fox().getDisplayName(props.ctx)}
      </button>
      <button onClick={() => props.ctx.log.clear()}>clear log</button>
      <button onClick={onToggleFullscreen}>fullscreen</button>
    </div>
  );
};

export default Debug;
