import { type GameObject } from "@roc/core/gameObject";
import { Sprite } from "@roc/core/sprite";
import type { ExampleCtx } from "../game";

export const createGem = (x: number, y: number): GameObject<ExampleCtx> => {
  const getX = () => x;

  const getY = () => y;

  const getSprite = (_ctx: ExampleCtx) => {
    return Sprite.circle(15, "gem");
  };

  return {
    getX,
    getY,
    getSprite,
  };
};
