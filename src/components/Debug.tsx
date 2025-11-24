import { Component, createSignal } from "solid-js";
import { type GameCtx } from "../core/game";

interface DebugP {
  ctx: GameCtx;
}

const Debug: Component<DebugP> = (props) => {
  const fox = () => props.ctx.room.objects[0];
  const [darkColor, setDarkColor] = createSignal("#222323");
  const [lightColor, setLightColor] = createSignal("#f0f6f0");

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

  const onDarkColorChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setDarkColor(target.value);
    document.documentElement.style.setProperty("--dark", target.value);
  };

  const onLightColorChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setLightColor(target.value);
    document.documentElement.style.setProperty("--light", target.value);
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
      <label>
        dark <input type="color" value={darkColor()} onInput={onDarkColorChange} />
      </label>
      <label>
        light <input type="color" value={lightColor()} onInput={onLightColorChange} />
      </label>
    </div>
  );
};

export default Debug;
