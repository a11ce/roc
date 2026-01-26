import { type GameObject } from "@roc/core/gameObject";
import { Sprite } from "@roc/core/sprite";
import type { ExampleCtx } from "../game";

export function createFox(startX: number): GameObject<ExampleCtx> {
  const xAfterMoving = 1000;
  const speed = 2.5;
  let x = startX;
  let isMovingRight = false;
  let hasMoved = false;
  let hasBeenPet = false;

  const getX = () => x;

  const getDisplayName = () => "fox";

  const getSprite = (_ctx: ExampleCtx) => {
    const sprite = Sprite.fromFile("fox.png", 5);
    return isMovingRight ? sprite.flip() : sprite;
  };

  const onEnterInteractRange = async (ctx: ExampleCtx) => {
    if (hasBeenPet) {
      ctx.log.write("the fox licks ur hand");
    } else {
      ctx.log.write("the fox growls");
      if (!hasMoved) {
        hasMoved = true;
        isMovingRight = true;
        await ctx.task.runTask(() => {
          x += speed;
          return x >= xAfterMoving;
        });
        isMovingRight = false;
        ctx.log.write("the fox stops and stares at you");
      }
    }
  };

  const onLeaveInteractRange = async (ctx: ExampleCtx) => {
    if (hasBeenPet) {
      ctx.log.write("fox is sad :(");
    }
  };

  const onInteract = async (ctx: ExampleCtx) => {
    ctx.log.write("try to pet the fox?");
    if ((await ctx.log.showButtons("yes", "no")) === "yes") {
      ctx.log.write("you pet the fox");
      if (!hasBeenPet) {
        ctx.audio.play("metalPipe.mp3");
        ctx.log.write("the fox drops a small key at your feet");
        ctx.log.write("you pick it up");
        hasBeenPet = true;
        ctx.playerInventory.add("key");
      }
    } else {
      ctx.log.write("you decide not to pet the fox");
    }
  };

  return {
    getX,
    getDisplayName,
    getSprite,
    onEnterInteractRange,
    onLeaveInteractRange,
    onInteract,
  };
}
