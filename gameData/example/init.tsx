import { createLog } from "@roc/core/log";
import { createInputHandler } from "@roc/core/input";
import { createRoomController } from "@roc/core/room";
import { createLayoutController } from "@roc/core/layout";
import { createAvatarController } from "@roc/core/avatar";
import { createTaskController } from "@roc/core/task";
import { createColorController } from "@roc/core/colors";
import { createInventory } from "./inventory";
import { avatarSideview } from "./avatars";
import { forest } from "./rooms/forest";
import { sideviewBeforeInventory } from "./layouts";
import type { ExampleCtx } from "./game";

export function initializeExample(): ExampleCtx {
  const log = createLog();
  const input = createInputHandler();
  const layout = createLayoutController();
  const avatar = createAvatarController(avatarSideview);
  const task = createTaskController();
  const color = createColorController();
  log.attachInputHandler(input);

  const ctx = {} as ExampleCtx;

  ctx.gameName = "example";

  ctx.log = log;
  ctx.input = input;
  ctx.layout = layout;
  ctx.avatar = avatar;
  ctx.task = task;
  ctx.color = color;
  ctx.room = createRoomController(ctx);
  ctx.playerInventory = createInventory(ctx);
  ctx.isFox = false;

  ctx.layout.set(sideviewBeforeInventory);

  ctx.room.goTo(forest);

  return ctx;
}
