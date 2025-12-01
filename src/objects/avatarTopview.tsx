import { type Avatar, type AvatarPosition } from "@roc/core/avatar";
import { type GameObject } from "@roc/core/gameObject";
import { type GameCtx } from "@roc/core/game";
import { Sprite } from "@roc/core/sprite";

const INTERACT_RANGE = 50;
const MOVE_SPEED = 2;

export function createAvatarTopview(): Avatar<GameCtx> {
  const objectsInRange = new Set<object>();

  const distance = (ctx: GameCtx, obj: GameObject<GameCtx>) => {
    const dx = obj.getX(ctx) - ctx.room.get().avatarPosition.x;
    const dy =
      (obj.getY ? obj.getY(ctx) : ctx.room.get().avatarPosition.y) -
      ctx.room.get().avatarPosition.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const getX = (ctx: GameCtx) => ctx.room.get().avatarPosition.x;

  const getY = (ctx: GameCtx) => ctx.room.get().avatarPosition.y;

  const getDisplayName = () => "@";

  const getSprite = (_ctx: GameCtx) => {
    return Sprite.circle(30, "@");
  };

  const onPlayerMove = async (ctx: GameCtx) => {
    for (const obj of ctx.room.get().objects) {
      const inInteractRange = distance(ctx, obj) < INTERACT_RANGE;
      const wasInRange = objectsInRange.has(obj);

      if (inInteractRange === wasInRange) continue;

      if (inInteractRange) {
        objectsInRange.add(obj);
        if (obj.onEnterInteractRange) {
          await obj.onEnterInteractRange(ctx);
        }
      } else {
        objectsInRange.delete(obj);
      }
    }
  };

  const processInput = (ctx: GameCtx, position: AvatarPosition) => {
    let newPosition = { ...position };

    if (ctx.input.isKeyPressed("a")) {
      newPosition.x -= MOVE_SPEED;
      onPlayerMove(ctx);
    }
    if (ctx.input.isKeyPressed("d")) {
      newPosition.x += MOVE_SPEED;
      onPlayerMove(ctx);
    }
    if (ctx.input.isKeyPressed("w")) {
      newPosition.y -= MOVE_SPEED;
      onPlayerMove(ctx);
    }
    if (ctx.input.isKeyPressed("s")) {
      newPosition.y += MOVE_SPEED;
      onPlayerMove(ctx);
    }
    if (ctx.input.consumeKeyPress(" ")) {
      const inRange = ctx.room
        .get()
        .objects.filter((obj) => distance(ctx, obj) < INTERACT_RANGE);

      const closest = inRange.reduce<GameObject<GameCtx> | null>(
        (acc, obj) =>
          !acc || distance(ctx, obj) < distance(ctx, acc) ? obj : acc,
        null,
      );

      if (closest?.onInteract) {
        closest.onInteract(ctx);
      }
    }

    return newPosition;
  };

  const onEnterRoom = () => {
    objectsInRange.clear();
  };

  return {
    getX,
    getY,
    getDisplayName,
    getSprite,
    processInput,
    onEnterRoom,
  };
}
