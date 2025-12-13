import {
  Container,
  Graphics,
  Text,
  Color,
  Sprite as PixiSprite,
} from "pixi.js";
import { unreachable, resolveAssetPath } from "@roc/util/common";

export type Sprite =
  | { type: "fromFile"; path: string; scale?: number; flipped?: boolean }
  | { type: "circle"; radius: number; label?: string };

export const Sprite = {
  fromFile: (
    path: string,
    scale?: number,
    flipped?: boolean,
  ): Sprite & { flip: () => Sprite } => {
    return {
      type: "fromFile" as const,
      path,
      scale,
      flipped,
      flip: () => Sprite.fromFile(path, scale, !flipped),
    };
  },

  circle: (radius: number, label?: string): Sprite => ({
    type: "circle",
    radius,
    label,
  }),
};

export const renderSprite = (
  sprite: Sprite,
  container: Container,
  dark: Color,
  light: Color,
  gameName: string,
) => {
  switch (sprite.type) {
    case "circle": {
      let circle = container.children[0] as Graphics | undefined;
      if (!circle || !(circle instanceof Graphics)) {
        container.removeChildren();
        circle = new Graphics();
        container.addChild(circle);
      }

      circle.clear();
      circle.circle(0, 0, sprite.radius).fill(dark);
      circle.circle(0, 0, sprite.radius).stroke({ width: 2, color: light });

      if (sprite.label) {
        let label = container.children[1] as Text | undefined;
        if (!label || !(label instanceof Text)) {
          label = new Text({
            text: sprite.label,
            style: {
              fontSize: 14,
              fill: light,
            },
          });
          label.anchor.set(0.5, 0.5); // center
          if (container.children.length > 1) {
            container.removeChildAt(1);
          }
          container.addChild(label);
        } else {
          label.text = sprite.label;
          label.style.fill = light;
        }
      } else if (container.children.length > 1) {
        container.removeChildAt(1);
      }
      break;
    }
    case "fromFile": {
      const resolvedPath = resolveAssetPath(sprite.path, gameName);
      let pixiSprite = container.children[0] as PixiSprite | undefined;
      let cachedPath = (container as any)._cachedPath as string | undefined;

      if (!pixiSprite || !(pixiSprite instanceof PixiSprite)) {
        container.removeChildren();
        pixiSprite = PixiSprite.from(resolvedPath);
        pixiSprite.anchor.set(0.5, 1.0); // bottom center
        pixiSprite.texture.source.scaleMode = "nearest";
        container.addChild(pixiSprite);
        (container as any)._cachedPath = resolvedPath;
      } else if (cachedPath !== resolvedPath) {
        // Path changed, need to load new texture
        pixiSprite.texture = PixiSprite.from(resolvedPath).texture;
        pixiSprite.texture.source.scaleMode = "nearest";
        (container as any)._cachedPath = resolvedPath;
      }

      const scaleValue = sprite.scale ?? 1;
      const scaleX = sprite.flipped ? -scaleValue : scaleValue;
      pixiSprite.scale.set(scaleX, scaleValue);
      break;
    }
    default:
      unreachable(sprite);
  }
};
