import { createLog } from "@roc/core/log";
import { createInputHandler } from "@roc/core/input";
import { createAvatarSideview } from "@roc/gameObjects/avatarSideview";
import { createLatchText } from "@roc/gameObjects/latchText";
import { createFox } from "./gameObjects/fox";
import { createInventory } from "./inventory";
import type { ExampleCtx } from "./game";

export function initializeExample(): ExampleCtx {
  const log = createLog();
  const input = createInputHandler();
  const avatar = createAvatarSideview(100);
  const fox = createFox();
  const welcomeText = createLatchText(200, "you are in Foxkey Forest");

  const ctx: ExampleCtx = {
    log,
    input,
    playerInventory: createInventory(),
    currentRoom: {
      avatar,
      objects: [welcomeText, fox],
    },
  };

  log.attachInputHandler(input);
  return ctx;
}
