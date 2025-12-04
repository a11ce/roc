import {
  Container,
  Graphics,
  Text,
  Color,
  Sprite as PixiSprite,
} from "pixi.js";
import { unreachable } from "@roc/util/common";

export type Sprite =
  | { type: "fromFile"; path: string; scale?: number; flipped?: boolean }
  | { type: "circle"; radius: number; label?: string };

export const Sprite = {
  fromFile: (
    path: string,
    scale?: number,
    flipped?: boolean,
  ): Sprite & { flip: () => Sprite } => {
    const sprite = {
      type: "fromFile" as const,
      path,
      scale,
      flipped,
      flip: () => Sprite.fromFile(path, scale, true),
    };
    return sprite;
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
) => {
  container.removeChildren();

  switch (sprite.type) {
    case "circle": {
      const circle = new Graphics();
      circle.circle(0, 0, sprite.radius).fill(dark);
      circle.circle(0, 0, sprite.radius).stroke({ width: 2, color: light });
      container.addChild(circle);

      if (sprite.label) {
        const label = new Text({
          text: sprite.label,
          style: {
            fontSize: 14,
            fill: light,
          },
        });
        label.anchor.set(0.5, 0.5); // center
        container.addChild(label);
      }
      break;
    }
    case "fromFile": {
      const pixiSprite = PixiSprite.from(sprite.path);
      pixiSprite.anchor.set(0.5, 1.0); // bottom center
      pixiSprite.texture.source.scaleMode = "nearest";
      const scaleValue = sprite.scale ?? 1;
      const scaleX = sprite.flipped ? -scaleValue : scaleValue;
      pixiSprite.scale.set(scaleX, scaleValue);
      container.addChild(pixiSprite);
      break;
    }
    default:
      unreachable(sprite);
  }
};
