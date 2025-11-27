import type { GameCtx } from "@roc/core/game";
import { initializeExample } from "./example/init";

export function loadGame(): GameCtx {
  return initializeExample();
}
