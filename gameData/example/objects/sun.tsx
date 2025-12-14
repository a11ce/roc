import { type GameObject } from "@roc/core/gameObject";
import { Sprite } from "@roc/core/sprite";
import type { ExampleCtx } from "../game";

export const createSun = (): GameObject<ExampleCtx> => {
  return {
    getSprite: () => Sprite.circle(30, "sun").static(),
    getX: () => 40,
    getY: () => 100,
  };
};
