import { Component, createSignal, For, onCleanup } from "solid-js";
import { getGameCtx } from "@roc/core/game";

const Debug: Component = () => {
  const ctx = getGameCtx();
  const objects = () => ctx.room.get()?.objects ?? [];
  const [playerX, setPlayerX] = createSignal(0);
  const [darkColor, setDarkColor] = createSignal("#222323");
  const [lightColor, setLightColor] = createSignal("#f0f6f0");

  const interval = setInterval(() => {
    const room = ctx.room.get();
    if (room) {
      setPlayerX(room.avatarPosition.x);
    }
  }, 16);

  onCleanup(() => clearInterval(interval));

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
    ctx.color.setDark(target.value);
  };

  const onLightColorChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setLightColor(target.value);
    ctx.color.setLight(target.value);
  };

  return (
    <div class="panel" style={{ gap: "8px" }}>
      <div>x: {playerX()}</div>
      <For each={objects()}>
        {(obj) => (
          <div style={{ display: "flex", gap: "4px" }}>
            <span>{obj.getDisplayName ? obj.getDisplayName(ctx) : "???"}</span>
            {obj.onEnterInteractRange && (
              <button onClick={() => obj.onEnterInteractRange!(ctx)}>
                approach
              </button>
            )}
            {obj.onInteract && (
              <button onClick={() => obj.onInteract!(ctx)}>interact</button>
            )}
          </div>
        )}
      </For>
      <button onClick={() => ctx.log.clear()}>clear log</button>
      <button onClick={onToggleFullscreen}>fullscreen</button>
      <label>
        dark{" "}
        <input type="color" value={darkColor()} onInput={onDarkColorChange} />
      </label>
      <label>
        light{" "}
        <input type="color" value={lightColor()} onInput={onLightColorChange} />
      </label>
    </div>
  );
};

export default Debug;
