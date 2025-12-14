import { type GameObject } from "@roc/core/gameObject";
import { Sprite } from "@roc/core/sprite";
import type { ExampleCtx } from "../game";

export function createDomino(startX: number): GameObject<ExampleCtx> {
  const getAssetPaths = () => ["dominoWide.png"];

  const getX = () => startX;

  const getDisplayName = () => "domino";

  const getSprite = (_ctx: ExampleCtx) => {
    return Sprite.fromFile("dominoWide.png", 0.1).setAnchor("BottomLeft");
  };

  return {
    getAssetPaths,
    getX,
    getDisplayName,
    getSprite,
  };
}

export function createSkyDomino(x: number, y: number): GameObject<ExampleCtx> {
  const getAssetPaths = () => ["dominoTall.png"];

  const getX = () => x;

  const getY = () => y;

  const getDisplayName = () => "sky domino";

  const getSprite = (_ctx: ExampleCtx) => {
    return Sprite.fromFile("dominoTall.png", 0.1, "TopRight").static();
  };

  return {
    getAssetPaths,
    getX,
    getY,
    getDisplayName,
    getSprite,
  };
}
