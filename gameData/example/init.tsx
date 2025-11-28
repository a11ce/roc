import { createLog } from "@roc/core/log";
import { createInputHandler } from "@roc/core/input";
import { createGoToRoom } from "@roc/core/room";
import { createInventory } from "./inventory";
import { forest } from "./rooms/forest";
import type { ExampleCtx } from "./game";

export function initializeExample(): ExampleCtx {
  const log = createLog();
  const input = createInputHandler();

  const ctx = {} as ExampleCtx;

  ctx.log = log;
  ctx.input = input;
  ctx.playerInventory = createInventory();
  ctx.goToRoom = createGoToRoom(ctx);
  ctx.goToRoom(forest);

  log.attachInputHandler(input);
  return ctx;
}
