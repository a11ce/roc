import { type GameObject } from "@roc/core/game";
import { Sprite } from "@roc/core/sprite";
import type { ExampleCtx } from "../game";

export function createFox(x: number): GameObject<ExampleCtx> {
  let hasBeenPet = false;

  const getAssetPaths = () => ["/assets/fox.png"];

  const getX = () => x;

  const getDisplayName = () => "fox";

  const getSprite = (_ctx: ExampleCtx) => {
    return Sprite.fromFile("/assets/fox.png", 5);
  };

  const onEnterInteractRange = async (ctx: ExampleCtx) => {
    if (hasBeenPet) {
      ctx.log.write("the fox licks ur hand");
    } else {
      ctx.log.write("the fox growls");
    }
  };

  const onInteract = async (ctx: ExampleCtx) => {
    ctx.log.write("try to pet the fox?");
    if ((await ctx.log.showButtons("yes", "no")) === "yes") {
      ctx.log.write("you pet the fox");
      if (!hasBeenPet) {
        ctx.log.write("the fox drops a small key at your feet");
        ctx.log.write("you pick it up");
        ctx.playerInventory.add("key");
        hasBeenPet = true;
      }
    } else {
      ctx.log.write("you decide not to pet the fox");
    }
  };

  return {
    getAssetPaths,
    getX,
    getDisplayName,
    getSprite,
    onEnterInteractRange,
    onInteract,
  };
}
