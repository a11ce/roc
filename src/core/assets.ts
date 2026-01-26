import { Assets } from "pixi.js";
import { resolveAssetPath } from "@roc/util/common";

export const loadAssets = async (gameName: string) => {
  // import.meta.glob is compile-time so it can't know the gameName
  const pngPaths = import.meta.glob("/gameData/*/art/**/*.png", {
    eager: true,
    query: "?url",
    import: "default",
  });

  const assetPaths: string[] = [];
  for (const path in pngPaths) {
    if (path.includes(`/gameData/${gameName}/art/`)) {
      const filename = path.split("/art/")[1];
      const assetPath = resolveAssetPath(filename, gameName);
      assetPaths.push(assetPath);
    }
  }

  if (assetPaths.length > 0) {
    await Assets.load(assetPaths);
  }
};
