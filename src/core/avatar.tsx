import { type GameObject } from "./gameObject";
import { type GameCtx } from "./game";

export interface AvatarPosition {
  x: number;
  y: number;
}

export interface Avatar<TCtx extends GameCtx> extends GameObject<TCtx> {
  processInput(ctx: TCtx, position: AvatarPosition): AvatarPosition;
}

export interface AvatarController {
  set: (avatar: Avatar<GameCtx>) => void;
  get: () => Avatar<GameCtx>;
}

export const createAvatarController = (
  initialAvatar: Avatar<GameCtx>,
): AvatarController => {
  let avatar = initialAvatar;

  const set = (newAvatar: Avatar<GameCtx>) => {
    avatar = newAvatar;
  };

  const get = () => avatar;

  return {
    set,
    get,
  };
};
