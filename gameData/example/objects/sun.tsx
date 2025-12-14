import { type GameObject } from "@roc/core/gameObject";
import { Sprite } from "@roc/core/sprite";
import type { ExampleCtx } from "../game";

export const createSun = (): GameObject<ExampleCtx> => {
  let x = 0;
  let y = 0;
  let xDirection = 1;
  let yDirection = 1;

  const getSprite = () => Sprite.circle(30, "sun").static();

  const getX = () => x;

  const getY = () => y;

  const onEnterRoom = (ctx: ExampleCtx) => {
    ctx.task.runTask(() => {
      x += xDirection * 1.2;
      y += yDirection * 1.5;

      if (x >= 100) {
        x = 100;
        xDirection = -1;
      } else if (x <= -100) {
        x = -100;
        xDirection = 1;
      }

      if (y >= 100) {
        y = 100;
        yDirection = -1;
      } else if (y <= -100) {
        y = -100;
        yDirection = 1;
      }
    });
  };

  return {
    getSprite,
    getX,
    getY,
    onEnterRoom,
  };
};
