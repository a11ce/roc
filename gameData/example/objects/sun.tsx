import { type GameObject } from "@roc/core/gameObject";
import { Sprite } from "@roc/core/sprite";
import type { ExampleCtx } from "../game";

export const createSun = (): GameObject<ExampleCtx> => {
  const getSprite = () => Sprite.circle(30, "sun").static();

  const getX = () => 40;

  const getY = () => 100;

  return {
    getSprite,
    getX,
    getY,
  };
};
