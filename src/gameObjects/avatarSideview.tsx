import { type Avatar } from "../core/avatar";
import { type GameObject, type GameCtx } from "../core/game";
import { Sprite } from "../core/sprite";

const INTERACT_RANGE = 50;
const MOVE_SPEED = 2;
const OBJECT_RADIUS = 30;

export function createAvatarSideview(initX: number): Avatar<GameCtx> {
  let x = initX;

  const objectsInRange = new Set<object>();

  const distance = (ctx: GameCtx, obj: GameObject<GameCtx>) =>
    Math.abs(obj.getX(ctx) - x);

  const getX = () => x;

  const getDisplayName = () => "@";

  const getSprite = (_ctx: GameCtx) => {
    return Sprite.circle(OBJECT_RADIUS, "@");
  };

  const onPlayerMove = async (ctx: GameCtx) => {
    for (const obj of ctx.currentRoom.objects) {
      const inInteractRange = distance(ctx, obj) < INTERACT_RANGE;
      const wasInRange = objectsInRange.has(obj);

      if (inInteractRange === wasInRange) continue;

      if (inInteractRange) {
        objectsInRange.add(obj);
        if (obj.onPlayerEnterInteractRange) {
          await obj.onPlayerEnterInteractRange(ctx);
        }
      } else {
        objectsInRange.delete(obj);
      }
    }
  };

  const onPlayerMoveLeft = async (ctx: GameCtx) => {
    x -= MOVE_SPEED;
    await onPlayerMove(ctx);
  };

  const onPlayerMoveRight = async (ctx: GameCtx) => {
    x += MOVE_SPEED;
    await onPlayerMove(ctx);
  };

  const onPlayerInteract = async (ctx: GameCtx) => {
    const inRange = ctx.currentRoom.objects.filter(
      (obj) => distance(ctx, obj) < INTERACT_RANGE,
    );

    const closest = inRange.reduce<GameObject<GameCtx> | null>(
      (acc, obj) =>
        !acc || distance(ctx, obj) < distance(ctx, acc) ? obj : acc,
      null,
    );

    if (closest?.onPlayerInteract) {
      await closest.onPlayerInteract(ctx);
    }
  };

  return {
    getX,
    getDisplayName,
    getSprite,
    onPlayerMoveLeft,
    onPlayerMoveRight,
    onPlayerInteract,
  };
}
