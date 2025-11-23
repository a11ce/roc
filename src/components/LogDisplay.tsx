import { Component, For, Show } from "solid-js";
import { type LogObserver } from "../core/log";

interface LogDisplayP {
  log: LogObserver;
}

const LogDisplay: Component<LogDisplayP> = (props) => {
  return (
    <div class="panel">
      <For each={props.log.getMessages()}>
        {(message) => <div>{message}</div>}
      </For>

      <Show when={props.log.getPendingChoice()}>
        <div class="buttons">
          <For each={props.log.getPendingChoice()!.options}>
            {(option) => (
              <button onClick={() => props.log.onButtonClick(option)}>
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
