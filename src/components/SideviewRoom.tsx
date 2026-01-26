import { Component, onMount, onCleanup } from "solid-js";
import { Application, Container, Graphics, Color } from "pixi.js";
import { getGameCtx, type GameCtx } from "@roc/core/game";
import { renderSprite } from "@roc/core/sprite";
import { type GameObject } from "@roc/core/gameObject";

const SideviewRoom: Component = () => {
  const ctx = getGameCtx();
  let containerRef!: HTMLDivElement;

  onMount(async () => {
    const pixiApp = new Application();
    await pixiApp.init({
      resizeTo: containerRef,
      backgroundColor: 0x000000,
      resolution: window.devicePixelRatio * 2,
      autoDensity: true,
    });

    pixiApp.ticker.maxFPS = 60;

    containerRef.appendChild(pixiApp.canvas);

    const staticScene = new Container();
    pixiApp.stage.addChild(staticScene);

    const scene = new Container();
    pixiApp.stage.addChild(scene);

    const groundLine = new Graphics();
    scene.addChild(groundLine);

    const containerCache = new Map<GameObject<GameCtx>, Container>();
    const staticContainerCache = new Map<GameObject<GameCtx>, Container>();

    let cameraX = 0;

    pixiApp.ticker.add(() => {
      const dark = ctx.color.getDark();
      const light = ctx.color.getLight();

      pixiApp.renderer.background.color = dark;

      const width = pixiApp.screen.width;
      const height = pixiApp.screen.height;
      const groundY = height - 50;

      // Camera scrolling
      const roomData = ctx.room.get();
      const sideviewGfx = roomData.sideviewGfx;
      if (sideviewGfx) {
        const playerX = roomData.avatarPosition.x;
        const scrollDeadzone = sideviewGfx.scrollDeadzone ?? 50;
        const deadzonePixels = (scrollDeadzone / 100) * width;
        const minPlayerScreenX = width / 2 - deadzonePixels / 2;
        const maxPlayerScreenX = width / 2 + deadzonePixels / 2;

        const playerScreenX = playerX - cameraX;

        if (playerScreenX < minPlayerScreenX) {
          cameraX = playerX - minPlayerScreenX;
        } else if (playerScreenX > maxPlayerScreenX) {
          cameraX = playerX - maxPlayerScreenX;
        }

        cameraX = Math.max(0, Math.min(cameraX, sideviewGfx.width - width));
      }

      // Center small rooms
      let sceneOffset = -cameraX;
      if (sideviewGfx && sideviewGfx.width < width) {
        sceneOffset = (width - sideviewGfx.width) / 2;
      }
      scene.x = sceneOffset;

      const roomWidth = sideviewGfx?.width ?? width;
      groundLine.clear();
      groundLine.moveTo(0, groundY);
      groundLine.lineTo(roomWidth, groundY);
      groundLine.stroke({ width: 2, color: light });

      const allObjects = [...ctx.room.get().objects, ctx.avatar.get()];
      const activeObjects = new Set(allObjects);

      // Remove containers for objects that no longer exist
      for (const [obj, container] of containerCache) {
        if (!activeObjects.has(obj)) {
          scene.removeChild(container);
          container.destroy({ children: true });
          containerCache.delete(obj);
        }
      }
      for (const [obj, container] of staticContainerCache) {
        if (!activeObjects.has(obj)) {
          staticScene.removeChild(container);
          container.destroy({ children: true });
          staticContainerCache.delete(obj);
        }
      }

      for (const obj of allObjects) {
        if (!obj.getSprite || !obj.getX) continue;

        const sprite = obj.getSprite(ctx);

        if (sprite.isStatic) {
          let container = staticContainerCache.get(obj);
          if (!container) {
            container = new Container();
            staticContainerCache.set(obj, container);
            staticScene.addChild(container);
          }

          renderSprite(sprite, container, dark, light, ctx.gameName);

          const percentage = obj.getX(ctx);
          const canvasCenter = width / 2;
          container.x = canvasCenter + (percentage / 100) * (width / 2);

          const baseY = obj.getY ? obj.getY(ctx) : 0;
          const offsetY = sprite.type === "circle" ? sprite.radius : 0;
          const objY = groundY - baseY - offsetY;
          container.y = objY;
        } else {
          let container = containerCache.get(obj);
          if (!container) {
            container = new Container();
            containerCache.set(obj, container);
            scene.addChild(container);
          }

          renderSprite(sprite, container, dark, light, ctx.gameName);

          const baseY = obj.getY ? obj.getY(ctx) : 0;
          const offsetY = sprite.type === "circle" ? sprite.radius : 0;
          const objY = groundY - baseY - offsetY;

          container.x = obj.getX(ctx);
          container.y = objY;
        }
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
