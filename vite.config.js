/// <reference types="vitest" />
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react");
const viteTsConfigPaths = require("vite-tsconfig-paths");

export default defineConfig({
    cacheDir: "./node_modules/.vite/portfolio",
    server: {
        port: 4200,
        host: "localhost",
    },
    preview: {
        port: 4300,
        host: "localhost",
    },
    plugins: [
        react(),
        viteTsConfigPaths({
            root: "./",
        }),
    ],
    worker: {
        plugins: [
            viteTsConfigPaths({
                root: "./",
            }),
        ],
    },
});
