import { Component, createSignal, For } from "solid-js";
import { getGameCtx } from "@roc/core/game";

const Debug: Component = () => {
  const ctx = getGameCtx();
  const objects = () => ctx.room.get().objects;
  const [darkColor, setDarkColor] = createSignal("#222323");
  const [lightColor, setLightColor] = createSignal("#f0f6f0");

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
      <For each={objects()}>
        {(obj) => (
          <div style={{ display: "flex", gap: "4px" }}>
            <span>{obj.getDisplayName(ctx)}</span>
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
