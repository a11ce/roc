import { Component, For } from "solid-js";
import { getExampleCtx } from "../game";

const InventoryDisplay: Component = () => {
  const ctx = getExampleCtx();

  return (
    <div class="panel">
      <h3>Inventory</h3>
      <For each={ctx.playerInventory.getItems()}>{(item) => <p>{item}</p>}</For>
    </div>
  );
};

export default InventoryDisplay;
