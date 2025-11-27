import { type Log } from "./log";
import { type Room } from "./room";
import { type InputHandler } from "./input";
import { type Sprite } from "./sprite";
import { type Container } from "pixi.js";

export interface GameCtx {
  log: Log;
  currentRoom: Room<GameCtx>;
  input: InputHandler;
}

export interface GameObject<TCtx extends GameCtx> {
  getAssetPaths?(): string[];
  getX(ctx: TCtx): number;
  getDisplayName(ctx: TCtx): string;
  getSprite?(ctx: TCtx): Sprite;
  onPlayerEnterInteractRange?(ctx: TCtx): Promise<void>;
  onPlayerInteract?(ctx: TCtx): Promise<void>;
  gfxContainer?: Container;
}
