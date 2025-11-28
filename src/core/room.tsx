import { Assets } from "pixi.js";
import { type GameObject, type GameCtx } from "./game";
import { type Avatar } from "./avatar";

export interface RoomData<TCtx extends GameCtx> {
  avatar: Avatar<TCtx>;
  objects: GameObject<TCtx>[];
  onEnter?(ctx: TCtx): void;
}

export type Room<TCtx extends GameCtx> = (() => RoomData<TCtx>) & {
  __sigil: "StaticOrResetRoom";
};

export const loadRoomAssets = async <TCtx extends GameCtx>(
  room: RoomData<TCtx>,
) => {
  if (room.avatar?.getAssetPaths) {
    await Assets.load(room.avatar.getAssetPaths());
  }

  for (const obj of room.objects) {
    if (obj.getAssetPaths) {
      await Assets.load(obj.getAssetPaths());
    }
  }
};

export const createGoToRoom = <TCtx extends GameCtx>(ctx: TCtx) => {
  return (room: Room<TCtx>) => {
    const roomData = room();
    ctx.currentRoom = roomData;
    roomData.onEnter?.(ctx);
  };
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
