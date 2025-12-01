import { type GameObject } from "@roc/core/gameObject";
import { Sprite } from "@roc/core/sprite";
import type { Room } from "@roc/core/room";
import type { ExampleCtx } from "../game";

export function createDoor(
  x: number,
  name: string,
  destination: Room<ExampleCtx>,
  confirmEnter: (ctx: ExampleCtx) => Promise<boolean>,
  y?: number,
): GameObject<ExampleCtx> {
  const getX = () => x;

  const getY = y !== undefined ? () => y : undefined;

  const getDisplayName = () => name;

  const getSprite = (_ctx: ExampleCtx) => {
    return Sprite.circle(40, name);
  };

  const onInteract = async (ctx: ExampleCtx) => {
    if (await confirmEnter(ctx)) {
      ctx.room.goTo(destination);
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
