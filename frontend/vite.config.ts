/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
      assets: path.resolve(__dirname, "./src/assets"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
