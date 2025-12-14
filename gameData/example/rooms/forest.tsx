import { createFox } from "../objects/fox";
import { createDoor } from "../objects/door";
import { createLatchText } from "@roc/objects/latchText";
import { createStaticRoom } from "@roc/core/room";
import { avatarSideview, foxAvatarSideview } from "../avatars";
import { sideview, sideviewBeforeInventory } from "../layouts";
import { castle } from "./castle";
import { cave } from "./cave";
import type { ExampleCtx } from "../game";
import { createSun } from "../objects/sun";
import { createDomino, createSkyDomino } from "../objects/domino";

export const forest = createStaticRoom<ExampleCtx>(() => {
  const domino = createDomino(0);

  const skyDomino = createSkyDomino(100, 100);

  const sign = createLatchText(300, () => (
    <>
      You see a sign saying <span style={{ color: "red" }}>BEWARE OF FOX</span>
    </>
  ));

  const fox = createFox(500);

  const castleDoor = createDoor(600, "castle", castle, async (ctx) => {
    if (ctx.playerInventory.has("key")) {
      ctx.log.write("use the key to unlock the door?");
      return (await ctx.log.showButtons("yes", "no")) === "yes";
    } else {
      ctx.log.write("door is locked");
      return false;
    }
  });

  const caveDoor = createDoor(800, "cave", cave, async (ctx) => {
    ctx.log.write("enter the gem cave?");
    return (await ctx.log.showButtons("yes", "no")) === "yes";
  });

  const sun = createSun();

  const onEnter = (ctx: ExampleCtx) => {
    ctx.avatar.set(ctx.isFox ? foxAvatarSideview : avatarSideview);
    const hasInventory = ctx.playerInventory.getItems().length > 0;
    ctx.layout.set(hasInventory ? sideview : sideviewBeforeInventory);
    ctx.log.writeHTML(() => (
      <span style={{ "font-size": "14px" }}>you are in Foxkey Forest</span>
    ));
  };

  return {
    avatarPosition: { x: 100, y: 0 },
    objects: [domino, skyDomino, sign, caveDoor, fox, castleDoor, sun],
    onEnter,
    sideviewGfx: { width: 2000, scrollDeadzone: 50 },
  };
});
