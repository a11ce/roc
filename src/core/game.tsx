import { createContext, useContext, type JSX } from "solid-js";
import { type Log } from "./log";
import { type RoomController } from "./room";
import { type InputHandler } from "./input";
import { type LayoutController } from "./layout";
import { type AvatarController } from "./avatar";

export interface GameCtx {
  log: Log;
  room: RoomController<GameCtx>;
  avatar: AvatarController;
  input: InputHandler;
  layout: LayoutController;
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
