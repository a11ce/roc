import {
  Container,
  Graphics,
  Text,
  Color,
  Sprite as PixiSprite,
} from "pixi.js";
import { unreachable, resolveAssetPath } from "@roc/util/common";

export type AnchorPoint =
  | "TopLeft"
  | "TopCenter"
  | "TopRight"
  | "LeftCenter"
  | "Center"
  | "RightCenter"
  | "BottomLeft"
  | "BottomCenter"
  | "BottomRight";

interface FromFileSprite {
  type: "fromFile";
  path: string;
  scale?: number;
  flipped?: boolean;
  isStatic?: boolean;
  anchor?: AnchorPoint;
  flip(): FromFileSprite;
  static(): FromFileSprite;
  setAnchor(newAnchor: AnchorPoint): FromFileSprite;
}

export type Sprite =
  | FromFileSprite
  | { type: "circle"; radius: number; label?: string; isStatic?: boolean };

export const Sprite = {
  fromFile: (
    path: string,
    scale?: number,
    anchor?: AnchorPoint,
    flipped?: boolean,
    isStatic?: boolean,
  ): FromFileSprite => {
    const flip = () => Sprite.fromFile(path, scale, anchor, !flipped, isStatic);
    const makeStatic = () =>
      Sprite.fromFile(path, scale, anchor, flipped, true);
    const setAnchor = (newAnchor: AnchorPoint) =>
      Sprite.fromFile(path, scale, newAnchor, flipped, isStatic);

    return {
      type: "fromFile" as const,
      path,
      scale,
      flipped,
      isStatic,
      anchor,
      flip,
      static: makeStatic,
      setAnchor,
    };
  },

  circle: (
    radius: number,
    label?: string,
    isStatic?: boolean,
  ): Sprite & { static: () => Sprite } => {
    const makeStatic = () => Sprite.circle(radius, label, true);

    return {
      type: "circle",
      radius,
      label,
      isStatic,
      static: makeStatic,
    };
  },
};

const parseAnchor = (
  anchor: AnchorPoint = "BottomCenter",
): [number, number] => {
  let x = 0.5;
  let y = 0.5;

  if (anchor.includes("Left")) {
    x = 0;
  } else if (anchor.includes("Right")) {
    x = 1.0;
  }

  if (anchor.includes("Top")) {
    y = 0;
  } else if (anchor.includes("Bottom")) {
    y = 1.0;
  }

  return [x, y];
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
        const [anchorX, anchorY] = parseAnchor(sprite.anchor);
        pixiSprite.anchor.set(anchorX, anchorY);
        pixiSprite.texture.source.scaleMode = "nearest";
        container.addChild(pixiSprite);
        (container as any)._cachedPath = resolvedPath;
      } else if (cachedPath !== resolvedPath) {
        // Path changed, need to load new texture
        pixiSprite.texture = PixiSprite.from(resolvedPath).texture;
        pixiSprite.texture.source.scaleMode = "nearest";
        (container as any)._cachedPath = resolvedPath;
      }

      const [anchorX, anchorY] = parseAnchor(sprite.anchor);
      pixiSprite.anchor.set(anchorX, anchorY);

      const scaleValue = sprite.scale ?? 1;
      const scaleX = sprite.flipped ? -scaleValue : scaleValue;
      pixiSprite.scale.set(scaleX, scaleValue);
      break;
    }
    default:
      unreachable(sprite);
  }
};
