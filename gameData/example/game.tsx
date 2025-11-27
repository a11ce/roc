import type { GameCtx } from "@roc/core/game";
import type { Inventory } from "./inventory";

export interface ExampleCtx extends GameCtx {
  playerInventory: Inventory;
}
