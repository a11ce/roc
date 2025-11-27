import { Assets } from "pixi.js";
import { type GameObject, type GameCtx } from "./game";
import { type Avatar } from "./avatar";

export interface Room<TCtx extends GameCtx> {
  avatar: Avatar<TCtx>;
  objects: GameObject<TCtx>[];
}

export const loadRoomAssets = async <TCtx extends GameCtx>(
  room: Room<TCtx>,
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
