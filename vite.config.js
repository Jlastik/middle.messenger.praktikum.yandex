import { defineConfig } from "vite";
import { resolve } from "path";
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
  build: {
    target: "es2017",
    outDir: "build",
  },
  preview: {
    port: 3000,
  },
  resolve: {
    alias: [{ find: "src", replacement: resolve(__dirname, "src/") }],
  },
  publicDir: "public",
  plugins: [handlebars()],
});
