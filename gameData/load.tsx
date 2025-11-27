import type { GameCtx } from "../src/core/game";
import { initializeExample } from "./example/init";

export function loadGame(): GameCtx {
  return initializeExample();
}
