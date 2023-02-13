/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import istanbul from "vite-plugin-istanbul";
import * as child from "child_process";

export default defineConfig({
  plugins: [
    react(),
    istanbul({
      include: "frontend/src/*",
      exclude: ["node_modules", "test/", "__generated"],
      extension: [".js", ".ts", ".tsx"],
      cypress: true,
    }),
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./frontend/src"),
      assets: path.resolve(__dirname, "./frontend/src/assets"),
    },
  },
  define: {
    APP_COMMIT_HASH: JSON.stringify(child.execSync("git rev-parse --short HEAD").toString()),
  },
  build: {
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
