import { Component, For, Show, createEffect } from "solid-js";
import { getGameCtx } from "@roc/core/game";

const LogDisplay: Component = () => {
  const ctx = getGameCtx();
  let logContainerRef!: HTMLDivElement;

  createEffect(() => {
    ctx.log.getMessages().length;
    ctx.log.getPendingChoice();
    logContainerRef.scrollTop = logContainerRef.scrollHeight;
  });

  return (
    <div class="panel" ref={logContainerRef}>
      <For each={ctx.log.getMessages()}>
        {(message) => <div>{message}</div>}
      </For>

      <Show when={ctx.log.getPendingChoice()}>
        <div class="buttons">
          <For each={ctx.log.getPendingChoice()!.options}>
            {(option, index) => (
              <button
                onClick={() => ctx.log.onButtonClick(option)}
                classList={{
                  hover: ctx.log.getHighlightedOption() === index(),
                }}
              >
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
