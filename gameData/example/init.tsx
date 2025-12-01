import { createLog } from "@roc/core/log";
import { createInputHandler } from "@roc/core/input";
import { createGoToRoom } from "@roc/core/room";
import { createLayout, vSplit, hSplit } from "@roc/core/layout";
import { createInventory } from "./inventory";
import { forest } from "./rooms/forest";
import type { ExampleCtx } from "./game";
import SideviewRoom from "@roc/components/SideviewRoom";
import Debug from "@roc/components/Debug";
import LogDisplay from "@roc/components/LogDisplay";

export function initializeExample(): ExampleCtx {
  const log = createLog();
  const input = createInputHandler();
  const layout = createLayout();
  log.attachInputHandler(input);

  const ctx = {} as ExampleCtx;

  ctx.log = log;
  ctx.input = input;
  ctx.layout = layout;
  ctx.goToRoom = createGoToRoom(ctx);
  ctx.playerInventory = createInventory(ctx);

  ctx.layout.set(vSplit(25, SideviewRoom, hSplit(25, Debug, LogDisplay)));

  ctx.goToRoom(forest);

  return ctx;
}
