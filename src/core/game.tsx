import { createContext, useContext, type JSX } from "solid-js";
import { type Log } from "./log";
import { type Room, type RoomData } from "./room";
import { type InputHandler } from "./input";
import { type Sprite } from "./sprite";
import { type Layout } from "./layout";

export interface GameCtx {
  log: Log;
  currentRoom: RoomData<GameCtx>;
  input: InputHandler;
  goToRoom: (room: Room<GameCtx>) => void;
  layout: Layout;
}

export interface GameObject<TCtx extends GameCtx> {
  getAssetPaths?(): string[];
  getX(ctx: TCtx): number;
  getDisplayName(ctx: TCtx): string;
  getSprite?(ctx: TCtx): Sprite;
  onEnterInteractRange?(ctx: TCtx): Promise<void>;
  onInteract?(ctx: TCtx): Promise<void>;
}

const GameCtxContext = createContext<GameCtx>();

export const GameCtxProvider = (props: {
  value: GameCtx;
  children: JSX.Element;
}) => {
  return (
    <GameCtxContext.Provider value={props.value}>
      {props.children}
    </GameCtxContext.Provider>
  );
};

export const getGameCtx = (): GameCtx => {
  const ctx = useContext(GameCtxContext);
  if (!ctx) {
    throw new Error(
      "tried to get game context outside of game context provider",
    );
  }
  return ctx;
};
