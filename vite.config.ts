import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import devtools from "solid-devtools/vite";
import path from "path";
import { copyGameArt } from "./copyArt";

export default defineConfig({
  plugins: [copyGameArt(), devtools(), solidPlugin()],
  server: {
    port: 3000,
  },
  base: "/example/",
  build: {
    target: "esnext",
  },
  resolve: {
    alias: {
      "@roc": path.resolve(__dirname, "./src"),
    },
  },
});
