import { createDoor } from "../objects/door";
import { createFoxButton } from "../objects/foxButton";
import { createStaticRoom } from "@roc/core/room";
import { avatarTopview, foxAvatarTopview } from "../avatars";
import { topview } from "../layouts";
import { forest } from "./forest";
import type { ExampleCtx } from "../game";

export const castle = createStaticRoom<ExampleCtx>(() => {
  const foxButton = createFoxButton(200, 300);
  const door = createDoor(
    400,
    "forest",
    forest,
    async (ctx) => {
      ctx.log.write("go to the forest?");
      return (await ctx.log.showButtons("yes", "no")) === "yes";
    },
    200,
  );

  const onEnter = (ctx: ExampleCtx) => {
    ctx.avatar.set(ctx.isFox ? foxAvatarTopview : avatarTopview);
    ctx.layout.set(topview);
    ctx.log.write("you are in the castle");
  };

  return {
    avatarPosition: { x: 300, y: 300 },
    objects: [foxButton, door],
    onEnter,
  };
});
