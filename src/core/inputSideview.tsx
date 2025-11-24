import { type GameCtx } from "./game";

export function processSideviewInput(ctx: GameCtx): void {
  if (ctx.input.isKeyPressed("a") && ctx.room.avatar.onPlayerMoveLeft) {
    ctx.room.avatar.onPlayerMoveLeft(ctx);
  }
  if (ctx.input.isKeyPressed("d") && ctx.room.avatar.onPlayerMoveRight) {
    ctx.room.avatar.onPlayerMoveRight(ctx);
  }
  if (ctx.input.consumeKeyPress(" ") && ctx.room.avatar.onPlayerInteract) {
    ctx.room.avatar.onPlayerInteract(ctx);
  }
}
