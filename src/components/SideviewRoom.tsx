import { Component, onMount, onCleanup } from "solid-js";
import { Application, Container, Graphics, Color } from "pixi.js";
import { getGameCtx } from "@roc/core/game";
import { loadRoomAssets } from "@roc/core/room";
import { renderSprite } from "@roc/core/sprite";

const SideviewRoom: Component = () => {
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

    const groundLine = new Graphics();
    scene.addChild(groundLine);

    pixiApp.ticker.add(() => {
      const styles = getComputedStyle(document.documentElement);
      const dark = new Color(styles.getPropertyValue("--dark").trim());
      const light = new Color(styles.getPropertyValue("--light").trim());

      pixiApp.renderer.background.color = dark;

      const width = pixiApp.screen.width;
      const height = pixiApp.screen.height;
      const groundY = height - 50;

      groundLine.clear();
      groundLine.moveTo(0, groundY);
      groundLine.lineTo(width, groundY);
      groundLine.stroke({ width: 2, color: light });

      // remove containers except groundLine
      scene.children.slice(1).forEach((child) => scene.removeChild(child));

      const allObjects = [ctx.avatar.get(), ...ctx.room.get().objects];

      for (const obj of allObjects) {
        if (!obj.getSprite || !obj.getX) continue;
        const container = new Container();
        const sprite = obj.getSprite(ctx);
        renderSprite(sprite, container, dark, light, ctx.gameName);
        const objY =
          sprite.type === "circle" ? groundY - sprite.radius : groundY;
        container.x = obj.getX(ctx);
        container.y = objY;
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

export default SideviewRoom;
