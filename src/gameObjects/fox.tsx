import { type GameObject, type GameCtx } from "../core/game";
import { Sprite } from "../core/sprite";

export function createFox(): GameObject {
  let hasBeenPet = false;

  const getAssetPaths = () => ["/assets/fox.png"];

  const getX = () => 400;

  const getDisplayName = () => "fox";

  const getSprite = (_ctx: GameCtx) => {
    return Sprite.fromFile("/assets/fox.png", 5);
  };

  const onPlayerEnterInteractRange = async (ctx: GameCtx) => {
    if (hasBeenPet) {
      ctx.log.write("the fox licks ur hand");
    } else {
      ctx.log.write("the fox growls");
    }
  };

  const onPlayerInteract = async (ctx: GameCtx) => {
    ctx.log.write("try to pet the fox?");
    if ((await ctx.log.showButtons("yes", "no")) === "yes") {
      ctx.log.write("you pet the fox");
      hasBeenPet = true;
    } else {
      ctx.log.write("you decide not to pet the fox");
    }
  };

  return {
    getAssetPaths,
    getX,
    getDisplayName,
    getSprite,
    onPlayerEnterInteractRange,
    onPlayerInteract,
  };
}
