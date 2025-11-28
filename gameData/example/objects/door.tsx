import { type GameObject } from "@roc/core/game";
import { Sprite } from "@roc/core/sprite";
import type { Room } from "@roc/core/room";
import type { ExampleCtx } from "../game";

export function createDoor(
  x: number,
  name: string,
  destination: Room<ExampleCtx>,
  confirmEnter: (ctx: ExampleCtx) => Promise<boolean>,
): GameObject<ExampleCtx> {
  const getX = () => x;

  const getDisplayName = () => name;

  const getSprite = (_ctx: ExampleCtx) => {
    return Sprite.circle(40, name);
  };

  const onInteract = async (ctx: ExampleCtx) => {
    if (await confirmEnter(ctx)) {
      ctx.goToRoom(destination);
    }
  };

  return {
    getX,
    getDisplayName,
    getSprite,
    onInteract,
  };
}
