import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    css: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json-summary"],
      all: true,
      include: ["src/**/*.{ts,tsx}"],
      // layout.tsx is the root HTML document shell (next/font + a full
      // <html>/<body> tree) — not practical to mount with RTL. It's still
      // exercised for real by every Playwright E2E run.
      exclude: ["src/**/*.test.{ts,tsx}", "src/app/layout.tsx"],
      thresholds: {
        lines: 90,
        statements: 90,
        functions: 90,
        branches: 90,
      },
    },
  },
});
