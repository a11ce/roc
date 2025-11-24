import { Component, For, Show } from "solid-js";
import { type GameCtx } from "../core/game";

interface LogDisplayP {
  ctx: GameCtx;
}

const LogDisplay: Component<LogDisplayP> = (props) => {
  return (
    <div class="panel">
      <For each={props.ctx.log.getMessages()}>
        {(message) => <div>{message}</div>}
      </For>

      <Show when={props.ctx.log.getPendingChoice()}>
        <div class="buttons">
          <For each={props.ctx.log.getPendingChoice()!.options}>
            {(option) => (
              <button onClick={() => props.ctx.log.onButtonClick(option)}>
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
