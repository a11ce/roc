import { type GameObject } from "@roc/core/gameObject";
import { type GameCtx } from "@roc/core/game";
import { type JSX } from "solid-js";

export function createLatchText(
  x: number,
  text: string | JSX.Element,
): GameObject<GameCtx> {
  let latch = false;

  const getX = () => x;

  const getDisplayName = () => "Latch text";

  const onEnterInteractRange = async (ctx: GameCtx) => {
    if (!latch) {
      if (typeof text === "string") {
        ctx.log.write(text);
      } else {
        ctx.log.writeHTML(text);
      }
      latch = true;
    }
  };

  return { getX, getDisplayName, onEnterInteractRange };
}
