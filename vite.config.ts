/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import istanbul from "vite-plugin-istanbul";

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
  test: {
    globals: true,
    environment: "jsdom",
  },
});
