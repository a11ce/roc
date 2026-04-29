import { type GameObject } from "@roc/core/gameObject";
import { Sprite } from "@roc/core/sprite";
import {
  avatarSideview,
  avatarTopview,
  foxAvatarSideview,
  foxAvatarTopview,
} from "../avatars";
import type { ExampleCtx } from "../game";

export function createFoxButton(x: number, y?: number): GameObject<ExampleCtx> {
  const getX = () => x;

  const getY = y !== undefined ? () => y : undefined;

  const getDisplayName = () => "button";

  const getSprite = (_ctx: ExampleCtx) => {
    return Sprite.circle(30, "button");
  };

  const onInteract = async (ctx: ExampleCtx) => {
    if (ctx.isFox) {
      ctx.log.write("you are already a fox!");
    } else {
      ctx.log.write("press the button to turn into a fox?");
      await ctx.log.showButtonsThen({
        yes: () => {
          ctx.log.write("you transform into a fox!");
          ctx.isFox = true;

          const current = ctx.avatar.get();
          if (current === avatarSideview) {
            ctx.avatar.set(foxAvatarSideview);
          } else if (current === avatarTopview) {
            ctx.avatar.set(foxAvatarTopview);
          }
        },
        no: () => {
          ctx.log.write("you do not press the button");
        },
      });
    }
  };

  return {
    getX,
    getY,
    getDisplayName,
    getSprite,
    onInteract,
  };
}
