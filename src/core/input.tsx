export interface KeyBind {
  remove(): void;
}

export interface InputHandler {
  isKeyPressed(key: string): boolean;
  consumeKeyPress(key: string): boolean;
  lock(): void;
  unlock(): void;
  destroy(): void;
  bind(key: string, callback: () => boolean | void): KeyBind;
}

export function createInputHandler(): InputHandler {
  const keysPressed: Set<string> = new Set();
  const justPressedKeys: Set<string> = new Set();
  let locked = false;
  let callbacks: Array<{ key: string; callback: () => boolean | void }> = [];

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.repeat) return;

    keysPressed.add(e.key);

    let bound = false;

    callbacks = callbacks.filter((binding) => {
      if (binding.key !== e.key) return true;
      bound = true;
      return !binding.callback();
    });

    if (!bound) {
      justPressedKeys.add(e.key);
    }
  };

  const onKeyUp = (e: KeyboardEvent) => {
    keysPressed.delete(e.key);
  };

  const setupInputHandlers = () => {
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
  };

  const isKeyPressed = (key: string): boolean => {
    return !locked && keysPressed.has(key);
  };

  const consumeKeyPress = (key: string): boolean => {
    if (locked) return false;

    const wasPressed = justPressedKeys.has(key);
    justPressedKeys.delete(key);
    return wasPressed;
  };

  const lock = () => {
    locked = true;
  };

  const unlock = () => {
    locked = false;
  };

  const destroy = () => {
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("keyup", onKeyUp);
  };

  const bind = (key: string, callback: () => boolean | void): KeyBind => {
    const binding = { key, callback };
    callbacks.push(binding);

    return {
      remove: () => {
        const index = callbacks.indexOf(binding);
        if (index !== -1) {
          callbacks.splice(index, 1);
        }
      },
    };
  };

  setupInputHandlers();

  return {
    isKeyPressed,
    consumeKeyPress,
    lock,
    unlock,
    destroy,
    bind,
  };
}
