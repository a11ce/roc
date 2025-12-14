import { getGameCtx, type GameCtx } from "@roc/core/game";
import type { Inventory } from "./inventory";

export interface ExampleCtx extends GameCtx {
  playerInventory: Inventory;
  isFox: boolean;
  writeParagraph(text: string): void;
}

export const getExampleCtx = () => getGameCtx() as ExampleCtx;
