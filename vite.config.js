import { defineConfig } from "vite";
import { resolve } from "path";
import autoprefixer from "autoprefixer";
import postcssNested from "postcss-nested";
import handlebars from "vite-plugin-handlebars";
import { routes } from "./src/routes.js";

const inputs = {};

routes.forEach((el) => {
  inputs[el.name] = el.file;
});

export default defineConfig({
  build: {
    target: "es2017",
    outDir: "build",
    rollupOptions: {
      input: inputs,
    },
  },
  resolve: {
    alias: [{ find: "src", replacement: resolve(__dirname, "src/") }],
  },
  publicDir: "public",
  plugins: [handlebars()],
  css: {
    postcss: {
      plugins: [autoprefixer(), postcssNested],
    },
  },
});
