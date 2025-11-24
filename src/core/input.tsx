export interface InputHandler {
  isKeyPressed(key: string): boolean;
  consumeKeyPress(key: string): boolean;
  lock(): void;
  unlock(): void;
  destroy(): void;
}

export function createInputHandler(): InputHandler {
  const keysPressed: Set<string> = new Set();
  const justPressedKeys: Set<string> = new Set();
  let locked = false;

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.repeat) return;

    keysPressed.add(e.key);
    justPressedKeys.add(e.key);
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

  setupInputHandlers();

  return {
    isKeyPressed,
    consumeKeyPress,
    lock,
    unlock,
    destroy,
  };
}
