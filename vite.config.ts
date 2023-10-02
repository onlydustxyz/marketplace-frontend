/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import istanbul from "vite-plugin-istanbul";
import * as child from "child_process";
import { configDefaults } from "vitest/config";
import fs from "fs";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

dotenv.config({ path: "../.env" });

export default defineConfig({
  plugins: [
    react(),
    istanbul({
      include: "src/*",
      exclude: ["node_modules", "test/", "__generated"],
      extension: [".js", ".ts", ".tsx"],
    }),
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
      assets: path.resolve(__dirname, "./src/assets"),
    },
  },
  define: {
    APP_COMMIT_HASH: getCommitHash(),
  },
  build: {
    sourcemap: true,
  },
  test: {
    setupFiles: ["src/test/setup.ts"],
    globals: true,
    environment: "jsdom",
    deps: {
      inline: ["vitest-canvas-mock"],
    },
    exclude: [...configDefaults.exclude],
  },
});

function getCommitHash() {
  if (fs.existsSync(".git")) {
    return JSON.stringify(child.execSync("git rev-parse --short HEAD").toString());
  } else {
    console.warn("Cannot get current commit hash because the .git folder does not exist.");
    return JSON.stringify("unknown");
  }
}
