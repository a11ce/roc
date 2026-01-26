import { createAvatarSideview } from "@roc/objects/avatarSideview";
import { createAvatarTopview } from "@roc/objects/avatarTopview";
import { Sprite } from "@roc/core/sprite";

export const avatarSideview = createAvatarSideview();

export const avatarTopview = createAvatarTopview();

export const foxAvatarSideview = {
  ...createAvatarSideview(6),
  getSprite: () => Sprite.fromFile("fox.png", 5),
};

export const foxAvatarTopview = {
  ...createAvatarTopview(6),
  getSprite: () => Sprite.fromFile("fox.png", 5),
};
