import { Component, For, Show } from "solid-js";
import { getGameCtx } from "@roc/core/game";

const LogDisplay: Component = () => {
  const ctx = getGameCtx();

  return (
    <div class="panel">
      <For each={ctx.log.getMessages()}>
        {(message) => <div>{message}</div>}
      </For>

      <Show when={ctx.log.getPendingChoice()}>
        <div class="buttons">
          <For each={ctx.log.getPendingChoice()!.options}>
            {(option) => (
              <button onClick={() => ctx.log.onButtonClick(option)}>
                {option}
              </button>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
};

export default LogDisplay;
