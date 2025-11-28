import { createAvatarSideview } from "@roc/objects/avatarSideview";
import { createDoor } from "../objects/door";
import { createResetRoom } from "@roc/core/room";
import { forest } from "./forest";
import type { ExampleCtx } from "../game";

export const cave = createResetRoom<ExampleCtx>(() => {
  const avatar = createAvatarSideview(100);
  const gems = Math.floor(Math.random() * 5) + 1;

  const door = createDoor(400, "exit", forest, async (ctx) => {
    ctx.log.write("leave?");
    return (await ctx.log.showButtons("yes", "no")) === "yes";
  });

  const onEnter = (ctx: ExampleCtx) => {
    ctx.log.write("you enter a mysterious cave");
    ctx.log.write(`you see ${gems} gems`);
  };

  return {
    avatar,
    objects: [door],
    onEnter,
  };
});
