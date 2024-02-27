import react from "@vitejs/plugin-react";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    // Vitest issue with threads @ canvas dependency  :
    // https://github.com/vitest-dev/vitest/issues/1982
    threads: false,
    setupFiles: ["src/test/setup.ts"],
    environment: "jsdom",
    exclude: [...configDefaults.exclude, "**/e2e/**"],
  },
});
