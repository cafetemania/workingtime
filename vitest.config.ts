import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      exclude: [
        "node_modules/",
        "dist/",
        "**/*.test.ts",
        "**/*.test.tsx",
        "vitest.config.ts",
        "vite.config.ts",
        "postcss.config.js",
        "tailwind.config.js",
        "src/test/",
        "src/main.tsx",
        "src/vite-env.d.ts",
      ],
    },
  },
});
