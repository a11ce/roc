import { type GameObject, type GameCtx } from "@roc/core/game";

export function createLatchText(x: number, text: string): GameObject<GameCtx> {
  let latch = false;

  const getX = () => x;

  const getDisplayName = () => "Latch text";

  const onEnterInteractRange = async (ctx: GameCtx) => {
    if (!latch) {
      ctx.log.write(text);
      latch = true;
    }
  };

  return { getX, getDisplayName, onEnterInteractRange };
}
