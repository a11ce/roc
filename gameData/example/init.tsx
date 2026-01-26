import { createLog } from "@roc/core/log";
import { createInputHandler } from "@roc/core/input";
import { createRoomController } from "@roc/core/room";
import { createLayoutController } from "@roc/core/layout";
import { createAvatarController } from "@roc/core/avatar";
import { createTaskController } from "@roc/core/task";
import { createColorController } from "@roc/core/colors";
import { createAudioController } from "@roc/core/audio";
import { loadAssets } from "@roc/core/assets";
import { createInventory } from "./inventory";
import { avatarSideview } from "./avatars";
import { forest } from "./rooms/forest";
import { sideviewBeforeInventory } from "./layouts";
import type { ExampleCtx } from "./game";

export async function initializeExample(): Promise<ExampleCtx> {
  const log = createLog();
  const input = createInputHandler();
  const layout = createLayoutController();
  const avatar = createAvatarController(avatarSideview);
  const task = createTaskController();
  const color = createColorController();
  const audio = createAudioController();
  log.attachInputHandler(input);

  const ctx = {} as ExampleCtx;

  ctx.gameName = "example";

  ctx.log = log;
  ctx.input = input;
  ctx.layout = layout;
  ctx.avatar = avatar;
  ctx.task = task;
  ctx.color = color;
  ctx.audio = audio;
  ctx.room = createRoomController(ctx);
  ctx.playerInventory = createInventory(ctx);
  ctx.isFox = false;

  const writeParagraph = (text: string) => {
    ctx.log.writeHTML(() => (
      <span style={{ "max-width": "600px", display: "inline-block" }}>
        {text}
      </span>
    ));
  };
  ctx.writeParagraph = writeParagraph;

  ctx.audio.init(ctx);

  ctx.layout.set(sideviewBeforeInventory);

  await loadAssets(ctx.gameName);

  ctx.room.goTo(forest);

  return ctx;
}
