import { vSplit, hSplit } from "@roc/core/layout";
import SideviewRoom from "@roc/components/SideviewRoom";
import Debug from "@roc/components/Debug";
import LogDisplay from "@roc/components/LogDisplay";
import InventoryDisplay from "./components/InventoryDisplay";
import type { ExampleCtx } from "./game";

export interface Inventory {
  add(item: string): void;
  has(item: string): boolean;
  getItems(): string[];
}

export function createInventory(ctx: ExampleCtx): Inventory {
  const items: string[] = [];
  let inventoryShown = false;

  const add = (item: string) => {
    items.push(item);

    if (!inventoryShown) {
      inventoryShown = true;
      ctx.layout.set(
        vSplit(
          25,
          SideviewRoom,
          hSplit(25, vSplit(50, Debug, InventoryDisplay), LogDisplay),
        ),
      );
    }
  };

  const has = (item: string) => items.includes(item);

  const getItems = () => items;

  return {
    add,
    has,
    getItems,
  };
}
