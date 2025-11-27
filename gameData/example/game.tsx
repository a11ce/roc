import type { GameCtx } from "../../src/core/game";
import type { Inventory } from "./inventory";

export interface ExampleCtx extends GameCtx {
  playerInventory: Inventory;
}
