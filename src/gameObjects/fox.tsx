import { type GameObject, type GameCtx } from "../core/game";

export function createFox(): GameObject {
  let hasBeenPet = false;

  const onPlayerApproach = async (ctx: GameCtx) => {
    if (hasBeenPet) {
      ctx.log.write("the fox licks ur hand");
    } else {
      ctx.log.write("the fox growls");
    }
  };

  const onPlayerInteract = async (ctx: GameCtx) => {
    ctx.log.write("try to pet the fox?");
    if ((await ctx.log.showButtons("yes", "no")) === "yes") {
      ctx.log.write("you pet the fox");
      hasBeenPet = true;
    } else {
      ctx.log.write("you decide not to pet the fox");
    }
  };

  return {
    onPlayerApproach,
    onPlayerInteract,
  };
}
