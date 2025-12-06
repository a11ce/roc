import fs from "fs";
import path from "path";
import type { Plugin } from "vite";

export function copyGameArt(): Plugin {
  const copyAssets = () => {
    const gameData = path.resolve(process.cwd(), "gameData");
    const publicArt = path.resolve(process.cwd(), "public/art");

    for (const gameName of fs.readdirSync(gameData)) {
      const art = path.join(gameData, gameName, "art");
      if (fs.existsSync(art)) {
        fs.cpSync(art, path.join(publicArt, gameName), {
          recursive: true,
        });
      }
    }
  };

  return {
    name: "copy-art",
    buildStart() {
      copyAssets();
    },
    configureServer(server) {
      server.watcher.add("gameData/*/art/**");
      server.watcher.on("change", () => {
        copyAssets();
      });
    },
  };
}
