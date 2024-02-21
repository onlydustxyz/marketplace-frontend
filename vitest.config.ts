import react from "@vitejs/plugin-react";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    setupFiles: ["src/test/setup.ts"],
    environment: "jsdom",
    exclude: [...configDefaults.exclude],
  },
});
