import { Component, onMount } from "solid-js";
import { Application, Container, Graphics, Color } from "pixi.js";
import { type GameCtx } from "../core/game";
import { loadRoomAssets } from "../core/room";
import { renderSprite } from "../core/sprite";
import { processSideviewInput } from "../core/inputSideview";

interface SideviewRoomProps {
  ctx: GameCtx;
}

const SideviewRoom: Component<SideviewRoomProps> = (props) => {
  let containerRef!: HTMLDivElement;

  onMount(async () => {
    await loadRoomAssets(props.ctx.currentRoom);

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

    const allObjects = [
      props.ctx.currentRoom.avatar,
      ...props.ctx.currentRoom.objects,
    ];

    for (const obj of allObjects) {
      obj.gfxContainer = new Container();
      scene.addChild(obj.gfxContainer);
    }

    pixiApp.ticker.add(() => {
      processSideviewInput(props.ctx);

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

      for (const obj of allObjects) {
        if (!obj.getSprite) continue;
        const container = obj.gfxContainer!;
        const sprite = obj.getSprite(props.ctx);
        renderSprite(sprite, container, dark, light);
        const objY =
          sprite.type === "circle" ? groundY - sprite.radius : groundY;
        container.x = obj.getX(props.ctx);
        container.y = objY;
      }
    });

    pixiApp.ticker.update();

    return () => {
      pixiApp.destroy();
    };
  });

  return (
    <div class="panel" style={{ overflow: "hidden", padding: 0 }}>
      <div ref={containerRef!} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default SideviewRoom;
