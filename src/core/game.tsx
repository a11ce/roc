import { createContext, useContext, type JSX } from "solid-js";
import { type Log } from "./log";
import { type RoomController } from "./room";
import { type InputHandler } from "./input";
import { type LayoutController } from "./layout";
import { type AvatarController } from "./avatar";
import { type TaskController } from "./task";
import { type ColorController } from "./colors";

export interface GameCtx {
  gameName: string;
  log: Log;
  room: RoomController<this>;
  avatar: AvatarController;
  input: InputHandler;
  layout: LayoutController;
  task: TaskController;
  color: ColorController;
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
