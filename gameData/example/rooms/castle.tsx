import { createAvatarSideview } from "@roc/objects/avatarSideview";
import { createDoor } from "../objects/door";
import { createStaticRoom } from "@roc/core/room";
import { forest } from "./forest";
import type { ExampleCtx } from "../game";

export const castle = createStaticRoom<ExampleCtx>(() => {
  const avatar = createAvatarSideview(100);
  const door = createDoor(400, "forest", forest, async (ctx) => {
    ctx.log.write("go to the forest?");
    return (await ctx.log.showButtons("yes", "no")) === "yes";
  });

  const onEnter = (ctx: ExampleCtx) => {
    ctx.log.write("you are in the castle");
  };

  return {
    avatar,
    objects: [door],
    onEnter,
  };
});
