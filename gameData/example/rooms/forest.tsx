import { createFox } from "../objects/fox";
import { createDoor } from "../objects/door";
import { createLatchText } from "@roc/objects/latchText";
import { createStaticRoom } from "@roc/core/room";
import { avatarSideview, foxAvatarSideview } from "../avatars";
import { sideview, sideviewBeforeInventory } from "../layouts";
import { castle } from "./castle";
import { cave } from "./cave";
import type { ExampleCtx } from "../game";

export const forest = createStaticRoom<ExampleCtx>(() => {
  const sign = createLatchText(
    300,
    <>
      You see a sign saying <span style={{ color: "red" }}>BEWARE OF FOX</span>
    </>,
  );
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

  const onEnter = (ctx: ExampleCtx) => {
    ctx.avatar.set(ctx.isFox ? foxAvatarSideview : avatarSideview);
    const hasInventory = ctx.playerInventory.getItems().length > 0;
    ctx.layout.set(hasInventory ? sideview : sideviewBeforeInventory);
    ctx.log.write("you are in Foxkey Forest");
  };

  return {
    avatarPosition: { x: 100, y: 0 },
    objects: [sign, caveDoor, fox, castleDoor],
    onEnter,
    sideviewGfx: { width: 2000, scrollDeadzone: 50 },
  };
});
