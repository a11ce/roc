import { createSignal } from "solid-js";
import { type GameObject } from "./gameObject";
import { type GameCtx } from "./game";
import { type AvatarPosition } from "./avatar";

export interface SideviewGfxConfig {
  width: number;
  scrollDeadzone?: number;
}

export interface RoomData<TCtx extends GameCtx> {
  avatarPosition: AvatarPosition;
  objects: GameObject<TCtx>[];
  onEnter?(ctx: TCtx): void;
  onLeave?(ctx: TCtx): void;
  sideviewGfx?: SideviewGfxConfig;
}

export type Room<TCtx extends GameCtx> = ((ctx: TCtx) => RoomData<TCtx>) & {
  __sigil: "StaticOrResetRoom";
};

export interface RoomController<TCtx extends GameCtx> {
  get(): RoomData<TCtx>;
  goTo(room: Room<TCtx>): void;
}

export const createRoomController = <TCtx extends GameCtx>(
  ctx: TCtx,
): RoomController<TCtx> => {
  const [currentRoom, setCurrentRoom] = createSignal<RoomData<TCtx>>(
    undefined!,
  );

  const get = () => currentRoom();

  const goTo = (room: Room<TCtx>) => {
    currentRoom()?.onLeave?.(ctx);
    setCurrentRoom(room(ctx));
    ctx.avatar.get().onEnterRoom?.(ctx);
    for (const obj of currentRoom().objects) {
      obj.onEnterRoom?.(ctx);
    }
    currentRoom().onEnter?.(ctx);
  };

  return { get, goTo };
};

export const createStaticRoom = <TCtx extends GameCtx>(
  factory: (ctx: TCtx) => RoomData<TCtx>,
): Room<TCtx> => {
  let cached: RoomData<TCtx> | null = null;
  const fn = (ctx: TCtx) => (cached ??= factory(ctx));
  return Object.assign(fn, { __sigil: "StaticOrResetRoom" as const });
};

export const createResetRoom = <TCtx extends GameCtx>(
  factory: (ctx: TCtx) => RoomData<TCtx>,
): Room<TCtx> => {
  return Object.assign(factory, { __sigil: "StaticOrResetRoom" as const });
};
