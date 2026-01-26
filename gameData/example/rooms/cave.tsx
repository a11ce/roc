import { createDoor } from "../objects/door";
import { createGem } from "../objects/gem";
import { createResetRoom } from "@roc/core/room";
import { forest } from "./forest";
import type { ExampleCtx } from "../game";
import { createSkyDomino } from "../objects/domino";

export const cave = createResetRoom<ExampleCtx>(() => {
  const gems = Math.floor(Math.random() * 5) + 2;
  let previousDarkColor: string | null = null;

  const skyDomino = createSkyDomino(100, 100);

  const door = createDoor(400, "exit", forest, async (ctx) => {
    ctx.log.write("leave?");
    return (await ctx.log.showButtons("yes", "no")) === "yes";
  });

  const gemObjects = Array.from({ length: gems }, (_, i) => {
    const x = 200 + i * 100;
    return createGem(x, -40);
  });

  const onEnter = (ctx: ExampleCtx) => {
    const styles = getComputedStyle(document.documentElement);
    previousDarkColor = styles.getPropertyValue("--dark").trim();
    ctx.color.setDark("#000033");
    ctx.log.write("you enter a mysterious cave");
    ctx.log.write(`you see ${gems} gems`);
  };

  const onLeave = (ctx: ExampleCtx) => {
    if (previousDarkColor) {
      ctx.color.setDark(previousDarkColor);
    }
  };

  return {
    avatarPosition: { x: 100, y: 0 },
    objects: [skyDomino, door, ...gemObjects],
    onEnter,
    onLeave,
    sideviewGfx: { width: 600 },
  };
});
