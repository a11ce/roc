import { type Log } from "./log";
import { type Room } from "./room";
import { type InputHandler } from "./input";
import { type Sprite } from "./sprite";
import { type Container } from "pixi.js";

export interface GameCtx {
  log: Log;
  room: Room;
  input: InputHandler;
}

export interface GameObject {
  getAssetPaths?(): string[];
  getX(ctx: GameCtx): number;
  getDisplayName(ctx: GameCtx): string;
  getSprite(ctx: GameCtx): Sprite;
  onPlayerEnterInteractRange?(ctx: GameCtx): Promise<void>;
  onPlayerInteract?(ctx: GameCtx): Promise<void>;
  gfxContainer?: Container;
}
