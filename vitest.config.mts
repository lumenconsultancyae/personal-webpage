import {defineConfig} from "vitest/config";
import path from "path";

export default defineConfig({
    esbuild: {
        jsx: "automatic",
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: ["./src/__tests__/setup.ts"],
        include: ["src/__tests__/**/*.test.{ts,tsx}"],
        coverage: {
            provider: "v8",
            reporter: ["text", "json-summary"],
            include: [
                "src/domain/**/*.ts",
                "src/application/**/*.ts",
                "src/infrastructure/**/*.ts",
                "src/utils/**/*.{ts,tsx}",
                "src/components/ui/**/*.tsx",
            ],
        },
    },
});
