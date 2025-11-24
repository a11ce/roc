import { Assets } from "pixi.js";
import { type GameObject } from "./game";
import { type Avatar } from "./avatar";

export interface Room {
  avatar: Avatar;
  objects: GameObject[];
}

export const loadRoomAssets = async (room: Room) => {
  if (room.avatar?.getAssetPaths) {
    await Assets.load(room.avatar.getAssetPaths());
  }

  for (const obj of room.objects) {
    if (obj.getAssetPaths) {
      await Assets.load(obj.getAssetPaths());
    }
  }
};
