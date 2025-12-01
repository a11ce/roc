import { Component, onMount, onCleanup } from "solid-js";
import { Application, Container, Graphics, Color } from "pixi.js";
import { getGameCtx } from "@roc/core/game";
import { loadRoomAssets } from "@roc/core/room";
import { renderSprite } from "@roc/core/sprite";

const TopviewRoom: Component = () => {
  const ctx = getGameCtx();
  let containerRef!: HTMLDivElement;

  onMount(async () => {
    await loadRoomAssets(ctx);

    const pixiApp = new Application();
    await pixiApp.init({
      resizeTo: containerRef,
      backgroundColor: 0x000000,
      resolution: window.devicePixelRatio * 2,
      autoDensity: true,
    });

    pixiApp.ticker.maxFPS = 60;

    containerRef.appendChild(pixiApp.canvas);

    const scene = new Container();
    pixiApp.stage.addChild(scene);

    pixiApp.ticker.add(() => {
      const styles = getComputedStyle(document.documentElement);
      const dark = new Color(styles.getPropertyValue("--dark").trim());
      const light = new Color(styles.getPropertyValue("--light").trim());

      pixiApp.renderer.background.color = dark;

      scene.removeChildren();

      const allObjects = [ctx.avatar.get(), ...ctx.room.get().objects];

      for (const obj of allObjects) {
        if (!obj.getSprite || !obj.getX) continue;
        const container = new Container();
        const sprite = obj.getSprite(ctx);
        renderSprite(sprite, container, dark, light);
        container.x = obj.getX(ctx);
        container.y = obj.getY ? obj.getY(ctx) : pixiApp.screen.height / 2;
        scene.addChild(container);
      }
    });

    pixiApp.ticker.update();

    onCleanup(() => {
      pixiApp.destroy();
    });
  });

  return (
    <div class="panel" style={{ overflow: "hidden", padding: 0 }}>
      <div ref={containerRef!} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default TopviewRoom;
