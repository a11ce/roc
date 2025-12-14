import { createStore } from "solid-js/store";
import { type JSX } from "solid-js";
import { createSignal } from "solid-js";
import { type InputHandler, type KeyBind } from "./input";

interface PendingChoice {
  options: string[];
  resolve: (value: string) => void;
}

export interface Log {
  write(text: string): void;
  writeHTML(element: JSX.Element): void;
  showButtons(...options: string[]): Promise<string>;
  clear(): void;
  attachInputHandler(input: InputHandler): void;
  getMessages(): JSX.Element[];
  getPendingChoice(): PendingChoice | null;
  onButtonClick(choice: string): void;
  getHighlightedOption(): number | null;
}

export function createLog(): Log {
  let inputHandler: InputHandler | null = null;
  let keyBinds: KeyBind[] = [];
  const [highlightedOption, setHighlightedOption] = createSignal<number | null>(
    null,
  );

  const [store, setStore] = createStore<{
    messages: JSX.Element[];
    pendingChoice: PendingChoice | null;
  }>({
    messages: [],
    pendingChoice: null,
  });

  const attachInputHandler = (input: InputHandler) => {
    inputHandler = input;
  };

  const writeHTML = (element: JSX.Element) => {
    setStore("messages", (messages) => [...messages, element]);
  };

  const write = (text: string) => {
    setStore("messages", (messages) => [...messages, <>{text}</>]);
  };

  const clearkeyBinds = () => {
    keyBinds.forEach((binding) => binding.remove());
    keyBinds = [];
  };

  const bindNavigation = () => {
    if (!inputHandler) return;

    clearkeyBinds();

    const navigate = (direction: 1 | -1) => () => {
      const current = highlightedOption();
      const optionCount = store.pendingChoice?.options.length ?? 0;
      if (optionCount > 0) {
        if (current === null) {
          setHighlightedOption(direction === 1 ? 0 : optionCount - 1);
        } else {
          setHighlightedOption(
            (current + direction + optionCount) % optionCount,
          );
        }
      }
    };

    const navigateUp = navigate(-1);
    const navigateDown = navigate(1);

    const selectOption = () => {
      const current = highlightedOption();
      if (current !== null && store.pendingChoice) {
        const option = store.pendingChoice.options[current];
        onButtonClick(option);
      }
      return true;
    };

    const bindKeys = (keys: string[], callback: () => boolean | void) => {
      keys.forEach((key) => {
        const binding = inputHandler!.bind(key, callback);
        keyBinds.push(binding);
      });
    };

    bindKeys(["w", "W", "a", "A", "ArrowUp", "ArrowLeft"], navigateUp);
    bindKeys(["s", "S", "d", "D", "ArrowDown", "ArrowRight"], navigateDown);
    bindKeys([" "], selectOption);
  };

  const showButtons = async (...options: string[]): Promise<string> => {
    inputHandler?.lock();
    return new Promise((resolve) => {
      setStore("pendingChoice", { options, resolve });
      bindNavigation();
    });
  };

  const clear = () => {
    setStore("messages", []);
  };

  const onButtonClick = (choice: string) => {
    if (store.pendingChoice) {
      store.pendingChoice.resolve(choice);
      setStore("pendingChoice", null);
      setHighlightedOption(null);
      inputHandler?.unlock();
    }
  };

  return {
    write,
    writeHTML,
    showButtons,
    clear,
    attachInputHandler,
    getMessages: () => store.messages,
    getPendingChoice: () => store.pendingChoice,
    onButtonClick,
    getHighlightedOption: highlightedOption,
  };
}
