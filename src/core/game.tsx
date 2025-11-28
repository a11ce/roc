import { type Log } from "./log";
import { type Room, type RoomData } from "./room";
import { type InputHandler } from "./input";
import { type Sprite } from "./sprite";

export interface GameCtx {
  log: Log;
  currentRoom: RoomData<GameCtx>;
  input: InputHandler;
  goToRoom: (room: Room<GameCtx>) => void;
}

export interface GameObject<TCtx extends GameCtx> {
  getAssetPaths?(): string[];
  getX(ctx: TCtx): number;
  getDisplayName(ctx: TCtx): string;
  getSprite?(ctx: TCtx): Sprite;
  onEnterInteractRange?(ctx: TCtx): Promise<void>;
  onInteract?(ctx: TCtx): Promise<void>;
}
