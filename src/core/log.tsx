import { createStore } from "solid-js/store";
import { type JSX } from "solid-js";
import { type InputHandler } from "./input";

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
}

export function createLog(): Log {
  let inputHandler: InputHandler | null = null;

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

  const showButtons = async (...options: string[]): Promise<string> => {
    inputHandler?.lock();
    return new Promise((resolve) => {
      setStore("pendingChoice", { options, resolve });
    });
  };

  const clear = () => {
    setStore("messages", []);
  };

  const onButtonClick = (choice: string) => {
    if (store.pendingChoice) {
      store.pendingChoice.resolve(choice);
      setStore("pendingChoice", null);
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
  };
}
