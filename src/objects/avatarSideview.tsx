import { type Avatar, type AvatarPosition } from "@roc/core/avatar";
import { type GameObject } from "@roc/core/gameObject";
import { type GameCtx } from "@roc/core/game";
import { Sprite } from "@roc/core/sprite";

const DEFAULT_INTERACT_RANGE = 100;
const BASE_SPEED = 2.5;

export function createAvatarSideview(speedOverride?: number): Avatar<GameCtx> {
  const objectsInRange = new Set<object>();

  const interactRange = (ctx: GameCtx) =>
    ctx.room.get().sideviewGfx?.interactRange ?? DEFAULT_INTERACT_RANGE;

  const distance = (ctx: GameCtx, obj: GameObject<GameCtx>) =>
    obj.getX
      ? Math.abs(obj.getX(ctx) - ctx.room.get().avatarPosition.x)
      : Infinity;

  const getX = (ctx: GameCtx) => ctx.room.get().avatarPosition.x;

  const getDisplayName = () => "@";

  const getSprite = (ctx: GameCtx) => {
    const scale = ctx.room.get().sideviewGfx?.avatarScale ?? 1;
    return Sprite.circle(30, "@", scale);
  };

  const onPlayerMove = async (ctx: GameCtx) => {
    for (const obj of ctx.room.get().objects) {
      const inInteractRange = distance(ctx, obj) < interactRange(ctx);
      const wasInRange = objectsInRange.has(obj);

      if (inInteractRange === wasInRange) continue;

      if (inInteractRange) {
        objectsInRange.add(obj);
        if (obj.onEnterInteractRange) {
          await obj.onEnterInteractRange(ctx);
        }
      } else {
        objectsInRange.delete(obj);
        if (obj.onLeaveInteractRange) {
          await obj.onLeaveInteractRange(ctx);
        }
      }
    }
  };

  const processInput = (ctx: GameCtx, position: AvatarPosition) => {
    let newPosition = { ...position };
    const scale = ctx.room.get().sideviewGfx?.avatarScale ?? 1;
    const speed = speedOverride ?? BASE_SPEED * scale;

    if (ctx.input.isKeyPressed("a") || ctx.input.isKeyPressed("ArrowLeft")) {
      newPosition.x -= speed;
      onPlayerMove(ctx);
    }
    if (ctx.input.isKeyPressed("d") || ctx.input.isKeyPressed("ArrowRight")) {
      newPosition.x += speed;
      onPlayerMove(ctx);
    }
    if (ctx.input.consumeKeyPress(" ")) {
      const inRange = ctx.room
        .get()
        .objects.filter(
          (obj) => distance(ctx, obj) < interactRange(ctx) && obj.onInteract,
        );

      const closest = inRange.reduce<GameObject<GameCtx> | null>(
        (acc, obj) =>
          !acc || distance(ctx, obj) < distance(ctx, acc) ? obj : acc,
        null,
      );

      if (closest) {
        closest.onInteract!(ctx);
      }
    }

    const sideviewGfx = ctx.room.get().sideviewGfx;
    if (sideviewGfx) {
      newPosition.x = Math.max(0, Math.min(newPosition.x, sideviewGfx.width));
    }

    return newPosition;
  };

  const onEnterRoom = () => {
    objectsInRange.clear();
  };

  return {
    getX,
    getDisplayName,
    getSprite,
    processInput,
    onEnterRoom,
  };
}
