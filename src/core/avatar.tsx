import { type GameObject, type GameCtx } from "./game";

export interface Avatar extends GameObject {
  onPlayerMoveLeft?(ctx: GameCtx): Promise<void>;
  onPlayerMoveRight?(ctx: GameCtx): Promise<void>;
  onPlayerInteract?(ctx: GameCtx): Promise<void>;
}
