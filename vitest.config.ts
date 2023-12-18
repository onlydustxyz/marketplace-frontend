import react from "@vitejs/plugin-react";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
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
