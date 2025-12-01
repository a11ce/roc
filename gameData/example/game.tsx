import { getGameCtx, type GameCtx } from "@roc/core/game";
import type { Inventory } from "./inventory";

export interface ExampleCtx extends GameCtx {
  playerInventory: Inventory;
  isFox: boolean;
}

export const getExampleCtx = () => getGameCtx() as ExampleCtx;
