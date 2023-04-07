/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import istanbul from "vite-plugin-istanbul";
import * as child from "child_process";
import { configDefaults } from "vitest/config";

export default defineConfig({
  plugins: [
    react(),
    istanbul({
      include: "frontend/src/*",
      exclude: ["node_modules", "test/", "__generated"],
      extension: [".js", ".ts", ".tsx"],
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
    setupFiles: ["frontend/src/test/setup.ts"],
    globals: true,
    environment: "jsdom",
    deps: {
      inline: ["vitest-canvas-mock"],
    },
    exclude: [...configDefaults.exclude, "playwright/*"],
  },
});
