export interface Inventory {
  add(item: string): void;
  has(item: string): boolean;
}

export function createInventory(): Inventory {
  const items: string[] = [];

  const add = (item: string) => {
    items.push(item);
  };

  const has = (item: string) => items.includes(item);

  return {
    add,
    has,
  };
}
