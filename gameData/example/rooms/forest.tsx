import { createAvatarSideview } from "@roc/objects/avatarSideview";
import { createFox } from "../objects/fox";
import { createDoor } from "../objects/door";
import { createLatchText } from "@roc/objects/latchText";
import { createStaticRoom } from "@roc/core/room";
import { castle } from "./castle";
import { cave } from "./cave";
import type { ExampleCtx } from "../game";

export const forest = createStaticRoom<ExampleCtx>(() => {
  const avatar = createAvatarSideview(100);
  const sign = createLatchText(300, "You see a sign saying BEWARE OF FOX");
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
    ctx.log.write("you are in Foxkey Forest");
  };

  return {
    avatar,
    objects: [sign, caveDoor, fox, castleDoor],
    onEnter,
  };
});
