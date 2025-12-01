import { sideview } from "./layouts";
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
      ctx.layout.set(sideview);
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
