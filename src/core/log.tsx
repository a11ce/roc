import { createStore } from "solid-js/store";

interface PendingChoice {
  options: string[];
  resolve: (value: string) => void;
}

export interface Log {
  write(text: string): void;
  showButtons(...options: string[]): Promise<string>;
  clear(): void;
}

export interface LogObserver {
  getMessages(): string[];
  getPendingChoice(): PendingChoice | null;
  onButtonClick: (choice: string) => void;
}

export function createLog(): { log: Log; observer: LogObserver } {
  const [store, setStore] = createStore<{
    messages: string[];
    pendingChoice: PendingChoice | null;
  }>({
    messages: [],
    pendingChoice: null,
  });

  const write = (text: string) => {
    setStore("messages", (messages) => [...messages, text]);
  };

  const showButtons = async (...options: string[]): Promise<string> => {
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
    }
  };

  const log: Log = {
    write,
    showButtons,
    clear,
  };

  const observer: LogObserver = {
    getMessages: () => store.messages,
    getPendingChoice: () => store.pendingChoice,
    onButtonClick,
  };

  return { log, observer };
}
