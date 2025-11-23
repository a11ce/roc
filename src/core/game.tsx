import { type Log } from "./log";

export interface GameCtx {
  log: Log;
}

export interface GameObject {
  onPlayerApproach?(ctx: GameCtx): Promise<void>;
  onPlayerInteract?(ctx: GameCtx): Promise<void>;
}
