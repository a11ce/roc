import { Assets } from "pixi.js";
import { createSignal } from "solid-js";
import { type GameObject } from "./gameObject";
import { type GameCtx } from "./game";
import { type AvatarPosition } from "./avatar";

export interface RoomData<TCtx extends GameCtx> {
  avatarPosition: AvatarPosition;
  objects: GameObject<TCtx>[];
  onEnter?(ctx: TCtx): void;
}

export type Room<TCtx extends GameCtx> = (() => RoomData<TCtx>) & {
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
    setCurrentRoom(room());
    ctx.avatar.get().onEnterRoom?.(ctx);
    for (const obj of currentRoom().objects) {
      obj.onEnterRoom?.(ctx);
    }
    currentRoom().onEnter?.(ctx);
  };

  return { get, goTo };
};

export const loadRoomAssets = async <TCtx extends GameCtx>(ctx: TCtx) => {
  const avatar = ctx.avatar.get();
  if (avatar?.getAssetPaths) {
    await Assets.load(avatar.getAssetPaths());
  }

  for (const obj of ctx.room.get().objects) {
    if (obj.getAssetPaths) {
      await Assets.load(obj.getAssetPaths());
    }
  }
};

export const createStaticRoom = <TCtx extends GameCtx>(
  factory: () => RoomData<TCtx>,
): Room<TCtx> => {
  let cached: RoomData<TCtx> | null = null;
  const fn = () => (cached ??= factory());
  return Object.assign(fn, { __sigil: "StaticOrResetRoom" as const });
};

export const createResetRoom = <TCtx extends GameCtx>(
  factory: () => RoomData<TCtx>,
): Room<TCtx> => {
  return Object.assign(factory, { __sigil: "StaticOrResetRoom" as const });
};
