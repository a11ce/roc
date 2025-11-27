import { type GameCtx } from "./game";

export function processSideviewInput(ctx: GameCtx): void {
  if (ctx.input.isKeyPressed("a") && ctx.currentRoom.avatar.onPlayerMoveLeft) {
    ctx.currentRoom.avatar.onPlayerMoveLeft(ctx);
  }
  if (ctx.input.isKeyPressed("d") && ctx.currentRoom.avatar.onPlayerMoveRight) {
    ctx.currentRoom.avatar.onPlayerMoveRight(ctx);
  }
  if (
    ctx.input.consumeKeyPress(" ") &&
    ctx.currentRoom.avatar.onPlayerInteract
  ) {
    ctx.currentRoom.avatar.onPlayerInteract(ctx);
  }
}
