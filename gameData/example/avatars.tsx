import { createAvatarSideview } from "@roc/objects/avatarSideview";
import { createAvatarTopview } from "@roc/objects/avatarTopview";
import { Sprite } from "@roc/core/sprite";

export const avatarSideview = createAvatarSideview();

export const avatarTopview = createAvatarTopview();

export const foxAvatarSideview = {
  ...createAvatarSideview(),
  getAssetPaths: () => ["/assets/fox.png"],
  getSprite: () => Sprite.fromFile("/assets/fox.png", 5),
};

export const foxAvatarTopview = {
  ...createAvatarTopview(),
  getAssetPaths: () => ["/assets/fox.png"],
  getSprite: () => Sprite.fromFile("/assets/fox.png", 5),
};
