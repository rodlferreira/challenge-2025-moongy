import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
    test: {
        environment: "jsdom",
        globals: true,
        include: ["src/app/tests/**/*.{test,spec}.{ts,tsx}"],
        setupFiles: ["./src/app/tests/setupTests.ts"],
    },
});
