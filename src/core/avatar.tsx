import { type GameObject, type GameCtx } from "./game";

export interface Avatar<TCtx extends GameCtx> extends GameObject<TCtx> {
  onPlayerMoveLeft?(ctx: TCtx): Promise<void>;
  onPlayerMoveRight?(ctx: TCtx): Promise<void>;
  onPlayerInteract?(ctx: TCtx): Promise<void>;
}
